---
title: Arch Lab实验总结
date: 2024-03-26 09:59:53
tags:
  - 计算机体系结构
lastmod: 2025-03-21T08:20:17+08:00
authors:
  - Salvely
series:
  - 15-213
seriesNavigation: true
enableLastMod: true
enableWordCount: true
enableReadingTime: true
toc:
  enable: true
  auto: false
code:
  maxShownlines: 100
---
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

调用者：

1. 将调用者保存寄存器的值压在栈上
2. 将参数放入`%rdi %rsi %rdx %rcx %r8 %r9`几个寄存器中
3. 把剩余的参数压在栈上
4. 使用`callq`命令调用过程
5. 从`%rax`获取返回值
6. 恢复调用者保存寄存器的值

被调用者：

1. 从`%rdi %rsi %rdx %rcx %r8 %r9`，以及栈上读取参数
2. 保存`%rbx %rbp %r12-%r15`的值
3. 开辟一块空间，将局部变量压在栈上
4. 执行过程语句
5. 将返回值放入`%rax`中
6. 恢复`%rbx %rbp %r12-%r15`的值
7. 释放栈空间
8. 返回

使用`callq`进行调用时：

1. 压入返回地址
2. 将 pc 修改为下一条指令地址

在函数中：

1. push %rbp
2. 让`%rbp = %rsp`
3. 将参数移入寄存器
4. 开辟一块栈空间
5. 剩下的参数挨个压在栈上
6. 函数调用
7. 恢复栈空间
8. `%rsp = %rbp`
9. `popq %rbp`
10. 使用`ret`返回

使用`ret`返回时：

1. 弹出返回地址
2. 将 pc 修改为返回地址

## Part A

本阶段要求我们：

- 在`sim/misc`目录下完成
- 写并且模拟下面 3 个 Y86-64 程序，每个程序的行为都在`examples.c`中
- 把姓名放在程序开头的注释里
- 如何测试程序
  - 将其和 YAS 结合在一起
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

### 程序二：`rsum.ys`

写一个 Y86-64 程序，它可以递归的计算链表的元素的和，还是用上面的那个三个元素的链表进行测试。

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

## Part B

在本实验中，你需要在`sim/seq`目录下工作。这个部分我们的目的是扩展 SEQ 处理器，让其支持`iaddq`指令(书本 4.51 & 4.52 练习题内容)，可以通过修改`seq-full.hcl`文件来实现，这里面包含了一些所需要用到的常数量。你的实现中在开头必须包含一个注释，在其中写上你的姓名和 ID，以及`iaddq`的执行过程。

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

## Hints

- `sdriver.yo`和`ldriver.yo`非常小，可以在`GUI`模式下调试；
- 如果你在Unix的GUI模式下运行，你需要确保你已经初始化了`DISPLAY`环境变量

	```bash
	setenv DISPLAY myhost.edu:0
	```

- 对于某些X servers，当你在GUI模式下运行`psim`或`ssim`时，`Program Code`窗口是个关闭图标。点击该图标就可以扩展窗口。
- 在某些微软操作系统下的X servers，`Memory Contents`窗口不会自动缩放，你需要手动缩放。
- 如果让`psim`和`ssim`模拟器去执行一个不是有效的`Y86-64`目标文件时，他们会报出段错误并终止执行。
