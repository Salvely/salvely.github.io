# Arch Lab实验总结

<!--more-->

## 前言

本实验中需要我们：

- 设计和实现一个流水线化的 Y86-64 架构处理器
- 优化处理器
- 优化一个基准程序

本实验包括 3 个部分：

- Part A
  - 写几个小的 Y86-64 程序
  - 熟悉 Y86-64 开发工具
- Part B
  - 对 SEQ 模拟器扩展一个新指令
- Part C
  - 优化 Y86-64 基准程序
  - 优化处理器设计

## 环境配置

输入如下命令解压模拟器压缩包并且进入目录进行编译：

```bash
tar xvf sim.tar
cd sim
make clean
make
```

编译失败，提示没有`flex`，`bison`，`-ltk`和`-ltcl`，因此本实验需要三个软件包：

- flex
- bison
- tk
- tcl

通过如下命令安装：

```bash
sudo apt install flex bison tk-dev tcl-dev
```

再次输入：

```bash
make clean
make
```

编译成功，可以开始实验。

## x86-64 函数调用过程复习

### `callq`调用和`ret`返回

使用`callq`进行调用时：

1. 压入返回地址
2. 将 pc 修改为下一条指令地址

使用`ret`返回时：

1. 弹出返回地址
2. 将 pc 修改为返回地址

### 普通的过程调用

被调用者行为：

1. 从寄存器和栈上读取值；
2. 调用`ret`返回；

### 带寄存器参数传递的过程调用

调用者行为：

1. 腾出一部分栈空间；
2. 把局部变量保存在栈上；
3. 将<6个参数输入到寄存器中；
4. `call`指令调用过程；
5. 获取到返回值；
6. 进行计算；
7. 恢复栈空间；
8. 调用`ret`返回；

### 超过6个参数传递的过程调用

> [!TIP]
> 可能需要提前保存内容到栈。

调用者行为：

1. 腾出一部分栈空间；
2. 部分的值的地址需要作为参数传递，那么这些值必须压在栈上，以获取地址；
3. 从第n到第7把参数依次压在栈上，第7个在栈顶；
4. 把其他6个参数保存到寄存器中；
5. `call`指令调用过程；
6. 从栈中获取到值，进行计算；
7. 恢复栈空间；
8. 调用`ret`返回；

### 需要保存被调用者保存寄存器到栈的过程调用

> [!TIP]
> 在下面的示例中，被调用者同时还是个调用者。

被调用者行为：

1. 保存之前的`%rbp`和`%rbx`到栈上；
2. 腾出一部分栈空间；
3. 保存调用者保存寄存器的值，到被调用者保存寄存器，这样可以在调用完成后从中取出原值；（这是一种保存调用者保存寄存器值的方法）
4. 把参数放在寄存器或者栈上，使用`callq`进行过程调用；
5. 从`%rax`中取出值，进行计算；
6. 释放栈空间；
7. 还原调用当前过程的`%rbp`和`%rbx`；
8. `ret`指令返回；

### 调用者同时是被调用者的递归调用

被调用者+调用者行为：

1. 保存`%rbx`（被调用者保存寄存器）；
2. 进行过程调用和计算，返回值放到`%rax`中；
3. 恢复`%rbx`；
4. `ret`指令返回；

### 使用基指针的变长栈帧的过程调用

被调用者行为：

1. 调用者调用它时已经压入返回地址；
2. 压入旧的`%rbp`；
3. 让`%rbp = %rsp`；
4. 进行常规计算，如存储局部变量等等；
5. 计算；
6. `leave`指令执行两条行为
	1. `%rsp = %rbp`
	2. 通过`popq`恢复旧的`%rbp`
7. 执行`ret`指令返回；

综上，使用基指针和不使用基指针的差别在于：

1. 使用基指针时，使用`%rbp`来确定当前栈底位置；
2. 如果不使用，分配空间时将`%rsp`减去特定空间大小，返回之前就手动将`%rsp`加上特定空间大小

### 过程调用栈操作总结

传递参数寄存器为：`%rdi %rsi %rdx %rcx %r8 %r9`

被调用者保存寄存器为：`%rbx %rbp %r12-%r15`

被调用者（同时也可能是调用者）的行为：

