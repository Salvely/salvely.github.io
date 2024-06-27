---
date: "2024-06-23"
title: 我的数学旅程——基于MIT Roadmap
shortTitle: 我的数学旅程——基于MIT Roadmap
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
date updated: 2024-06-23 10-57
---

> 以下为 MIT 计算机专业的数学课程学习路径和笔记汇总，建立的依据是 [Math Major Roadmaps (mit.edu)](https://math.mit.edu/academics/undergrad/roadmaps.html)，包含以下四个方向：
>
> - 计算机科学
> - 计算机科学与工程
> - 统计与数据科学
> - 组合学
>
> 本目录下包含本人学习 MIT 数学相关课程的学习路径、相关书籍的阅读笔记、课程笔记、以及习题解答，外带一些碎碎念，除 Ron Larson 微积分笔记和公式总结外，其他笔记使用 Latex 编写。

---

## 应用数学部分：计算机方向

阶段一：基础

- [ ] MIT Calculus

  > 这门课我一开始并没有完全按照 MIT 的大纲来学，一方面那个老师讲的我个人不是很能理解（可能智力水平太低了），一方面是感觉有的时候他的思路跳得很快，另一方面他有的时候讲着讲着就会开始展示计算例题，导致课程大纲的连贯性降低了。但是他的讲解中，和一些同其他数学课程的联系（如物理、线性代数）部分讲解的非常好。
  > 我个人的建议是先将其他的微积分书籍/课程学习一下，掌握基本的公式和计算题，然后再来跟着这位 MIT 的老师走一遍，效果会更好。（事实上我感觉 MIT 的课都适合有了一些课程的基础再来看，不然的话很多精妙的思想推理会感觉不到。因为如果你是第一遍学习，你的目的就是把知识和技巧学会，可能不会花费太多的精力在思考知识之间的逻辑关系上，但是 MIT 的数学课好的点在于它提供了很多精妙的解释和思路，如果你是第一遍观看的话，你的精力可能不会允许你体会到这些，而且在跟随 MIT 的快速思路过程中，你可能还会觉得痛苦，因为你对知识还不够了解。如果你有了一定的知识基础再来看，你就会感觉到：“哇！这个地方还能这么证明！这真是太妙了！“体验会好得多。）
  > 此外，我掌握的不太好的地方主要是单变量的级数和参数方程部分，和多变量的 `vector fields`（包含线面积分、格林公式、斯托克斯公式和高斯散度定理那一章）。因此我在观看油管视频和查资料的时候，主要是学习的这三章的知识。我首先复习了第 15 章 `vector fields`，然后是第 9 章无穷级数，最后是第 10 章参数方程和圆锥曲线。

  - [x] [Calculus 3 Lecture 15.2: How to Find Divergence and Curl of Vector Fields (youtube.com)](https://www.youtube.com/watch?v=TMWevkxtS9s&list=PLDesaqWTN6ESk16YRmzuJ8f6-rnuy0Ry7&index=30) 学习，后面的习题讲解不用看
  - [x] [Green's Theorem: Calculus 3 Lecture 15.5 (youtube.com)](https://www.youtube.com/watch?v=OnyCk62hEL4&list=PLDesaqWTN6ESk16YRmzuJ8f6-rnuy0Ry7&index=33&t=11s) 学习（这个视频其实讲的没有太好，证明的过程没有给出来，但是这个老师讲课比较平易近人，后面的计算题就不用看了）
  - [x] [Surface And Flux Integrals, Parametric Surf., Divergence/Stoke's Theorem: Calculus 3 Lecture 15.6_9 - YouTube](https://www.youtube.com/watch?v=sQ0BJ3H-cZ8&list=PLDesaqWTN6ESk16YRmzuJ8f6-rnuy0Ry7&index=34&pp=iAQB) 学习（这一节也可以不看，这个老师比较形象的描述了定理，但是给的证明不是特别充足）
  - [x] [Calculus II - Series & Sequences (lamar.edu)](https://tutorial.math.lamar.edu/Classes/CalcII/SeriesIntro.aspx) 这个系列对于级数的讲解非常好，比微积分课本要清晰，可以参考阅读，但是问题也在于中间插入了大量的例题，导致思路连贯性下降（这好像是初等微积分的教材和讲义的特点了）
  - [x] [Calculus 2 Lecture 9.8: Representation of Functions by Taylor Series and Maclauren Series (youtube.com)](https://www.youtube.com/watch?v=3VHol7eosLA) 观看（这个老师对概念讲解的很清楚）
  - [ ] Ron Larson Calculus 课本阅读，阅读总结见此： <a href="/math/Ron Larson Calculus 阅读笔记.pdf">Ron Larson 《Calculus》阅读笔记</a>

    > Ron Larson 的课本对于第 9 章和第 15 章，有的地方讲解的不是很清楚。因为像托马斯微积分那样穿插了大量的习题，导致整体思路的紧凑性和连贯性下降。而且因为 Ron Larson 这本只是一本普通的微积分教材，它没有涉及到分析学，因此很多地方是知其然而不知其所以然。
    > 对于第 9 章级数收敛，以及幂级数与函数的联系方面，读者并不了解这个收敛不收敛到底有什么用，对于如何寻找一个函数的幂级数表达式也是非常的含糊。因此有兴趣深入学习的读者，需要参考网络上其他的资 料，或者数学分析课本。
    > 在第 15 章中，作者在还没有讲清楚旋度和散度的含义的情况下，直接将公式摔在了你的脸上。按理说应该先介绍线积分，然后讲解旋度和散度的意义和公式，推广到格林定理，讲解面积分，再从格林定理延伸到高斯散度定理和斯托克斯公式。但是课本并没有介绍旋度和散度的意义，或者说介绍的非常粗浅，难以让读者有一个感性的认识。对于格林公式和散度定理以及斯托克斯公式之间的联系，也并没有讲的太清楚。只是在讲解完格林公式以后稍稍的进行了一下格林公式在三维空间中的推广，然后就没有了下文。
    > 此外，在第 10 章中，作者使用了大量的篇幅讲解几个圆锥曲线，并且提供了大量的图，和几个圆锥曲线的相关计算。我不否认圆锥曲线重要，但是我认为作者安排的圆锥曲线计算和画图题目的比例有点过大了。第 10 章中虽然讲解了参数方程和极坐标等，但是其最终本质上还是利用平面直角坐标系中的各种关系在进行近似和代换。

    - [x] Ron Larson Chapter 15 阅读
    - [x] Ron Larson Chapter 9 阅读
    - [x] Ron Larson Chapter 10 阅读

  - [ ] Ron Larson Calculus 课本公式总结见此

    > 公式总结相比课本阅读总结部分，少了推导工作，只简略介绍推导过程和工作原理，并不详细展示。本任务的重点是：把所有的推导过一遍，并且整理出所有的公式。

    - [ ] Chapter 7
    - [ ] Chapter 8
    - [ ] Chapter 9
    - [ ] Chapter 10
    - [ ] Chapter 11
    - [ ] Chapter 12
    - [ ] Chapter 13
    - [ ] Chapter 14
    - [ ] Chapter 15

  - [ ] Ron Larson Calculus 知识点总结+习题刷完（每个知识点刷 50 道题），习题解答见此

    > 本任务的重点是：掌握各个知识点，把微积分的公式和思想运用熟练。

    - [ ] Chapter 7
    - [ ] Chapter 8
    - [ ] Chapter 9
    - [ ] Chapter 10
    - [ ] Chapter 11
    - [ ] Chapter 12
    - [ ] Chapter 13
    - [ ] Chapter 14
    - [ ] Chapter 15

  - [ ] MIT Lectures 观看完成
  - [ ] MIT Notes 阅读
  - [ ] MIT Readings 完成
  - [ ] MIT Lecture Notes 阅读
  - [ ] MIT Problem Sets 1-12 完成
  - [ ] MIT Exam 1 A-4 B 完成
  - [ ] MIT Multivariable Calculus 个人总结讲义完成，个人总结讲义见此
  - [ ] [The Calculus: A Genetic Approach: Toeplitz, Otto, Bressoud, David: 9780226806686: Amazon.com: Books](https://www.amazon.com/Calculus-Genetic-Approach-Otto-Toeplitz/dp/0226806685)
  - [ ] Calculus: One-variable calculus, with an introduction to linear algebra
  - [ ] Calculus: Multi-variable calculus and linear algebra, with applications to differential equations and probability
  - [ ] Calculus Made Easy by Silvanus P. Thompson
  - [ ] MIT Highlights of Calculus 学习
  - [ ] MIT Calculus Revisited 学习
  - [ ] 初等微积分的个人总结完成，总结见此（本任务的目的是，用自己的语言把整个微积分的脉络讲出来，如果对其中任意一个环节不清楚，那么就是微积分的知识掌握的还是不够熟练，需要继续练习。顺带练习 `latex`）

  > 多元微积分完结撒花！

- [ ] MIT Linear Algebra

  - [ ] MIT Linear Algebra Lectures 看完
  - [ ] Introduction to Linear Algebra 课本阅读，在课本上做批注和笔记，并完成习题
	  > 
	  > 我原本想边读边做 `latex` 笔记，后来发现这样效率有点低，不如读完了，再用自己的话去总结

  - [ ] Introduction to Linear Algebra 阅读笔记见此
    - [ ] Chapter 1：向量介绍
    - [ ] Chapter 2：解线性方程
    - [ ] Chapter 3：向量空间和子空间
    - [ ] Chapter 4：正交性
    - [ ] Chapter 5：行列式
    - [ ] Chapter 6：特征值和特征向量
    - [ ] Chapter 7：奇异值分解
    - [ ] Chapter 8：线性变换
    - [ ] Chapter 9：Complex vectors 和矩阵
    - [ ] Chapter 10：应用
    - [ ] Chapter 11：数值线性代数
    - [ ] Chapter 12：概率统计中的线性代数
  - [ ] Introduction to Linear Algebra 习题完成，习题解答见此
  - [ ] Introduction to Linear Algebra 个人总结讲义完成
  - [ ] MIT Linear Algebra Assignments 完成
  - [ ] MIT Linear Algebra Exams 完成
  - [ ] [Differential Equations and Linear Algebra](https://math.mit.edu/~gs/dela/) 阅读
  - [ ] [Learn Differential Equations: Up Close with Gilbert Strang and Cleve Moler | Supplemental Resources | MIT OpenCourseWare](https://ocw.mit.edu/courses/res-18-009-learn-differential-equations-up-close-with-gilbert-strang-and-cleve-moler-fall-2015/)
  - [ ] [A Vision of Linear Algebra | Supplemental Resources | MIT OpenCourseWare](https://ocw.mit.edu/courses/res-18-010-a-2020-vision-of-linear-algebra-spring-2020/)
  - [ ] Highlights of Calculus 阅读
  - [ ] [ZoomNotes for Linear Algebra | Linear Algebra | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/mit18_06s10zoomnotes/) 阅读
  - [ ] Julia 环境配置 & 基础学习
  - [ ] [mitmath/1806: 18.06 course at MIT (github.com)](https://github.com/mitmath/1806) 现代 18.06 学习
  - [ ] MIT Linear Algebra [历年期末](https://web.mit.edu/18.06/www/old.shtml)刷题
  - [ ] 《线性代数及其应用》阅读，阅读笔记见此
  - [ ] 《线性代数及其应用》习题完成，习题解答见此
  - [ ] [Introduction to Linear and Matrix Algebra (豆瓣) (douban.com)](https://book.douban.com/subject/35904973/)
  - [ ] [Advanced Linear and Matrix Algebra (豆瓣) (douban.com)](https://book.douban.com/subject/35232709/)

    > 基础线性代数完结撒花！

- [ ] MIT 18.03 Differential Equations

  - [ ] Elementary Differential Equations 阅读并总结
  - [ ] Elementary Differential Equations 习题完成
  - [ ] [Differential Equations | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/) Readings 完成
  - [ ] [Differential Equations | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/) Lecture Notes 阅读
  - [ ] [Differential Equations | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/) Recitations 完成
  - [ ] [Assignments | Differential Equations | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/pages/assignments/) Assignments 完成
  - [ ] [Exams | Differential Equations | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/pages/exams/) Exam 完成
  - [ ] [Video Lectures | Differential Equations | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/video_galleries/video-lectures/) 观看复习
  - [ ] [Differential Equations | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/) 滚动复习完成
  - [ ] [1803SupplementaryNotes_full.pdf (mit.edu)](https://math.mit.edu/~jorloff/suppnotes/suppnotes03/1803SupplementaryNotes_full.pdf) 阅读
  - [ ] [18.03, Spring 2020 (mit.edu)](https://math.mit.edu/~dyatlov/18.03/)

- [ ] MIT 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning

  - [ ] Signal Processing & Electronics
    - [ ] MIT 6.01 Intro to EECS I
    - [ ] MIT 6.00 Introduction to Computer Science and Programming
    - [ ] MIT 6.100 A Introduction to Computer Science Programming in Python
    - [ ] MIT 6.0002 Introduction to Computational Thinking and data Science
    - [ ] MIT 6.02 Intro to EECS II
    - [ ] UCB EE 16 A
    - [ ] UCB EE 16 B
    - [ ] MIT 6.002 Circuits and Electronics
    - [ ] MIT 6.003 Signals and Systems
    - [ ] UCB EE 120 Signals and Systems
  - [ ] Data science
    - [ ] Strang, Gilbert. *Linear Algebra and Learning from Data*. 阅读
    - [ ] MIT 18.065 Readings 阅读并总结，总结见此
    - [ ] MIT 18.065 Video Lectures 观看
    - [ ] MIT 18.065 Assignments 完成
    - [ ] MIT 18.065 Final Projects 完成
    - [ ] [mitmath/18065: 18.065/18.0651: Matrix Methods in Data Analysis, Signal Processing, and Machine Learning (github.com)](https://github.com/mitmath/18065) 现代版 Notes 阅读
    - [ ] [mitmath/18065: 18.065/18.0651: Matrix Methods in Data Analysis, Signal Processing, and Machine Learning (github.com)](https://github.com/mitmath/18065) Problem Sets 完成
    - [ ] UCB Data 8
    - [ ] UCB Data 100
    - [ ] Harvard CS 109 A

- [ ] MIT 18. C 06 线性代数及其优化

  > 这门课没有在 MITOCW 上公开，因此我们另找额外的教科书学习。

  - [ ] Linear Algebra and Optimization for Machine Learning 阅读
  - [ ] [cis515-13-sl1-a.pdf (upenn.edu)](https://www.cis.upenn.edu/~cis5150/cis515-13-sl1-a.pdf)
  - [ ] [Introduction to Applied Linear Algebra – Vectors, Matrices, and Least Squares (stanford.edu)](https://web.stanford.edu/~boyd/vmls/)
  - [ ] Stanford 凸优化课程

- [ ] MIT 18.700 高级线性代数

  - [ ] Linear Algebra done right 阅读，阅读笔记见此
  - [ ] [Linear Algebra Done Right Videos (axler.net)](https://www.linear.axler.net/LADRvideos.html) Video Lectures 观看
  - [ ] MIT 18.700 Readings 完成并总结，总结见此
  - [ ] MIT 18.700 Assignments 完成并总结
  - [ ] MIT 18.700 Supplementary Notes 阅读并总结，总结见此
  - [ ] [18.700 Course page (mit.edu)](https://math.mit.edu/~dav/700.14.html) 现代版 Reading 完成并总结，总结见此
  - [ ] [18.700 Course page (mit.edu)](https://math.mit.edu/~dav/700.14.html) 现代版 Problem Sets 完成并总结，总结见此
  - [ ] [Math 115A (ucla.edu)](https://www.math.ucla.edu/~tao/resource/general/115a.3.02f/) 陶哲轩亲授，笔记见此[linear-algebra-notes.pdf (wordpress.com)](https://terrytao.wordpress.com/wp-content/uploads/2016/12/linear-algebra-notes.pdf)

- [ ] MIT 18.303 Linear Partial Differential Equations: Analysis and Numerics

  - [ ] Strang, Gilbert. *Computational Science and Engineering*. 阅读并总结
  - [ ] <https://www.amazon.com/Introduction-Differential-Equations-Undergraduate-Mathematics/dp/3319020986> 阅读并总结
  - [ ] [mitmath/18303: 18.303 - Linear PDEs course (github.com)](https://github.com/mitmath/18303) Notes 阅读
  - [ ] [mitmath/18303: 18.303 - Linear PDEs course (github.com)](https://github.com/mitmath/18303) Midterm 完成
  - [ ] [mitmath/18303: 18.303 - Linear PDEs course (github.com)](https://github.com/mitmath/18303) Problem Sets 完成
  - [ ] [mitmath/18303: 18.303 - Linear PDEs course (github.com)](https://github.com/mitmath/18303) Supplementary Notes 阅读并总结
  - [ ] [Syllabus | Linear Partial Differential Equations: Analysis and Numerics | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-303-linear-partial-differential-equations-analysis-and-numerics-fall-2014/pages/syllabus/) Lecture Summaries 阅读并总结
  - [ ] [Syllabus | Linear Partial Differential Equations: Analysis and Numerics | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-303-linear-partial-differential-equations-analysis-and-numerics-fall-2014/pages/syllabus/) Assignments 完成
  - [ ] [Syllabus | Linear Partial Differential Equations: Analysis and Numerics | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-303-linear-partial-differential-equations-analysis-and-numerics-fall-2014/pages/syllabus/) Exam 完成
  - [ ] [Syllabus | Linear Partial Differential Equations: Analysis and Numerics | Mathematics | MIT OpenCourseWare](https://ocw.mit.edu/courses/18-303-linear-partial-differential-equations-analysis-and-numerics-fall-2014/pages/syllabus/) Projects 完成

- [ ] MIT 18.04 Complex Variables with Applications

- [ ] 数学物理方法（数学物理方程）

  > 这门课是我自己加上的，原 MIT 的路线中没有这门，学习路径仅供参考

- [ ] MIT 18.05 Introduction to Probability and Statistics

  - [ ] Introduction to Probability 阅读

- [ ] MIT Mathematics for Computer Science

  - [ ] [Book of proof (vcu.edu)](https://www.people.vcu.edu/~rhammack/BookOfProof/Main.pdf#page=77)
  - [ ] 格里马尔迪离散数学
  - [ ] [离散数学及其应用 (豆瓣) (douban.com)](https://book.douban.com/subject/1649803/)
  - [ ] [An Introduction to Mathematical Reasoning: Numbers, Sets and Functions : Eccles, Peter J. (University of Manchester): Amazon.sg: Books](https://www.amazon.sg/Introduction-Mathematical-Reasoning-Numbers-Functions/dp/0521597188)
  - [ ] Induction and Analogy in Mathematics
  - [ ] [Amazon.com: A Transition to Mathematics with Proofs (International Series in Mathematics): 9781449627782: Cullinane, Michael J: Books](https://www.amazon.com/Transition-Mathematics-Proofs-International/dp/1449627781)
  - [ ] [Journey into Mathematics: An Introduction to Proofs (Dover Books on Mathematics): Rotman, Joseph J.: 9780486453064: Amazon.com: Books](https://www.amazon.com/Journey-into-Mathematics-Introduction-Proofs/dp/0486453065)
  - [ ] [Proofs and Fundamentals: A First Course in Abstract Mathematics: 0 : Bloch, Ethan D.: Amazon.sg: Books](https://www.amazon.sg/Proofs-Fundamentals-Course-Abstract-Mathematics/dp/1441971262)
  - [ ] [Proof in Mathematics: An Introduction: Franklin, James, Daoud, Albert: 9780646545097: Amazon.com: Books](https://www.amazon.com/Proof-Mathematics-Introduction-James-Franklin/dp/0646545094)
  - [ ] [Mathematical Proofs: A Transition to Advanced Mathematics : Chartrand, Gary, Polimeni, Albert D., Zhang, Ping: Amazon.sg: Books](https://www.amazon.sg/Mathematical-Proofs-Transition-Advanced-Mathematics/dp/0321797094)
  - [ ] Discrete mathematics and its applications 阅读

- [ ] MIT Intro to Mathematical Reasoning

- [ ] MIT Principles of discrete Applied mathematics

- [ ] MIT 18.330 Introduction to Numerical Analysis

- [ ] MIT 6.3700 Introduction to Probability

- [ ] 6.3800 Introduction to Inference

- [ ] 18.05 Introduction to Probability and Statistics

- [ ] MIT 18.600 Probability and Random Variables

- [ ] MIT 18.650 Fundamentals of Statistics

- [ ] MIT 18.510 Introduction to Mathematical Logic and Set Theory

- [ ] MIT 18.504 Seminar in Logic

- [ ] MIT 18.515 Mathematical Logic

阶段二：分析入门 & 高等代数入门

- [ ] 基础不等式巩固
- [ ] 代数基础巩固
- [ ] 其他内容巩固
- [ ] 科朗《什么是数学》阅读
- [ ] 菲赫金哥尔茨《微积分学教程》阅读并完成笔记
- [ ] 吉米多维奇《数学分析习题集》刷完，习题解答见此
- [ ] 微积分进阶
- [ ] 数学分析入门
- [ ] 数学分析进阶
- [ ] 18.100A Real Analysis
- [ ] 18.100B Real Analysis
- [ ] 18.100P Real Analysis
- [ ] 18.100Q Real Analysis
- [ ] 数学分析习题集
- [ ] MIT 18.S190 [Introduction To Metric Spaces](https://ocw.mit.edu/courses/18-s190-introduction-to-metric-spaces-january-iap-2023/) 或 [18.S190, IAP 2023 (mit.edu)](https://web.mit.edu/paigeb/www/18.S190/)
- [ ] MIT 18. S191 [index — Interactive Computational Thinking — MIT](https://computationalthinking.mit.edu/Fall23/)
- [ ] MIT 18.701 Algebra I
- [ ] MIT 18.335[J] Introduction to Numerical Methods
- [ ] 6.7300[J] Introduction to Modeling and Simulation
- [ ] 16.920[J] Numerical Methods for Partial Differential Equations
- [ ] 18.085 Computational Science and Engineering I
- [ ] MIT 18.336[J] Fast Methods for Partial Differential and Integral Equati
- [ ] 18.204 Undergraduate Seminar in Discrete Mathematics
- [ ] 18.211 Combinatorial Analysis
- [ ] 高等代数

阶段三：计算机知识进阶

- [ ] 6.120A Discrete Mathematics and Proof for Computer Science
- [ ] 6.1210 Introduction to Algorithms
- [ ] 18.400[J] Computability and Complexity Theory
- [ ] 18.404 Theory of Computation
- [ ] 18.410[J] Design and Analysis of Algorithms
- [ ] 18.424 Seminar in Information Theory
- [ ] 18.434 Seminar in Theoretical Computer Science

阶段四：一些理论

- [ ] 18.453 Combinatorial Optimization
- [ ] 18.337[J] Parallel Computing and Scientific Machine Learning
- [ ] 18.338 Eigenvalues of Random Matrices
- [ ] 18.367 Waves and Imaging

阶段五：算法理论提升和物理基础巩固

- [ ] 微积分应用：普通物理学习
  - [ ] 《University Physics》阅读并做笔记，笔记见此
  - [ ] Yale Fundamentals of physics I 学习
  - [ ] Yale Fundamentals of physics II 学习
  - [ ] 普通物理个人总结完成，总结见此
  - [ ] MIT Classical Mechanics 学习
  - [ ] 经典力学个人总结完成，总结见此
  - [ ] MIT Physics II: Electricity and Magnetism 学习
  - [ ] 电磁学个人总结完成，总结见此
  - [ ] MIT Relativity 学习
  - [ ] 相对论个人总结完成，总结见此
  - [ ] MIT [Physics III: Vibrations and Waves](https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/) 学习
  - [ ] 振动与波的个人总结完成，总结见此
- [ ] 18.415[J] Advanced Algorithms
- [ ] 18.416[J] Randomized Algorithms
- [ ] 18.425[J] Foundations of Cryptography
- [ ] 8.01 Physics I
- [ ] 8.02 Physics II
- [ ] 8.03 Physics III
- [ ] 8.04 Quantum Physics I
- [ ] 8.041 Quantum Physics I
- [ ] 8.05 Quantum Physics II
- [ ] 18.435[J] Quantum Computation
- [ ] 18.437[J] Distributed Algorithms

阶段六：数学理论继续强化

- [ ] 18.455 Advanced Combinatorial Optimization
- [ ] 18.702 Algebra II
- [ ] 18.703 Modern Algebra
- [ ] 18.783 Elliptic Curves
- [ ] 18.102 Introduction to Functional Analysis
- [ ] 18.112 Functions of a Complex Variable
- [ ] 18.642 Topics in Mathematics with Applications in Finance
- [ ] 18.125 Measure Theory and Analysis
- [ ] 18.675 Theory of Probability
- [ ] 18.676 Stochastic Calculus
- [ ] 18.615 Introduction to Stochastic Processes
- [ ] 18.657 Topics in Statistics
- [ ] 18.900 Geometry and Topology in the Plane
- [ ] 18.212 Algebraic Combinatorics
- [ ] 18.901 Introduction to Topology
- [ ] 18.721 Introduction to Algebraic Geometry
- [ ] 18.781 Theory of Numbers
- [ ] 18.950 Differential Geometry
- [ ] 18.217 Combinatorial Theory
- [ ] 18.218 Topics in Combinatorics
- [ ] 18.225 Graph Theory and Additive Combinatorics
- [ ] 18.226 Probabilistic Methods in Combinatorics
- [ ] 18.705 Commutative Algebra
- [ ] 18.715 Introduction to Representation Theory
- [ ] 18.725 Algebraic Geometry I
- [ ] 18.745 Lie Groups and Lie Algebras I

完成以上内容，可以自由地在计算机世界里遨游啦！

---

## 纯数部分

### 代数

- [ ] ### 18.704 Seminar in algebra
- [ ] ### 18.782 Introduction to Arithmetic Geometry
- [ ] ### 18.706 Noncommutative algebra
- [ ] ### 18.755 Lie Groups and Lie Algebras II
- [ ] ### 18.755 Lie Groups and Lie Algebras II

### 分析与几何

- [ ] ### 18.101 Analysis and Manifolds
- [ ] ### 18.102 Introduction to Functional Analysis
- [ ] ### 18.103 Fourier Analysis: Theory and Applications
- [ ] ### 18.104 Seminar in Analysis
- [ ] ### 18.112 Functions of a Complex variable
- [ ] ### 18.152 Introduction to Partial Differential Equations
- [ ] ### 18.950 Differential Geometry
- [ ] ### 18.994 Seminar in Geometry
- [ ] ### 18.125 Measure Theory and Analysis
- [ ] ### 18.155 Differential Analysis I
- [ ] ### 18.156 Differential Analysis II
- [ ] ### 18.952 Theory of Differential Forms
- [ ] ### 18.965 Geometry of Manifolds I
- [ ] ### 18.966 Geometry of Manifolds II

### 数论

- [ ] ### 18.781 Theory of numbers
- [ ] ### 18.784 Seminar in Number Theory
- [ ] ### 18.785 Number Theory I

### 概率与统计

- [ ] ### 18.677 Topics in Stochastic Processes
- [ ] ### 18.655 Mathematical Statistics

### 拓扑与几何

- [ ] ### 18.904 Seminar in Topology
- [ ] ### 18.116 Riemann Surfaces
- [ ] ### 18.905 Algebraic Topology I
- [ ] ### 18.906 Algebraic Topology II

完成以上内容，你已经是一个数学方面的强者啦！

---

## 其他方向应用数学

### 物理数学

- [ ] ### 18.300 Principles of Continuum Applied mathematics
- [ ] ### 18.352[J] Nonlinear Dynamics: The Natural Environment
- [ ] ### 18.353[J] Nonlinear Dynamics: Chaos
- [ ] ### 18.354[J] Nonlinear Dynamics: Continuum Systems
- [ ] ### 18.384 Undergraduate Seminar in Physical mathematics
- [ ] ### 18.417 Introduction to Computational Molecular Biology
- [ ] ### 18.305 Advanced Analytic Methods in Science and Engineering
- [ ] ### 18.306 Advanced Partial Differential Equations with Applications
- [ ] ### 2.25 Fluid Mechanics
- [ ] ### 12.800 Fluid Dynamics of the Atmosphere and Ocean
- [ ] ### 18.355 Fluid Mechanics
- [ ] ### 18.357 Interfacial Phenomena
- [ ] ### 18.367 Waves and Imaging
- [ ] ### 8.07 Electromagnetism II
- [ ] ### 18.369[J] Mathematical Methods in Nanophotonics
- [ ] ### 2.003[J] Dynamics and Control I
- [ ] ### 18.075 Methods for Scientists and Engineers
- [ ] ### 18.376[J] Wave Propagation
- [ ] ### 18.377[J] Nonlinear Dynamics and Waves

完成以上内容，你的数学基础就已经足够你学习物理啦！

### 金融与经济数学

经济与金融数学所要求的数学，已经被计算机应用数学、物理应用数学和纯数学方向的课程完全囊括，因此如果上面内容全部学完，金融与经济数学就无需担心。
