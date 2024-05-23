---
date: 2024-05-13
title: Rosen 《离散数学及其应用》 阅读笔记
shortTitle: Rosen 《离散数学及其应用》 阅读笔记
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
date updated: 2024-05-13 19:28
---

## 相关资源

1. 课本pdf可点击这里阅读：[Discrete mathematics and its applications](Rosen,%20Kenneth%20H%20-%20Discrete%20mathematics%20and%20its%20applications-McGraw-Hill%20(2019).pdf)
2. 课后习题答案见此：[Solutions](Jerrold%20W.%20Grossman,%20Daniel%20R.%20Jordan%20-%20Instructor’s%20Resource%20Guide%20to%20accompany%20Kenneth%20H.%20Rosen%20Discrete%20Mathematics%20and%20Its%20Applications%208th%20Edition%20(2019).pdf)

## 笔记完成进度

- [ ] **Chapter 1：逻辑与证明 -> 小型推理引擎实现**
- [ ] **Chapter 2：包括集合、函数、序列、求和、矩阵 -> 实现数据结构**
- [ ] Chapter 3：算法 -> 实现算法
- [ ] Chapter 4：求模、数制表示、求质数、最大公约数、敛散性、密码学 -> 实现数值计算库，以及一些密码学算法
- [ ] Chapter 5：数学归纳法、递归算法、校验码 -> 实现一些算法
- [ ] Chapter 6：计数原理、信鸽问题、置换和组合学、二项式定理、通用的置换和组合、生成置换和组合 -> 实现一些算法
- [ ] Chapter 7：离散概率论、贝叶斯定理、期望和方差 -> 实现概率论函数
- [ ] Chapter 8：一些高级算法 -> 实现一些算法
- [ ] **Chapter 9：关系代数 -> 实现关系代数**
- [ ] Chapter 10：图论 -> **实现图**
- [ ] Chapter 11：树 -> **实现树**
- [ ] **Chapter 12：布尔代数 -> 实现布尔代数**
- [ ] **Chapter 13：编译原理 -> 实现prolog解释器**

## Chapter 1：The Foundations: Logic and Proofs

### 命题逻辑（Propositional Logic）

#### 介绍

- 逻辑对数学的意义
	- 逻辑规则给予数学语句精确的含义
	- 这些规则帮助判断一条数学语句是否有效
- 逻辑对计算机科学的意义
	- 电路设计
	- 计算机程序设计
	- 程序正确性的验证
	- 自动生成各类型证明的程序

#### 命题

- 命题是逻辑的基础单元
- 判断一个语句是否为命题，有两个条件
	- 是个陈述句
	- 要么为真，要么为假，必须能判断
- 我们可以使用一些字符来表示命题变量（`propositional variable`），例如`p,q,r,s`
- 命题的结果可以用`T`或`F`表示
- 命题可以通过一些逻辑操作符组合起来，称之为复合命题
	- $\neg{p}$表示`not p`，用英文表示是`It's not the case that p`
	- $\land$ 表示`p and q`，用英文表示是`p, and q`
	- $\lor$ 表示 `p or q`，用英文表示是`p, or q`（`inclusive or`）
	- $\oplus$ 表示 `p xor q`，用英文表示是 `p, or q, but not both`（`exclusive or`）

#### 条件陈述句

现有命题变量`p`和`q`，条件陈述句$p\rightarrow q$用英文表达为`if p, then q`。其中，`p`称为`hypothesis`（或`antecedent`或`premise`），`q`称之为`conclusion`（或`consequence`）。该条件陈述句的值有如下几种情况：

- 如果`p`是`T`，但是`q`是`F`，$p\rightarrow q$为`F`
- 其他情况下为真

