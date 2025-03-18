# 计算机科学之路


> 选择路线，踏上征程，承担后果

我的计算机学习之路。

学习路线：

1. 刷课
2. 课程源码研究+其他教材阅读
3. 自己造轮子
4. 学习好的开源项目，试着参与开源贡献，成为核心开发者
5. 复现顶会论文
6. 个人项目开发

目标：成为法布里斯贝拉，卡玛克，Jeff Dean 那样做出杰出贡献的计算机科学家。

## Pre

> [!TIP]
>
> `cmake`部分：使用`cmake-examples`仓库学习，完整的配置过程参考这里：[cmake 配置](https://jamhus-tao.github.io/posts/cpp-cmake-abc/)
>
> 数学基础学习部分：见 [math-Journey](https://github.com/Salvely/math-Journey)

- [x] CMake 基础使用学习
  - [x] cmake 基础学习
  - [x] `dllist` 简易实现
  - [x] cmake 子项目配置
  - [x] 代码静态检查
    - [x] `clang-tidy`
    - [x] `clang-format`
    - [x] `cpplint`
    - [x] `cppcheck`
    - [x] `valgrind`
    - [x] `LeakSanitizer`
  - [x] 单元测试
    - [x] `boost`
    - [x] `catch2`(这个现在不常用了，因此不一定要学)
    - [x] `googletest`
  - [x] 文档撰写
    - [x] `doxygen`学习
  - [x] `cpack`打包
  - [x] 安装
- [x] `boost`测试框架使用学习(使用`reverse`测试)
- [x] `googletest`测试框架使用学习(使用`reverse`测试)
- [x] `README.md` 模板学习, 试着写出一个好的`README.md`文档，完善项目中的`README.md`
- [x] [github actions 快速入门课程](https://www.github-zh.com/getting-started/hello-github-actions)学习
- [x] C++ 项目的 github actions 配置学习
- [x] C++ 简单项目模板实现
- [x] 优化我的 C++ 模板
- [x] 发布 C++ 模板
- [x] 熟悉一个成熟的 C++ 项目模板
- [x] `doctest` 学习
- [x] 为`dllist`项目添加`doctest`测试
- [x] 使用成熟的 C++ 模板来配置`dllist`项目并成功运行
- [x] 《DOOM 启世录》阅读
- [x] 博客文章模板配置
- [x] Rustlings 环境配置
- [ ] [数学基础知识学习](https://github.com/Salvely/math-Journey)完成
	- [ ] 微积分基础
	- [ ] 常微分方程基础
	- [ ] 线性代数基础
	- [ ] 概率论与数理统计基础
	- [ ] 离散与具体数学
		- [ ] 格里马尔迪《离散与组合数学》阅读
- [ ] Ubuntu 开发环境配置 & 学习
	- [ ] 《鸟叔的Linux私房菜》读完
	- [ ] vim 和 emacs 安装，把安装过程记录在博客上
	- [ ] vim 学习，用 vim 刷算法题，把刷题过程记录在博客上
	- [ ] emacs 学习，把学习笔记记录在博客上
	- [ ] emacs 插件学习（尤其是 org-mode），把学习过程记录在博客上
	- [ ] 其他环境配置完成，把配置过程记录在博客上
	- [ ] 《Vim实用技巧》读完
	- [ ] 学习Linux，以及如何为Linux操作系统开发软件工具
	- [ ] AI方向学习，学习如何利用AI，开发出AI工具
	- [ ] 为Vim开发ai帮助工具
- [ ] 《编码》读完
- [ ] 王爽《汇编语言》读完
- [ ] 《第一行代码》读完（安卓开发书籍）
- [ ] 《软件工程》读完
- [ ] 《Visual C++游戏编程基础》读完
- [x] 《Can't hurt me》阅读 ✅ 2025-01-17

## 刷课记录

> [!TIP]
> 本阶段完成所有的公开课程学习，熟练掌握数学算法+底层系统+图形编程+AI 编程+Web 前后端+软件开发+安全。

### 数据结构与算法分析

- [ ] 《深入浅出程序设计竞赛》阅读并完成所有习题
- [ ] 《**数据结构与算法分析——C++语言版**》阅读并完成所有习题
- [ ] 普林斯顿《**算法**》第四版阅读并完成所有习题
- [ ] 邓俊辉《**数据结构与算法**》
	- [ ] 阅读并完成所有课后习题
	- [ ] 用C++实现所有数据结构与算法
	- [ ] OJ刷完
- [ ] **数据结构课程刷完**
	- [ ] CS 61 B sp 18 课程学完
	  - [x] CS 61 B Lab 5 完成
	  - [x] CS 61 B Lab 6 完成
	  - [x] CS 61 B Project 2 需求学习，进行需求分析，制定设计方案
	  - [x] 随机迷宫算法学习并使用 Prim 算法实现一个随机迷宫，这个讲得好：[C++实现迷宫生成（基于算法：随机 prim)\_c++随机生成迷宫-CSDN 博客](https://blog.csdn.net/qq_38677814/article/details/79745659)
	  - [x] CS 61 B Project 2 Phase 1 完成
	  - [x] 在 Lab 6 中设置画布大小，并设置双缓冲
	  - [x] 熟悉 TERerengine 的画布结构和两个 `initialize` 方法
	  - [x] CS 61 B Project 2 菜单栏绘制实现
	  - [x] CS 61 B Project 2 游戏界面绘制实现
	  - [x] CS 62 B Project 2 HUD 界面绘制实现
	  - [x] CS 61 B Project 2 用户输入感应实现
	  - [x] CS 61 B Project 2 鼠标悬停位置感应实现
	  - [x] 鼠标检测实现
	  - [x] 游戏的重新加载实现
	  - [x] CS 61 B Project 2 Phase 2 完成
	  - [ ] Week 7-15 内容学习，并完成对应的 HW 和 Project
	    - [ ] Week 7
	    - [ ] Week 8
	    - [ ] Week 9
	    - [ ] Week 10
	    - [ ] Week 11
	    - [ ] Week 12
	    - [ ] Week 13
	    - [ ] Week 14
	    - [ ] Week 15
	- [ ] CS 61 B sp 21 课程学完
	  - [ ] 所有的 Lab
	  - [ ] Project 0 2048
	  - [ ] Project 2 Gitlet
	  - [ ] HW 2 完成
	  - [ ] HW 3 完成
	  - [ ] 其他 Project 把 18 的搬过去就行
	  - [ ] 其他资料复习一遍
- [ ] C++**实现各个数据结构**
- [ ] **STL中的数据结构实现学习**
- [ ] **小型Git实现**
- [ ] CS61B **其他年份的数据结构项目实现**
- [ ] **算法课程刷完**
- [ ] 《挑战程序设计竞赛》阅读完成并完成所有习题
- [ ] 《算法导论》阅读并完成所有习题
	- [ ] 书籍阅读完成
	- [ ] 所有公式推导完成
	- [ ] 课后习题全部完成
	- [ ] 其上的数据结构与算法全部实现（带googletest测试）
- [ ] 《程序设计竞赛入门经典》阅读并完成所有习题
- [ ] 《程序设计竞赛训练指南》阅读并完成所有习题
- [ ] 《程序设计竞赛进阶指南》阅读并完成[李煜东《算法竞赛进阶指南》题单 - 题单 - 洛谷 | 计算机科学教育新生态](https://www.luogu.com.cn/training/400)

### 算法能力强化

- [ ] OJ 刷题
	- [ ] kuangbin带你飞 题单刷完
	- [ ] Leetcode Medium & Hard 刷完
	- [ ] USACO 刷完
	- [ ] Codeforces 比赛
	- [ ] AtCoder 比赛
- [ ] 打算法比赛搞钱

### 系统 & 系统安全方向

#### 计算机体系结构

- [ ] 数字电路
	- [ ] Logisim 模拟软件上的数字电路实现
	- [ ] Verilog 语言学习，使用Verilog语言实现各个基础数字电路
	- [ ] 用Verilog 实现一个大的数字电路系统，具体参考各个学校的Project
- [ ] 计算机组成原理
	- [ ] Logisim实现
		- [ ] 实现单周期的RISC-V/MIPS处理器
		- [ ] 实现多周期的RISC-V/MIPS处理器
		- [ ] 实现流水线的RISC-V/MIPS处理器
	- [ ] Verilog 实现
		- [ ] 实现单周期的RISC-V/MIPS处理器
		- [ ] 实现多周期的RISC-V/MIPS处理器
		- [ ] 实现流水线的RISC-V/MIPS处理器
- [ ] 计算机体系结构
	- [ ] 实现双发射的高效处理器，能够运行Linux操作系统
	- [ ] 香山/南湖架构处理器研究，并提开源贡献
- [ ] 造轮子
	- [ ] 南大PA完成
	- [ ] 一生一芯项目完成
	- [ ] NEMU代码研究，并进行开源贡献，优化NEMU的开源效率
	- [ ] QEMU代码研究，并进行开源贡献，优化QEMU的运行效率
	- [ ] 实现一个简单的RISC-V CPU模拟器
	- [ ] 强化RISC-V CPU模拟器，使其能够运行Linux操作系统
	- [ ] 添加ARM指令集模拟器
	- [ ] 强化ARM指令集模拟器，使其能够运行Linux操作系统
	- [ ] 添加MIPS指令集模拟器
	- [ ] 强化MIIPS指令集模拟器，使其能够运行Linux操作系统
	- [ ] 实现三个指令集架构的三合一选择，使其能够运行Linux操作系统
- [ ] 计算机体系结构论文研读并复现

#### 编译原理 & 编程语言

- [x] Nand2Tetris
- [ ] SICP 阅读
	- [ ] Scheme版本书籍阅读并完成课后习题
	- [ ] 用Scheme实现Scheme解释器，把实现过程记录在博客上
	- [ ] SICP 学习总结完成
	- [ ] Javascript 版本阅读并完成所有习题
	- [ ] Web 前后端开发技能学习
	- [ ] 用Javascript实现Web版本的Scheme解释器，把实现过程记录在博客上
	- [ ] SICP Javascript 版本阅读总结完成
	- [ ] SICP 学习经历总结在博客上
- [ ] Essential of programming languages 阅读
	- [ ] 书籍阅读并完成所有习题
	- [ ] 用Scheme实现一个解释器
- [ ] 几种汇编语言学习并实现其汇编器
	- [ ] RISC-V 语言学习
	- [ ] RISC-V 汇编器实现
	- [ ] ARM 语言学习
	- [ ] ARM 汇编器实现
	- [ ] MIPS 语言学习
	- [ ] MIPS 汇编器实现
- [ ] 链接工作学习，并实现链接器
	- [ ] 《程序员的自我修养》阅读
	- [ ] CSAPP 编译一章阅读
	- [ ] 链接器实现
- [ ] Parsing Techniques 阅读
- [ ] 编译原理课程全部刷完
	- [ ] Stanford CS143
	- [ ] MIT 6.035
- [ ] 各类函数式语言编译器 & 解释器实现
	- [ ] LISP语言学习
	- [ ] LISP解释器实现
	- [ ] Scheme 语言学习
	- [ ] Scheme 语言解释器实现
	- [ ] Common Lisp 语言学习
	- [ ] Common Lisp 解释器实现
	- [ ] ML 语言学习
	- [ ] ML 编译器实现（虎书）
	- [ ] Python 解释器实现
	- [ ] OCmal 语言学习
	- [ ] OCmal 解释器实现
	- [ ] Racket 学习
	- [ ] Racket 解释器实现
	- [ ] Haskell 学习
	- [ ] Haskell 解释器实现
- [ ] 面向对象语言编译器研究 & 实现
	- [ ] Stanford Cool语言编译器源码研究
	- [ ] JVM 源码研究
	- [ ] 简单的Java虚拟机实现
	- [ ] 侯捷《STL源码剖析》阅读
	- [ ] 自己实现小型的STL
	- [ ] C++子集的编译器实现（cppgm）
	- [ ] Rust 语言学习
	- [ ] Rust 语言编译器研究
- [ ] 动态类型语言编译器实现
	- [ ] Javascript 编译器实现
- [ ] 逻辑语言解释器实现
	- [ ] Paradigms of Artificial Intelligence Programming
	- [ ] Prolog 语言解释器实现，学习NLP和CV，在其中加入AI功能和数学模型推理功能
		- [ ] 人工智能基础学习
		- [ ] NLP 学习
		- [ ] CV 学习
		- [ ] 在Prolog语言中加入数据结构、逻辑推理、认知推理、数学推理功能
		- [ ] **学习AI底层架构的性能优化，和人工智能模型的优化，以及人工智能编译器的优化**
		- [ ] 设计AI推理编译器
- [ ] 深度学习编译器
	- [ ] 人工智能学习
	- [ ] 深度学习学习
- [ ] 计算机图形学学习
	- [ ] 图形编译库实现
	- [ ] 做出QT那样的图形库
- [ ] 编程语言设计学习
	- [ ] 《程序语言之路》
	- [ ] 《Essence of compiler》
- [ ] 类型系统学习
- [ ] JAVA垃圾回收机制学习
- [ ] 底层编译优化学习
- [ ] 多语言编译选择实现
- [ ] 编译器项目源码研究，并进行开源贡献（优化）
	- [ ] CPython
	- [ ] gcc
	- [ ] ANTLR4
	- [ ] Yacc
	- [ ] Lex
	- [ ] Flex
	- [ ] Bison
- [ ] 找到编译器工作
- [ ] 实现JetBrains全家桶那样的编译器
- [ ] 编译原理相关论文研读并复现
- [ ] Coq 推理学习

#### 系统构建

- [ ] 《深入理解计算机系统》阅读完成
- [ ] 课程刷完
	- [x] [CIS 2400 (upenn.edu)](https://www.seas.upenn.edu/~cis2400/22fa/) ✅ 2024-12-28
	- [ ] CSAPP
	- [ ] MIT CSE
	- [ ] SJTU CSE
	- [ ] 系统原理
- [ ] 造轮子
	- [ ] Shell 实现
	- [ ] Malloc 实现
	- [ ] 小型文件系统实现
	- [ ] 虚拟内存管理实现
	- [ ] 网络编程库实现（如moduo学习），实现自己的Socket套接字
	- [ ] 进程通信协议学习实现

#### 操作系统

- [ ] 基础理论学习 & 刷课完成
	- [ ] 《操作系统概念》阅读完成
	- [ ] 《操作系统设计与实现》阅读完成
	- [ ] THU UCore 实验完成
	- [ ] UCore 源码研究
	- [ ] 自己用C语言搓一个小型操作系统，运行在我自己的CPU模拟器上
	- [ ] Rust 资源收集
	- [ ] Rust 基础学习
	- [ ] Rustlings 完成
	- [ ] RCore 实验完成
	- [ ] 自己用Rust实现一个小型的操作系统，运行QEMU上
	- [ ] MIT 6.081课程学习
	- [ ] XV6 Lab完成
	- [ ] XV6 源码研究
	- [ ] 优化我自己的C语言操作系统
	- [ ] 用Rust重写XV6，运行在QEMU上
	- [ ] 优化我自己的Rust操作系统
	- [ ] PintOS Lab完成
	- [ ] PintOS 源码研究
	- [ ] 优化我自己的C语言操作系统
	- [ ] PintOS 使用Rust重写，运行在QEMU上
	- [ ] 计算机网络学习
	- [ ] 为操作系统添加网络协议栈，实现其联网
	- [ ] 《Linux内核源码剖析》阅读
	- [ ] Linux Kernel 0.11 源码研究
	- [ ] Linux内核研究，提交开源贡献
	- [ ] 开发出带shell和GUI的操作系统，可以在其上打游戏
- [ ] 操作系统顶级会议论文研读并复现

#### 计算机网络

- [ ] 计算机网络课程刷完
- [ ] 用C语言实现一个小型的TCP/IP协议栈
- [ ] 给我自己的操作系统添加一个协议栈，使其联网
- [ ] 对照RFC文档，实现Socket套接字
- [ ] 计算机网络顶级会议论文研读并复现

#### 数据库系统

- [ ] 《数据库系统概念》阅读
- [ ] 《数据库系统实现》阅读
- [ ] 数据库课程刷完
- [ ] 造轮子
	- [ ] 小型关系型数据库
	- [ ] KV-Store 数据库
	- [ ] NoSQL 数据库
	- [ ] 实现 mysql 协议，支持 mysql 连接
	- [ ] 分布式系统学习
	- [ ] 为数据库添加实现分布式协议
	- [ ] 实现 Web 版本数据库
	- [ ] 找到数据库工作
	- [ ] 实现支持KV-Store/NoSQL/mysql协议/分布式协议/Web连接/OLTP/OLAP的数据库

#### 并行与分布式系统

- [ ] MIT 6.824 课程学习完成
- [ ] C++实现 raftcore 分布式算法
- [ ] C++实现 Paxos 分布式算法
- [ ] 为数据库添加分布式协议
- [ ] Tikv talent-plan 学习
- [ ] Tikv 源码研究，并提一些优化
- [ ] TIDB talent-plan 学习
- [ ] TIDB 源码研究，并提一些优化
- [ ] 找到数据库工作
- [ ] 为我自己的数据库加入分布式机制

#### 系统安全

- [ ] 成为逆向工程和 binary hacking/binary exploition, pwn 的大佬
- [ ] 研究操作系统内核安全机制
- [ ] 给系统提安全漏洞补丁
- [ ] 称为计算机系统黑客！
- [ ] 为我自己的系统（操作系统、硬件、数据库）加安全机制
- [ ] 研究新的安全机制
- [ ] 硬件安全

#### 图形化处理与GPU优化

#### 高性能计算

#### 大数据经典架构

#### AI推理引擎架构

### Web 前后端开发 & 移动软件开发

- [ ] 软件工程思想
  - [ ] 单元测试
  - [ ] [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development)
  - [ ] behavior-driven development
- [ ] `CI/CD`工具学习（为`devops`开发流程学习做准备）
  - [ ] `github actions`学习
  - [ ] `Jenkins`学习
  - [ ] `Docker`学习
  - [ ] 完善`modern-Cpp-template`中的`docker`
  - [ ] `Kubernetes`学习

### 密码学，网络安全，软件安全和嵌入式安全

- [ ] 密码学学习
- [ ] 网络安全学习
- [ ] 二进制方向学习
- [ ] 逆向工程学习
- [ ] 软件安全学习
- [ ] 嵌入式软硬件安全学习
- [ ] CTF 学习
- [ ] 漏洞挖掘学习
- [ ] Security Bounty
- [ ] 漏洞扫描软件开发

### AI 方向

 - [ ] 利用AI进行一些股票预测、量化交易、赛马预测搞钱
 - [ ] 用AI训练国际象棋，自己玩
 - [ ] 实现逻辑推理AI
 - [ ] 利用AI打数据科学竞赛赚钱
 - [ ] 用AI帮助进行动物迁徙预测，进行动物保护活动
 - [ ] 用AI进行阿尔兹海默症的靶点寻找和疾病预测，帮助防治阿尔兹海默症
 - [ ] 用AI进行全球环境预测，帮助拯救全球变暖
 - [ ] 用AI帮助非洲同志获得更好的生活
 - [ ] AI 应用软件开发

### 电子信息，数字信号处理和通信相关学习

- 物理基础
- 数字电路
	- 数字电路绘制软件
- 模拟电路
- 信号与系统
- 通信原理
- 信息论与编码
- 数字音频处理
- 数字图像处理

### 嵌入式系统，物联网和FPGA

#### 面包板

#### 单片机

- [ ] 研究全屋互联系统

#### Auduino探索

#### 树莓派

#### FPGA

- [ ] 购买 PYNQ-Z1来玩玩
- [ ] 给Surface笔记本安装Arch Linux操作系统

### 计算机图形学

- [ ] 研究显存，GPU和GUI实现
- [ ] GPU优化学习

### 理论计算机

- [ ] 数学学习任务全部完成，要从计算机的思维模式中走出来，去适应抽象的思维模式，这需要大量的强化训练达到，没有谁是天生的
- [ ] 算法设计与分析
	- [ ] MIT 算法设计分析课程学习并完成所有Problem Sets 和 Exam
	- [ ] 斯坦福大学算法设计与分析学习
	- [ ] UCB CS70
	- [ ] UCB CS170
	- [ ] UCB Leetcode Decal
	- [ ] Stanford Programming Contest 课程
- [ ] 计算理论
	- [x] 油管[Introduction to Theory of Computation](https://www.youtube.com/watch?v=58N2N7zJGrQ&list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev&index=1&t=433s)系列教程学习 ✅ 2025-01-14
		- 中途参考了以下视频
		- [CS 3350: Automata, Computability, and Formal Languages (Fall 2020)](https://www.cs.utep.edu/vladik/cs3350.20a/) 这门课的Notes写的极好，尤其是Turing machine部分
		- [Theory of Computation ( TOC ) or Formal Languages and Automata Theory ( FLAT ) - YouTube](https://www.youtube.com/playlist?list=PLXj4XH7LcRfBkMlS_9aebcY78NLFwhE4M) 这个playlist 讲习题讲的特别好，不会的题目就看他的
		- [x] pumping lemma 理解：[Lecture 11/65: Pumping Lemma (For Regular Languages)](https://www.youtube.com/watch?v=N6bPCbXueHU) ✅ 2025-01-07
		- [x] [Simplification of CFG || Reduction of CFG || Minimization of CFG || Theory of Computation || TOC](https://www.youtube.com/watch?v=R9Bz8rqPUmo) CFG简化学习 ✅ 2025-01-07
		- [x] [Greibach Normal Form || Converting CFG to GNF || TOC || FLAT || Theory of Computation || Example 3](https://www.youtube.com/watch?v=hPozJwd--WM) ✅ 2025-01-08
		- [x] [Lecture 19/65: The Pumping Lemma for CFLs](https://www.youtube.com/watch?v=_44nJX03n9E) ✅ 2025-01-08
		- [x] [Pumping Lemma for Context-Free Languages: Four Examples](https://www.youtube.com/watch?v=v4ZjggNXW3Q) ✅ 2025-01-08
			- 这个视频讲的相当好！
		- [x] [【麻省理工公开课】理论计算——下推自动机、CFG到PDA的转换和反向转换_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1w341157Eb/?spm_id_from=333.337.search-card.all.click&vd_source=85acf0a59ded02e4c75ae1158baca207) ✅ 2025-01-09
		- [x] [Lecture 20/65: PDAs: Pushdown Automata](https://www.youtube.com/watch?v=s5cB_xg9NGg&list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz&index=20) ✅ 2025-01-09
		- [x] [CFG to PDA Conversion || Construction of PDA from CFG || Equivalence of CFG and PDA || TOC || FLAT](https://www.youtube.com/watch?v=fx2gQptXAyk) ✅ 2025-01-10
		- [x] [CFGtoPDA.pdf](https://www.cs.utep.edu/vladik/cs3350.20a/CFGtoPDA.pdf) ✅ 2025-01-10
			- 这个写的超级清楚
		- [x] [PDAtoCFG.pdf](https://www.cs.utep.edu/vladik/cs3350.20a/PDAtoCFG.pdf) ✅ 2025-01-10
			- 这个也写的很清楚
		- [x] [Lecture 21/65: Equivalence of CFGs and PDAs (part 1)](https://www.youtube.com/watch?v=s9GbXopLSUU&list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz&index=22&t=3s) ✅ 2025-01-11
		- [x] [Lecture 22/65: Equivalence of CFGs and PDAs (part 2)](https://www.youtube.com/watch?v=UUXlt2WJ59A&list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz&index=23) ✅ 2025-01-11
		- [x] 系列教程的剩下部分学完（PCP的undecidability部分讲的不是很好，需要参考其他视频，但是总体来说图灵机部分讲的不错，很简明清晰，但是后面的Reduce和P还有NP问题部分没有讲解，有点遗憾了） ✅ 2025-01-14
		- [x] [Theory of Computation - YouTube](https://www.youtube.com/playlist?list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz) 这个playlist剩下的图灵机部分学完 ✅ 2025-01-14
			- 图灵机往后的部分当真让人看不下去，老师在一些东西上讲的不是很清楚，而且有一些口吃的问题
	- [ ] 《计算理论导引》阅读完成
		- [Example 3: From DFA, to GNFA, to Regular Expression](https://www.youtube.com/watch?v=B_sWA0Kx2Jc)课本上DFA到GNFA的简化过程讲解的不是很详细，比较复杂的例子可以参考这个题目
		- [GNFA and Qrip part1](https://www.youtube.com/watch?v=kHq7pwZr1Xg) 课本例题讲解
		- [GNFA and Qrip part2](https://www.youtube.com/watch?v=VsZaZkuy6uY)
		- 1.12 1.13 1.23 1.58 1.59 题目不会做
		- 1.56 [automata - Show a set of numbers, binary representation of which is a regular language, but the ternary representation is not. - Mathematics Stack Exchange](https://math.stackexchange.com/questions/2151623/show-a-set-of-numbers-binary-representation-of-which-is-a-regular-language-but) 这个题目的证明比较难
	- [ ] [Theory of Computer Science: Automata, Languages and Computation](https://book.douban.com/subject/32604363/) 阅读并完成所有习题
	- [ ] 《形式语言与自动机理论》林兹阅读并完成所有习题
	- [ ] 《自动机理论、语言和计算导论》阅读完成并完成所有习题
	- [ ] 《Elements of theory of computation》阅读
	- [ ] 《Swiching and Finite Automata Theory》阅读完成并完成所有习题
- [ ] 计算复杂性理论
	- [ ] 阿罗拉《计算复杂性理论》阅读

## 算法刷题准备

- [ ] USACO 训练完成
- [ ] Project Euler 刷完
- [ ] Codeforces 达到红名, 拿到 Legendary Grandmaster 称号
- [ ] Atcoder rating 达到 2800
- [ ] Leetcode Medium 和 hard 习题刷完

## 面试准备

- [ ] 系统方向八股搜集
- [ ] 系统方向八股准备完成

## 课程源码研究

> [!TIP]
> 本阶段研究前面部分经典公开课程的课程源码，必须研究透彻，巩固基本知识。

## 造轮子

> [!TIP]
> 本阶段实现一些经典轮子的再造，在造轮子的过程中需要思考如何更好地设计。

### 环境配置

- [ ] Linux 系统管理和配置学习
- [ ] 配置 Arch Linux ，作为后期主力环境

### 数据结构

- [ ] `gitlet`
- [ ] `TinySTL`

### 编译原理

- [ ] cpp-python
- [ ] mini-C
- [ ] javascript interpreter
- [ ] Scheme interpreter
- [ ] Scala compiler

### 计算机体系结构

- [ ] CPU 模拟器，可运行 Linux

### 系统构建

- [ ] 一些小的操作系统构件，如 FAT32 文件系统

### 操作系统

- [ ] 一个小型操作系统，可以运行在 ARM/RISCV32/RISCV64 机器上

### 计算机网络

- [ ] 小型 TCP/IP 协议栈，让操作系统联网

### 数据库系统

- [ ] 小型关系型数据库
- [ ] KV-Store 数据库
- [ ] NoSQL 数据库
- [ ] 实现 mysql 协议，支持 mysql 连接
- [ ] 为数据库添加实现分布式协议
- [ ] 实现 Web 版本数据库

### 并行与分布式系统

- [ ] C++实现 raftcore 分布式算法
- [ ] C++实现 Paxos 分布式算法

### 系统安全

- [ ] 成为逆向工程和 binary hacking/binary exploition, pwn 的大佬
- [ ] 给系统提安全漏洞补丁
- [ ] 称为计算机系统黑客！

### 计算机图形学

- [ ] 制作 FPS 射击游戏，并且将其移植到支持 RISC-V 指令集架构的操作系统上
- [ ] 在 RISC-V 操作系统中实现 GPU 优化，优化游戏体验

### AI 方向 & 经济学方向

- [ ] 实现高频量化交易系统

## 经典开源项目研究

> [!TIP]
> 本阶段根据前面造轮子时期遇到的问题，研究一些经典的开源项目，提出 Patch 和优化甚至研究方法，努力成为 core developer！

- [ ] 编译原理
  - [ ] C/C++ compiler
  - [ ] JAVA 源码
  - [ ] CPython
  - [ ] Scheme
  - [ ] Javascript
  - [ ] Typescript
  - [ ] Haskell
  - [ ] Prolog
  - [ ] Rust
  - [ ] LLVM
  - [ ] ANLTR
- [ ] 计算机体系结构
  - [ ] 南京大学 nemu
  - [ ] Qemu
  - [ ] Scala
  - [ ] 香山处理器架构
- [ ] OS
  - [ ] ucore
  - [ ] rcore
  - [ ] xv6
  - [ ] pintOS
  - [ ] Nachos
  - [ ] Chcore
  - [ ] Linux
- [ ] DB
  - [ ] levelDB
  - [ ] MySQL
  - [ ] PostgreSQL
  - [ ] MariaDB
  - [ ] TiDB
  - [ ] RocksDB
  - [ ] TiKV
- [ ] 分布式协议
  - [ ] paxos
  - [ ] raft
- [ ] 图形学轮子
  - [ ] opengl
  - [ ] vulkun
  - [ ] direct3D
- [ ] 游戏引擎
  - [ ] Unreal

## 顶会论文阅读 & 复现

> [!TIP]
> 本阶段搜集一些系统顶会，并且对其系统进行复现，根据论文对已有的系统进行一些优化。本阶段需要达到毕业博士生的科研水平。

- [ ] 系统方向顶会搜集
- [ ] 利用 AI 提取顶会关键词，整理顶会论文的 topic 及其发展历史
- [ ] 所有系统顶会阅读
- [ ] 复现顶会论文

## 自我提升书籍阅读

> [!TIP]
> 本阶段阅读一些自我提升的书籍，增强自己对社会的认知水平、自己的思想水平、以及领导力。

- [ ] 《黑客：计算机革命的英雄》阅读
- [ ] 《Borland 传奇》阅读

## 个人项目开发

> [!TIP]
> 本阶段进行个人项目的开发，目的是像卡玛克和法布里斯贝拉那样实现一些改变世界的工程项目。

- [ ] 实现在自己的CPU上运行自己的操作系统、编译器、网络协议栈，携带图形界面，并且能运行超级玛丽和一些小游戏
- [ ] 构造出 RISC-V 架构上的全套系统，包括 CPU 模拟器、编译器/解释器、操作系统、网络协议栈、数据库等等
- [ ] 把那些成熟的开发产品都学习到位
- [ ] 手机上的创业idea全部实现完成
- [ ] 实现对人，对社会有用的产品，部分可以卖给企业，部分可以自己维护赚钱
- [ ] 失业者救助交流论坛开发
- [ ] 心理聊天室开发
- [ ] 利用自己的技术开发很多对社会有帮助的项目，无论是盈利还是非盈利
- [ ] 实现计算机科学一站式指导项目
- [ ] 做出足够震撼和足够有影响力的开源项目，要对自己有自信

## 找到工作并赚到钱

> [!TIP]
> 本阶段的目的是找到年薪百万的工作并赚到钱，攒钱 1000 万。

- [ ] Security Bug Bounty，成为 hackerone 排行榜榜首
- [ ] TopCoder
- [ ] CTF
- [ ] 游戏开发
- [ ] 外包接单
- [ ] App 开发
- [ ] Facebook Hacker cup 奖金
- [ ] 阿里天池、Kaggle 及其他数据科学竞赛奖金
- [ ] 留学生写作业
- [ ] 英语家教
- [ ] 设计代做
- [ ] 利用AI进行一些股票预测、量化交易、赛马预测搞钱
- [ ] 找到字节跳动岗位工作

## 发表系统顶级会议论文

- [ ] 📅 2025-7-16 SIGMOD
- [ ] 📅 2025-7-19 ICSE
- [ ] 📅 2025-9-17 FAST 9-17
- [ ] 📅 2025-9-26 EuroSys 9-26

## 终极目标

- [ ] 申请到MIT PDos Lab的phD，进行编译原理、操作系统、分布式系统、系统安全和数据库方向的研究
- [ ] 成为卡马克和法布里斯贝拉、Jeff Dean 那样的人，要做最棒的系统工程师、电子信息工程师和游戏工程师，在计算机行业打出名声，成为大富翁

