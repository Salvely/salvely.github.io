---
date: 2024-05-23
title: Prolog解释器实现记录（一）
shortTitle: Prolog解释器实现记录（一）
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
date updated: 2024-05-23 15:45
---

## 前言

> Get your hands dirty！

为什么想实现一个`Prolog`解释器呢？因为我最近在学离散数学，而离散数学里面涉及到非常多的数据结构和布尔代数、命题、谓词逻辑、证明等。我觉得如果用计算机实现命题的自动推导会很有趣，而`Prolog`又是一种提供了相关功能的语言。我是个闲不住的人，而且喜欢造轮子。如果只是在学习数学、而不动手写点代码的话，我会觉得非常无聊。这是我的一个小作品，我的软件工程和数据结构能力尚不那么成熟，可能会造出一坨屎，但是我愿意去尝试。该解释器采用循序渐进实现`Prolog`语法的形式，便于读者学习。

本项目的实现源码位于[Github Tiny-Prolog项目](https://github.com/Salvely/Tiny-Prolog)。此外，Rosen《离散数学及其应用》的相关笔记会整理在[Rosen 《离散数学及其应用》 阅读笔记](../Rosen%20《离散数学及其应用》%20阅读笔记.md)，有兴趣的同学可以参考。离散数学的学习过程和Prolog解释器的实现过程会同步进行。

## REPL实现

首先，我们实现基本的REPL，即通过一个`while(1)`循环不停的读入`prolog`命令，该解释器使用`ctrl-c`退出。因为`python`将`ctrl-c`识别为`KeyboardInterrupt`，所以我们可以使用一个`try except`语句来探测该字符，并且退出程序。

循环如下：

```python
import sys

while 1:
    try:
        command = input("?- ")
        # TODO: do the interpretations below
    except KeyboardInterrupt:
        sys.exit(0)
```

## Prolog 语言标准

Prolog语言 ISO 标准见此下载：

- [Prolog标准-1](/-%20ISO%20Prolog%20standard,%20part%201_%20General%20core,%20ISO-IEC-13211-1%20(1995).pdf)
- [Prolog标准-2](/-%20ISO%20Prolog%20standard,%20part%202_%20Modules,%20ISO-IEC-13211-2%20(2000).pdf)
