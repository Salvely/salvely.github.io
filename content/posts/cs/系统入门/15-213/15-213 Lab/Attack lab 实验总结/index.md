---
title: Arch Lab实验总结
date: 2024-03-26 09:59:53
tags:
  - 计算机体系结构
lastmod: 2025-03-19T16:15:24+08:00
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

caller:

> where to find the return value?
> Saved regs that callee may used

1. set up registers
2. callq

callee:

> where to find args, return address?
> restore the registers caller has used

1. create local vars
2. ...
3. set up return vars
4. destroy local vars
5. return

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
8. 使用`ret`返回

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

要在 GUI 模式下测试你的小的 4 元素数组，输入`./psim -g sdriver.yo`

要在一个更大的 63 个元素的数组下测试，输入`。/psim -g ldriver.yo`

Once your simulator correctly runs your version of ncopy.ys on these two block lengths, you will want

to perform the following additional tests:

- Testing your driver ﬁles on the ISA simulator. Make sure that your ncopy.ys function works prop-
erly with YIS:
unix> make drivers
unix> ../misc/yis sdriver.yo
- Testing your code on a range of block lengths with the ISA simulator. The Perl script correctness.pl
generates driver ﬁles with block lengths from 0 up to some limit (default 65), plus some larger sizes.
It simulates them (by default with YIS), and checks the results. It generates a report showing the status
for each block length:
unix> ./correctness.pl
This script generates test programs where the result count varies randomly from one run to another,
and so it provides a more stringent test than the standard drivers.
If you get incorrect results for some length K, you can generate a driver ﬁle for that length that
includes checking code, and where the result varies randomly:
unix> ./gen-driver.pl -f ncopy.ys -n K -rc > driver.ys
unix> make driver.yo
unix> ../misc/yis driver.yo
The program will end with register %rax having the following value:
0xaaaa : All tests pass.
0xbbbb : Incorrect count
0xcccc : Function ncopy is more than 1000 bytes long.
0xdddd : Some of the source data was not copied to its destination.
0xeeee : Some word just before or just after the destination region was corrupted.
- Testing your pipeline simulator on the benchmark programs. Once your simulator is able to cor-
rectly execute sdriver.ys and ldriver.ys, you should test it against the Y86-64 benchmark
programs in ../y86-code:
unix> (cd ../y86-code; make testpsim)

This will run psim on the benchmark programs and compare results with YIS.

- Testing your pipeline simulator with extensive regression tests. Once you can execute the benchmark
programs correctly, then you should check it with the regression tests in ../ptest. For example, if
your solution implements the iaddq instruction, then
unix> (cd ../ptest; make SIM=../pipe/psim TFLAGS=-i)
- Testing your code on a range of block lengths with the pipeline simulator. Finally, you can run the
same code tests on the pipeline simulator that you did earlier with the ISA simulator
unix> ./correctness.pl -p

## 评分细则

整个实验 190 分，其中 Part A 30 分，Part B 60 分，Part C 100 分。

### Part A

Part A is worth 30 points, 10 points for each Y86-64 solution program. Each solution program will be eval-

uated for correctness, including proper handling of the stack and registers, as well as functional equivalence

with the example C functions in examples.c.

The programs sum.ys and rsum.ys will be considered correct if the graders do not spot any errors in

them, and their respective sum list and rsum list functions return the sum 0xcba in register %rax.

The program copy.ys will be considered correct if the graders do not spot any errors in them, and the

copy block function returns the sum 0xcba in register %rax, copies the three 64-bit values 0x00a,

0x0b, and 0xc to the 24 bytes beginning at address dest, and does not corrupt other memory locations.

### Part B

This part of the lab is worth 35 points:

- 10 points for your description of the computations required for the iaddq instruction.
- 10 points for passing the benchmark regression tests in y86-code, to verify that your simulator still
correctly executes the benchmark suite.
- 15 points for passing the regression tests in ptest for iaddq.

### Part C

This part of the Lab is worth 100 points: You will not receive any credit if either your code for ncopy.ys

or your modiﬁed simulator fails any of the tests described earlier.

- 20 points each for your descriptions in the headers of ncopy.ys and pipe-full.hcl and the
quality of these implementations.
- 60 points for performance. To receive credit here, your solution must be correct, as deﬁned earlier.
That is, ncopy runs correctly with YIS, and pipe-full.hcl passes all tests in y86-code and
ptest.
We will express the performance of your function in units of cycles per element (CPE). That is, if the
simulated code requires C cycles to copy a block of N elements, then the CPE is C/N . The PIPE
simulator displays the total number of cycles required to complete the program. The baseline version
of the ncopy function running on the standard PIPE simulator with a large 63-element array requires
897 cycles to copy 63 elements, for a CPE of 897/63 = 14.24.
Since some cycles are used to set up the call to ncopy and to set up the loop within ncopy, you
will ﬁnd that you will get different values of the CPE for different block lengths (generally the CPE
will drop as N increases). We will therefore evaluate the performance of your function by computing
the average of the CPEs for blocks ranging from 1 to 64 elements. You can use the Perl script
benchmark.pl in the pipe directory to run simulations of your ncopy.ys code over a range of
block lengths and compute the average CPE. Simply run the command
unix> ./benchmark.pl
to see what happens. For example, the baseline version of the ncopy function has CPE values ranging
between 29.00 and 14.27, with an average of 15.18. Note that this Perl script does not check for the
correctness of the answer. Use the script correctness.pl for this.
You should be able to achieve an average CPE of less than 9.00. Our best version averages 7.48. If
your average CPE is c, then your score S for this portion of the lab will be:
S =



0 , c > 10.5
20 · (10.5 − c) , 7.50 ≤ c ≤ 10.50
60 , c < 7.50
By default, benchmark.pl and correctness.pl compile and test ncopy.ys. Use the -f
argument to specify a different ﬁle name. The -h ﬂag gives a complete list of the command line
arguments.

## Hand in Instructions

SITE-SPECIFIC: Insert a description that explains how students should hand in the three

parts of the lab. Here is the description we use at CMU.

- You will be handing in three sets of ﬁles:
– Part A: sum.ys, rsum.ys, and copy.ys.
– Part B: seq-full.hcl.
– Part C: ncopy.ys and pipe-full.hcl.
- Make sure you have included your name and ID in a comment at the top of each of your handin ﬁles.
- To handin your ﬁles for part X, go to your archlab-handout directory and type:
unix> make handin-partX TEAM=teamname
where X is a, b, or c, and where teamname is your ID. For example, to handin Part A:
unix> make handin-parta TEAM=teamname
- After the handin, if you discover a mistake and want to submit a revised copy, type
unix make handin-partX TEAM=teamname VERSION=2
Keep incrementing the version number with each submission.
- You can verify your handin by looking in
CLASSDIR/archlab/handin-partX
You have list and insert permissions in this directory, but no read or write permissions.

## Hints

By design, both sdriver.yo and ldriver.yo are small enough to debug with in GUI mode. We

ﬁnd it easiest to debug in GUI mode, and suggest that you use it.

- If you running in GUI mode on a Unix server, make sure that you have initialized the DISPLAY
environment variable:
unix> setenv DISPLAY myhost.edu:0
- With some X servers, the "Program Code" window begins life as a closed icon when you run psim
or ssim in GUI mode. Simply click on the icon to expand the window.
- With some Microsoft Windows-based X servers, the "Memory Contents" window will not automati-
cally resize itself. You'll need to resize the window by hand.
- The psim and ssim simulators terminate with a segmentation fault if you ask them to execute a ﬁle
that is not a valid Y86-64 object ﬁle.
