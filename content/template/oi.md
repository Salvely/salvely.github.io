---
authors:
  - Salvely
title: P2415：集合求和
tags:
  - 递归
categories:
  - 算法
series:
  - 算法题解
seriesNavigation: true
enableLastMod: true
enableWordCount: true
enableReadingTime: true
toc:
  enable: true
  auto: false
code:
  maxShownlines: 100
date: 2025-03-17T19:31:52+08:00
lastmod: 2025-06-30T11:23:37+08:00
draft: true
---

## 题目描述

给定一个集合 $s$（集合元素数量 ≤30），求出此集合所有子集元素之和。

## 输入格式

集合中的元素（元素 ≤1000）

## 输出格式

$s$ 所有子集元素之和。

## 输入输出样例

**输入**

```
2 3
```

**输出**

```
10
```

## 说明/提示

**【样例解释】**

```
子集为：∅,{2},{3},{2,3}，和为 2+3+2+3=10。
```

**【数据范围】**

对于 100% 的数据，$1 \le \vert s∣\le 30$，$1≤s_{i}​≤1000$，s 所有子集元素之和 ≤$10^{18}$。

## 最开始的思路

我一开始想到的是，使用递归实现。以前在做幂集相关题目的时候，首要的方法是考虑这个元素在集合内，或者不在集合内，进行两种递归，然后返回最终的幂集。但是问题是，当时我们返回的是一个子集的集合，然而现在我们需要返回所有子集中的元素的和。我们当然可以分2种情况，但是我们并不知道在没有加入当前元素时，集合中有多少子集，因此也就无法对每个子集分加入该元素和不加该元素进行讨论。如果要这么做的话，我们需要一个变长的多维度的数组，而且在这种前提下还只能求出幂集。对于幂集内的所有元素求和，还需要进一步的对多维数组进行操作。如果使用C++的话，这样显然是过于繁杂了。虽然说使用Python的话，我们可以很容易的构造这样的多层`list`，然后用`for in`语句进行递归。但是现在使用的是C++，所以用多维数组先求幂集再求和这条路，行不通。在满腹疑惑之下，我看了题解，恍然大悟。

## 题解的算法

首先我们考虑子集的构造过程。每个元素在或不在这个子集中，我们有$n$个元素，因此有$2^n$个子集。那么每个元素会出现在一半数目的子集中（因为出现和不出现的概率是均等的），因此对于每个元素，它会出现在$2^{n-1}$个子集当中。

若输入元素为$a_{i}$，那么$a_{i}$出现在$2^{n-1}$个子集当中。而现在有$n$个元素，它们每个都出现在$2^{n-1}$个子集中，因此子集的元素之和就等于所有元素之和乘上$2^{n-1}$。妙哉！

## C++语言初步实现

有了思路，我们现在开始使用`C++`实现这个算法。实现如下：

```cpp
#include <iostream>
#include <sstream>
#include <cmath>
using namespace std;
int main(void)
{
	int a[30];
	for(int i = 0; i < 30; i++) {
		a[i] = 0;
	}
	string line;
	getline(cin,line);
	istringstream is(line);
	
	string num;
	int count = 0;
	int sum = 0;
	while(is >> num) {
		a[count] = stoi(num);
		sum += a[count];
		count++;
	}
	cout << sum * pow(2,count-1) << endl;

	return 0;
}
```

可是测试出来是2个`WA`和3个`AC`，欸，为什么？

## 警惕！

我们发现两个可疑点：

1. 我们使用`int`类型来存储`sum`，范围会不会超？
2. `sum * pow(2,count-1)`直接打出来的是科学输入法的值，而我们需要一个确切的整数值。

因此可以做如下修改：

1. 将`int`类型修改为`long long`
2. 添加`sum *= pow(2,count-1)`，然后再使用`cout`打印`sum`

## 正确实现

```cpp
#include <iostream>
#include <sstream>
#include <cmath>
using namespace std;
int main(void)
{
	int a[30];
	for(int i = 0; i < 30; i++) {
		a[i] = 0;
	}
	string line;
	getline(cin,line);
	istringstream is(line);
	
	string num;
	int count = 0;
	long long sum = 0;
	while(is >> num) {
		a[count] = stoi(num);
		sum += a[count];
		count++;
	}
	sum *= pow(2,count-1);
	cout << sum << endl;

	return 0;
}
```

成功！

## 总结

该题提醒我们：

- 在递归时要想清楚这个递归到底返回的是什么东西，递归的格式和`base case`要搞清楚
- 存储大数要使用`long long`
- `cout`如果直接输出大数，会打出科学输入法的值，因此要先用变量存储，再打印出来就可以啦！
