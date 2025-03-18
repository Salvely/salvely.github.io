# P1601 A+B Problem（高精）


## 题目描述

高精度加法，相当于 a+b problem，**不用考虑负数**。

## 输入格式

分两行输入。a,b≤10500。

## 输出格式

输出只有一行，代表 a+b 的值。

## 输入输出样例

**输入 #1**

```
1
1
```

**输出 #1**

```
2
```

**输入 #2**

```
1001
9099
```

**输出 #2**

```
10100
```

## 说明/提示

20% 的测试数据，$0≤a,b≤10^{9}$；

40% 的测试数据，$0≤a,b≤10^{18}$。

## 思路

1. 将两个长数字作为字符串读取，转化为数字后存在数组里
2. 使用`i`和`j`记录两个字符串的长度，分3种情况讨论
3. 将结果存在一个大数组里，用`s_index`追踪最后一位
4. 用变量`carry`保存每次的进位
5. 分3种情况讨论，从两个数对齐的最后一位开始向前计算。如果某个数字比另一个数字大，则用`carry`加上那个数字的最后一位，然后依次计算到最高位，总体算法和前面相同。
6. 最后从最高位（`s_index`所在位开始向前输出），忽略掉前导0。如果结果本身就是0，`s_index`最后将等于-1，这样可以直接输出0。否则就从高位到低位依次输出。

## Debug记录

1. `sum`数组一开始没有设0，下次每次在使用新的数组之前，一定要把数组置0，否则可能会影响后续的读取；
2. 无论各位的和是否大于等于10，其`carry`都等于`s / 10`，这个是一定要计算的，否则可能出现上一次`carry = 1`，这次`carry = 0`，但是`carry`忘记了重新计算，导致把1加到了这一位；
3. 最高位可能有进位，无论是否有，都要把该为设置为`carry`。如果`carry = 0`，这个前导0会在后面打印时候忽略。这是一种统一处理的办法。
4. 注意两个数都是0的情况，结果等于0，如果忽略这个0，就什么也打不出来。判断结果是否为0的条件是判断`s_index`是否递减到-1。
5. 记得从高位往低位输出，顺序不要弄反了。

## C++实现

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
int a1[500],a2[500];
int main(void)
{
//	freopen("4.in","r",stdin);
//	freopen("4.out","w",stdout);
	string s1,s2;
	cin >> s1 >> s2;
	int i = 0;
	for(char ch:s1) {
		a1[i] = ch - '0';
		i++;
	}	
	int j = 0;
	for(char ch:s2) {
		a2[j] = ch - '0';
		j++;
	}	
	int sum[1000];
	for(int i = 0; i < 1000; i++) 
		sum[i] = 0;
	int s_index = 0;
	int carry = 0;
	if(i == j) {
		for(int k = j-1; k >= 0; k--) {
			int s = carry + a1[k] + a2[k];
			carry = s / 10;
			s = s % 10;		
			sum[s_index] = s;
			s_index ++;	
		}
		sum[s_index] = carry;
	}
	else if(i < j) {
		for(int k = 1; k <= i; k++) {
			int a1_index = i - k;
			int a2_index = j - k;
			int s = carry + a1[a1_index] + a2[a2_index];
			carry = s / 10;
			s = s % 10;
			sum[s_index] = s;
			s_index ++;
		}	
		for(int k = j-i-1; k >= 0; k--) {
			int s = carry + a2[k];
			carry = s / 10;
			s = s % 10;
			sum[s_index] = s;
			s_index ++;
		}
		sum[s_index] = carry;
	}
	else {
		for(int k = 1; k <= j; k++) {
			int a1_index = i - k;
			int a2_index = j - k;
			int s = carry + a1[a1_index] + a2[a2_index];
			carry = s / 10;
			s = s % 10;
			sum[s_index] = s;
			s_index ++;
		}	
		for(int k = i - j1; k >= 0; k--) {
			int s = carry + a1[k];
			carry = s / 10;
			s = s % 10;
			sum[s_index] = s;
			s_index ++;
		}
		sum[s_index] = carry;
	}
	while(sum[s_index] == 0) { s_index --;}
	if(s_index < 0) {
		cout << 0 << endl;
		return 0;
	}
	for(int i = s_index; i >= 0; i--) {
		cout << sum[i];
	}
	cout << endl;
	return 0;
}
```

