---
authors:
  - Salvely
title: Verilog Language
tags:
  - Verilog
categories:
  - 计算机体系结构
series:
  - HDLBits
seriesNavigation: true
enableLastMod: true
enableWordCount: true
enableReadingTime: true
toc:
  enable: true
  auto: false
code:
  maxShownlines: 100
date: 2025-04-07T18:31:01+08:00
lastmod: 2025-04-08T17:14:33+08:00
---

<!--more-->

## Basics

这一章是基础语法部分。

### Simple Wire

要求创建一个模块，有一个输入和一个输出，就像`wire`一样。注意`Verilog`中的赋值是持续的，而不是一次性的。本题代码如下：

```verilog
module top_module( input in, output out );
    assign out = in;
endmodule
```

### Four Wires

创建一个模块，这个模块有3个输入和4个输出，输入和输出的对应关系如下：

- a -> w
- b -> x
- b -> y
- c -> z

注意：

1. 前文已经提到过，赋值是个持续性的操作，不是编程语言中那样一次性的，因此赋值的先后顺序不重要。
2. `assign`语句是连通`wire`，不是创建`wire`。`input`和`output`端口已经是`wire`了。

```verilog
module top_module( 
    input a,b,c,
    output w,x,y,z );

    assign w = a;
    assign x = b;
    assign y = b;
    assign z = c;
endmodule
```

### Notgate

实现一个`inverter`。提示：`Verilog`语言使用`~`表示位取反，`!`表示逻辑取反。代码如下：

```verilog
module top_module( input in, output out );
	assign out = ~in;
endmodule
```

### Andgate

两个输入，一个输出，输出为两个输入的`and`。提示：`Verilog`语言使用`&`表示位取反，`&&`表示逻辑取反。代码如下：

```verilog
module top_module( 
    input a, 
    input b, 
    output out );
	assign out = a & b;
endmodule
```

### Norgate

两个输入，一个输出，输出为两个输入的或非。提示：可以用`|`来取位或，和`||`来取逻辑或。代码如下：

```verilog
module top_module( 
    input a, 
    input b, 
    output out );
    assign out = ~(a | b);
endmodule
```

### XNorgate

两个输入，一个输出。输出为两个输入的同或。提示：使用`^`来取位异或。代码如下：

```verilog
module top_module( 
    input a, 
    input b, 
    output out );
    assign out = ~(a ^ b);
endmodule
```

### Declaring Wires

有时候电路复杂，我们需要在其中定义其他的`wire`，定义模式如下：

```verilog
module top_module (
    input in,              // Declare an input wire named "in"
    output out             // Declare an output wire named "out"
);

    wire not_in;           // Declare a wire named "not_in"

    assign out = ~not_in;  // Assign a value to out (create a NOT gate).
    assign not_in = ~in;   // Assign a value to not_in (create another NOT gate).

endmodule   // End of module "top_module"
```

实现如下电路：

- out = (a & b) | (c & d)
- out_n = ~out

代码如下：

```verilog
`default_nettype none
module top_module(
    input a,
    input b,
    input c,
    input d,
    output out,
    output out_n   ); 
	
    wire a_and_b;
    assign a_and_b = a & b;
    wire c_and_d;
    assign c_and_d = c & d;
    assign out = a_and_b | c_and_d;
    assign out_n = ~out;
endmodule
```

### 4758

实现7458芯片中的功能，利用上面所学的`wire`声明。代码如下：

```verilog
module top_module ( 
    input p1a, p1b, p1c, p1d, p1e, p1f,
    output p1y,
    input p2a, p2b, p2c, p2d,
    output p2y );
	
    wire p2ab;
    assign p2ab = p2a & p2b;
    wire p2cd;
    assign p2cd = p2c & p2d;
    wire p1abc;
   	assign p1abc = p1a & p1b & p1c;
    wire p1efd;
    assign p1efd = p1e & p1f & p1d;
    assign p2y = p2ab | p2cd;
    assign p1y = p1abc | p1efd;
