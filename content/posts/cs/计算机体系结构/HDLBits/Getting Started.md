---
authors:
  - Salvely
title: Getting Started
tags:
  - Verilog
categories:
  - 计算机体系结构
seriesNavigation: true
enableLastMod: true
enableWordCount: true
enableReadingTime: true
toc:
  enable: true
  auto: false
code:
  maxShownlines: 100
series:
  - HDLBits
date: 2025-04-07T18:15:25+08:00
lastmod: 2025-04-07T18:30:33+08:00
---

<!--more-->

## Getting Started

让输出端口输出1，代码如下：

```verilog
module top_module( output one );

// Insert your code here
    assign one = 1;

endmodule
```

## Zero

让输出端口输出0，代码如下：

```verilog
module top_module(
    output zero
);// Module body starts after semicolon
    assign zero = 0;
    
endmodule
```

## 总结

Getting Started 部分就是个入门，两道题比较简单，总结来说Verilog有如下语法：

```verilog
module top_module(
    output zero
);// Module body starts after semicolon
    assign zero = 0;
    
endmodule
```

使用`module top_module(output zero);`来声明模块，使用`assign`语句赋值，然后使用`endmodule`结束模块。
