---
authors:
  - Salvely
title: 二进制加法图灵机的C语言实现
tags:
  - 图灵机
categories:
  - 计算理论
seriesNavigation: true
enableLastMod: true
enableWordCount: true
enableReadingTime: true
toc:
  enable: true
  auto: false
code:
  maxShownlines: 100
date: 2025-01-12T09:01:11+08:00
lastmod: 2025-01-12T09:19:24+08:00
---

<!--more-->

## 图灵机设计

对二进制加法过程进行分析，我们可以得出如下过程：

1. 使用小端法在纸带上存储输入的二进制串，即低位放在最左边
2. 第一格是`blank`，也就是空，最后我们会回退到这个状态，来进入`halt`状态
3. 最初是`start`状态，经过`blank`后改为`carry`状态
4. `carry`状态下，如果最低为是 0，那么直接将其加 1，然后返回（向左行走）即可，进入`back`状态
5. `carry`状态下，如果最低为是 1，将其改为 0，保持`carry`状态向右行走，继续对高位进行修改
6. 如果在`carry`状态下遇到`blank`，也就是最高位还有进位，那么将`blank`改为 1
7. 在回退状态下，一般来说只会遇到`0`，保留 0 不动，继续回退
8. 达到`halt`之后停止操作，打印字符串

那么，在该图灵机中，我们需要使用到如下几个状态：

1. `start`，即开始状态
2. `carry`，进位状态
3. `back`，回退状态
4. `halt`，停止状态

有如下几种符号：

1. `blank`，表示空
2. `0`，即二进制符号 0
3. `1`，即二进制符号 1

根据设计，图灵机定义二进制加法的计算过程如下：

1. start, blank->blank, RIGHT, carry
2. carry, 1 -> 0, RIGHT, carry
3. carry, blank->1, LEFT, back
4. carry, 0->1, LEFT, back
5. back, 0->0, LEFT, back
6. back, blank->blank, halt

## C 语言代码实现

```c
// Turing machines for computations.
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define N 4 // the number of states
#define M 3 // the number of symbols
#define TAPE_SIZE 20 // the size of the tape
enum direction { LEFT, RIGHT, STAY };

/**
 * @brief encoding for binary addtion
 * 1. 4 states start:0 carry:1 back:2 halt:3
 * 2. 3 symbols 0->0 1->1 blank->2
 */
enum STATE { START, CARRY, BACK, HALT };
enum SYMBOL { SYMBOL_0, SYMBOL_1, BLANK };

int state_arr
    [N]; // state_arr[0] as start state, state_arr[N-2] as accept state, state_arr[N-1] as reject state

int symbol_arr[M]; // symbol_arr[0] as empty symbol

int tape[TAPE_SIZE];

typedef struct head {
    int location; // the location of the head
    int state_num; // the state of the head
} head_t;

typedef struct action {
    int head_state;
    int current_symbol;
    int next_symbol;
    enum direction dir;
    int next_state;
} action_t;

/**
 * @brief turing machine for binary addition
 * 1. start, blank->blank, RIGHT, carry
 * 2. carry, 1 -> 0, RIGHT, carry
 * 3. carry, blank->1, LEFT, back
 * 4. carry, 0->1, LEFT, back
 * 5. back, 0->0, LEFT, back
 * 6. back, blank->blank, halt
 */

action_t turing_machine(action_t act) {
    if (act.head_state == state_arr[START] && act.current_symbol == symbol_arr[BLANK]) {
        act.next_symbol = act.current_symbol;
        act.dir = RIGHT;
        act.next_state = state_arr[CARRY];
    } else if (act.head_state == state_arr[CARRY] && act.current_symbol == symbol_arr[SYMBOL_1]) {
        act.next_symbol = symbol_arr[SYMBOL_0];
        act.dir = RIGHT;
        act.next_state = act.head_state;
    } else if (act.head_state == state_arr[CARRY] && act.current_symbol == symbol_arr[BLANK]) {
        act.next_symbol = symbol_arr[SYMBOL_1];
        act.dir = LEFT;
        act.next_state = state_arr[BACK];
    } else if (act.head_state == state_arr[CARRY] && act.current_symbol == symbol_arr[SYMBOL_0]) {
        act.next_symbol = symbol_arr[SYMBOL_1];
        act.dir = LEFT;
        act.next_state = state_arr[BACK];
    } else if (act.head_state == state_arr[BACK] && act.current_symbol == symbol_arr[SYMBOL_0]) {
        act.next_symbol = act.current_symbol;
        act.dir = LEFT;
        act.next_state = state_arr[BACK];
    } else if (act.head_state == state_arr[BACK] && act.current_symbol == symbol_arr[BLANK]) {
        act.next_symbol = act.current_symbol;
        act.dir = STAY;
        act.next_state = state_arr[HALT];
    }
    return act;
}

void state_transition(char* s, int length) {
    // initiliaze the state array and symbol array
    for (int i = 0; i < N; i++) {
        state_arr[i] = i;
    }
    for (int i = 0; i < M; i++) {
        symbol_arr[i] = i;
    }
    // initialize the tape
    for (int i = 0; i < TAPE_SIZE; i++) {
        tape[i] = BLANK; // initialize all tape as blank
    }
    for (int i = 0; i < length; i++) {
        tape[i + 1] = s[i] - '0';
    }
    // initialize the head
    head_t h;
    h.location = 0;
    h.state_num = state_arr[START];
    // initialie the action
    action_t a;
    a.dir = STAY;
    // define the state transition
    while (h.state_num != 3) {
        a.head_state = h.state_num;
        a.current_symbol = tape[h.location];
        a = turing_machine(a);
        tape[h.location] = a.next_symbol;
        // update the head
        if (a.dir == RIGHT) {
            h.location += 1;
        } else if (a.dir == LEFT) {
            h.location -= 1;
        }
        h.state_num = a.next_state;
    }
    // print the added string
    for (int i = length; i >= 1; i--) {
        printf("%d", tape[i]);
    }
}

int main(void) {
    printf("Input the binary string: ");
    char* s = (char*)malloc(10 * sizeof(char));
    scanf("%s", s);
    // reverse the string, and enter it into turing machine
    int length = strlen(s);
    for (int i = 0; i < length / 2; i++) {
        char temp = s[length - 1 - i];
        s[length - 1 - i] = s[i];
        s[i] = temp;
    }
    state_transition(s, strlen(s));
    return 0;
}
```