endmodule
```

### Basics 总结

1. 使用`assign`语句赋值，`assign`是持续赋值；
2. `~`对位取非，`!`取逻辑非；
3. `|`取位或，`||`取逻辑或；
4. `^`取异或；
5. `&`取位与，`&&`取逻辑与；
6. 使用`wire <name>;`声明一个内部`wire`；

## Vectors

### Vectors

`vector`可以作为一组`wire`进行统一操作，声明方式如下：

```verilog
wire [99:0] my_vector; // Declare a 100-element vector 
assign out = my_vector[10]; // Part-select one bit out of the vector
```

题目中有一个三位输入`vec`，输出有4个：

- `outv`：和`vec`相等，也是三位；
- `o0`：`vec`的第一位；
- `o1`：`vec`的第二位；
- `o2`：`vec`的第三位；

代码如下：

```verilog
module top_module ( 
    input wire [2:0] vec,
    output wire [2:0] outv,
    output wire o2,
    output wire o1,
    output wire o0  ); // Module body starts after module declaration
	assign outv = vec;
    assign o0 = vec[0];
    assign o1 = vec[1];
    assign o2 = vec[2];
endmodule
```

### Vectors in more detail

`vector`的声明方法：`type [upper:lower] vector_name;`，其中`type`是这一组内容的类型，常见的有`reg`和`wire`。如果要作为输入或输出，就在类型前面加`input`或者`output`。多种类型的`vector`声明方法如下：

```verilog
wire [7:0] w;         // 8-bit wire
reg  [4:1] x;         // 4-bit reg
output reg [0:0] y;   // 1-bit reg that is also an output port (this is still a vector)
input wire [3:-2] z;  // 6-bit wire input (negative ranges are allowed)
output [3:0] a;       // 4-bit output wire. Type is 'wire' unless specified otherwise.
wire [0:7] b;         // 8-bit wire where b[0] is the most-significant bit.
```

对于大端和小端没有特别的要求，但是在声明和使用的时候必须保持一致。如在声明的时候写的是`wire [3:0] vec;`，在使用的时候就不可以写`vec[0:3]`。

使用`default_nettype none`来杜绝impllicit nets。

`packed array`和`unpacked array`的声明方法如下：

```verilog
reg [7:0] mem [255:0];   // 256 unpacked elements, each of which is a 8-bit packed vector of reg.
reg mem2 [28:0];         // 29 unpacked elements, each of which is a 1-bit reg.
```

在`vector`名前面的部分是`packed array`的大小，也就是8个`reg`一组。后面的部分是`unpacked array`，也就是说这样的`packedd array`有256个。

之前我们使用`assign w = a;`这样的语句来进行赋值，这样的赋值是整体赋值，如果左边和右边的位数不相等，则会进行切割和0填充。但是我们也可以选择部分的位来进行赋值，位赋值方法如下：

```verilog
w[3:0]      // Only the lower 4 bits of w
x[1]        // The lowest bit of x
x[1:1]      // ...also the lowest bit of x
z[-1:-2]    // Two lowest bits of z
b[3:0]      // Illegal. Vector part-select must match the direction of the declaration.
b[0:3]      // The *upper* 4 bits of b.
assign w[3:0] = b[0:3];    // Assign upper 4 bits of b to lower 4 bits of w. w[3]=b[0], w[2]=b[1], etc.
```

题目要求我们把一个16位的输入分割为上8位和下8位分别输出，代码如下：

```verilog
`default_nettype none     // Disable implicit nets. Reduces some types of bugs.
module top_module( 
    input wire [15:0] in,
    output wire [7:0] out_hi,
    output wire [7:0] out_lo );
    assign out_hi = in[15:8];
    assign out_lo = in[7:0];
endmodule
```

### Vectors in part select

把32位的4个字节逆转。代码如下：

```verilog
module top_module( 
    input [31:0] in,
    output [31:0] out );//

    // assign out[31:24] = ...;
    assign out[31:24] = in[7:0];
    assign out[23:16] = in[15:8];
    assign out[15:8] = in[23:16];
    assign out[7:0] = in[31:24];
endmodule
```

### Bitwise operators

输入为2个3位的`vector`，题目要求输出它们的位或，逻辑或，以及6个位的取反。其中`b`的取反在高3位，`a`的取反在低3位。代码如下：

```verilog
module top_module( 
    input [2:0] a,
    input [2:0] b,
    output [2:0] out_or_bitwise,
    output out_or_logical,
    output [5:0] out_not
);
	assign out_or_bitwise = a | b;
    assign out_or_logical = a || b;
    assign out_not[5:3] = ~b;
    assign out_not[2:0] = ~a;
endmodule
```

### Four-input gates