1. 保存之前的`%rbp`和`%rbx`到栈上；
2. 腾出一部分栈空间；
3. 将局部变量保存在在栈上；
4. 保存调用者保存寄存器的值，到被调用者保存寄存器，这样可以在调用完成后从中取出原值；（这是一种保存调用者保存寄存器值的方法）
5. 部分的值的地址需要作为参数传递，那么这些值必须压在栈上，以获取地址；
6. 从第n到第7把参数依次压在栈上，第7个在栈顶；
7. 把其他6个参数保存到寄存器中；
8. `call`指令调用过程；
9. 从栈中获取到值，以及从`%rax`中获取到返回值，进行计算；
10. 恢复栈空间；
11. 还原调用当前过程的`%rbp`和`%rbx`；
12. 调用`ret`返回；

## 数组的X86-64地址计算和引用汇编

主要使用`leaq`计算地址，然后用`movq`访存求值。变长数组的地址计算不使用`leaq`，而使用`imulq`。

## 结构体的X86-64地址计算和引用汇编

结构体字段的写入和读取主要通过地址加上适当的偏移实现，字段的大小通过`b w l q`指定：

```asm
; Registers: r in %rdi
movl (%rdi), %eax ;Get r->i
movl %eax, 4(%rdi) ;Store r->j
```

## Y86-64指令集架构回顾

Y86-64指令集架构包括：

- 状态单元
	- 15个程序寄存器：`%rax %rcx %rdx %rbx %rsp %rbp %rsi %rdi %r8-%r14`
	- 每个寄存器存储一个64位的字；
	- `%rsp`作为入栈、出栈、调用和返回指令的栈指针；
	- 3个一位的条件码：`ZF,SF,OF`
	- `PC`存放当前正在执行指令的地址；
	- 使用虚拟地址引用内存位置，假设虚拟内存系统向Y86-64程序提供了一个单一的字节数组映像；
	- 程序状态的最后一部分是状态码`Stat`，表明程序执行的总体状态；它会指示是正常运行，还是出现了某种异常；
- 指令集
	- 只有8字节数据，遵循`AT&T`格式；
	- 数据传送指令：`irmovq rrmovq mrmovq rmmovq`
	- 整数操作指令：`addq subq andq xorq`，设置3个条件码`ZF,SF,OF`
	- 7个跳转指令：`jmp jle jl je jne jge`
	- 6个条件跳转指令：`cmovle comvl comve comvne comvge comvg`
	- `call`和`ret`指令
	- `pushq`和`popq`指令
	- `halt`指令停机
- 编码
	- 1-10个字节不等
	- 高4位代码，低4位功能。代码为0-0xB，只有部分指令有功能字段，其他的是0；
	- 15个寄存器：0-0xE，0xF表示不访问任何寄存器
	- 使用绝对寻址；
	- 整数采用小端码编码；
	- 只有`mov`操作涉及到内存和立即数，其他操作均只涉及寄存器；
- 异常事件处理
	- 用状态`Stat`表示
	- `Stat=1`：`AOK`
	- `Stat=2`：`HLT`
	- `Stat=3`：`ADR`（即`segmentation fault`）
	- `Stat=4`：`INS`（非法指令）
	- 处理方式：让处理器停止执行

## 实验项目结构

实验包根目录下有如下内容：

```bash
.
├── archlab.pdf
├── Makefile
├── README
├── sim
├── simguide.pdf
└── sim.tar
```

其中`archlab.pdf`是实验指导手册（本文已翻译），`Makefile`中主要讲解的是如何提交实验（对于非CMU学生无用），`sim.tar`是实验包，`simguide.pdf`中描述的是如何使用文件中的`simulator`。

在`sim`中，有如下一些文件夹：

```
.
├── Makefile
├── misc
├── pipe
├── ptest
├── README
├── seq
└── y86-code
```

其中`Makefile`中描述的是如何构建所需要使用的`Y86-64`工具，使用`make all`构建，使用`make clean`清理。而`README.md`中写道，该学生包主要有如下几个部分：

```bash
yas		Y86-64 assembler # 从Y86-64 汇编代码翻译成目标代码
yis		Y86-64 instruction (ISA) simulator # 模拟Y86-64指令运行
hcl2c		HCL to C translator # HCL 代码到 C 代码
hcl2v		HCL to Verilog translator # HCL 代码到 Verilog 代码
ssim		SEQ simulator # SEQ 处理器模拟器
ssim+		SEQ+ simulator # SEQ+ 处理器模拟器
psim		PIPE simulator # PIPE 处理器模拟器
```

模拟有2种模式：`TTY`和`GUI`。`TTY`模式不如图形化界面方便。`GUI`界面需要安装`Tcl/Tk`工具才能运行。如果想要`GUI`模式，就把`Makefile`中的几个变量注释取消。

如果修改了`Makefile`文件，输入`make clean; make`再次构建即可。

此外，`REAME.md`介绍了几个文件夹中的内容：