> 文中对条件陈述句作了如下的解释：The statement $p\rightarrow q$ is called a conditional statement because $p\rightarrow q$ **asserts that q is true on the condition that p holds.** 你可以理解这么一个场景，`p`指的是一个父亲是否承诺带他儿子去植物园，`q`指的是最后是否成功去了植物园。有如下几个场景：
>
> - 父亲承诺带他儿子去植物园（`p = T`），而且最后去成了（`q = T`），那么父亲就信守了承诺，结果为`T`
> - 父亲没有承诺带儿子去植物园(`p = F`），不管最后去成了没有（`q = T/F`），父亲都不算违约，结果为`T`
> - 父亲承诺带他儿子去植物园（`p = T`），但是最后没去（`q = F`），那么父亲违约，结果为`F`
>
> 文中也提到了，你可以把条件陈述句是为判断一个承诺是否信守。

$p\rightarrow q$ 用英文表达可以有如下几种形式：

- `if p, then q`
- `p implies q`
- `if p,q`
- `q if p`
- `q whenever p`
- `q when p`
- `p is sufficent for q`
- `a sufficient conditon of q is p`

还有几种不太好理解的表达方式：

- `p only if q` ：可以这么理解，只有q为`T`的时候，p才可以为`T`，如果不遵守这项约定，那么结果就为`F`，其他时候为`T`
- `q is necessary for p`：理由同`p only if q`
- `a necessary condition for p is q`：理由同`p only if q`
- `q follows from p`：
- q unless $\neg p$* ：该句的意思是，除非`p`为`F`，否则`q`必须为`T`，如果不遵守这项约定，那么结果为就`F`，其他时候为`T`

#### 其他命题形式

- 反命题：$q\rightarrow p$，用英文表达是`if q, then p`
- 逆命题：$\neg p \rightarrow \neg q$（与反命题等价），用英文表达是`if not p, then not q`
- 逆反命题：$\neg q\rightarrow \neg p$（与原命题有相同的真值表，我们称这种情况两个命题等价），用英文表达是`if not q, then not p`
- 等值命题：$p \leftrightarrow q$ ，当两个逻辑变量的真值相同时为`T`，否则为`F`。用英文表达是`p is necessary and sufficient for q` / `if p then q, and conversely` / `p if and only if q`。$p \leftrightarrow q$ 即 $(p \rightarrow q)\land(q\rightarrow p)$

#### 复合命题的真值表

根据基本的规则，先对简单语句求值，再结合起来求值，一步步推导即可。

#### 逻辑符号的优先级

1. $\neg$
2. $\land$
3. $\lor$
4. $\rightarrow$
5. $\leftrightarrow$

#### 逻辑运算和位运算

可以构建数字串，其中每个字符都是0或1，可以对两个字符/字符串进行与、或、非、异或等逻辑操作。

#### 练习

1. 判断是否为命题
2. 求命题的否命题
3. 判断命题的真假
4. 求解复合命题的真值
5. 根据英语写出命题表达式
6. 根据命题表达式写出英语
7. 写出命题表达式的反命题，逆命题，逆反命题
8. 打印复合表达式的真值表
9. 对数字串进行逻辑操作

### 命题逻辑的应用

#### 介绍

逻辑可以让一个模糊的陈述变精确，其应用包括：

- 软硬件需求定义
- 电路设计
- 软件构造
- 软件正确性验证
- 构造专家系统
- 解谜题
- 自动构造证明

#### 翻译英语句子

1. 识别句子中的关键词（如`if then not or`等等）
2. 拆解出句子中的命题，将其赋给一个逻辑变量
3. 根据关键词，组合逻辑变量，构成复合命题

#### 系统需求说明

步骤同上，将英文的需求转化为复合命题表达式。

#### 利用布尔值查找

- `<xxx> AND <yyy>` 搜索包含xxx和yyy的词条
- `<xxx> OR <yyy>` 搜索包含xxx或yyy的词条
- `-<xxx>` 搜索不含xxx的词条

#### Logic Puzzle

> 数独，撒谎问题，狼羊菜，问题求解

- 将问题化简为复合命题
- 对命题变量带入不同的真值，求解最后的答案

#### 逻辑电路

- 实现逻辑电路的表达式
- 化简逻辑电路表达式
- 根据表达式画出逻辑电路

#### 练习

1. 英语转化为命题
2. 判断系统需求是否一致（多个需求之间没有冲突）
3. 搜索引擎查询方法
4. 撒谎问题判断
5. 逻辑推理谜题
6. 电路逻辑表达式求解
7. 由逻辑表达式绘制电路

### 等价命题（Propositional Equivalences）

#### 介绍

在逻辑证明过程中，非常重要的一个步骤就是利用和一个命题变量等价的命题变量去替换它。等价的概念前文有提到，即两个逻辑变量的真值相同。

在讲解等价命题之前我们需要了解三个概念：

- 永真式（`tautology`）：无论命题变量的值如何变化，复合命题的值总为真
- 永假式（`contradiction`）：类似，复合命题的值总为假
- 可满足式（`contingency`）：非以上两种情况

#### 逻辑等价式

在任何情况下真值都完全相同的两个复合命题，称为逻辑等价命题，也就是说$p \leftrightarrow q$是永真式。使用$p \equiv q$。

> 注意$p \equiv q$和$p \leftrightarrow q$的区别在于，这个符号不是逻辑连接符，这个句子也不是复合语句。**而是一个表达式，在告诉你$p \leftrightarrow q$是个永真式。其中p可能是个复合命题，q也可能是个复合命题**

#### 重要的逻辑等价定理

> 详情可见
>
> - 课本1.3节 Table 6 Logical Equivalences
> - Table 7 Logical Equivalences involving conditional statements
> - Table 8 Logical Equivalences involving biconditional statements

![](logical%20equivalences.png)

此外，一些重要的等价关系如下：
![](Logical%20equivalences%20involving%20other%20statements.png)

#### 德摩根定律

下面有2个重要的逻辑等价式，也就是我们的德摩根定律：

$$
\neg(p\land q) \equiv \neg p \lor \neg q
$$

$$
\neg(p\lor q) \equiv \neg p \land \neg q
$$

此外，德摩根定律可以扩展到多个命题变量的情况，而不只是两个。

#### 构造新的逻辑等价式

#### 布尔代数规范形式

> 包括最小项、最大项、对偶形式

#### 命题可满足性

#### 命题可满足性的应用

#### 求解可满足性问题

#### 练习

### 谓词和量词（Predicates and Quantifiers）

### 嵌套量词（Nested Quantifiers）

### 推理规则（Rules of Inference）

### 证明导论（Introduction to Proofs）

### 证明方法和策略（Proof Methods and Strategy）

> 本章阅读完成后，实现tie中基础的推理规则。

## Chapter 2：Basic Structures: Sets, Functions, Sequences, Sums, and Matrices

### 集合

> 本节学完后，实现集合的数据结构

### 集合的操作

> 本节学完后，扩展集合数据结构

### 函数

> 本节学完后，实现多个函数，并将其封装在algorithms模块中

### 序列及求和

> 实现序列数据结构，并实现其求和函数

### 集合的基数

### 矩阵

> 实现矩阵数据结构及其相关的算法

## Chapter 3：Algorithms

> 实现多种算法

## Chapter 4：Number Theory and Cryptography

> 实现多种密码学算法

## Chapter 5：Induction and Recursion

## Chapter 6：Counting

## Chapter 7：Discrete Probability

## Chapter 8：Advanced Counting Techniques

## Chapter 9：Relations

> 实现关系代数

### 关系及其性质

### n元关系及其应用

### 关系表示

### 关系闭包

### 等价关系

### 偏序

## Chapter 10：Graphs

> 实现图数据结构

## Chapter 11：Trees

> 实现树数据结构

## Chapter 12：Boolean Algebra

> 实现布尔代数

### 布尔函数

### 布尔函数的表示

### 逻辑门

### 电路的简化

## Chapter 13：Modeling Computation

> 实现Prolog解释器
