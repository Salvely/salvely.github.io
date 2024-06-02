---
date: 2024-05-13
title: 小型推理引擎语言tie使用方法 & 语法定义
shortTitle: 小型推理引擎语言tie使用方法 & 语法定义
author: Salvely
isOriginal: true
article: true
timeline: true
pageview: true
headerDepth: 1
comment: true
prev: true
next: true
footer: true
copyright: Salvely
toc: true
date updated: 2024-05-13 11:00
tags:
  - all
---

## 使用方法

- 输入`python main.py`进入默认的交互模式
- 输入`python main.py -f [filename.tie]`，可对`tie`程序进行解释，并输出到控制台
- 如果输入为文件，可使用`-o [output_filename]`，将程序输出重定向到`output_filename`文件

## 注释

使用`/*`表示注释的开始，使用`*/`表示注释的结束。

## 英语转化为命题

- [ ] 判断是否为命题
	- [ ] 是否为陈述句
	- [ ] 是否能判断真假
- [ ] 转化为命题变量逻辑语言

## 命题

### 命题变量标识符

支持字母、数字、下划线，不可以数字开头。

### 命题变量的值类型

命题变量有3种值类型：

- `T`：即`True`
- `F`：即`False`
- `undefined`：在命题变量定义了但是还没有赋值的时候

### 命题变量定义

使用`define pro [variable_name] [= T/F]`来定义一个命题变量，如果不明确赋值，则其为`undefined`。如下：

```
define pro p /* propositional variable p, p = undefined */
define pro q = T /* propositional variable q */
```

### 命题变量赋值

可以使用`[variable_name] = T/F`赋值。命题变量在使用前必须对其进行赋值，否则会输出`undefined`，因为命题变量必须有真假。

### 命题操作符

命题操作符有3个，分别`and`、`or`、`not`、`xor`。`not`是单目运算符，其他三个是二元运算符。运算符可以接受`T/F`常数或者命题变量，作为操作数。如果命题变量还未赋值，也就是`undefined`，运算结果为`undefined`。

- $\neg{p}$表示`not p`，用英文表示是`It's not the case that p`
- $\land$ 表示`p and q`，用英文表示是`p, and q`
- $\lor$ 表示 `p or q`，用英文表示是`p, or q`（`inclusive or`）
- $\oplus$ 表示 `p xor q`，用英文表示是 `p, or q, but not both`（`exclusive or`）