```bash
misc/ # 包含Y86-64汇编器，Y86-64指令模拟器，用于测试的isa.c文件，hcl2c和hcl2v
seq/ # SEQ 和 SEQ+ 模拟器，其中包含一些需要修改的HCL文件（修改SEQ）
pipe/ # PIPE 模拟器，其中包含一些需要修改的HCL文件（修改PIPE）
y86-code/ # 主要用于对新的模拟器进行基准测试
ptest/ # 主要用于对新的模拟器进行回归测试
verilog/ # 负责从HCL代码转化为Verilog代码
```

那么我们主要实验的部分就在`misc/ seq/ pipe/`三个文件夹中。

## Part A

本阶段要求我们：

- 在`sim/misc`目录下完成
- 写并且模拟下面 3 个 Y86-64 程序，每个程序的行为都在`examples.c`中
- 把姓名放在程序开头的注释里
- 如何测试程序
  - 用YAS汇编器编译
  - 用 YIS 模拟器运行
- Y86-64 指令集架构对于函数的处理和 x86-64 相同
  - 传参方式相同
  - 寄存器使用方法相同
  - 用栈的方式相同
  - `callee-saved register`必须提前保存

三个函数的 C 语言版本如下：

```c
/* linked list element */
typedef struct ELE {
    long val;
    struct ELE *next;
} *list_ptr;

/* sum_list - Sum the elements of a linked list */
long sum_list(list_ptr ls)
{
    long val = 0;
    while (ls) {
        val += ls->val;
        ls = ls->next;
    }
    return val;
}

/* rsum_list - Recursive version of sum_list */
long rsum_list(list_ptr ls)
{
    if (!ls)
        return 0;
    else {
        long val = ls->val;
        long rest = rsum_list(ls->next);
        return val + rest;
    }
}

/* copy_block - Copy src to dest and return xor checksum of src */
long copy_block(long *src, long *dest, long len)
{
    long result = 0;
    while (len > 0) {
        long val = *src++;
        *dest++ = val;
        result ˆ= val;
        len--;
    }
    return result;
}
```

### 程序一：`sum.ys`

写一个`Y86-64`程序`sum.ys`，该程序迭代式的累加链表的元素。你的程序应该包括：

- 设置栈结构
- 调用函数
- 停止

该函数应该是 C 语言程序`sum_list`的 Y83-64 形式。使用下面这个 3 元素的 list 来测试你的程序：

```Y86-64
# Sample linked list
.align 8
ele1:
    .quad 0x00a
    .quad ele2
ele2:
    .quad 0x0b0
    .quad ele3
ele3:
    .quad 0xc00
    .quad 0
```

在开始写函数之前，我们需要在源文件中初始化好一些内容：

```asm
# Execution begins at address 0
        .pos 0
        irmovq stack, %rsp
        call main
        halt
        
# Sample linked list
        .align 8
ele1:
        .quad 0x00a
        .quad ele2
ele2:
        .quad 0x0b0
        .quad ele3
ele3:
        .quad 0xc00
        .quad 0

main:
		# 此处放置main程序

sum_list:
		# 此处放置sum_list程序
		
		.pos 0x200
stack:
```

首先我们需要对源程序进行分析：

```c
/* linked list element */
typedef struct ELE {
    long val;
    struct ELE *next;
} *list_ptr;
```

在这个结构体中，`long`是8个字节，`struct ElE*`是一个指针，占8个字节。这个结构体一共16个字节。那么在计算的过程中，如果传入的是结构体的指针，那么我们通过直接解引这个指针获取`long val`，然后通过`list_ptr + 8`来获取到`next`的地址，通过`*(list_ptr + 8)`来获取`next`指向的结点的地址。

我们要通过`main`调用`sum_list`，需要的步骤有：

1. 将`ele1`的地址放在`%rdi`中
2. `call sum_list`
3. `ret`

因此用`Y86-64`汇编可写为：

```asm
main:
        # 传递参数
        irmovq ele1, %rdi
        call sum_list
        ret
```

然后就是观察`sum_list`函数：

```c
/* sum_list - Sum the elements of a linked list */
long sum_list(list_ptr ls)
{
    long val = 0;
    while (ls) {
        val += ls->val;
        ls = ls->next;
    }
    return val;
}
```

这个函数获取一个`list_ptr`型的值，可以看到`list_ptr`型就是一个`ElE`型指针，那么这个值占8位。而且因为只有1个参数，因此它会存储在`%rdi`中。根据之前的学习，我们进行过程调用的步骤为：

