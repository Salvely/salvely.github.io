---
title: Data lab 实验总结
categories:
  - 系统入门
date: 2024-02-05 15:50:22
tags:
  - 数据表示
lastmod: 2025-03-19T16:15:35+08:00
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

部分的题目我参考了一下网上的内容（出处已注明），其他的均为自己实现（有的题目的实现过程可能会有些繁琐），部分 dlc 检测出来可能会报些 error，但是 btest 均能过。

> 没有 TA 可太难了！自己实现了一天多，终于苟完了。不算完美，但也能看吧。

## bitXor

```c
/*
 * bitXor - x^y using only ~ and &
 *   Example: bitXor(4, 5) = 1
 *   Legal ops: ~ &
 *   Max ops: 14
 *   Rating: 1
 */
int bitXor(int x, int y)
{
   /**
    * x + y = ~( ~x & ~y)
    */
   return ~((~(x & ~y)) & (~(y & ~x)));
}
```

bitXor 要求我们使用位操作来实现`^`运算符。根据运算定律我们知道: `a ^ b = (a & (~b)) | (b & (~a))`。但是问题来了，我们这里不允许使用`|`，只能用`~`和`&`。那么我们就必须使用这两个操作符来实现`|`运算。

通过德摩根定律我们知道：`a | b = ~((~a) & (~b))`。这不就解决问题了嘛，所以将这两个式子综合一下，最后的结果是`~((~(x & ~y)) & (~(y & ~x)))`

## tmin

```c
/*
 * tmin - return minimum two's complement integer
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 4
 *   Rating: 1
 */
int tmin(void)
{
   /**
    * the most significant bit = 1, others = 0, so (1 << 31)
    */
   return (1 << 31);
}
```

这题要求我们返回最小的补码整数，返回类型为`int`。首先，在二进制补码表示中，最高位的权值为-1，其他位的权值为 1。因此，最小的补码整数 tmin 的最高位为 1，其他位为 0。而题目中`int`类型为 32 位，因此只要返回`(1 << 31)`即可。

## isTmax

```c
/*
 * isTmax - returns 1 if x is the maximum, two's complement number,
 *     and 0 otherwise
 *   Legal ops: ! ~ & ^ | +
 *   Max ops: 10
 *   Rating: 1
 */
int isTmax(int x)
{
   /**
    * Tmax ^ Tmin = 0xffffffff, ~0xffffffff = 0x0, !0x0 = 0x1
    */
   // return !(~(x ^ (1 << 31)));

   /**
    * ~Tmax = Tmin -> ~Tmin + 1 = Tmin 且 Tmin != 0
    */
   int num = ~x;
   return !(num ^ (~num + 1)) & !!num;
}
```

tmax 是二进制补码中最大的数，通过分析这个数的特点，我们可以完成这道题目。

1. 该数除了最高位是 0 外，其他位均是 1。因此该数和(1<<31)（也就是 tmin）的亦或（或者和）为`0xffffffff`。`0xffffffff`按位取反得到`0x0`，而`0x0`按位取反得到`0x1`。但是其他的数并没有这个特性。

```c
return !(~(x ^ (1 << 31)));
```