有一个4位的输入，需要输出这四位的与、或和异或。可以参考：[Reduction - HDLBits](https://hdlbits.01xz.net/wiki/Reduction)，这里面写道使用`&a[3:0]`来简化每一位相与，算是语法糖。

代码如下：

```verilog
module top_module( 
    input [3:0] in,
    output out_and,
    output out_or,
    output out_xor
);
    assign out_and = &in[3:0];
    assign out_or = |in[3:0];
    assign out_xor = ^in[3:0];
endmodule
```

同理我们可以完成 [Gates100 - HDLBits](https://hdlbits.01xz.net/wiki/Gates100)，代码如下：

```verilog
module top_module( 
    input [99:0] in,
    output out_and,
    output out_or,
    output out_xor 
);
    assign out_and = &in[99:0];
    assign out_or = |in[99:0];
    assign out_xor = ^in[99:0];
endmodule
```

此外，我们还可以完成[Reduction - HDLBits](https://hdlbits.01xz.net/wiki/Reduction)，代码如下：

```verilog
module top_module (
    input [7:0] in,
    output parity); 
    assign parity = ^in[7:0];
endmodule
```

### Vector concatenation operator

可以进行多个位的拼接：

```verilog
{3'b111, 3'b000} => 6'b111000
{1'b1, 1'b0, 3'b101} => 5'b10101
{4'ha, 4'd10} => 8'b10101010     // 4'ha and 4'd10 are both 4'b1010 in binary
```

在`Verilog`中，允许在`assign`语句的左边和右边使用拼接，示例如下：

```verilog
input [15:0] in;
output [23:0] out;
assign {out[7:0], out[15:8]} = in;         // Swap two bytes. Right side and left side are both 16-bit vectors.
assign out[15:0] = {in[7:0], in[15:8]};    // This is the same thing.
assign out = {in[7:0], in[15:8]};       // This is different. The 16-bit vector on the right is extended to
                                        // match the 24-bit vector on the left, so out[23:16] are zero.
                                        // In the first two examples, out[23:16] are not assigned.
```

本题解答如下：

```verilog
module top_module (
    input [4:0] a, b, c, d, e, f,
    output [7:0] w, x, y, z );//

    // assign { ... } = { ... };
    assign z = {e[0],f'b11};
    assign y = {d[3:0],e[4:1]};
    assign x = {b[1:0],c,d[4]};
    assign w = {a,b[4:2]};
endmodule
```

### Vector reversal 1

要求反转一个8位的数字，`verilog`不允许直接`assign out[7:0] = in[0:7];`，代码如下：

```verilog
module top_module( 
    input [7:0] in,
    output [7:0] out
);
    assign out = {in[0],in[1],in[2],in[3],in[4],in[5],in[6],in[7]};
endmodule
```

### Replication operator

多次重复一个位的写法：`{num{vector}}`，多用于符号位扩展，代码如下：

```verilog
module top_module (
    input [7:0] in,
    output [31:0] out );//

    // assign out = { replicate-sign-bit , the-input };
    assign out = {{24{in[7]}},in};
endmodule
```

### More replication

有5个一位输入`a b c d e`，构造两个`vector`，分别是`{{5{a}},{5{b}},{5{c}},{5{d}},{5{e}}}`和`{{5{a,b,c,d,e}}}`，输出它们的同或。代码如下：

```verilog
module top_module (
    input a, b, c, d, e,
    output [24:0] out );//

    // The output is XNOR of two vectors created by 
    // concatenating and replicating the five inputs.
    // assign out = ~{ ... } ^ { ... };
    wire[24:0] input_a = {{5{a}},{5{b}},{5{c}},{5{d}},{5{e}}};
    wire[24:0] input_b = {{5{a,b,c,d,e}}};
    assign out = ~(input_a ^ input_b);
endmodule
```

### Vector 总结

本节我们主要学到了：

1. `vector`的声明；
2. 通过`vector`的位选择来进行赋值；
3. 位取反等位操作；
4. 使用`&a[7:0]`来进行整个`vector`的位的与/或/非/异或等操作；
5. 使用位拼接，由小的位构造大的位；
6. 使用`{num{vector}}`格式重复多个`vector`

## Modules: Hierarchy

### Modules

`Verilog`允许嵌套多个模块，你可以通过端口名或者端口位置来将顶层模块和内嵌模块中的端口连接起来。联系的方式有两种：

```verilog
// 注意in2 in2 out是mod_a的端口，wa wb wc是上一层模块的端口
mod_a instance1 ( wa, wb, wc ); // by position
mod_a instance2 ( .out(wc), .in1(wa), .in2(wb) ); // by name
```

本题解答：

```verilog
module top_module ( input a, input b, output out );
    mod_a instance1(.in1(a),.in2(b),.out(out));
endmodule
```

### Connecting ports by position

实现`mod_a`和顶层模块的端口连接，要求`connect by postion`，代码如下：

```verilog
module top_module ( 
    input a, 
    input b, 
    input c,
    input d,
    output out1,
    output out2
);
    mod_a instance2(out1,out2,a,b,c,d);
endmodule
```

### Connecting modules by name

要求同上，但是这次`connect by name`，代码如下：

```verilog
module top_module ( 
    input a, 
    input b, 
    input c,
    input d,
    output out1,
    output out2
);
    mod_a instance2(.out1(out1),.out2(out2),.in1(a),.in2(b),.in3(c),.in4(d));
endmodule
```

### Three modules

将顶层模块与3个D触发器的端口连接在一起：

```verilog
module top_module ( input clk, input d, output q );
    wire q2;
    wire q1;
    my_dff dff1(clk,d,q1);
    my_dff dff2(clk,q1,q2);
    my_dff dff3(clk,q2,q);
endmodule
```

### Modules and Vectors

```verilog
module top_module ( 
    input clk, 
    input [7:0] d, 
    input [1:0] sel, 
    output [7:0] q 
);
    wire[7:0] q1;
    wire[7:0] q2;
    wire[7:0] q3;
    my_dff8 dff1(clk,d,q1);
    my_dff8 dff2(clk,q1,q2);
    my_dff8 dff3(clk,q2,q3);
    always @(*)
        case(sel)
            2'b00:
                q <= d;
            2'b01:
                q <= q1;
            2'b10:
                q <= q2;
            2'b11:
				q <= q3;
        endcase
endmodule
```

### Module add

用2个16位加法器实现32位加法器：

```verilog
module top_module(
    input [31:0] a,
    input [31:0] b,
    output [31:0] sum
);
    wire cin;
    wire cout;
    add16 adder1(a[15:0],b[15:0],sum[15:0],cin);
    add16 adder2(a[31:16],b[31:16],cin,sum[31:16],cout);
endmodule
```

### Module fadd

实现1位全加器和32位加法器（2个16位加法器级联，已经实现），一位全加器的逻辑表达式如下：

- sum = a ^ b ^ cin
- cout = a&b | a&cin | b&cin

代码如下：

```verilog
module top_module (
    input [31:0] a,
    input [31:0] b,
    output [31:0] sum
);//
    wire cin;
    wire cout;
    add16 adder1(a[15:0],b[15:0],sum[15:0],cin);
    add16 adder2(a[31:16],b[31:16],cin,sum[31:16],cout);
endmodule

module add1 ( input a, input b, input cin,   output sum, output cout );

// Full adder module here
	assign cout = a & b | a & cin | b & cin;
    assign sum = a ^ b ^ cin;
endmodule
```

### Carry-select adder

前面的加法器，需要等到低16位计算完成，得出carry后才能计算高16位，效率太低了。现在开发新的加法器，先把高16位有carry和没carry的情况都计算出来，然后根据低16位是否有carry，选择一个输出。代码如下：

```verilog
module top_module(
    input [31:0] a,
    input [31:0] b,
    output [31:0] sum
);
    wire cin;
    wire cout1;
    wire cout2;
    wire[15:0] out1;
    wire[15:0] out2;
    add16 adder1(a[15:0],b[15:0],sum[15:0],cin);
    
    add16 adder2(a[31:16],b[31:16],out1,cout1);
    add16 adder3(a[31:16],b[31:16],out2,cout2);
    always @(*)
        case(cin)
            1'b0: sum[31:16] <= out1;
            1'b1: sum[31:16] <= out2;
        endcase
endmodule
```

### Adder-subtractor

对加法器进行变种，实现减法器。代码如下：

```verilog
module top_module(
    input [31:0] a,
    input [31:0] b,
    input sub,
    output [31:0] sum
);
    wire [31:0] b_in;
    wire cout;
    wire cout2;
    assign b_in = b ^ {32{sub}};
    add16 adder1(a[15:0],b_in[15:0],sub,sum[15:0],cout);
    add16 adder2(a[31:16],b_in[31:16],cout,sum[31:16],cout2);
endmodule
```

### Module 总结

- module的声明
- module的连接：connect by name和connect by position
- vector和module的结合使用
- always和case语句的使用
- 半加器，全加器，高校加法器，减法器的实现

## Procedures

### always blocks (combinational)

### always blocks (clocked)

### if statement

### if statement latches

### case statement

### priority encoder

### priority encoder with casez

### avoiding latches

## More Verilog Features