1. 保存之前的`%rbp`和`%rbx`到栈上；
	- 本题不需要；
2. 腾出一部分栈空间；
	- 本题`val`就是返回值，直接保存在`%rax`中；
3. 将局部变量保存在在栈上；
	- 本题不需要；
4. 保存调用者保存寄存器的值，到被调用者保存寄存器，这样可以在调用完成后从中取出原值；（这是一种保存调用者保存寄存器值的方法）
	- 本题不需要；
5. 部分的值的地址需要作为参数传递，那么这些值必须压在栈上，以获取地址；
	- 本题不需要；
6. 从第n到第7把参数依次压在栈上，第7个在栈顶；
	- 本题不需要；
7. 把其他6个参数保存到寄存器中；
	- `ls`保存在`%rdi`中；
8. `call`指令调用过程；
	- 本题不需要；
9. 从栈中获取到值，以及从`%rax`中获取到返回值，进行计算；
	- `val`的值在`%rax`中
10. 恢复栈空间；
	- 本题不需要；
11. 还原调用当前过程的`%rbp`和`%rbx`；
	- 本题不需要；
12. 调用`ret`返回；

而现在问题来了，我们需要设计循环的结构，获取`ls`、`ls->val`和`ls->next`。

- 循环结构可采用`jump to middle`方法
- `ls = %rdi`，`ls->val = *(ls)`，`ls->next = *(ls + 8)`

那么整体过程调用的内容为：

```asm
sum_list:
	irmovq $0, %rax # val = 0 -> rax
	andq %rdi, %rdi
	jmp test
loop:
	mrmovq (%rdi), %r10
	addq %r10, %rax
	mrmovq 8(%rdi), %rsi
        rrmovq %rsi, %rdi
        andq %rdi, %rdi
test:
	jne loop
	ret
```

因此总的程序可写为：

> [!WARNING]
> 注意：
> 1. 一定要在循环测试前`andq`，否则测试通不过。
> 2. `stack`后要加一个空行，否则编译通不过。

```asm
# Execution begins at address 0
        .pos 0
        irmovq stack, %rsp
        call main
        halt
        
# Sample linked list
        .align 8
ele1:
        .quad 0x00a
        .quad ele2
ele2:
        .quad 0x0b0
        .quad ele3
ele3:
        .quad 0xc00
        .quad 0

main:
        # 传递参数
        irmovq ele1, %rdi
        call sum_list
        ret

sum_list:
	irmovq $0, %rax # val = 0 -> rax
	andq %rdi, %rdi
	jmp test
loop:
	mrmovq (%rdi), %r10
	addq %r10, %rax
	mrmovq 8(%rdi), %rdi
        andq %rdi, %rdi
test:
	jne loop
	ret

        .pos 0x200
stack:

```

### 程序二：`rsum.ys`

写一个 Y86-64 程序，它可以递归的计算链表的元素的和，还是用上面的那个三个元素的链表进行测试。

`rsum.ys`和上述程序不一样的地方在于，它使用了递归的子过程，并且把`ls->next`作为子过程的参数传递。此外，它使用了`if-else`结构。需要注意的是，我们没有将局部变量压在栈上，而是使用`%rsi`来存储，但是每次迭代过程中都会产生新的值存在`%rsi`上，因此为了保存`%rsi`，我们需要把`%rsi`压在栈上，在调用返回后从栈中弹出，和`%rax`相加。

完整程序如下：

```asm
# Execution begins at address 0
        .pos 0
        irmovq stack, %rsp
        call main
        halt
        
# Sample linked list
        .align 8
ele1:
        .quad 0x00a
        .quad ele2
ele2:
        .quad 0x0b0
        .quad ele3
ele3:
        .quad 0xc00
        .quad 0

main:
        # 传递参数
        irmovq ele1, %rdi
        call rsum_list
        ret

rsum_list:
        andq %rdi, %rdi
        je else
if:
        mrmovq (%rdi), %rsi
        pushq %rsi
        mrmovq 8(%rdi), %rdi
        call rsum_list
        popq %rsi
        addq %rsi, %rax
        jmp done
else:
        irmovq $0, %rax
done:
        ret

        .pos 0x200
stack:

```

### 程序三：`copy.ys`

实现一个叫`copy.ys`的函数，将一些字从内存的一块复制到另外一块（非重合区域），计算所有复制的字的校验和。程序应该包含如下部分：

- 设置栈空间
- 调用 function copy 代码块
- 停止

使用下面的`src`和`dest`来测试：