1. 该数取反后得到 tmin，tmin 的一个特点是 tmin 和 -tmin 的表示相同。因此两者亦或得到 0。还有一个树也有这样的特性，也就是 0。因此我们需要排除 0 的可能性。我们使用`&`操作符来实现两种特性的叠加。我本没有想到该方法，是从这篇[知乎帖子](https://zhuanlan.zhihu.com/p/614126795)学习到的。

```c
int num = ~x;
return !(num ^ (~num + 1)) & !!num;
```

但是题目不允许在该题中使用移位运算符，因此只能使用方法二。

## allOddBits

```c
/*
 * allOddBits - return 1 if all odd-numbered bits in word set to 1
 *   where bits are numbered from 0 (least significant) to 31 (most significant)
 *   Examples allOddBits(0xFFFFFFFD) = 0, allOddBits(0xAAAAAAAA) = 1
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 2
 */
int allOddBits(int x)
{
   /**
    * tear the number into 4 parts, get rid of the other digits except 0xaa
    * if the results are all the same, then compare it with 0xaa, if there are the same, xor returns 0
    * otherwise not all odd bits in word set is set to 1
    */
   int first = (x >> 24) & 0xaa;
   int second = (x >> 16) & 0xaa;
   int third = (x >> 8) & 0xaa;
   int fourth = x & 0xaa;
   return !((first & second & third & fourth) ^ 0xaa);
}
```

对于单个字节的奇数位，我们可以使用`0xaa`作为 mask。

本题目中我将位打成 4 个部分，每个部分与 mask 相与。如果每个奇数位都是 1 的话，四个部分的比较结果应该相同，都等于`0xaa`，该值与`0xaa`异或得到`0x0`，取`!`后得到`0x1`。否则该值不为`0xaa`，同`0xaa`亦或得到其他非零值，取`!`后得到`0x0`。

## negate

```c
/*
 * negate - return -x
 *   Example: negate(1) = -1.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 5
 *   Rating: 2
 */
int negate(int x)
{
   return (~x + 1);
}
```

该题目中我们需要求解某个数的相反数。在课堂中我们学过，一个数和它相反数的和为 0。那么如何获得其相反数呢？以`x`为例，我们知道`x + ~x = ~0`，也就是全 f，然后`~0 + 1 = 0`。因此，`-x`的补码表示即为`~x + 1`。

## isAsciiDigit

```c
/*
 * isAsciiDigit - return 1 if 0x30 <= x <= 0x39 (ASCII codes for characters '0' to '9')
 *   Example: isAsciiDigit(0x35) = 1.
 *            isAsciiDigit(0x3a) = 0.
 *            isAsciiDigit(0x05) = 0.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 15
 *   Rating: 3
 */
int isAsciiDigit(int x)
{
   /**
    * least = (x & 0xf) - 0xa
    * if least > 0 (with 0 in most significant bit) then least = 0
    * else least = 1
    */
   int least = ((((x & 0xf) + (~0xa + 1)) >> 31) & 0x1);
   int second = !((x >> 4) ^ 0x3);
   return least & second;
}
```

这里我使用的方法是将该数拆分为最低位和其他位来比较。我们将最低位与`0xa`相减，如果求得的结果为负数，符号位即为 1，代表该值在 0-9 之间。接下来判断其他位是否为`0x3`，如果是，则和`0x3`异或结果为 0，通过逻辑`!`返回 1。

## conditional

```c
/*
 * conditional - same as x ? y : z
 *   Example: conditional(2,4,5) = 4
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 16
 *   Rating: 3
 */
int conditional(int x, int y, int z)
{
   /**
    * judge if x != 0, if true, !!x = 1, return y, otherwise !!x = 0, return z
    */

   // cond gets all f when !!x == 1
   int cond = ((!!x) << 31) >> 31;
   return (cond & y) | (~cond & z);
}
```

这里我们先获取`x`的值，如果`x != 0`，则`!!x = 0x1`，否则为`0x0`。扩展该值，当该值为`0x1`时与`y`相与得到 y。当该值为`0x0`，取反后与 z 相与得到 z。因为这两个值只取其一，当一边不为 0 时另一边必然为 0，因此两边用`|`连接。

## isLessOrEqual

> 本题要求使用最多 24 个运算符，但是这里我使用的过多了，应该会有更好的办法。期待有人指正。

```c
/*
 * isLessOrEqual - if x <= y  then return 1, else return 0
 *   Example: isLessOrEqual(4,5) = 1.
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 24
 *   Rating: 3
 */
int isLessOrEqual(int x, int y)
{
   // first compare their sign bit
   int sign_x = (x >> 31) & 0x1;
   int sign_y = (y >> 31) & 0x1;
   // return true if sign = 1(>0)
   int sign_diff = sign_x + (~sign_y + 1);
   int sign_bit = (sign_diff >> 31) & 0x1;

   // then compare the magnitude
   int mask = (~0) + (0x1 << 31);
   int mag_x = x & mask;
   int mag_y = y & mask;
   int mag_diff = mag_x + (~mag_y + 1);
   int mag_sign = !(mag_x ^ mag_y) | ((mag_diff >> 31) & 0x1);

   /**
    * 2 conditions return true:
    * 1. sign of x = 1 and sign of y = 0
    * 2. sign of x and y equals, and magnitude of x <= y
    */
   return (((!sign_bit) & sign_diff) | ((!sign_diff) & mag_sign));
}
```

这里要分几种情况：

1. x 为负数，y 为正数，直接返回`0x1`
2. x 和 y 同符号，比较数值部分。x <= y 时，返回`0x1`；x > y 时，返回`0x0`
3. x 为正数，y 为负数，返回`0x0`

其中`sign_diff`为两数符号位之差，此处分三种情况：

1. x 为负数，符号位为 1；y 为正数，符号位为 0。那么两者符号位相减等于`0x1`，该值的符号位为 0。（这是我们要返回`0x1`的结果）
2. x 为正数，符号位为 0；y 为负数，符号位为 1。那么两者符号位相减等于`0xffffffff`(-1)，该值的符号位为 1。（我们不要这个结果）
3. x 和 y 的符号位相同，两者相减为`0x0`，该值的符号位为 0。（这里我们要看情况，看`x`是否和`y`相等）

代码中`sign_diff`为两符号位之差，`sign_bit`为该做差结果的最高位。当 x 和 y 的符号位不相同时，当`sign_diff`为`0x1`且`sign_bit`为`0x0`是，我们返回`0x1`。这也是运算结果`|`左半边的由来。

代码中`mag_diff`为两者数值部分之差，`mag_sign`为该差值的符号位。当`x < y`时，`mag_diff`为`0xffffffff`。当`x == y`时，`!(mag_x ^ mag_y)`为`0x1`。因此`mag_sign = !(mag_x ^ mag_y) | ((mag_diff >> 31) & 0x1)`。在判断数值之差部分时，我们需要保证两数符号位之差为`0x0`，而不是其他（如 x 正 y 负）。因此运算结果右半边的值为`(!sign_diff) & mag_sign`。

综上，最后的结果是`((!sign_bit) & sign_diff) | ((!sign_diff) & mag_sign)`。

## logicalNeg

```c
/*
 * logicalNeg - implement the ! operator, using all of
 *              the legal operators except !
 *   Examples: logicalNeg(3) = 0, logicalNeg(0) = 1
 *   Legal ops: ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 4
 */
int logicalNeg(int x)
{
   /**
    * if x == 0, x ^ 0x0 = 0
    */
   return ((x | (x + ~0 + (~(1 << 31) + 1))) >> 31) + 1;
}
```

这道题的难点在于：

1. 将 0 映射到 0x1
2. 将非 0 值映射到 0x0

在一开始实现时，我的思路是对于 0，可以和`0x0`异或，判断为 0。但是对于非 0 的数，和`0x0`异或后还是他自己，我们也不知道 1 落在其中哪个位上，一个个位去找也不现实。那么就需要思考其他的办法。从`0x0`这个数和其他数的特点下手。这里我参考了[这篇博客](https://dingfen.github.io/csapp/2021/04/30/CSAPPLab01.html)。

其给出的思路是：

-x 为 x 按位取反再+1。

- 如果一个数为全 0，和相反数相`|`后结果全部是 0，加 1 后得到`0x1`
- 否则结果最高位必然含有 1。向右移动 31 位获得`~0`，再加 1 得到`0x0`

问题可改为，如何判断一个数全为 0 。注意到，-x 相当于按位取反再加一，如果 x 为 非 0 数，那么 x|(-x) 后必定为 -1 。利用这个性质，即可判断是否为 0 。

## howManyBits

```c
/* howManyBits - return the minimum number of bits required to represent x in
 *             two's complement
 *  Examples: howManyBits(12) = 5
 *            howManyBits(298) = 10
 *            howManyBits(-5) = 4
 *            howManyBits(0)  = 1
 *            howManyBits(-1) = 1
 *            howManyBits(0x80000000) = 32
 *  Legal ops: ! ~ & ^ | + << >>
 *  Max ops: 90
 *  Rating: 4
 */
int howManyBits(int x)
{
   /**
    * divide and conquer
    * for positive number, the number of bits = the last position of 1 + 1
    * for negative number, the number of bits = the last position of 1
    * inverse negative number and deal with it as the same as positive number
    * 1. judge the sign bit of x, if x is negative, inverse it
    * 2. judge the high 16 bits, if true(high 16 bits != 0x0), result + 16
    * 3. judge the high 8 bits, if true, result + 8
    * 4. judge the high 4 bits, if true, result + 4
    * 5. judge the high 2 bits, if true, result + 2
    * 6. judge the high 1 bits, if true, result + 1
    * 7. judge the last 1 bit, if true, result + !!x
    * 8. the final sum must + 1
    * 9. return the result
    */
   // neg x if it's negative
   int sign = ((x & (1 << 31)) >> 31);
   x = (sign & ~x) | (~sign & x);

   int b16, b8, b4, b2, b1, b0;

   // int mask_16 = (1 << 15) >> 15;
   b16 = !!(x >> 16) << 4;
   x = x >> b16;

   // int mask_8 = 0xff;
   b8 = !!(x >> 8) << 3;
   x = x >> b8;

   // int mask_4 = 0xf;
   b4 = !!(x >> 4) << 2;
   x = x >> b4;

   // int mask_2 = 0x3;
   b2 = !!(x >> 2) << 1;
   x = x >> b2;

   // int mask_1 = 0x1;
   b1 = !!(x >> 1);
   x = x >> b1;

   //! judge if the last bit == 1
   b0 = !!x;

   return b16 + b8 + b4 + b2 + b1 + b0 + 1;
}
```

在这个题目中，我们主要采用分而治之的方法。分治方法的几道例题可以参考 CMU 15-213 课程的[Recitation Slides](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f23/www/recitations/rec01_solutions.pdf)。

首先，我们可以看到，如果该数是一个正数，则其最高位必然是 0，该数的位数 = 最高一个 1 的位置 + 1；

如果该数是一个负数，该数的位数 = 最高一个 1 的位置。

我们不想那么麻烦，把正负数分开讨论，因此我们把负数翻转过来。

在这道题中我们采用的方法是：

1. 判断高 16 位是否有 1（把数向右移动 16 位后，结果不为 0，`!!(x >> 16)`）。`b16 = !!(x >> 16) << 4`。如果是的话，把数值向右移动 16 位`(x>>b16)`。把`b16`添加到结果中去。这里一个妙用在于如果`!!(x >> 16）= 0x1`，`!!(x >> 16) << 4`可以直接起到获得数字 16 的方法，无需增加其他的运算。
2. 判断高 8 位是否有 1，操作同上
3. 判断高 4 位是否有 1，操作同上
4. 判断高 2 位是否有 1，操作同上
5. 判断高 1 位是否有 1，操作同上
6. 判断该位是否有 1
7. 结果 + 1（位数 = 最高一个 1 的位置 + 1）
8. 最后把所有判断结果加起来（每次判断的结果都是一个累加的位数，加在一起就是最后的总位数）

## 浮点数复习

在完成浮点数部分的题目之前，我们需要复习一下浮点数的和其表示方法：

- 单精度浮点数：1 位符号位 + 8 位阶码(exp) + 11 位尾数(frac)
- 双精度浮点数：1 位符号位 + 11 位阶码(exp) + 52 位尾数(frac)

其中阶码使用移码表示。$bias = 2^{k-1}-1$

浮点数分为三类：

- 规格化数：阶码不全为 1 也不全为 0，尾数前有隐含的 1，指数$E=exp - bias$，分布在非规格化数外侧
- 非规格化数：阶码全为 0，尾数前隐含 0，指数$E=1 - bias$，主要分布在靠近 0 侧
- 特殊值：阶码全为 1，若尾数全为 0，则为`inf`，否则为`NaN`

## floatScale2

```c
// float
/*
 * floatScale2 - Return bit-level equivalent of expression 2*f for
 *   floating point argument f.
 *   Both the argument and result are passed as unsigned int's, but
 *   they are to be interpreted as the bit-level representation of
 *   single-precision floating point values.
 *   When argument is NaN, return argument
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. also if, while
 *   Max ops: 30
 *   Rating: 4
 */
unsigned floatScale2(unsigned uf)
{
   // first get the sign, exp and mag bit of the number
   unsigned sign = (uf >> 31) & 0x1;
   unsigned e = (uf >> 23) & ((1 << 8) - 1);
   unsigned f = (uf & ((1 << 23) - 1));

   if (e == 0)
   {
      // denormalized number
      // E = 1 - bias
      // frac = f

      //! how to multiply a denormalized number? frac * 2!
      f = f * 2;
   }
   else if (e == 0xff)
   {
      // special number
      // if frac = 0, then value = inf
      if (f == 0)
      {
         // frac = 1 / 0;
         return uf;
      }
      else
      {
         // if frac != 0, value = NaN
         return uf;
      }
   }
   else
   {
      // normalized number
      // E = e - bias
      // value = 1 + f

      e += 1;
      if (e == ~0)
      {
         return uf;
      }
   }

   return (sign << 31) | (e << 23) | f;
}
```

本题目要求是计算一个 unsigned 形式表示的浮点数 `* 2` 后的表示。在完成这题之前，我们首先把浮点数的几个部分提取出来，分几个情况讨论：

- 非规格化数：指数不变，尾数乘 2。**问题来了，这到底是为什么？因为当exp全为0时，exp = 0, E = 1 - bias, frac = 0.f。乘以2就相当于把f左移一位，最高位会进到exp的位置去。如果f最高位是0，左移一位不影响exp（全0）。如果f最高位是1，左移一位后该数变为规格化数，exp变为1，E依然等于 1 - bias。实现了非规格化数到规格化数的平滑过渡（非常重要！）**
- 规格化数：首先将指数 + 1，然后判断是否为特殊值，若是则返回`uf`。
- 特殊值：`e = 0`，直接返回`uf`（根据题目意思）

将符号位，指数和尾数三个部分拼凑起来，直接返回（本题中无需进行任何计算）。

## floatFloat2Int

> 本题中不允许使用`double`类型，我擅自用了，这里应该是不严谨的。

```c
/*
 * floatFloat2Int - Return bit-level equivalent of expression (int) f
 *   for floating point argument f.
 *   Argument is passed as unsigned int, but
 *   it is to be interpreted as the bit-level representation of a
 *   single-precision floating point value.
 *   Anything out of range (including NaN and infinity) should return
 *   0x80000000u.
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. also if, while
 *   Max ops: 30
 *   Rating: 4
 */
int floatFloat2Int(unsigned uf)
{
   // first get the sign, exp and mag bit of the number
   unsigned sign = (uf >> 31) & 0x1;
   unsigned e = (uf >> 23) & ((1 << 8) - 1);
   float f = (uf & ((1 << 23) - 1)) / (1 << 23);

   // then get the exact sign, E and value of the number
   int s = 0;
   if (sign == 0)
      s = 1;
   else
      s = -1;

   int E = 0;
   float frac = 0;
   int bias = 127;
   if (e == 0)
   {
      // denormalized number
      // E = 1 - bias
      E = 1 - bias;
      // frac = f
      frac = f;
   }
   else if (e == 0xff)
   {
      //! COMPARE WITH 0XFF INSTEAD OF ~0
      // special number
      // if frac = 0, then value = inf
      if (f == 0)
      {
         // frac = 1 / 0;
         return 0x80000000u;
      }
      else
      {
         // if frac != 0, value = NaN
         return 0x80000000u;
      }
   }
   else
   {
      // normalized number
      // E = e - bias
      E = e - bias;
      // value = 1 + f
      frac = 1 + f;
   }
   if (E < 0)
   {
      return 0;
   }
   else if (E > 31)
   {
      //! REMEMBER THE SITUATION THAT E > 31
      return 0x80000000u;
   }

   return s * frac * (1 << E);
}
```

本题需要返回浮点数转化后的 int 类型数值。需要我们对浮点数的结构有所了解，并且其转化为 int 后需要切割掉小数部分，此外，我们还需要判断指数过大的情况（溢出）。

本题中我们采用的步骤是：

1. 提取出浮点数三个部分，计算符号位的值
2. 当`e == 0`时，为特殊值的情况，`E = 1 - bias`，`frac = f`
3. 当`e == 0xff`时（注意不是`~0/0xffffffff`,容易写错！），返回`0x80000000u`
4. 以上两种情况都不是，则该数为规格化数，`E = e - bias; frac = 1 + f;`

最后，我们需要进行**特殊情况的分类讨论**：

1. E < 0, 则最后生成的结果（无论规格化还是非规格化）肯定是个小数，打头的是 0 那种，要切割为`int`类型，小数部分就被切割掉了
2. E > 31, 超过了指数可以表示的范围（算是溢出了？），返回`0x80000000u`
3. 正常情况下返回`s * frac * (1 << E)`

## floatPower2

```c
/*
 * floatPower2 - Return bit-level equivalent of the expression 2.0^x
 *   (2.0 raised to the power x) for any 32-bit integer x.
 *
 *   The unsigned value that is returned should have the identical bit
 *   representation as the single-precision floating-point number 2.0^x.
 *   If the result is too small to be represented as a denorm, return
 *   0. If too large, return +INF.
 *
 *   Legal ops: Any integer/unsigned operations incl. ||, &&. Also if, while
 *   Max ops: 30
 *   Rating: 4
 */
unsigned floatPower2(int x)
{
   //! REMEMEBER THAT FLOATING POINT ITSELF IS IN THE FORMAT (-1)^S * M * 2.0^E
   // fit x into E
   x = x + 127;
   //! MIND THE SITUATION THAT X IS TOO LARGE OR TOO SMALL
   if (x >= 0xff)
      x = 0xff;
   else if (x <= 0)
      x = 0;
   unsigned result = (x << 23);
   return result;
}

```

因为浮点数表示法本身就是以 2 为底，所以本实验就相当于如何把 x 转化为那个 8 位的阶码。因为`阶码 = 指数 + bias`，这里`bias = 127`，因此这里`E = x + 127`。然后和上一题一样，我们需要判断一下 x 的范围是否在`0xff`和`0`之间。最后将 x 移动到阶码的位置返回(`return x << 23`)即可。

## 参考实现

在完成 data lab 过程中，我参考了部分如下几个博客的实现:

- [CSAPP 实验一：DataLab 详细讲解与满分代码](https://zhuanlan.zhihu.com/p/614126795)
- [lab1 CSAPP：datalab](https://zhuanlan.zhihu.com/p/449877475)
- [CSAPP lab1: datalab](https://zhuanlan.zhihu.com/p/557481112)
- [深入理解计算机系统之位操作实验](https://dingfen.github.io/csapp/2021/04/30/CSAPPLab01.html)
- [CSAPP Data Lab 做题记录（下](https://www.cnblogs.com/jyi2ya/p/15881175.html)