```Y86-64
.align 8
# Source block
src:
    .quad 0x00a
    .quad 0x0b0
    .quad 0xc00
# Destination block
dest:
    .quad 0x111
    .quad 0x222
    .quad 0x333
```

这个函数和之前的函数又不一样，我们来分析一下：

```c
long copy_block(long *src, long *dest, long len)
{
    long result = 0;
    while (len > 0) {
        long val = *src++;
        *dest++ = val;
        result ^= val;
        len--;
    }
    return result;
}
```

这里我们需要通过`main`传入3个参数，`src`、`dest`和`len`。这三个参数都是8个字节，并且前两个是地址。因此我们通过`%rdi %rsi %rdx`三个寄存器传入。因此`main`部分的代码可以写为

```asm
main:
        # 传递参数
        irmovq src, %rdi
        irmovq dest, %rsi
        irmovq $3, %rdx
        call copy_block
        ret
```

而在函数中，没有其他的过程调用，因此不需要保存什么变量到栈上。对于`result`，我们可以保存在`%rax`上（因为最后要返回），那么整体的代码可以翻译为：

```asm
copy_block:
	irmovq $0, %rax # long result = 0
while:
	andq %rdx, %rdx 
	jle done
	addq $1, %rdi # src++
	mrmovq (%rdi), %r8 # %r8 = val = *src
	addq $1, %rsi
	rmmovq %r8,(%rsi)
	xorq %r8, %rax
	subq $1, %rdx
	jmp while
done:
	ret
```

我们进行汇编，发现汇编不成功，报错如下：

```bash
../misc/yas copy.ys
Error on line 32: Expecting Register ID
Line 32, Byte 0x0087:   addq $1, %rdi # src++
Error on line 34: Expecting Register ID
Line 34, Byte 0x0093:   addq $1, %rsi
Error on line 37: Expecting Register ID
Line 37, Byte 0x00a1:   subq $1, %rdx
make: *** [Makefile:39: copy.yo] Error 1
```

回顾`Y86-64`指令集，我们想起来，不可以直接把常数加到寄存器上，因此我们需要用`%r9`寄存器来存储常数1，然后把寄存器相加。代码如下：

```asm
copy_block:
	irmovq $0, %rax # long result = 0
    irmovq $1, %r9
while:
	andq %rdx, %rdx 
	jle done
	addq %r9, %rdi # src++
	mrmovq (%rdi), %r8 # %r8 = val = *src
	addq %r9, %rsi
	rmmovq %r8,(%rsi)
	xorq %r8, %rax
	subq %r9, %rdx
	jmp while
done:
	ret
```

这段代码虽然编译可以通过，但是我们发现还是有问题，数组一的内容压根就没有复制到数组二中去。经过仔细检查，我们发现问题出在`src++`和`dest++`的处理上，这里`src`和`dest`是指向`long`类型的指针，但是我们在`++`的时候只加了1，按理来说应该加上8（`sizeof(long)`）个单位。我们修改一下程序，新增一个变量`%r10 = 8`。

```asm
copy_block:
	irmovq $0, %rax # long result = 0
        irmovq $1, %r9
        irmovq $8, %r10
while:
	andq %rdx, %rdx 
	jle done
	addq %r10, %rdi # src++
	mrmovq (%rdi), %r8 # %r8 = val = *src
	addq %r10, %rsi
	rmmovq %r8,(%rsi)
	xorq %r8, %rax
	subq %r9, %rdx
	jmp while
done:
	ret
```

> [!TIP]
> 这里我们把数组第二项和第三项成功复制了，但是数组第一项没有。这是因为我们先进行了加，然后才进行的解引运算。但是其实我在网上查找资料的时候发现，C++中后增代码的运算级别是是高于`*`的，所以我才把程序写成这样。如果按照题目的要求，应该是先`*`然后再`++`，也就是说这段代码中的解引和递增的指令顺序应该反过来，才能完成程序的目标。

根据上述Tip，我们进行如下改动：

```asm
copy_block:
	irmovq $0, %rax # long result = 0
        irmovq $1, %r9
        irmovq $8, %r10
while:
	andq %rdx, %rdx 
	jle done
	mrmovq (%rdi), %r8 # %r8 = val = *src
        addq %r10, %rdi # src++
	rmmovq %r8,(%rsi)
        addq %r10, %rsi
	xorq %r8, %rax
	subq %r9, %rdx
	jmp while
done:
	ret
```

成功！完整代码如下：

```asm
# Execution begins at address 0
        .pos 0
        irmovq stack, %rsp
        call main
        halt
        
.align 8
# Source block
src:
    .quad 0x00a
    .quad 0x0b0
    .quad 0xc00
# Destination block
dest:
    .quad 0x111
    .quad 0x222
    .quad 0x333

main:
        # 传递参数
        irmovq src, %rdi
        irmovq dest, %rsi
        irmovq $3, %rdx
        call copy_block
        ret

copy_block:
	irmovq $0, %rax # long result = 0
        irmovq $1, %r9
        irmovq $8, %r10
while:
	andq %rdx, %rdx 
	jle done
	mrmovq (%rdi), %r8 # %r8 = val = *src
        addq %r10, %rdi # src++
	rmmovq %r8,(%rsi)
        addq %r10, %rsi
	xorq %r8, %rax
	subq %r9, %rdx
	jmp while
done:
	ret

        .pos 0x200
stack:
```

## Part B

> [!WARNING]
> 需要注意的点是：`Makefile`文件中`tcl`的版本可能需要更新，另外`ssim.c`中的`matherr`两行需要注释掉，不然会报错。
> 详情参考：
> - [CSAPP--Architecture Lab实验记录 - lincx blog](https://lincx-911.github.io/2021/12/architecture_lab/)
> - [CSAPP : Arch Lab 解题报告 - 知乎](https://zhuanlan.zhihu.com/p/36793761)

在本实验中，你需要在`sim/seq`目录下工作。这个部分我们的目的是扩展 SEQ 处理器，让其支持`iaddq`指令(书本 4.51 & 4.52 练习题内容)，可以通过修改`seq-full.hcl`文件来实现，这里面包含了一些所需要用到的常数量。你的实现中在开头必须包含一个注释，在其中写上你的姓名和 ID，以及`iaddq`的执行过程。

### `iaddq`指令分析

```
1. 取指：icode:ifun <- M[PC] rA:rB <- M[PC+1] valC <- M[PC+2] valP <- PC+10
2. 译码：valB <- R[rB]
3. 执行：valE <- valB + valC
4. 访存：无
5. 写回：R[rB] <- valE
6. 更新PC：PC <- valP
```

### `seq`优化

在需要改动的信号中，直接将`iaddq`指令加到`hcl`列表中去即可。

#### 取指阶段

需要改动的变量有：`rA,rB,valC,valP`

需要改动的信号有：`needReg,needValC,instr_valid`

#### 译码阶段+写回阶段

> [!WARNING]
> 这里需要`srcB`，因为我们是要将立即数与`rB`中的值相加，而不是赋值给`rB`

需要改动的变量有：`srcB, dstE`

#### 执行阶段

> [!WARNING]
> 一定要加`set_cc`，因为`iaddq`指令不属于原有的算术逻辑运算指令（`IOPQ`类）

需要改动的变量有：`aluA, aluB, set_cc`

#### 访存阶段

无改动。

#### 更新PC

无改动。

### 构建与测试指南

当你修改完`seq-full.hcl`文件的时候，你需要构建一个新的 SEQ 处理器，并且测试它：

- 构建一个新的模拟器

  ```bash
  make VERSION=full
  ```

- 在一个简单的 Y86-64 程序上测试你的模拟器
  - 对于一个初始的测试，我们建议在 TTY 模式下运行一些简单的程序，例如`asumi.yo`，将其与模拟器的结果对比：

  ```bash
    ./ssim -t ../y86-code/asumi.yo
  ```

  - 如果测试失败，那么你应该在 GUI 模拟下单步调试模拟器，命令如下：

  ```bash
  ./ssim -g ../y86-code/asumi.yo
  ```

- 使用基准测试来重新测试你的模拟器
  - 一旦你的模拟器可以正常执行小程序了，那么你可以利用`y86-code`中的基准程序进行测试，命令如下：

  ```bash
  cd ../y86-code; make testssim
  ```

  这个测试不包含新指令测试，只是检查新指令的执行会不会破坏原有的处理器状态，具体情况可以查看`../y86-code/README`文件

- 进行回归测试
  - 一旦你可以正确运行基准程序，那么你应该运行一些`../ptest`中额外的回归测试，运行如下命令：

  ```bash
  cd ../ptest
  make SIM=../seq/ssim
  ```

  - 要测试`iaddq`指令，运行如下命令：

  ```bash
  cd ../ptest
  make SIM=../seq/ssim TFLAGS=-i
  ```

- 其他 SEQ 模拟器的使用参考`simguide.pdf`

## Part C

### Part C 介绍

你会在`sim/pipe`目录下工作，`ncopy`函数将一个`len`个元素的数组从`src`复制到`dst`，返回其中正数的个数。图 3 显示了 Y86-64 版本的`ncopy`，文件`pipe-full.hcl`涵盖了 PIPE 的设计`hcl`代码，其中包括声明的常量`IIADDQ`。

```c
/*
* ncopy - copy src to dst, returning number of positive ints
* contained in src array.
* sim/pipe/ncopy.c
*/
word_t ncopy(word_t *src, word_t *dst, word_t len)
{
    word_t count = ;
    word_t val;

    while (len > ) {
        val = *src++;
        *dst++ = val;
        if (val > 0)
        count++;
        len--;
    }
    return count;
}
```

这一部分的任务是修改`ncopy.ys`和`pipe-full.hcl`，需要让`ncopy.ys`尽可能运行的快。

`ncopy.ys`如下：

```hcl
##################################################################
# ncopy.ys - Copy a src block of len words to dst.
# Return the number of positive words (>0) contained in src.
#
# Include your name and ID here.
#
# Describe how and why you modified the baseline code.
#
##################################################################
# Do not modify this portion
# Function prologue.
# %rdi = src, %rsi = dst, %rdx = len
ncopy:

##################################################################
    # You can modify this portion
    # Loop header
    xorq %rax,%rax # count = 0;
    andq %rdx,%rdx # len <= 0?
    jle Done # if so, goto Done:

Loop:
    mrmovq (%rdi), %r10 # read val from src...
    rmmovq %r10, (%rsi) # ...and store it to dst
    andq %r10, %r10 # val <= 0?
    jle Npos # if so, goto Npos:
    irmovq $1, %r10
    addq %r10, %rax # count++
Npos:
    irmovq $1, %r10
    subq %r10, %rdx # len--
    irmovq $8, %r10
    addq %r10, %rdi # src++
    addq %r10, %rsi # dst++
    andq %rdx,%rdx # len > 0?
    jg Loop # if so, goto Loop:
##################################################################
# Do not modify the following section of code
# Function epilogue.
Done:
    ret
##################################################################
# Keep the following label at the end of your function
End:
```

最后需要上交两个文件：

- `pipe-full.hcl`
- `ncopy.ys`

每个文件前都需要有一个注释，其中包括：

- 你的姓名和 ID
- 你的代码解释，对每个场景描述你如何修改代码

### Part C 编码规则

你可以随意修改，但是有如下限制：

- 你的`ncopy.ys`函数必须对任意大小的数组都适用，不可以对某个长度的数组进行硬编码。
- 你的`ncopy.ys`必须在 YIS 上成功运行，成功的意思是成功的复制了数组，并且在`%rax`中返回了数组中正数的个数，
- 你的`ncopy`汇编文件不能大于 1000 个字节，你可以使用如下命令检查：

  ```bash
  ./check-len.pl < ncopy.yo
  ```

- 你的`pipe-full.hcl`文件实现必须通过`../y86-code`和`../ptest`中的回归测试（不使用`-i`测试`iaddq`指令）

接下来你可以实现`iaddq`指令，修改时保证`ncopy.ys`的语义不改变。你可以阅读一下`CSAPP 3e Section 5.8`的循环展开。

### 结果的构建与运行

为了测试你的实现，你需要构造一个调用你`nocpy`函数的驱动程序。我们已经为你提供了一个`gen-driver.pl`程序，该程序生成一个输入为任意大小数组的驱动程序，输入如下命令：

```bash
make drivers
```

构建如下两个驱动程序：

- `sdriver.yo`
  - 使用一个 4 个元素的小数组进行测试
  - 如果运行成功，最终`%rax = 2`
- `ldriver.yo`
  - 使用一个大的 63 个元素的数组进行测试
  - 如果运行成功，最终`%rax = 31`

注意：

- 每次你修改`ncopy.ys`，你都可以重新输入`make drivers`来重新构建驱动程序
- 每次你修改`pipe-full.hcl`文件，你都可以输入`make psim VERSION=full`来重新构建模拟器
- 如果你想同时重新构建两者，输入`make VERSION=full`
- 要在 GUI 模式下测试你的小的 4 元素数组，输入`./psim -g sdriver.yo`
- 要在一个更大的 63 个元素的数组下测试，输入`。/psim -g ldriver.yo`

一旦你的模拟器能在这两个数组下成功运行`ncopy.ys`，你需要执行下面这些额外的测试：

- 在ISA模拟器上测试你的`driver files`，确保你的`ncopy.ys`函数能与YIS正常运行

	```bash
	make drivers
	../misc/yis sdriver.yo
	```

- 在不同大小的数组上测试ISA模拟器，`perl`脚本`correctness.pl`生成不同大小的`driver files`，它模拟它们，并且检查结果。他会生成一个显示最终结果的报告：

	```bash
	 ./correctness.pl
	```

	- 如果在某个长度的数组上失败了， 你可以使用如下方法测试：

	```bash
	unix> ./gen-driver.pl -f ncopy.ys -n K -rc > driver.ys
	unix> make driver.yo
	unix> ../misc/yis driver.yo
	```

	- 返回值在`%rax`中，可能有如下几个值
		- 0xaaaa：所有测试通过
		- 0xbbbb：不正确
		- 0xcccc：`ncopy`函数的长度超过了1000字节
		- 0xdddd：部分源数据没有复制到目标地址
		- 0xeeee：目标地址前后的数据被改变了
- 使用基准程序测试你的流水线模拟器，一旦你的模拟器能成功执行`sdirver.ys`和`ldriver.ys`，你应该使用`../y86-code`文件夹中的`Y86-64`基准程序：

	```bash
	(cd ../y86-code; make testpsim)
	```

	- 这会在基准程序上运行`psim`，然后将结果与`YIS`进行比较
- 使用额外的回归测试来测试你的流水线模拟器。一旦你的模拟器能成功运行基准程序，那么你应该使用`../ptest`中的回归测试进行测试。比如你实现了`iaddq`指令，那么你可以执行如下命令进行测试：

	```bash
	(cd ../ptest; make SIM=../pipe/psim TFLAGS=-i)
	```

- 在不同的块长度下测试你的程序，你可以使用与之前测试ISA模拟器相同的指令：

```bash
./correctness.pl -p
```

## 评分细则

整个实验 190 分，其中 Part A 30 分，Part B 60 分，Part C 100 分。

### Part A

- Part A 30分，其中每个Y86-64程序10分，其中每个程序都会被检测，包括对栈的处理和对寄存器的处理是否正确，以及和`examples.c`中的程序是否等效；
- 如果grader 没有在`sum.ys`和 `rsum.ys`中发现任何错误，并且对应的`sum list`和`rsum list`函数将`0xcba`保存在`%rax`中返回，被视为正确；
- 如果grader没有在`copy.ys`中发现任何错误，并且`copy block function`将返回值`0xcba`保存在`%rax`中返回，并且复制了3个64位值`0x00a,0x0b,0xc`到从`dest`开始的24个字节中，并且没有破坏其他地方的值，被视为正确；

### Part B

Part B 35分，其中10分给你对`iaddq`所需操作的描述，10分给`y86`代码通过基准`regression tests`，15分给`iaddq`通过`ptest`文件夹中的`regression tests`

### Part C

Part C的分值是100，如果你在之前的测试中没有通过，那么你不会在这个阶段得到任何分数。

- 20分给`ncopy.ys`和`pipe-full.hcl`中的头文件中的描述，以及代码实现的质量；
- 60分给性能。也就是说`ncopy`需要成功在`YIS`下运行，并且`pipe-full.hcl`需要通过`y86-code`和`ptest`文件夹下的所有测试。
- 我们会使用`CPE`来测试`ncopy`的性能，也就是移动单位元素所花费的时钟周期。我们会使用多个不同长度的块来进行测试，使用如下命令完成

	```bash
	./benchmark.pl
	```

	注意这个脚本不是用来测试正确性的，正确性应该用如下脚本进行测试：

	```bash
	./correctness.pl
	```

	你的目标应该是达到平均小于9.00的CPE，评分标准如下：

	```c
	S = 0; // c > 10.5
	20*(10.5-c) // 7.5 <= c <= 10.5
	60 // c < 7.50
	```

	其中`benchmark.pl`和`correctness.pl`默认编译和测试`ncopy.ys`，但是还有如下几个可选项：

	```bash
	-f # 测试其他文件
	-h # 输出所有命令行参数
	```

## 提示

- `sdriver.yo`和`ldriver.yo`非常小，可以在`GUI`模式下调试；
- 如果你在Unix的GUI模式下运行，你需要确保你已经初始化了`DISPLAY`环境变量

	```bash
	setenv DISPLAY myhost.edu:0
	```

- 对于某些X servers，当你在GUI模式下运行`psim`或`ssim`时，`Program Code`窗口是个关闭图标。点击该图标就可以扩展窗口。
- 在某些微软操作系统下的X servers，`Memory Contents`窗口不会自动缩放，你需要手动缩放。
- 如果让`psim`和`ssim`模拟器去执行一个不是有效的`Y86-64`目标文件时，他们会报出段错误并终止执行。

