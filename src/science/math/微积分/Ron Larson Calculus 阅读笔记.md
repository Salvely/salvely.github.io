---
date: 2024-05-20
title: Ron Larson Calculus 阅读笔记
shortTitle: Ron Larson Calculus 阅读笔记
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
date updated: 2024-05-20 16:06
---

> 学习本教材的目的是：
>
> 1. 掌握微积分基础知识
> 2. 巩固计算能力
>
> 前 5 章内容分别为：微积分前置知识，极限，微分，微分的应用，一些常见的指对数和超越函数介绍。内容较为简单，因此这里不再详细展示。本笔记从第六章：微分方程的解法开始。

## Chapter 6：微分方程

> 本章最开始介绍了`Slope Field`，即一个函数的导数与其变量 x 和 y 相关，这种形式的方程称为微分方程，我们可以通过取点在图上画出它的函数图像，而后可以通过欧拉法近似的对它进行求解。而后又介绍了增长和衰减微分方程，这是微分方程的应用体现。接下来的就是几种常见微分方程形式的解法，我们直接进入正题。此外，P443-444 有大量基础习题可供练习。本章应用题未做。

- **可分离变量微分方程**
  - 对形如$M(x)+N(y)\frac{dy}{dx}=0$的式子：进行分离变量，然后两边同时积分，得到一个不定积分
- **齐次微分方程**
  - 对具备$f(tx,ty)=t^{n}f(x,y)$特性的函数，我们称之为齐次函数。
  - 一个包含齐次函数的微分方程$y'=f(x,y)$或$M(x,y)dx+N(x,y)dy=0$，可以通过换元，令$u=\frac{y}{x}$。
  - 此时$y=ux$，那么$y'=u'x+u$。用$u$替换$f(x,y)$中的$\frac{y}{x}$；用$u'x+u$替换$y'$，可以得到一个关于$u$和$x$的可分离变量的微分方程，然后遵循前一条的方法进行积分。得出结果后用$\frac{y}{x}$替换掉$u$
- **一阶线性微分方程**
  - 形如$\frac{dy}{dx}+P(x)y=Q(x)$，$P(x)$和$Q(x)$都是关于 x 的连续函数，这种形式被称为标准形。对于一个线性微分方程，我们需要先将其转化为标准型，得到$P(x)$和$Q(x)$。然后：
  - 首先我们对$P(x)$进行积分，得到$u(x)=e^{\int{P(x)dx}}$，$u(x)$被称之为`integrating factor`
  - 方程的通解是$y=\frac{1}{u(x)}\int{Q(x)u(x)dx}$
  - 这个结果的原因是：对$\frac{dy}{dx}+P(x)y=Q(x)$左右同乘以$u(x)$后，式子的左边刚好是两个函数的导数的形式$(y*u(x))'=Q(x)*u(x)$，其中一个函数就是$u(x)$，而右边也对$Q(x)$同乘了$u(x)$，因此对两边积分，就可以得到方程的通解（这是一个巧妙的小发现！但是我还不知道为什么，以后总会知道的！）
  - 注意：
    - 求解的时候，要注意常数项在积分后的括号里，不要漏掉它了
    - 在求解应用的时候，可以注意一下限制条件，有条件的去除绝对值符号
    - 此外，求$u(x)$那个不定积分时，不需要带常数
  - 应用包括（课本 P441，445-446 面有较多的应用习题）
    - 混合物问题
    - 空气阻力问题
    - RL 电路电流求解问题
- **伯努利方程（n 阶非线性微分方程）**
  - 可以降阶到 1 阶线性
  - 形如$y'+P(x)y=Q(x)y^{n}$
  - n=0 时，为一阶线性微分方程
  - n=1 时，为可以分离变量的微分方程
  - 其他阶次时，推导如下：
    1. 首先对两边同时乘以$y^{-n}$，可以得到：$y^{-n}y'+y^{1-n}P(x)=Q(x)$
    2. 然后对两边同时乘以$1-n$，可以得到$(1-n)y^{-n}y'+(1-n)y^{1-n}P(x)=(1-n)Q(x)$
    3. 然后我们可以发现，最左边的那一项，其实就是$(y^{1-n})'$，因此我们可以将其化成$(y^{1-n})'+(1-n)P(x)y^{1-n}=(1-n)Q(x)$
    4. 观察上面那个式子，其实他是$(y^{1-n})'$的一阶线性微分方程，对这个方程，其
       $P_{1}(x)=(1-n)P(x)$
       $Q_{1}(x)=(1-n)Q(x)$
       然后可以用之前的方式计算它的通解，只不过这里需要把$y$替换为$y^{1-n}$
- 总结
  ![](differential_equation_summary.png)
- 习题类型
  - 可分离变量的微分方程的通解求解
  - slope field 的绘制（先确定几个坐标点处的斜率，然后再绘制图像）
  - 一阶线性微分方程的通解求解
  - 齐次微分方程的通解求解
  - 伯努利微分方程的通解求解
  - 证明某个函数是某个微分方程的通解，并且求它的特解
  - 几个应用模型

## Chapter 7：积分的应用

> 本章的重点在于计算

- 求两曲线之间所夹的面积
  - 注意哪条曲线在上，哪条在下
  - 可以选择不同的切割方法
- 求体积
  - 圆盘法：部分立体图形需要借助一些几何关系，而不只是题目所给的函数
    - 基础旋转
    - 绕非 x 轴旋转
    - 两曲线之间相夹部分旋转
    - 绕 y 轴旋转
    - 横切和纵切，寻找立体图形的几何关系
      ![](known%20cross%20section.png)
    - 易错点
      - 图形搞错
      - 上下界搞错
      - 计算不仔细
      - 部分体积做题时容易忽略
    - 应当刷题巩固
  - 壳层法
- 求弧长
  - $ds=\sqrt{dx^2+dy^2} = \sqrt{(dx^2)(1+(\frac{dy}{dx})^2)} = \sqrt{1+(\frac{dy}{dx})^2}dx=\sqrt{1+y'}dx$
  - $ds=\sqrt{dx^2+dy^2} = \sqrt{(dy^2)(1+(\frac{dx}{dy})^2)} = \sqrt{1+(\frac{dx}{dy})^2}dy=\sqrt{1+x'}dy$
- 求旋转体的表面积
  - $dS=2\pi rds$
  - 如果$r$是关于 x 的函数$f(x)$，那么$dS=2\pi f(x)\sqrt{1+y'}dx$
  - 否则，$dS=2\pi f(y)\sqrt{1+x'}dy$
- 求功
  - 力为常量：$W=Fx$
  - 力为变量：$W=\int_{a}^{b}{F(x)dx}$
  - 三种常见的力学定律
    - 弹力定律：$F=kd$
    - 引力定律：$F=k\frac{m_{1}m_{2}}{d}$
    - 库仑定律：$F=k\frac{q_{1}q_{2}}{d}$
- 求矩，重心和质心
  - 矩：$Moment=mx$
  - 对于一维平面：
    - 关于源点的矩：$M_{0} = m_{1}x_{1}+m_{2}x_{2}+...+m_{n}x_{n}$
    - 质心：$\bar{x}=\frac{M_{0}}{m}$
  - 对于二维平面，且平面质量密度为 1：
    - 关于 x 轴的矩：$M_{x}=m_{1}x_{1}+m_{2}x_{2}+...+m_{n}x_{n}$
    - 关于 y 轴的矩：$M_{y}=m_{1}y_{1}+m_{2}y_{2}+...+m_{n}y_{n}$
    - 质心 x 坐标：$\bar{x}=\frac{M_{x}}{m}$
    - 质心 y 坐标：$\bar{y}=\frac{M_{u}}{m}$
  - 需要解释的是，在矩的计算过程中的$x_{n}$和$y_{n}$并不是普通的而坐标，而是$x$轴上该坐标和源点轴的距离。譬如关于$x=3$的矩中，$x_{1}=x-3$
  - 对于一块夹在$f(x)$和$g(x)$中的平面，且平面质量密度为$\rho$
    - 首先，要求矩和质心，我们需要知道 3 个值
      - 总质量
      - x 轴上，单个单位的质量与相对距离的积的和
      - y 轴上，单个单位的质量与相对距离的积的和
    - 因此我们需要将问题拆解为几个步骤：
      - 面积求解
      - 总质量求解
      - 单个单位的质量求解
      - 单个单位与对称轴的相对距离求解
      - 单个单位面积的矩求解
    - 该平面的总质量=密度 \* 面积，也就是$m=\rho A=\rho \int_{a}^{b}f(x)-g(x)dx$
    - 对 x 轴：
      - x 轴上$x_{i}$处的质量 $m_{i}=\rho dA = \rho (f(x_{i})-g(x_{i}))dx$
      - x 轴上$x_{i}$处的矩 = $m_{i}x_{i}=\rho (f(x_{i})-g(x_{i}))x_{i}dx$
      - x 轴上的矩的大小为$M_{x}=\int_{a}^{b}\rho (f(x)-g(x))xdx$
      - 关于 x 轴的质心为：$\bar{x}=\frac{M_{x}}{m}$
    - 对 y 轴：
      - $x_{i}$处的质量与 x 轴的情况下相同，$m_{i}=\rho dA = \rho (f(x_{i})-g(x_{i}))dx$
      - y 轴上$y_{i}$处的矩 = $m_{i}y_{i}=\rho (f(x_{i})-g(x_{i}))\frac{f(x_{i})+g(x_{i})}{2}dx$
      - y 轴上矩的大小为$M_{y}=\int_{a}^{b}\rho (f(x)-g(x))\frac{f(x)+g(x)}{2}dx$
      - 关于 y 轴的质心为：$\bar{y}=\frac{M_{y}}{m}$
- 求流体压强和流体作用力
  - 液体压强$P=wh$，其中$w$是单位体积的液体密度，$h$是深度
  - 流体作用力的大小$F=PA=whA$，其中 P 是压强，A 是面积
  - 当物体横跨不同深度时，情况如下：
    - 这其中的变量有多个：
      - 深度
      - 面积
    - 我们需要对不同深度下的压强微元进行积分，我们将
      - 当前微元所在的深度表示为$h(y_{i})$
        > 为什么直接用$y_{i}$作为深度，是因为如果 y 轴向上建系，那么水下的$y_{i}$是个负数，深度$h$是个正数，所以通常$h(y_{i})=-y_{i}$
      - 当前微元的长度为$L_{y_{i}}$
      - 当前微元的宽度为$dy$
    - 那么两个变量的值分别为：
      - 深度$h(y_{i})$
      - 面积$L(y_{i})dy$
    - 那么当前微元的压强为$dP=wh(y_{i})L(y_{i})dy$
    - 那么总的压强为$P=\int_{c}^{d}wh(y)L(y)dy$

## Chapter 8：积分技巧，洛必达法则及反常积分

> 本章的重点在于计算

- 基础换元方法
  - 比较下列三种的解法差别：
    - $\int \frac{4}{x^2+9}dx$：该式子基于$arctan \frac{x}{3}$ 的导数，稍作变换即可
    - $\int \frac{4x}{x^2+9}dx$：使用换元法，令$u=x^2+9$，则$du=2xdx$，即可求解
    - $\int \frac{4x^2}{x^2+9}dx$：将$4x^2$拆分为$4(x^2+9)-36$，然后将式子改为$\int 4dx + \int \frac{-36}{x^2+9}dx$，然后用第一个式子的积分方法
  - 利用反三角函数的导数换元：形如$a^2-u^2$，利用 $(arcsinx)'=\frac{1}{1-x^2}$
  - 分式转化，如将$\frac{1}{1+e^x}$转化为$1-\frac{e^x}{1+e^x}$
  - 利用基本的换元法
  - 使用三角函数的基本性质换元
    - $\sec^2x=\tan^2x+1$
    - $\sin^2x+\cos^2x=1$
    - $\cos2x=2cos^2x-1=cos^2x-sin^2x=1-2sin^2x$
  - 一些重要的积分公式（可以参见课本 P523）
    ![](integration%20rules.png)
- 分部积分法
  - 基于$(uv)'=u'v+v'u$
  - 因此 $uv = \int u'v + \int v'u$，因此可以得到$\int udv = uv - \int vdu$
  - 两项重要考点
    - 找准$u$和$v$
    - 使用多次分部积分来求解$f^n(x)$的积分问题，尤其是高次幂三角函数中的积分问题
    - 重要的积分表
      ![](integration%20by%20parts%20rules.png)
    - 使用 Tabular Method 解决问题（参见课本 P532）
      ![](tabular%20method.png)
      > For more information on the tabular method, see the article “Tabular Integration by Parts” by David Horowitz in The College Mathematics Journal, and the article “More on Tabular Integration by Parts” by Leonard Gillman in The College Mathematics Journal. To view these articles, go to the website [www.matharticles.com](http://www.matharticles.com).
- 多次幂三角积分法
  - $\sin x$和$\cos x$一族
    - $\int \sin^m(x)\cos^n(x)$
    - 重要公式
      - $sin^2(x)+cos^2(x)=1$
    - 4 种情况
      - m 为奇数，n 为偶数
        - 拆一个$sin(x)$出来，其他的用$(sin^2(x))^k$替代
        - 将$sin^2(x)$用$1-cos^2(x)$替代
      - m 为偶数，n 为奇数
        - 拆一个$cos(x)$出来，其他的用$(cos^2(x))^k$替代
        - 将$cos^2(x)$用$1-sin^2(x)$替代
      - m，n 均为偶数
        - $sin^2(x)=\frac{1-cos(2x)}{2}$
        - $cos^2(x)=\frac{1+cos(2x)}{2}$
      - 只有$cos(x)$或$sin(x)$且次数为偶数
        - 不断地利用倍角公式降次：
          - $cos^2(x)=\frac{1+cos(2x)}{2}$
          - $sin^2(x)=\frac{1-cos(2x)}{2}$
      - 只有$cos(x)$或$sin(x)$且次数为奇数怎么办？不知道。。。
    - m=n=1 时的几种情况：
      ![](sin%20and%20cos.png)
  - $\tan x$和$\sec x$一族
    - $\int sec^m(x)tan^n(x)$
    - 5 种情况
      - m 为偶数且为正
        - 拆出一个$sec^2(x)$作为$\tan x$的导数，其他的$sec^2(x)$转化为$1+\tan^2(x)$
      - n 为奇数且为正
        - 拆出一个$\sec x\tan x$，其他的$\tan^2(x)$转化为$\sec^2(x)-1$
      - 无$\tan x$且 m 为奇数且为正
        - 使用分部积分法（上一节）
      - 无$\sec{x}$且 n 为奇数且为正
        - 拆出一个$\tan^2(x)$，将其转化为$\sec^2(x)-1$，对剩余的部分继续这样转化
      - 上述没有一个符合->转化为$\sin$和$\cos$，然后根据其规律求解
  - $\cot x$和$\csc x$一族（本书未详细讲述这一点，该知识点可以参考《Calculus with Analytic Geometry》和《Thomas Calculus》
- 三角换元法
  - 三种常见分母（最后利用三角形进行还原工作）
    - $\sqrt{a^2-u^2}$：利用恒等式$\cos^2\theta=1-\sin^2\theta$，令$u=a\sin\theta$
    - $\sqrt{a^2+u^2}$：利用恒等式$\sec^2\theta=1+\tan^2\theta$，令$u=a\tan\theta$
    - $\sqrt{u^2-a^2}$：利用恒等式$\tan^2\theta=\sec^2\theta-1$，令$u=a\sec\theta$
  - 另外三种常见分子：（教材 P549）
    ![](special%20integration%20formulas.png)
  - 应用
    - 求解弧长
    - 比较流体作用力
- 有理分式积分法
- 查表法（这个不多说，就是查表）
- 不定式和洛必达法则
  - 不定式
    - 0/0 型和$\frac{\infty}{\infty}$
    - 其他形式：转化为上述两种
  - 对分子分母求其导数的极限，如果其导数还是不定式，就继续求导，直到其为非不定式为止
  - 注意：慎用！很多不定式可能越求导越复杂！
- 反常积分
  - 函数可能不是连续的，中间有无穷间断点，那么我们就不能直接对整个定义域求积分，求出来的值是不正确的。需要将其划分为多个段，分别求积分
  - 对于包含无穷间断点的定义域，求积分的方法是：将无穷间断点替换为常数，求解其积分，然后取$\lim\limits_{c\rightarrow\infty}$
  - 一个重要的反常积分，涉及到$\frac{1}{x^p}$函数的敛散性
    ![](a%20special%20type%20of%20improper%20integral.png)

> 学完这章后完成 Chapter 7-8 的习题，并完善笔记

## Chapter 9：无穷级数\*

> 边学习边完成习题

- 序列
- 级数及其敛散性
- 积分判定法 & p-series
- 级数比较
- 交错级数
- 比例判定法 & 求根判定法
- 泰勒多项式和近似
- 幂级数
- 用幂级数表示函数
- 泰勒和麦克劳林级数

## Chapter 10：圆锥曲线，参数方程和极坐标\*

> 边学边完成习题

- 圆锥曲线和微积分
- 平面曲线和参数方程
- 参数方程和微积分
- 极坐标和极坐标下的几个经典图形
- 极坐标下的面积和弧长
- 极坐标下的圆锥曲线和开普勒定律

## Chapter 11：向量和空间几何

> 想要知道点乘和叉乘公式是怎么来的？点击[linear algebra - Origin of the dot and cross product? - Mathematics Stack Exchange](https://math.stackexchange.com/questions/62318/origin-of-the-dot-and-cross-product)

- 平面中的向量

  - 向量和标量的差别：向量不止有大小，还有方向
  - 向量的大小：$|\vec{v}| = \sqrt{v_{0}^2+v_{1}^2+...+v_{n}^2}$, 来源于距离公式
  - 向量相等：大小相同，方向相同
  - 单位向量：大小为 1 的向量
  - 零向量：大小为 0 的向量
  - 运算性质
    - 向量和=两向量各个分量相加
    - 向量差=两向量各个分量相减
    - 向量和标量的乘积=标量与向量中每个分量相乘
    - 向量取反=（-1）乘以向量中每个分量
  - 几何特性：依据平行四边形定则
  - 向量空间公理
    ![](properties%20of%20vector%20operations.png)
  - 求解一个向量方向上的单位向量：$\vec{u}=\frac{\vec{v}}{|v|}$
  - 标准单位向量：$\vec{i}=(1,0)$，$\vec{j}=(0,1)$
  - 用标准单位向量表示其他向量：$\vec{v}=v_{1}\vec{i}+v_{2}\vec{j}$，这种写法称$\vec{v}$为$\vec{i}$和$\vec{j}$的线性组合，$\vec{i}$和$\vec{j}$为$\vec{v}$在水平和垂直方向上的分量
  - 应用：
    - 力的合力与力的分解
    - 求合速度及合速度的分解

- 空间坐标系和空间中的向量

  - 三维坐标系
  - 三维坐标系两点之间的距离公式
  - 三维坐标系中的向量：大部分公理和二维平面中的向量相同，此处不再重复
  - 向量平行：两向量方向相同，大小相差一个标量的倍数，其中$\vec{u}=c\vec{v}$
  - 应用：依然是力和速度

- 向量点乘（dot product/scalar product/inner product）

  - $\vec{u}\cdot\vec{v}=u_{1}v_{1}+u_{2}v_{2}+...+u_{n}v_{n}$
  - 点乘的性质：
    ![](properties%20of%20the%20dot%20product.png)
  - 三角形夹角求解
    - 夹角公式推导
      - 余弦公式如下：$c^2=a^2+b^2-2ab\cos C$
      - 那么$\cos C=\frac{a^2+b^2-c^2}{2ab}$
      - 将该公式用向量表示，$a^2=|\vec{v_{1}}|^2$，$b^2=|\vec{v_{2}}|^2$，$c^2=|\vec{v_{1}}-\vec{v{2}}|^2$
      - 则该公式可表示如下：$|\vec{v_{1}}-\vec{v{2}}|^2 = |\vec{v_{1}}|^2 + |\vec{v_{2}}|^2-2|\vec{v_{1}}||\vec{v_{2}}|cosC$
      - 又因为$|\vec{v_{1}}-\vec{v{2}}|^2 = |\vec{v_{1}}|^2 + |\vec{v_{2}}|^2-2\vec{v_{1}}\cdot\vec{v_{2}}$
      - 那么可以推导出：$|\vec{v_{1}}||\vec{v_{2}}|cosC=\vec{v_{1}}\cdot\vec{v_{2}}$
      - 因此$\cos C=\frac{\vec{v_{1}}\cdot\vec{v_{2}}}{|\vec{v_{1}}||\vec{v_{2}}|}$
    - 由夹角公式可以看到，由于$|\vec{v_{1}}||\vec{v_{2}}|$恒为正，因此$\cos C$的正负和$\vec{v_{1}}\cdot\vec{v_{2}}$的正负恒相同
    - 此外，对于两个非零向量，当$\vec{v_{1}}\cdot\vec{v_{2}}=0$时，$\cos C=0$，两向量夹角为 90°
    - 正交向量：夹角为 90° 的两个向量称为正交向量
      - 向量之间：用`orthogonal`
      - 平面之间：用`perpendicular`
      - 向量和平面之间：用`normal`
  - 方向角求解
    - 假设$\vec{v}=<v_{1},v_{2},v_{3}>$，这三个分量分别是$\vec{v}$在 x、y、z 轴上的投影
    - $\vec{v}$与$\vec{i}$之间：
      - $\vec{v}$在 x 轴上的投影是：$v_{1}$
      - 夹角的余弦值为：$\cos \alpha=\frac{\vec{v_{1}}}{|\vec{v}|}$
    - $\vec{v}$与$\vec{j}$之间：
      - $\vec{v}$在 y 轴上的投影是：$\vec{v_{2}}$
      - 夹角的余弦值是：$\cos \beta=\frac{\vec{v_{2}}}{|\vec{v}|}$
    - $\vec{v}$与$\vec{k}$之间：
      - $\vec{v}$在 z 轴上的投影是：$\vec{v_{3}}$
      - 夹角的余弦值是：$\cos \gamma=\frac{\vec{v_{3}}}{|\vec{v}|}$
    - $\vec{v}$方向上的单位向量$\vec{u}=\frac{\vec{v}}{|\vec{v}|}=\frac{\vec{v_{1}}}{|\vec{v}|}\vec{i}+\frac{\vec{v_{2}}}{|\vec{v}|}\vec{j}+\frac{\vec{v_{3}}}{|\vec{v}|}\vec{k}$
    - 该单位向量也可以写作：$\vec{u}=\cos \alpha\vec{i}+\cos \beta\vec{j}+\cos\gamma\vec{k}$
    - 此外，因为$v_{1},v_{2},v_{3}$是向量$\vec{v}$在 x、y、z 轴上的投影，因此可以得到关系式$\cos^2\alpha +\cos^2\beta+\cos^2\gamma=1$
  - 投影和向量正交分解
    - 投影：要求解一个向量$\vec{u}$在另一个向量$\vec{v}$上的投影，我们需要以下几步：
      - 求解$\vec{u}$和$\vec{v}$之间的夹角的余弦$\cos \theta$
      - 投影的长度 = 投影向量的长度$|\vec{u}|$ \* 夹角的余弦值$\cos\theta$
      - 投影的方向 = 向量$\vec{v}$方向上的单位向量，为$\frac{\vec{v}}{|\vec{v}|}$
      - 因此向量$\vec{u}$在$\vec{v}$上的的投影为：投影的长度 \* 投影的方向 = $(|\vec{u}|\cos\theta)\frac{\vec{v}}{|\vec{v}|}$
      - 因为$\cos\theta=\frac{\vec{u}\cdot\vec{v}}{|\vec{u}||\vec{v}|}$
      - 因此，投影的公式为$(|\vec{u}|\frac{\vec{u}\cdot\vec{v}}{|\vec{u}||\vec{v}|})\frac{\vec{v}}{|\vec{v}|}=\frac{\vec{u}\cdot\vec{v}}{|\vec{v}|^2}\vec{v}$
    - 正交向量
      - 和投影垂直的是该投影的正交向量，其可以用$\vec{u}-proj_{v}{u}$
  - 力的分解：求解一个力的投影及正交
  - 功的求解：功 = 力在某个位移方向上的投影**的长度** \* 位移**量**
    - 使用投影 \* 位移
    - 可以直接使用点乘
      - 可以直接使用点乘的原因是：功是一个标量，**其求解的是投影的长度 _ 位移量，而不是投影 _ 位移量。**
      - 在前面的推导中我们知道投影的长度为为$|\vec{u}|\cos\theta$，是在其后乘了一个单位向量才让它成为一个向量。
      - 位移是一个矢量，而位移量也是一个标量$|\vec{v}|$
      - 相乘的最后结果为$|\vec{u}||\vec{v}|\cos\theta$，也就是$\vec{u}\cdot\vec{v}$

- 向量叉乘

  - 作用：求解一个垂直于多个向量的向量（至少 3 维空间），使用代数余子式计算
  - 叉乘结果的方向：以$\vec{u}\times\vec{v}$为例，在右手系中，手掌从$\vec{u}$向$\vec{v}$弯曲，大拇指的方向就是叉乘结果的方向
  - 叉乘的几个代数性质：
    ![](algebraic%20properties%20of%20the%20cross%20product.png)
    - 第一条：依照叉乘向量的方向计算方法，等号左右两边的叉乘结果方向相反；也可以直接用代数式计算，得到与几何分析吻合的结果。
    - 第二条：
      - 从代数（行列式）的角度分析：
        - 设$\vec{v}=<v_{1},v_{2},v_{3}>$，$\vec{w}=<w_{1},w_{2},w_{3}>$，那么
          $$
          \vec{u}\times(\vec{v}+\vec{w})=\begin{bmatrix}\vec{i} & \vec{j} & \vec{k} \\ u_{1} & u_{2} & u_{3} \\ v_{1}+w_{1} & v_{2}+w_{2} & v_{3}+w_{3}\end{bmatrix}
          $$
        - 根据行列式的性质（具体参考[第 18 课 行列式及其性质\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1zx411g7gq/?p=18&vd_source=85acf0a59ded02e4c75ae1158baca207)），可得如下推导：
          $$
          \begin{bmatrix}\vec{i} & \vec{j} & \vec{k} \\ u_{1} & u_{2} & u_{3} \\ v_{1}+w_{1} & v_{2}+w_{2} & v_{3}+w_{3}\end{bmatrix}=\begin{bmatrix}\vec{i} & \vec{j} & \vec{k} \\ u_{1} & u_{2} & u_{3} \\ v_{1} & v_{2} & v_{3}\end{bmatrix}+\begin{bmatrix}\vec{i} & \vec{j} & \vec{k} \\ u_{1} & u_{2} & u_{3} \\ w_{1} & w_{2} & w_{3}\end{bmatrix}
          $$
        - 因此，结论 2 成立
    - 第五条：两个相同/平行的向量无法形成一个平面，因此无法得到关于它的垂直向量，因为只有一个向量；代数证明方法可以构造一个矩阵$\begin{bmatrix} \vec{i} & \vec{j} & \vec{k}\\ u_{1} & u_{2} & u_{3}\\ u_{1} & u_{2} & u_{3}\end{bmatrix}$，其后面两行完全相同，在计算行列式的值时，每个代数余子式的值都等于 0，因此最后的结果等于 0。
    - 第六条：
      - **从代数（行列式）的角度分析：这个结果是怎么得到的 TODO**
      - **从几何的角度分析：这个结果是怎么得到的 TODO**
  - 叉乘的几个几何性质
    ![](geometry%20properties%20of%20the%20cross%20product.png)
    - 第一条：根据方向计算方法可解
    - 第二条：课本中提供了从右向左的证明方法，如下：
      ![](cross%20product%20magnitude%20proof.png)
    - 第三条：根据第二条，当两向量平行时，$\sin\theta=0$，结果为 0
    - 第四条：根据第二条，$|\vec{v}|\sin\theta$的值等于$\vec{v}$在$\vec{u}$上投影的正交向量的长度，也就是以$\vec{u}$和$\vec{v}$围起来的平行四边形的高，因为平行四边形的面积=底 \* 高，因此叉乘向量的大小=平行四边形的面积；如果在这个基础上乘以$\frac{1}{2}$的话，得到的结果就是三角形的面积
  - 叉乘的几个应用
    - 求平行四边形面积
    - 求力矩：$M=\vec{F}\times\vec{PQ}$
  - triple scalar product（三维标量积？我也不知道该怎么翻译）
    - $\vec{u}\cdot(\vec{v}\times\vec{w})$
    - 计算方法如下：
      - ![](the%20triple%20scalar%20product.png)
    - 计算方法解释：
      - $\vec{v}\times\vec{w}$的结果是$\det(A)\vec{i}+\det(B)\vec{j}+\det(C)\vec{k}$，此处$\det$指的是三个代数余子式。让$\vec{u}$和这个式子点乘，结果也就是让$det(A)\cdot{u_{1}}+\det(B)\cdot{u_{2}}+\det(C)\cdot{u_{3}}$，那么其效果相当于把$u_{1},u_{2},u_{3}$放在叉乘矩阵的第一行
    - $\vec{u}\cdot(\vec{v}\times\vec{w})=\vec{v}\cdot(\vec{w}\times\vec{u})=\vec{w}\cdot(\vec{u}\times\vec{v})$
      - 原理
        - 对于$\vec{u}\cdot(\vec{v}\times\vec{w})$，$\vec{u}$ 的值在第一行，$\vec{v}$ 的值在第二行，$\vec{w}$ 的值在第三行
        - 核心为交换一行令行列式的值乘-1，交换两行令行列式的值不变
    - 应用：求以$\vec{u}$和$\vec{v}$为底，$\vec{w}$为斜边的平行六面体体积
      - 原理：平行四面体的体积 = 底面积 \* 高
      - 底面积 = 底边两个向量的叉乘的大小，也就是$|\vec{u}\times\vec{v}|$
      - 高 = 斜边，在底面两个向量叉乘方向上的投影，也就是$|proj_{|\vec{u}\times\vec{v}|}{\vec{w}}|$，也就是$|\frac{\vec{w}\cdot(\vec{u}\times\vec{v})}{|\vec{u}\times\vec{v}|^2}(\vec{u}\times\vec{v})|$
      - 那么相乘以后就是$|\vec{u}\times\vec{v}||\frac{\vec{w}\cdot(\vec{u}\times\vec{v})}{|\vec{u}\times\vec{v}|^2}(\vec{u}\times\vec{v})|$，得到公式$\vec{w}(\vec{u}\times\vec{v})$
    - 引申结论：当且仅当三个向量共平面时，triple scalar product = 0

- 空间中的直线和平面

  - 直线
    - 直线表示的两个要素：
      - 起始点：用一个坐标表示
      - 方向：用向量表示
    - 一条经过点$P(x_{0},y_{0},z_{0})$，方向为$<a,b,c>$的直线，可以用参数方程表示（t 是参数）：
      - $x = x_{0}+at$
      - $y=y_{0}+bt$
      - $z=z_{0}+ct$
    - 也可以该方程表示：$\frac{x-x_{1}}{a}=\frac{y-y_{1}}{b}=\frac{z-z_{1}}{c}$
  - 平面
    - 平面表示的两个要素：
      - 平面中的一个点$P(x_{1},y_{1})$
      - 垂直于该平面的法向量$\vec{n}=<a,b,c>$
    - 平面表示的原理：
      - 平面中所有经过点 P 的直线都与法向量垂直，即$\vec{PQ}\cdot\vec{n}=0$
      - $\begin{bmatrix}a,b,c\end{bmatrix}\begin{bmatrix}x-x_{1}\\y-y_{1}\\z-z_{1}\end{bmatrix} = 0$
      - 由此得到平面公式为：$a(x-x_{1})+b(y-y_{1})+c(z-z_{1})=0$
    - 平面公式（也叫标准形式）为：$a(x-x_{1})+b(y-y_{1})+c(z-z_{1})=0$
    - 移向后得到通用形式为$ax+by+cz+d=0$
    - 平面之间夹角余弦$\cos\theta=\frac{|\vec{n_{1}}\cdot\vec{n_{2}}|}{|\vec{n_{1}}|\cdot|\vec{n_{2}}|}$
      > 为什么这里取绝对值？是因为平面之间夹出来的是两个角，其中一个是直角/锐角，另一个是它的补角。我们取夹角为锐角，因此$\cos\theta >= 0$
      - 当$\cos\theta=0$时，两平面垂直
    - 求解两平面相交线
      - 第一种方法：通过消元求解各个变量之间关系，最后改装为参数方程
      - 第二种方法（更好）：相交线实际与是两平面的法向量的叉乘同方向
  - 在空间中绘制平面
    - 令 x/y/z=0，获取其与各个平面的相交线
  - 点、线、面之间的距离
    - 点 和 点：距离公式
    - 点 和 线：
      - 假设求点$P(x_{0},y_{0},z_{0})$到直线的距离，直线过一点$Q(x_{1},y_{1},z_{1})$，方向向量$\vec{v}$为$<a,b,c>$
      - 公式推导 1
        - 向量$\vec{PQ}=<x_{1}-x{0},y_{1}-y{0},z_{1}-z{0}>$
        - ~~$\vec{PQ}$在方向向量上的投影为$proj_{\vec{v}}{\vec{PQ}}=\frac{\vec{PQ}\cdot\vec{v}}{|\vec{v}|^2}\vec{v}$~~
        - ~~与投影垂直的正交向量为$\vec{PQ}-\frac{\vec{PQ}\cdot\vec{v}}{|\vec{v}|^2}\vec{v}$~~（这条路行不通，因为正交向量的长度我们不知道）
        - ~~直线方向向量$\vec{v}$与向量$\vec{PQ}$之间的夹角余弦的绝对值为：$\cos\theta=\frac{|\vec{PQ}\cdot\vec{v}|}{|\vec{PQ}|\cdot|\vec{v}|}$~~
        - ~~夹角的正弦值为$\sin\theta=\sqrt{1-\cos^2\theta}$~~
        - ~~点 P 到直线的距离 = $|\vec{PQ}|\sin\theta = |\vec{PQ}|\sqrt{1-\cos^2\theta} = |\vec{PQ}|$~~（这种通过余弦求正弦的方法太复杂，能否直接求正弦呢？噢！叉乘！）
        - 距离$d=|\vec{PQ}|\sin\theta$
        - 因为$|\vec{v}\times\vec{PQ}|=|\vec{v}||\vec{PQ}|\sin\theta$
        - 因此$\sin\theta=\frac{|\vec{v}\times\vec{PQ}|}{|\vec{v}||\vec{PQ}|}$
        - 因此距离$d = |\vec{PQ}|\sin\theta = |\vec{PQ}|\frac{|\vec{v}\times\vec{PQ}|}{|\vec{v}||\vec{PQ}|}=\frac{|\vec{v}\times\vec{PQ}|}{|\vec{v}|}$
      - ~~公式推导 2~~
        - 求解直线向量的法向量：这条路行不通，因为空间中一个向量的法向量有无数条
        - 求解过点 P，且方向向量为该法向量的直线
        - 求解该直线与原直线的交点 Q
        - 求解 PQ 的距离
      - **点到直线距离公式**：$d = |\vec{PQ}|\sin\theta = |\vec{PQ}|\frac{|\vec{v}\times\vec{PQ}|}{|\vec{v}||\vec{PQ}|}=\frac{|\vec{v}\times\vec{PQ}|}{|\vec{v}|}$
    - 点 和 平面：
      - 点到平面的距离求解 -> 一条射线在法向量上的投影长度
      - 假设求点$P(x_{0},y_{0},z_{0})$到平面的距离，平面过一点$Q(x_{1},y_{1},z_{1})$，法向量$\vec{n}$为$<a,b,c>$
      - 推导过程
        - 向量$\vec{PQ}=<x_{1}-x_{0},y_{1}-y_{0},z_{1}-z_{0}>$
        - 投影的长度为$|proj_{\vec{n}}\vec{PQ}|=\frac{|\vec{PQ}\cdot\vec{n}|}{|\vec{n}|^2}$
      - 公式：$d=|proj_{\vec{n}}\vec{PQ}|=\frac{|\vec{PQ}\cdot\vec{n}|}{|\vec{n}|^2}$
    - 线 和 线：
      - 平行：两线的方向向量平行
      - 相交：两线存在一公共点（可求解），无距离公式
      - 异面（如何判断？）即不平行也不相交
      - 两平行直线的距离
        - 推导：在第一条直线上找一点，求其到第二条直线的距离
          - 假设第一条直线过$P(x_{0},y_{0},z_{0})$，方向为$\vec{v} = <a,b,c>$；第二条直线过$Q(x_{1},y_{1},z_{1})$，方向与第一条直线相同
          - 那么$\vec{PQ}=<x_{1}-x_{0},y_{1}-y_{0},z_{1}-z_{0}>$
          - 根据点到直线的距离公式，我们可以知道$d=\frac{|\vec{v}\times\vec{PQ}|}{|\vec{v}|}$
            > 其实我感觉在向量里面推导到这一步就可以了，其他推导方法可以看这里：[点到直线距离公式的几种推导 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/26307123)
        - 公式：
          - 使用向量形式表达：$d=\frac{|\vec{v}\times\vec{PQ}|}{|\vec{v}|}$
          - 使用直线标准形式表达：$d = \frac{|c1-c2|}{\sqrt{a^2+b^2}}$
      - 两异面直线的距离公式（推导）：
        > 这个视频讲的非常清楚：[Shortest distance between two skew lines in 3D space. (youtube.com)](https://www.youtube.com/watch?v=HC5YikQxwZA)
        - 假设第一条直线过点$P(x_{0},y_{0},z_{0})$，其方向$\vec{u}=(u_{0},u_{1},u_{2})$
        - 第二条直线过点$Q(x_{1},y_{1},z_{1})$，其方向$\vec{v}=(v_{0},v_{1},v_{2})$
        - 那么第一条直线的参数方程形式为（t 为参数）：
          $$
          \begin{align} \\
          x=x_{0}+u_{0}t \\
          y=y_{0}+u_{1}t \\
          z=z_{0}+u_{2}t
          \end{align}
          $$
        - 第二条直线的参数方程形式为（s 为参数）：
          $$
          \begin{align}
          x=x_{1}+v_{0}s \\
          y=y_{1}+v_{1}s \\
          z=z_{1}+v_{2}s
          \end{align}
          $$
        - 异面直线的关键在于：设$S_{1}S_{2}$为两直线最短距离处，那么$S_{1}S_{2}$垂直于第一条直线，也垂直于第二条直线。设$S_{1}(x_{0}+u_{0}t,y_{0}+u_{1}t,z_{0}+u_{2}t)$，$S_{2}(x_{1}+v_{0}s,y_{1}+v_{1}s,z_{1}+v_{2}s)$，那么方程
          $$
          \begin{align}
          \vec{S_{0}S_{1}}\cdot\vec{u}=0 \\
          \vec{S_{0}S_{1}}\cdot\vec{v}=0
          \end{align}
          $$
          有解，可以求出$t$和$s$的值，然后得到向量$\vec{S_{0}S_{1}}$
        - $d=|\vec{S_{0}S_{1}}|$
    - 线 和 平面：求解线方向向量和平面法向量夹角
      - 平行：线和平面法向量垂直$\cos\theta=0$
      - 相交：线和平面法向量夹角不为 0 或+-1
      - 垂直：线和平面法向量同向$\cos\theta=1/-1$
      - 如果相交的话，线和平面的交线为：将直线参数方程带入平面方程求解得到坐标
    - 平面 和 平面
      - 平行：两平面的法向量平行
      - 相交：两平面的法向量不平行
      - 如果平行的话，两平面间的距离公式为：
        - 使用平面标准式，则距离为
          $$
          d=\frac{|d_{1}-d_{2}|}{\sqrt{a^2+b^2+c^2}}
          $$
        - 推导
          - 假设两平面的法向量为$\vec{n_{1}}=(a,b,c)$ - 平面一的方程为：$ax+by+cz+d1=0$ - 平面二的方程为：$ax+by+cz+d2=0$ - 假设现在有一条从平面一的$P(x_{0},y_{0},z_{0})$发出的射线（P 点满足$ax_{0}+by_{0}+cz_{0}+d1=0$），其方向与法向量平行，该直线的方程为（t 为参数）：
            $$
            \begin{align}
            x=x_{0}+at \\
            y=y_{0}+bt \\
            z=z_{0}+ct \\
            \end{align}
            $$
      - 假设点$Q(x_{1},y_{1},z_{1})$为该直线和平面的交点，将其带入平面二的方程，可得如下结果：
        $$
        a(x_{0}+at)+b(y_{0}+bt)+c(z_{0}+ct)+d2=0
        $$
      - 通过移项可得：
        $$
          (ax_{0}+by_{0}+cz_{0}+d2)+(a^2t+b^2t+c^2t)=0
        $$
      - 那么 t 的值为：
        $$t=\frac{-(ax_{0}+by_{0}+cz_{0}+d2)}{a^2+b^2+c^2}$$
        - 又因为$ax_{0}+by_{0}+cz_{0}+d1=0$，因此$ax_{0}+by_{0}+cz_{0}=-d1$，那么$t$的式子可以改写为
          $$t=\frac{d1-d2}{a^2+b^2+c^2}$$
        - 因此向量
          $$\begin{align}&\vec{PQ}=(x_{1}-x_{0},y_{1}-y_{0},z_{1}-z_{0})\\ &= (at,bt,ct) \\ &=(\frac{a(d1-d2)}{a^2+b^2+c^2},\frac{b(d1-d2)}{a^2+b^2+c^2},\frac{c(d1-d2)}{a^2+b^2+c^2})\end{align}$$
        - 那么向量的长度（两平面间的距离）为
          $$d=\begin{align}\sqrt{\frac{(a^2+b^2+c^2)(d1-d2)^2}{(a^2+b^2+c^2)^2}} \\ =\sqrt{\frac{(d1-d2)^2}{(a^2+b^2+c^2)}} \end{align}$$
        - 该等式可以化简为
          $$d=\frac{|d1-d2|}{\sqrt{a^2+b^2+c^2}}$$
      - 如果相交的话，两平面的交线为：交线的方向向量为两平面的法向量的叉乘（因为交线即垂直于第一个平面的法向量，又垂直于第二个平面的法向量，因此它的方向就是这两个法向量的叉乘）

- 空间中的曲面
  - 球面：$(x-x_{0})^2+(y-y_{0})^2+(z-z_{0})^2=r^2$
  - 平面：$ax+by+cz+d=0$
  - 圆柱：通常方程中只规定两个轴，汇成的曲线沿着没有规定的那个轴平移
  - 二次曲面：$Ax^2+By^2+Cz^2+Dxy+Exz+Fyz+Gx+Hy+Iz+J=0$
    - 椭圆体（ellipsoid）
      ![](ellipsoid.png)
    - 单叶双曲面（hyperboloid of one sheet）
      ![](hyperboloid%20of%20one%20sheet.png)
    - 双叶双曲面（hyperboloid of two sheets）
      ![](hyperboloid%20of%20two%20sheets.png)
    - 椭圆锥面（elliptic cone）
      ![](elliptic%20cone.png)
    - 椭圆双曲面（elliptic paraboloid）
      ![](elliptic%20paraboloid.png)
    - 双曲抛物面（hyperbolic paraboloid）
      ![](hyperboloic%20paraboloid.png)
  - 旋转面![](surface%20of%20revolution.png)
- 其他三维空间建系方法及相关计算
  - 圆柱坐标系（Cylindrical Coordinates）：x 和 y 轴用极坐标表示，z 轴用普通的直角坐标系表示
    ![](the%20cylindrical%20coordinate%20system.png)
    - 直角坐标系 -> 圆柱坐标系
      - $x=r\cos\theta$
      - $y=r\sin\theta$
      - $r=\sqrt{x^2+y^2}$
      - z 保持不变
    - 圆柱坐标系 -> 直角坐标系
      - $\rho=\sqrt{x^2+y^2}$
      - $\tan\theta=\frac{y}{x}$
      - z 保持不变
  - 球系（Spherical Coordinates）
    - 坐标系定义
      ![](the%20spherical%20coordinate%20system.png)
      - 设有一点$P(x,y,z)$，原点为$O(0,0,0)$，向量$\vec{OP}=(x,y,z)$
      - $\theta$ 是$\vec{OP}$在 xOy 平面上的投影与 x 轴之间的夹角
      - $\phi$是$\vec{OP}$与 z 轴之间的夹角
    - 直角坐标系 -> 球系
      - $\rho=\sqrt{x^2+y^2+z^2}$
      - $\cos\theta=\frac{x}{\sqrt{x^2+y^2}}$ 或 $\tan\theta=\frac{y}{x}$
      - $\cos\phi=\frac{z}{\rho}$
    - 球系 -> 直角坐标系
      - 向量 $\vec{OP}$ 在 xOy 平面上的投影长度为$r=\rho\sin\phi$
      - $z=\rho\cos\phi$
      - $x=\rho\sin\phi\cos\theta$
      - $y=\rho\sin\phi\sin\theta$
  - 圆柱坐标系 & 球系互转
    - 简单复习
      - 假设按照直角坐标系，存在一点$P(x,y,z)$，原点为$O(0,0,0)$，向量$\vec{OP}=(x,y,z)$
      - 圆柱坐标系
        - $r$ 为向量 $\vec{OP}$ 在 xOy 上的投影长度
        - $\theta$是投影与 x 轴的夹角
      - 球系
        - $\rho = |\vec{OP}|$
        - $\theta$ 是$\rho$ 在 xOy 平面上的投影与 x 轴的夹角
        - $\phi$ 是$\rho$ 与 z 轴之间的夹角
    - 圆柱坐标系 -> 球系
      - $\rho = \sqrt{r^2+z^2}$
      - $\theta$ 保持不变
      - $\cos\phi=\frac{z}{\rho}$
    - 球系 -> 圆柱坐标系
      - $r =\rho\sin\phi$
      - $\theta$ 保持不变
      - $z=\rho\cos\phi$

## Chapter 12：向量函数

- 向量值函数
  - 空间曲线和向量值函数
    > 需要注意的是，这里的曲线**是一个轨迹**，其**横纵坐标都是关于时间 t 的函数**。可能存在曲线的方程相同，但是他们并不是同一个曲线。比如顺时钟一个周期的时间形成的圆，和逆时针一个时钟周期形成的圆。
    - 平面曲线定义：
      - 由一串点$(f(t),g(t))$定义而成，其中 t 为参数。
      - 横纵坐标 x 和 y 的参数方程如下：
      - $x=f(t)$
      - $y=g(t)$
      - 其中 t 为参数，$f$和$g$是**两个关于 t**的连续函数。三维空间中的曲线定义类似。
    - 由平面曲线定义可以引申到向量值函数
    - 向量值函数定义：
      - $\vec{r(t)}=f(t)\vec{i}+g(t)\vec{j}$
      - 其中 t 为参数，$f$和$g$是**两个关于 t**的连续函数。三维空间中的曲线定义类似。
    - 平面曲线 -> 向量值函数：设置$f(t)$和$g(t)$，确定 t 的区间，用向量值函数定义$\vec{r(t)}=f(t)\vec{i}+g(t)\vec{j}$
    - 向量值函数 -> 平面曲线：消去 t
  - 向量值函数的运算性质
    - 加/减：各个方向的函数分量分别加
    - 乘/除：各个方向的分量都乘/除
  - 极限和连续
    - 极限的定义
      ![](definition%20of%20limit.png)
    - 极限的求解：对$\vec{r(t))}$极限的求解等同于对其各个分量函数极限的求解
    - 连续性的定义：$t\rightarrow a$时的极限的值=$\vec{r(a)}$
    - 连续的向量函数的定义：该函数在定义域上各处都连续
- 向量值函数的微分和积分

  - 微分

    > 注意：向量值函数本质上还是向量，只不过其中的每个分量都是一个关于 t 的函数。其符合向量的通用运算性质，只不过求解得到的结果是函数。只有把特定的 t 值带进去，才会得到一个实数解。

    - 定义
      ![](derivative%20of%20a%20vector-valued%20function.png)
      其中，$\vec{r'(t)}$ 在$\vec{r(t)}$的切线方向，指向 $t$ 增加的方向。
    - 计算：对各个分量的函数求导（为什么？）
    - 高阶微分计算：直接计算即可
    - 连续性：导数在定义域上各点连续，而且在定义域上不存在导数为 0 的情况
    - 微分性质及其应用
      ![](properties%20of%20the%20derivative.png)

      - 第一条：用一个常数乘以向量，常数会和向量所有函数分量相乘，那么对结果求导，就是对函数分量求导。
      - 第二条：两个向量相加，会将各自的函数分量相加。对相加后的结果求导，效果就等同与先对各个分量求导，然后再相加。
      - 第三条（重点）：
        - 一个普通函数乘以一个向量，这个函数会和这个向量中的各个函数相乘。
        - 根据链式法则，对两个函数的乘积相乘，结果是：
          $$
          (w(t)f(t))'=w'(t)f(t)+w(t)f'(t)
          $$
        - 那么原式如下：
          $$
          \begin{aligned}
          	&\frac{d}{dt} (w(t)\vec{r(t)}) = \frac{d}{dt}w(t)(f(t)\vec{i}+g(t)\vec{j}) \\
          	&= \frac{d}{dt}(w(t)f(t)\vec{i}+w(t)g(t)\vec{j})\\
          	&= \frac{d}{dt}(w(t)f(t))\vec{i}+\frac{d}{dt}(w(t)g(t))\vec{j}\\
          	&= (w'(t)f(t)+w(t)f'(t))\vec{i} + (w(t)g'(t)+w'(t)g(t))\vec{j} \\
          	&= (w'(t)f(t)\vec{i}+w'(t)g(t)\vec{j})+(w(t)f'(t)\vec{i}+w(t)g'(t)\vec{j}) \\
          	&= w'(t)\vec{r(t)}+w(t)\vec{r'(t)}
          	\end{aligned}
          $$
      - 第四条（重点）:
        - 两个向量值函数点乘，相当于各个分量分别相乘，最后相加
        - 对点乘的结果进行求导，就相当于对各个分量积求导
        - 推导如下：
          $$
          \begin{aligned}
          		& \frac{d}{dt}(\vec{r(t)}\cdot\vec{u(t)}) \\
          		&= \frac{d}{dt}(f_{1}(t)\vec{i}+g_{1}(t)\vec{j})\cdot(f_{2}(t)\vec{i}+g_{2}(t)\vec{j}) \\
          		&= \frac{d}{dt}(f_{1}(t)f_{2}(t)\vec{i}+g_{1}(t)g_{2}(t)\vec{j}) \\
          		&= \frac{d}{dt}(f_{1}(t)f_{2}(t)\vec{i}) + \frac{d}{dt}(g_{1}(t)g_{2}(t)\vec{j}) \\
          		&= (f'_{1}(t)f_{2}(t)+f_{1}(t)f'_{2}(t))\vec{i}+(g'_{1}(t)g_{2}(t)+g_{1}(t)g'_{2}(t))\vec{j} \\
          		&= (f'_{1}(t)f_{2}(t)\vec{i}+g'_{1}(t)g_{2}(t)\vec{j}) + (f_{1}(t)f'_{2}(t)\vec{i}+g_{1}(t)g'_{2}(t)\vec{j}) \\
          		&= <f'_{1}(t),g'_{1}(t)>\cdot<f_{2}(t),g_{2}(t)>+<f_{1}(t),g_{1}(t)>\cdot<f'_{2}(t),g'_{2}(t)>\\
          		&= \vec{r'(t)}\vec{u(t)}+\vec{r(t)}\vec{u'(t)}
          \end{aligned}
          $$
      - 第五条（重点）

    > 注意：平面中的向量没有叉乘，只有空间中的向量才有叉乘。因为叉乘结果德方向垂直于两个向量构成的平面。

    - 推导如下：

      $$
      	\begin{aligned}
      	&\frac{d}{dt}(\vec{r}(t)\times\vec{u}(t)) \\
      	&= \frac{d}{dt}(<f*{1}(t),g*{1}(t),h*{1}(t)>\times<f*{2}(t),g*{2}(t),h*{2}(t)>) \\
      	&= \frac{d}{dt}\begin{bmatrix} \vec{i} & \vec{j} & \vec{k} \\
      	f*{1}(t) & g*{1}(t) & h*{1}(t) \\
      	f*{2}(t) & g*{2}(t) & h*{2}(t) \\
      	\end{bmatrix} \\
      	& = \frac{d}{dt}((g*{1}(t)h*{2}(t)-h*{1}(t)g*{2}(t))\vec{i}-(f*{1}(t)h*{2}(t)-h*{1}(t)f*{2}(t))\vec{j}+(f*{1}(t)g*{2}(t)-g*{1}(t)f*{2}(t))\vec{k}) \\
      	\end{aligned}
      $$

      下面我们开始求导，由于式子太长，因此在后续的推导中我们将省略$t$，推导如下

      $$
      	\begin{aligned}
      	&= (g_{1}h_{2}-h_{1}g_{2})'\vec{i}-(f_{1}h_{2}-h_{1}f_{2})'\vec{j}+(f_{1}g_{2}-g_{1}f_{2})'\vec{k} \\
      	&= (g_{1}'h_{2}+g_{1}h_{2}'-h_{1}'g_{2}-h_{1}g_{2}')\vec{i}-(f_{1}'h_{2}+f_{1}h_{2}'-h_{1}'f_{2}-h_{1}f_{2}')\vec{j}+(f_{1}'g_{2}+f_{1}g_{2}'-g_{1}'f_{2}-g_{1}f_{2}')\vec{k} \\
      	&= ((g_{1}'h_{2}-h_{1}'g_{2})\vec{i}-(f_{1}'h_{2}-h_{1}'f_{2})\vec{j}+(f_{1}'g_{2}-g_{1}'f_{2})\vec{k}) + ((g_{1}h_{2}'-h_{1}g_{2}')\vec{i}-(f_{1}h_{2}'-h_{1}f_{2}')\vec{j}+(f_{1}g_{2}'-g_{1}f_{2}')\vec{k}) \\
      	&= \begin{vmatrix} \vec{i} & \vec{j} & \vec{k}\\ f_{1}' & g_{1}' & h_{1}'\\f_{2} & g_{2} & h_{2}\\ \end{vmatrix} + \begin{vmatrix} \vec{i} & \vec{j} & \vec{k} \\ f_{1} & g_{1} & h_{1} \\ f_{2}' & g_{2}' & h_{2}'\\ \end{vmatrix} \\
      	&= \vec{r}'(t)\times\vec{u}(t) + \vec{r}(t)\times\vec{u}'(t)
      	\end{aligned}
      $$

      - 第六条（重点）：当向量值函数的参数不再是 简单的$t$，而是 $w(t)$ 时，对$f(w(t))$和$g(w(t))$的求导会遵循链式法则，分别得到$f'(w(t))w'(t)$和$g'(w(t))w'(t)$，得到的结果是 $f'(w(t))w'(t)\vec{i}+g'(w(t))w'(t)\vec{j}$，推导如下:
        $$
        \begin{aligned}
        & \frac{d}{dt}\vec{r}(w(t)) \\
        &= \frac{d}{dt}(f(w(t))\vec{i}+g(w(t))\vec{j}) \\
        &= \frac{d}{dt}(f(w(t)))\vec{i}+\frac{d}{dt}(g(w(t)))\vec{j} \\
        &= f'(w(t))w'(t)\vec{i} + g'(w(t))w'(t)\vec{j} \\
        &= w'(t)(f'(w(t))\vec{i}+g'(w(t))\vec{j}) \\
        &= w'(t)\vec{r}'(w(t))
        \end{aligned}
        $$
      - 第七条（重点）：依据第四条点乘公式，求导之后得到
        $$2\vec{r}\cdot(t)\vec{r}'(t) = 0$$
        那么很自然可得$\vec{r}(t)\cdot\vec{r}'(t)=0$

  - 积分：对向量值函数德各个分量分别求定积分和不定积分。
    - 定积分：直接对各个函数分量求定积分即可
    - 不定积分 > 注意不定积分带带常数。 - 推导：假设$f(t)$，$g(t)$和$h(t)$的原函数分别是$F(t)$、$G(t)$ 和 $H(t)$，设向量$\vec{R}(t) = F(t)\vec{i}-G(t)\vec{j}+H(t)\vec{k}$，推导如下：
      $$
      \begin{aligned}
      & \int{\vec{r}(t)}=\int{f(t)}\vec{i} - \int{g(t)}\vec{j}+\int{h(t)}\vec{k} \\
      &= (F(t)+C*{1})\vec{i}-(G(t)+C*{2})\vec{j}+(H*{t}+C*{3})\vec{k} \\
      &= (F(t)\vec{i}-G(t)\vec{j}+H(t)\vec{k}) + (C*{1}\vec{i}-C*{2}\vec{j}+C\_{3}\vec{k}) \\
      &= \vec{R}(t) + \vec{C}
      \end{aligned}
      $$
      因此也可得$\vec{R}'(t)=\vec{r}(t)$

- 速度和加速度 & 斜抛运动

  - 设现在存在一个物体
  - t 时刻位置：$\vec{r}(t)=x(t)\vec{i}+y(t)\vec{j}$
  - 速度

    - 推导

      - 在初始阶段，该物体的位置为$\vec{r}(t)=x(t)\vec{i}+y(t)\vec{j}$
      - 在$\Delta(t)$ 时间后，该物体的位置为$\vec{r}(t+\Delta{t})=x(t+\Delta{t})\vec{i}+y(t+\Delta{t})\vec{j}$
      - 因此这段时间的位移量的变化用向量表示为$\vec{r}(t+\Delta{t})-\vec{r}(t)$
      - 因为一段时间内的平均速度 = 位移量 / 时间长度，设平均速度为$\vec{v}$，那么
        $$
        \begin{aligned}\vec{v}=\frac{\vec{r}(t+\Delta{t})-\vec{r}(t)}{\Delta{t}}\end{aligned}
        $$
      - 那么要求解瞬时速度，我们需要让$\Delta{t}\rightarrow 0$，由此解得
        $$
        \begin{aligned}\lim_{\Delta{t}\rightarrow 0}\vec{v}=\lim_{\Delta{t}\rightarrow 0}\frac{\vec{r}(t+\Delta{t})-\vec{r}(t)}{\Delta{t}}\end{aligned}
        $$
      - 该速度表达式也是我们前面提到的向量值函数的导数表达式$\vec{r}'(t)$，我们用向量替换掉$\vec{r}(t+\Delta{t})$和$\vec{r}(t)$，再对其格式进行一下整理，可得

        $
        \begin{aligned}
        &\vec{v}=\vec{r}'(t)=\lim_{\Delta{t}\rightarrow 0}\frac{(x(t+\Delta{t})\vec{i}+y(t+\Delta{t})\vec{j})-(x(t)\vec{i}+y(t)\vec{j})}{\Delta{t}} \\
        &= \lim*{\Delta{t}\rightarrow 0}\frac{x(t+\Delta{t})-x(t)}{\Delta{t}}\vec{i}+\lim\_{\Delta{t}\rightarrow 0}\frac{y(t+\Delta{t})-y(t)}{\Delta{t}}\vec{j} \\
        &= x'(t)\vec{i}+y'(t)\vec{j} \\
        \end{aligned}
        $

      - 那么该速度的大小为$|\vec{v}(t)|=\sqrt{(x'(t))^2+(y'(t))^2}$

  - 加速度
    - 我们可以看到物体瞬时速度的大小就是位移向量值函数的导数，那么加速度作为速度的变化量，可以推导出其值为速度向量值函数的导数
    - 公式：$\vec{a}=\vec{r}''(t)=\vec{v}'(t)=x''(t)\vec{i}+y''(t)\vec{j}$
  - 位移、速度、加速度图像
    - 求公式 -> 带入值 -> 求特特定 t 下的向量 -> 绘制向量
  - 初值问题
    - 通过多次不定积分求解原函数，通过带入值求解常数项
  - 斜抛运动

    - 物理分析：垂直方向上的力为重力，水平方向上无作用力（不考虑空气阻力）
    - 情景假设：该物体以速度$v_{0}$抛出，抛出时速度与水平面夹角为$\theta$，高度为 h，物体质量为 m，重力加速度为 g。下面分析该物体在 t 时刻的位移和速度。
    - 坐标系建立：x 轴向右，y 轴向上，那么起始的位移就是$\vec{r}(0)=h\vec{j}$，起始的速度为$\vec{v}(0)=v_{0}\cos\theta\vec{i}+v_{0}\sin\theta\vec{j}$，唯一的作用力是重力，其可以表示为$\vec{F}=-mg\vec{j}$
    - 目的：求解时刻$t$的速度 $\vec{v}(t)$ 和位移 $\vec{r}(t)$
    - 数学建模：

      - 因为加速度$a=-g\vec{j}$，因此速度$\vec{v}(t)=-gt\vec{j}+(C_{1}\vec{i}+C_{2}\vec{j})$
      - 因为 t=0 时，$\vec{v}(0)=v_{0}\cos\theta\vec{i}+v_{0}\sin\theta\vec{j}$
      - 因此，$C_{1}=v_{0}\cos\theta$，$C_{2}=v_{0}\sin\theta$，速度的公式为
        $$
        \begin{aligned}
        &\vec{v}(t)=-gt\vec{j}+(v_{0}\cos\theta\vec{i}+v_{0}\sin\theta\vec{j}) \\
        &= v_{0}\cos\theta\vec{i} + (v_{0}\sin\theta-gt)\vec{j}
        \end{aligned}
        $$
      - 对速度向量值函数进行积分，解得位移公式为
        $$
        \vec{x}(t)=v_{0}(\cos\theta)t\vec{i}+(v_{0}(\sin\theta)t-\frac{1}{2}gt^2)\vec{j}+(C_{1}\vec{i}+C_{2}\vec{j})
        $$
      - 因为当 t=0 时，位移为：$\vec{r}(0)=h\vec{j}$，因此$C_{1}=0$，$C_{2}=h$
      - 因此位移公式为：

        $$
        \begin{aligned}
        &\vec{x}(t)=v_{0}(\cos\theta)t\vec{i}+(v_{0}(\sin\theta)t-\frac{1}{2}gt^2)\vec{j}+h\vec{j} \\
        &= v_{0}(\cos\theta)t\vec{i}+(v_{0}(\sin\theta)t-\frac{1}{2}gt^2+h)\vec{j} \\
        \end{aligned}
        $$

    - 斜抛运动总结总结
      - 速度向量值函数
        $$
        \begin{aligned}
        &\vec{v}(t)= v_{0}\cos\theta\vec{i} + (v_{0}\sin\theta-gt)\vec{j}
        \end{aligned}
        $$
      - 位移向量值函数
        $$\vec{x}(t) = v_{0}(\cos\theta)t\vec{i}+(v_{0}(\sin\theta)t-\frac{1}{2}gt^2+h)\vec{j}$$

- 切向量 & 法向量

  - 单位切向量：方向与$\vec{r}'(t)$相同，表示如下（$\vec{r}'(t)\ne0$）：
    $$
    \vec{T}(t)=\frac{\vec{r}'(t)}{|\vec{r}'(t)|}
    $$
  - 切线求解
    - 假设曲线的向量值函数为 $\vec{r}(t)$，求解点 $P(x_{0},y_{0},z_{0})$ 处的切线
    - 因为切线的向量值函数为
      $$
      \vec{T}(t)=\frac{\vec{r}'(t)}{|\vec{r}'(t)|}
      $$
  - 对于点 P，我们需要根据 $x_{0}$, $y_{0}$ 和 $z_{0}$ 求解出 t 的值，然后将其带入 $\vec{T}(t)$, 得到切线的向量
  - 向量的三个值也就是经过点 P 的直线的方向向量，由此可以得出切线的参数方程
  - 单位法向量
    - 推导
      - 在之前的结论里面我们知道，如果 $\vec{r}(t)\cdot\vec{r}(t)=c$，那么 $\vec{r}(t)\cdot\vec{r}'(t)=0$
      - 因为切向量 $\vec{T}(t)$ 为单位向量，因此 $\vec{T}(t)\cdot\vec{T}(t)=|\vec{T}^2(t)|=1$
      - 根据之前的结论 $\vec{T}(t)\cdot\vec{T}(t)=c \rightarrow \vec{T}(t)\cdot\vec{T}'(t)=0$，因此可以看到切向向量及其微分向量方向是垂直的
      - 因为单位法向量和单位切向量垂直，因此我们推断单位切向量的微分就是单位法向量
  - 单位法向量公式（$|\vec{T}'(t)|\ne 0$）
    $$\vec{N}(t)=\frac{\vec{T}'(t)}{|\vec{T}'(t)|}$$

    > 这里有两个问题：
    >
    > 1.  在什么情况下会出现 $\vec{T}(t)\cdot\vec{T}(t)=c$ 的情况？
    > 2.  为什么单位法向量不直接是 $\vec{T}'(t)$？

  - 另一种寻找法向量的方法

    - 假设单位切向量 $\vec{T}(t)=x(t)\vec{i}+y(t)\vec{j}$（$|\vec{T}(t)|=\sqrt{x^2(t)+y^2(t)}=1$），那么其单位法向量可以是
      - $\vec{N}(t)=y(t)\vec{i}-x(t)\vec{j}$，因为 $\vec{T}(t)\cdot\vec{N}(t)=x(t)y(t)-x(t)y(t)=0$，满足两向量垂直，且 $\vec{N}(t)$ 为单位向量
      - $\vec{N}(t)=-y(t)\vec{i}+x(t)\vec{j}$，理由同上

  - 加速度在水平 & 垂直方向上的分量

    - 物理意义
      - 对于以匀速行驶的物体
        - 速度和加速度的向量是垂直的（这个是根据前面那个定理，如果 $|\vec{r}'(t)|^2=c$，那么 $\vec{r}'(t)\cdot\vec{r}'(t)=0$，那么式子两边求导可得 $\vec{r}'(t)\cdot\vec{r}''(t)=0$，也就是速度向量和加速度向量垂直）
      - 对于以变速行驶的物体
        - 速度和加速度向量不一定垂直，如斜抛运动，加速度一直向下，和运动轨迹无关
    - 加速度向量

      - 加速度向量 $\vec{a}(t)$ 在速度向量 $\vec{T}(t)$ 和速度法向量 $\vec{T}(t)$ 之间
      - 推导 1

        - 我们想要求解的是 $\vec{a}(t)=\vec{v}'(t)=a_{T}\vec{T}(t)+a_{N}\vec{N}(t)$ 中的 $a_{T}$ 和 $a_{N}$，其中 $\vec{T}(t)$ 和 $\vec{N}(t)$ 分别是和速度平行的单位向量和垂直于速度的单位向量
        - 设位移向量为 $\vec{r}(t)$
        - 那么速度的方向向量 $\vec{v}(t)= \vec{r}'(t)$，其单位向量为 $\vec{T}(t)=\frac{\vec{v}(t)}{|\vec{v}(t)|}$
        - 对该式进行移向，得到 $\vec{v}(t)=\vec{T}(t)|\vec{v}(t)|$
        - 要得到 $\vec{v}'(t)$，需要对等式两端进行求导，得到 $\vec{v}'(t)=\frac{d}{dt}(\vec{T}(t)|\vec{v}(t)|)$
        - 因此 $\vec{a}(t)=\vec{v}'(t)=\vec{T}'(t)|\vec{v}(t)|+\vec{T}(t)\frac{d}{dt}(|\vec{v}(t)|)$
        - 又因为 $\vec{N}(t)=\frac{\vec{T}'(t)}{|\vec{T}'(t)|}$
        - 移向可得 $\vec{T}'(t)=\vec{N}(t)|\vec{T}'(t)|$
        - 带入 $\vec{a}(t)$ 可得 $\vec{a}(t)=\vec{N}(t)|\vec{T}'(t)||\vec{v}(t)|+\vec{T}(t)\frac{d}{dt}(|\vec{v}(t)|)$
        - 那么 $\vec{a}(t)=\vec{v}'(t)=a_{T}\vec{T}(t)+a_{N}\vec{N}(t)$ 中的 $a_{T}$ 和 $a_{N}$ 分别为

          $$a_{T}=\frac{d}{dt}(|\vec{v}(t)|)$$
          而
          $$a_{N}=|\vec{T}'(t)||\vec{v}(t)|$$

      - 这两个值分别为加速度的切向和法向向量大小

    - 推导 2

      > 别记错投影公式！

      - 不从公式的角度运算，我们还可以这么理解。加速度的切向和法向分量，是加速度向量 $\vec{a}$ 在速度的切向 $\vec{T}$ 和法向 $\vec{N}$ 方向分量上的投影。
      - 依然假设位移向量为 $\vec{r}(t)$，那么速度向量为 $\vec{v}(t)=\vec{r}'(t)$，加速度向量为 $\vec{a}(t)=\vec{v}'(t)=\vec{r}''(t)$
      - 而 $\vec{a}(t)=proj_{\vec{T}}{\vec{a}}\vec{T}+proj_{\vec{N}}\vec{a}\vec{N}$
      - 我们之前学过，一个向量 $\vec{u}$ 在另一个向量 $\vec{v}$ 上的投影的公式为
        $$proj_{\vec{v}}\vec{u}=\frac{\vec{u}\cdot\vec{v}}{|\vec{v}|^2}\vec{v}$$
      - 那么该投影的长度为
        $$|proj_{\vec{v}}|\vec{u}=|\frac{\vec{u}\cdot\vec{v}}{|\vec{v}|^2}\vec{v}|=\frac{\vec{u}\cdot\vec{v}}{|\vec{v}|^2}|\vec{v}|=\frac{\vec{u}\cdot\vec{v}}{|\vec{v}|}$$
      - 那么由此我们可以得到，向量 $\vec{a}$ 在向量 $\vec{T}$ 上的投影的大小为
        $$
        a_{T}=|proj_{\vec{T}}{\vec{a}}|=\frac{\vec{a}\cdot\vec{T}}{|\vec{T}|}=\vec{a}\cdot\vec{T}
        $$
      - 以此类推，向量 $\vec{a}$ 在向量 $\vec{N}$ 上的投影的大小为
        $$
        a_{N}=|proj_{\vec{N}}\vec{a}|=\frac{\vec{a}\cdot\vec{N}}{|\vec{N}|}=\vec{a}\cdot\vec{N}
        $$
        - 因为 $\vec{T}=\frac{\vec{v}}{|\vec{v}|}$，因此 $a_{T}$ 还可以写成
          $$
          a_{T}=\frac{\vec{a}\cdot\vec{v}}{|\vec{v}|}
          $$
        - ~~因为 $\vec{N}=\frac{\vec{T}'(t)}{|\vec{T}'(t)|}$，因此 $a_{N}$ 还可以写成~~（这种方法解不出来）
          $$
          a_{N}= \frac{\vec{T}'(t)\cdot\vec{a}}{|\vec{T}'(t)|}
          $$
      - 我们现在来看一下几个向量之间的几何关系（设向量 $\vec{T}$ 和向量 $\vec{a}$ 之间的夹角为 $\theta$，向量 $\vec{a}$ 和向量 $a_{N}$ 之间的夹角为 $\phi$）
        ![](geometry%20representation%20of%20vectors.png)
      - 根据上述图像，可得如下关系式：
        $$
        \vec{a}\cdot\vec{N}=|\vec{a}||\vec{N}|\cos\phi
        $$
      - 在上述式子中，$|\vec{a}||\cos\phi|=a_{N}$
      - 而根据几何关系我们还可以看出，$a_{N}=|\vec{a}|\sin\theta$
      - 因此 $\vec{a}\cdot\vec{N}=|\vec{N}||\vec{a}|\sin\theta$
      - 因为
        $$
        |\vec{N}|=|\vec{T}|=1
        $$
      - 因此，$a_{N}=\vec{a}\cdot\vec{N}=|\vec{T}||\vec{a}|\sin\theta=|\vec{a}\times\vec{T}|$
      - 又因 $\vec{T}=\frac{\vec{v}}{|\vec{v}|}$
      - 因此原式等于
        $$
        a_{N}=\vec{a}\cdot\vec{N}=|\vec{T}||\vec{a}|\sin\theta=|\vec{a}\times\vec{T}|=\frac{|\vec{v}\times\vec{a}|}{|\vec{v}|}
        $$

    - 公式总结
      - 速度方向上的加速度分量
        $$
        a_{T}=\vec{a}\cdot\vec{T}=\frac{\vec{a}\cdot\vec{v}}{|\vec{v}|}
        $$
      - 速度法向量方向上的加速度分量
        $$
        a_{N}=\vec{a}\cdot\vec{N}=\frac{|\vec{v}\times\vec{a}|}{|\vec{v}|}=\sqrt{\vec{a}^2-a_{T}^2}
        $$

- 弧长和曲率

  - 弧长
    - 单变量函数弧长求解复习
      - 在对向量值函数求解弧长之前，我们先复习一下对单变量函数求解弧长的过程
      - 设一单变量函数为 $y=f(x)$，那么一段弧长的计算公式是
        $$\Delta{s}=\sqrt{\Delta{x}^2+\Delta{y}^2}
		 	$$
      - 从中提取出 $\Delta{x}$，可以得到
        $$
        \Delta{s}=\sqrt{1+(\frac{\Delta{y}}{\Delta{x}})^2}\Delta{x}
        $$
      - 将 $\Delta$ 改为微元，可得
        $$
        ds=\sqrt{1+(\frac{dy}{dx})^2}dx
        $$
      - 将 s 视作关于 x 的函数，y 视作关于 x 的函数，那么其可写作如下形式
        $$
        ds=\sqrt{1+(y')^2}dx
        $$
      - 要求解弧长 s，我们对该式关于 x 进行积分，可得如下结果
        $$
        s=\int_{a}^{b}\sqrt{1+(y')^2}dx
        $$
    - 向量值函数的弧长求解推导
      - 求解一段向量值函数的弧长的方法是，对该弧长的每一小段进行求解，然后在 t 的范围内对其求定积分
      - 设 $\vec{r}(t)=x(t)\vec{i}+y(t)\vec{j}+z(t)\vec{k}$
      - 那么这个曲线在 $\Delta{t}$ 内的一小段弧长为 $\Delta{r}=\sqrt{\Delta{x}^2+\Delta{y}^2+\Delta{z}^2}$
      - 将 $\Delta$ 修改为微元，可得 $ds=\sqrt{dx^2+dy^2+dz^2}$
      - 对右边提取出一个 dt，可得
        $$
        ds=\sqrt{(\frac{dx}{dt})^2+(\frac{dy}{dt})^2+(\frac{dz}{dt})^2}dt
        $$
      - 该式可以表达如下
        $$
        s=\int_{a}^{b}\sqrt{(x')^2+(y')^2+(z')^2}dt
        $$
      - 根据之前的内容，我们知道
        $$
        \vec{r}'(t)=x'\vec{i}+y'\vec{j}+z'\vec{k}
        $$
      - 那么
        $$
        s=\int_{a}^{b}\sqrt{(x')^2+(y')^2+(z')^2}dt=\int_{a}^{b}|\vec{r}'(t)|dt
        $$
    - 还可以这么理解：$\vec{r}(t)$ 是物体经过的路径，$\vec{v}(t)=|\vec{r}'(t)|$ 是物体在 t 时刻的瞬时速度，在一段时间（t=a 到 t=b 时刻）内对速度进行积分，就可以得到位移的量，这就是 $L=\int_{a}^{b}\vec{r}'(t)dt$
  - 弧长函数
    - 当 t 不是一个定值，而是一个变量时，从 a 到 t 时刻的弧长定义如下：
      $$
      s(t)=\int_{a}^{t}|\vec{r}'(t)|dt
      $$
    - 这个 $s(t)$ 就是 arc length parameter
    - 微积分前两个定理的解释如图：
      ![](https://upload.wikimedia.org/wikipedia/commons/2/2f/Fundamental_theorem_of_calculus_%28animation%29.gif)
    - 根据微积分第一定律：
      $$
      \frac{d}{dx}\int_{a}^{x}f(x)dx=f(x)
      $$
    - 那么
      $$
      \frac{d}{dt}\int_{a}^{t}|r'(u)|du=|r'(t)|
      $$
    - 需要注意的是，这里的 $s(t)$ 是指的路程，而不是位移。因此该值总是为正。
  - 弧长参数 s

    > 这一段我在理解上废了功夫，其中这个
    >
    > - [calculus - How do you determine whether a curve uses arc length as a parameter? - Mathematics Stack Exchange](https://math.stackexchange.com/questions/484142/how-do-you-determine-whether-a-curve-uses-arc-length-as-a-parameter) 问题下的回答
    > - 这个 [12.5 The Arc Length Parameter and Curvature‣ Chapter 12 Vector Valued Functions ‣ Calculus III (und.edu)](https://sites.und.edu/timothy.prescott/apex/web/apex.Ch12.S5.html) 讲义
    > - [Parametrize a Curve with Respect to Arc Length (youtube.com)](https://www.youtube.com/watch?v=G0R-qialKlE) 还有这个视频
    >   给了我很大的启发。

    - 定义
      - 首先我们需要思考，为什么需要弧长参数 s？这里可以有两种定义轨迹曲线位移的方式：
        - 用时刻 t 来定义位移：比如我们想知道 t=1 时，坐标在哪里？
        - 用弧长 s 来定义位移：比如我们想知道 s=1 时，坐标在哪里？这个用来标记位置的弧长参数 s 就是我们要寻找的目标
    - 求解
      - 根据前文我们可知
        $$
        s(t)=\int_{a}^{t}|\vec{r}'(t)|dt
        $$
        我们便可以计算出 $s(t)$ 的关系式，将 $t=g(s)$ （$g$ 为 $s$ 的反函数）带入 $\vec{r}(t)$，便可得到 $\vec{r}(s)$
    - 推导
      - 因为
        $$
        \frac{dr}{dt}=\frac{dr}{ds}\frac{ds}{dt}
        $$
      - 利用导数替换掉分式可得：
        $$
        \vec{r}'(t)=\vec{r}'(s)s'(t)
        $$
      - 通过移向可得
        $$
        \vec{r}'(s)=\frac{\vec{r}'(t)}{s'(t)}
        $$
      - 又因为
        $$
        \frac{ds}{dt}=s'(t)=|\vec{r}'(t)|
        $$
      - 可得
        $$
        \vec{r}'(s)=\frac{\vec{r}'(t)}{|\vec{r}'(t)|}
        $$
      - 这个值我们是见过的，他就是 $\vec{T}(t)$，也就是速度方向上的单位向量
      - $\vec{r}'(s)$ 与 $\vec{r}'(t)$ 不同的是，$|\vec{r}'(s)|=1$，是个单位向量
      - 如果要使 t 为弧长参数，当且仅当在 $|\vec{r}'(t)|=1$ 的情况下才能实现，也就是说 $s=t$；同理，当 $|\vec{r}'(t)|=1$ 时，t 为单位向量
    - 含义
      - 在前文我们提到过，$\vec{r}(t)$ 相当于位移
      - $|\vec{r}'(t)|$ 相当于 t 时刻速度的大小
      - $\vec{T}(t)$ 是速度方向上的单位向量，也是 $\vec{r}'(s)$，当且仅当 $|\vec{r}'(s)|=1$ 时 $s$ 为弧长参数
    - 结论
      ![](arc%20length%20parameter%20theorem.png)

  - 弧长参数的应用 -> 曲率

    > 曲率的学习也可以参考这里：
    >
    > - [Curvature intuition (youtube.com)](https://www.youtube.com/watch?v=ugtUGhBSeE0)
    > - [Curvature formula, part 1 (youtube.com)](https://www.youtube.com/watch?v=gspjhwSNMWs)
    > - [Curvature formula, part 2 (youtube.com)](https://www.youtube.com/watch?v=Q-BxnC-uWQo)
    > - [Curvature formula, part 3 (youtube.com)](https://www.youtube.com/watch?v=8V4_4M90RfA)
    > - [12.5 The Arc Length Parameter and Curvature‣ Chapter 12 Vector Valued Functions ‣ Calculus III (und.edu)](https://sites.und.edu/timothy.prescott/apex/web/apex.Ch12.S5.html)

    - 定义 & 推导

      - 曲率是用来衡量曲线的弯曲程度的变量，弯曲越狠，曲率越大 -> 可以这样翻译：在同样的弧长内，单位速度向量的变化越大，曲率越大
      - 那么我们这样定义曲率
        $$
        K=|\frac{d\vec{T}}{ds}|=|\vec{T}'(s)|
        $$
      - 如果 $\vec{r}(s)$ 是以 s 作为弧长参数，那么存在如下式子：
        $$
        \vec{T}(s)=\frac{\vec{r}'(s)}{|\vec{r}'(s)|}
        $$
      - 我们换一种方法写 $K$:

        $$
        \begin{aligned}
         &K=|\frac{d\vec{T}}{ds}| \\
         &=|\frac{\frac{d\vec{T}}{dt}}{\frac{ds}{dt}}| \\
         &=\frac{|\vec{T}'(t)|}{|s'(t)|} \\
         \end{aligned}
        $$

      - 根据前文我们知道
        $$|s'(t)|=|\vec{r}'(t)|$$
      - 因此原式可改写如下
        $$
        K=\frac{|\vec{T}'(t)|}{|s'(t)|}=\frac{|\vec{T}'(t)|}{|\vec{r}'(t)|}
        $$
      - 因为
        $$
        \vec{T}(t)=\frac{\vec{r}'(t)}{|\vec{r}'(t)|}
        $$
      - 移向后可得
        $$
        \vec{r}'(t)=\vec{T}(t)|\vec{r}'(t)|
        $$
      - 对等式两边求导可得
        $$
        \vec{r}''(t)=\vec{T}'(t)|\vec{r}'(t)|+\vec{T}(t)|\vec{r}''(t)|
        $$
      - 下面我们要做的是将 $|\vec{T}'(t)|$ 的形式给凑出来
        
        $$
        \begin{aligned}
        &\vec{r}'(t)\times\vec{r}''(t) \\
        &=(\vec{T}(t)|\vec{r}'(t)|)\times(\vec{T}'(t)|\vec{r}'(t)|+\vec{T}(t)|\vec{r}''(t)|) \\
        &= \vec{T}(t)|\vec{r}'(t)|\times\vec{T}'(t)|\vec{r}'(t)|+\vec{T}(t)|\vec{r}'(t)|\times\vec{T}(t)|\vec{r}''(t)| \\
        \end{aligned}
        $$
  
      - 根据叉乘的性质（因为一个向量构不成一个平面，因此不存在其叉乘结果，代数上也可以推导出这个性质。因为当一个行列式的两行都相同时，最后所有的代数余子式都为 0）
        $$
        \vec{T}(t)\times\vec{T}(t)=0
        $$
      - 原式可以改写为
        $$
        \vec{r}'(t)\times\vec{r}''(t)=\vec{T}(t)|\vec{r}'(t)|\times\vec{T}'(t)|\vec{r}'(t)|=(\vec{T}(t)\times\vec{T}'(t))|\vec{r}'(t)|^2
        $$
      - 那么
        $$
        |\vec{r}'(t)\times\vec{r}''(t)|=|\vec{T}(t)\times\vec{T}'(t)||\vec{r}'(t)|^2
        $$
      - 根据叉乘的值的性质我们知道
        $$
        |\vec{T}(t)\times\vec{T}'(t)|=|\vec{T}(t)||\vec{T}'(t)|\sin\theta
        $$
      - 因为 $\vec{T}(t)$ 是曲线切线方向（速度方向）上的单位向量，因此 $|\vec{T}(t)|=1$，由此 $\vec{T}(t)\cdot\vec{T}(t)=1$，对两边求导可得 $\vec{T}(t)\cdot\vec{T}'(t)=0$
      - 也就是说 $\vec{T}(t)$ 和 $\vec{T}'(t)$ 垂直。那么 $\sin\theta=1$。因此 $|\vec{T}(t)\times\vec{T}'(t)|=|\vec{T}(t)||\vec{T}'(t)|\sin\theta=|\vec{T}(t)||\vec{T}'(t)|=|\vec{T}'(t)|$ （因为 $\vec{T}(t)$ 是单位向量，长度为 1）
      - 因此原式可改写为
        $$
        |\vec{r}'(t)\times\vec{r}''(t)|=|\vec{T}'(t)||\vec{r}'(t)|^2
        $$
      - 那么我们可以得到用 $\vec{r}(t)$ 及其相关导数表示的 $|\vec{T}'(t)|$
        $$
        |\vec{T}'(t)|=\frac{|\vec{r}'(t)\times\vec{r}''(t)|}{|\vec{r}'(t)|^2}
        $$
      - 因此曲率公式可改写为
        $$
        \begin{aligned}
        &K=\frac{|\vec{T}'(t)|}{|s'(t)|}=\frac{|\vec{T}'(t)|}{|\vec{r}'(t)|} \\
        &=\frac{|\vec{r}'(t)\times\vec{r}''(t)|}{|\vec{r}'(t)||\vec{r}'(t)|^2} \\
        &=\frac{|\vec{r}'(t)\times\vec{r}''(t)|}{|\vec{r}'(t)|^3}
        \end{aligned}
        $$

    - 一般函数 $y=f(x)$ 的曲率公式
      - 设函数为 $y=f(x)$
      - 该函数用位移 $\vec{r}(x)$ 表示如下

        > 该函数用向量这样表示是因为，对于一般的向量值函数 $\vec{r}(t)=x(t)\vec{i}+y(t)\vec{j}+z(t)\vec{k}$，x、y 和 z 是关于 t 的函数。而在 $y=f(x)$ 中，这三项是关于 x 的函数，$x=x$，$y=f(x)$，$z=0*x$。

        $$
        \vec{r}(x)=x\vec{i}+y\vec{j}
        $$

      - 对 $\vec{r}(x)$ 求导得到
        $$
        \vec{r}'(x)=\vec{i}+y'\vec{j}
        $$
      - 对 $\vec{r}'(x)$ 求导得到
        $$
        \vec{r}''(x)=y''\vec{j}
        $$
      - 那么按照同样的方式定义曲率 （斜率的变化量/弧长）
        $$
        K=|\frac{d\vec{T}}{ds}|=\frac{|\vec{r}'(x)\times\vec{r}''(x)|}{|\vec{r}'(x)|^3}
        $$
      - $\vec{r}'(x)\times\vec{r}''(x)$ 的叉乘行列式如下：
        $$
        \begin{vmatrix}
        \vec{i} & \vec{j} & \vec{k} \\
        1 & y' & 0 \\
        0 & y'' & 0\\
        \end{vmatrix}
        $$
      - 该行列式的计算结果为
        $$
        |\vec{r}'(x)\times\vec{r}''(x)|=|y''\vec{k}|=|y''|
        $$
      - 那么曲率的结果为
        $$
        K=|\frac{d\vec{T}}{ds}|=\frac{|y''|}{\sqrt{1+(y')^2}}
        $$
    - 公式总结
      - 向量值函数的曲率公式
        $$
        \begin{aligned}
        &K=|\frac{d\vec{T}}{ds}|=|\vec{T}'(s)|\\
        &=\frac{|\vec{T}'(t)|}{|s'(t)|}=\frac{|\vec{T}'(t)|}{|\vec{r}'(t)|} \\
        &=\frac{|\vec{r}'(t)\times\vec{r}''(t)|}{|\vec{r}'(t)|^3}
        \end{aligned}
        $$
      - 一般函数的曲率公式
        $$
        K=|\frac{d\vec{T}}{ds}|=\frac{|y''|}{(\sqrt{1+(y')^2})^3}
        $$

  - 应用：速度，曲率与加速度的关系
    - 加速度的切向分量：速度的变化率 -> 弧长的变化率
    - 加速度的法向分量：是速度和曲率的函数
      ![](acceleration,%20speed%20and%20curvature.png)
      - 推导：如何用速度和曲率表示加速度

        - $a_{T}$ 推导如下

          $$
          \begin{aligned}
          &a_{T}=\frac{d}{dt}(|\vec{v}(t)|)
          \end{aligned}
          $$

        - $a_{N}$ 推导如下

          $$
          \begin{aligned}
          &a_{N}=\vec{a}\cdot\vec{N}=\frac{|\vec{v}\times\vec{a}|}{|\vec{v}|}=\sqrt{\vec{a}^2-a_{T}^2} \\
          &=\frac{ds}{dt}(|\vec{v}|K) \\
          &=K(\frac{ds}{dt})^2
          \end{aligned}
          $$

        ![](accelerator%20PROOF.png)

- 总结
  ![](summary%20of%20velocity,%20acceleration%20and%20curvature.png)

## Chapter 13：多变量函数

- 多变量函数简介
	- 多变量函数介绍
		![](definition%20of%20a%20function%20of%202%20variables.png)
		其中，多变量函数的定义域和值域、四则运算规则、复合运算规则，多项式函数、有理函数等都和但变量函数中的规则相同。
	- 多变量函数图像
		- 确定定义域，值域
		- 假设函数为 $f(x,y)$， 令 $z=f(x,y)$，然后绘制不同 z 下的曲线图，综合起来就是函数图像
	- Level Curve（针对 2 变量函数）
		- 假设函数为 $z=f(x,y)$，令 z 等于不同的 c（也就是令 $f(x,y)$ 等于不同的常数），可以绘制出不同常数下的曲线
		- 这种方法常用于在地理上绘制等高线
		- 称其为 Level Curve 是因为设定函数值为常数时，绘制出的是关于 x 和 y 的曲线
	- Level Surface（针对 3 变量函数）
		- 加设函数为 $f(x,y,z)$，令 $f(x,y,z)$ 等于不同的常数 c，即可绘制出 Level Surface
		- 这种方法常用于工业中用不同颜色来表示不同温度下的曲面
			![](level%20surface%20application.png)
		- 称其为 Level Curve 是因为设定函数值为常数时，绘制出的是关于 x、y 和 z 的曲面
	- 计算机绘制的立体图像
- 极限和连续
	- 平面中相邻点的定义
		- 回顾空间中两点之间的距离函数：$d=\sqrt{(x_{1}-x_{0})^2+(y_{1}-y_{0})^2+(z_{1}-z_{0})^2}$
		- 设空间中 $\delta-$ 相邻的概念为：以 $(x_{0},y_{0})$ 为圆心的以 $\delta$ 为半径的圆（$\delta > 0$）内的点。用数学语言表示为一个集合，该集合满足 $\{(x,y):\sqrt{(x-x_{0})^2+(y-y_{0})^2<\delta}\}$
		- `open disk`：公式中为 $\lt$
		- `closed disk`：公式中为 $\le$
		- 内部点：内部点的 $\delta$ 半径内，所有点都在 R 区域内
		- 边界点：边界点 $\delta$ 半径内，部分点在 R 区域里面，部分点在 R 区域外面
		- 开区间：所有点都是内部点
		- 闭区间：存在完整的边界
	- 2 变量函数的极限定义
		- 单变量函数极限回顾
			- 在函数 $y=f(x)$ 中，对于坐标 $(x_{0},y_{0})$，对于任意的 $\epsilon>0$，总存在对应的 $\delta$，使得对于任意的  $0<|x-x_{0}|<\delta$，总有 $|y_{0}-L|<\epsilon$；我们称 $y=f(x)$ 在点 $x_{0}$ 处的极限为 $L$
		- 定义
			- 在函数 $f(x,y)$ 中，对于坐标 $(x_{0},y_{0},f(x_{0},y_{0}))$；对于任意的 $\epsilon > 0$，总存在对应的 $\delta$，使得对于任意 $0<\sqrt{(x-x_{0})^2+(y-y_{0})^2} < \delta$，总有 $|f(x_{0},y_{0})-L|<\epsilon$；我们称 $f(x,y)$ 在点 $(x_{0},y_{0})$ 处的极限为 $L$
			- 符号表示为
				$$
				\lim_\limits{(x,y)\rightarrow (x_{0},y_{0})}f(x,y)=L
				$$
		- 单/多变量函数对比
			- 坐标中的元素个数：2->3
			- 两点之间距离的定义变化了：$0<|x-x_{0}|<\delta$ -> $0<\sqrt{(x-x_{0})^2+(y-y_{0})^2} < \delta$
			- 极限的下标由  $x\rightarrow x_{0}$ 转变为 $(x,y)\rightarrow (x_{0},y_{0})$，从而导致对于 $\rightarrow$ 符号含义的变化
				- 对于单变量求极限，只需要考虑左极限和右极限；两极限相等，则极限存在
				- **对于多变量函数求极限，对于任意方向趋近，极限值都必须相等，否则极限不存在**
		- 证明极限：从 $0<\sqrt{(x-x_{0})^2+(y-y_{0})^2} < \delta$ 推导到 $|f(x_{0},y_{0})-L|<\epsilon$，令 $\delta$ 等于关于 $\epsilon$ 的某个值，证明极限存在（要点：函数的放缩，涉及到不等式的问题）
			- 案例 1
				![](limit%20verification%201.png)
			- 案例 2
				![](limit%20verification%202.png)
		- 极限的求解：像单变量一样，直接带入/因式分解/有理化
		- 极限存在性
			- 肉眼观察法：如 $\lim\limits_{(x,y)\rightarrow(0,0)}\frac{1}{x^2+y^2}$ 显然不存在，因为 $x^2+y^2$ 无限趋近于 0，那么这个值无限趋近于无穷大
			- 探测当从各个方向趋近时，极限是否都相同。例如设置 $y=kx$，将其带入极限的求解公式（$k$ 可以是不同的常数）。若求得的极限结果与 $k$ 相关，那么表明从各个方向趋近时（k 不同），极限不同。那么极限不存在，否则极限存在。
	- 2 变量函数的连续性定义
		- 函数 $f(x,y)$ 在点 $(x_{0},y_{0})$ 连续
			- $\lim\limits_{(x,y)\rightarrow (x_{0},y_{0})}f(x,y)=f(x_{0},y_{0})$
		- 函数 $f(x,y)$ 连续：函数在开区间上任何点都连续，则该函数在开区间上为连续函数
		- 连续多变量函数在 $(x_{0},y_{0})$ 点的四则运算：用标量乘、函数相乘、加减除，$(x_{0},y_{0})$ 处依然保持连续
		- 复合函数连续：两复合函数在 $(x_{0},y_{0})$ 处连续，将其复合后在该点依然保持连续
		- 连续性测试：需要找到不连续的地方（根据函数定义域）
	- 3 变量函数的连续性定义
		- 相比两变量函数的变化：邻域点的定义发生了变化，但是依然采用距离公式，内部点和区间的定义也因此做了一些微小的调整，此时邻域为一个球形。其他的定义和定理都和 2 变量情况下类似，此处不再赘述
- 偏导
	- 2 变量函数的偏导定义 & 计算
		- 偏导的含义：函数值随单个自变量变化的量度
			![](definition%20of%20partial%20derivatives%20of%202%20function%20of%202%20vars.png)
		- 偏导的求解：把其他自变量当作常数，求解函数值对特定自变量（你想要分析的自变量）的导数
		- 偏导的符号表示
			![](notation%20for%20partial%20derivatives.png)
		- 偏导的几何意义
			- 假设函数为 $z=f(x,y)$（该函数形成的是一个三维空间中的曲面）
			- 当 $y=y_{0}$ 时，函数 $z=f(x,y_{0})$ 为 $z=f(x,y)$ 和平面 $y=y_{0}$ 的交线。对 $z=f(x,y_{0})$ 求 x 偏导
				$$
				z_{x}=\lim\limits_{\Delta{x}\rightarrow 0}\frac{f(x_{0}+\Delta{x},y_{0})-f(x_{0},y_{0})}{\Delta{x}}
				$$
			- 当 $x=x_{0}$ 时，函数 $z=f(x_{0},y)$ 为 $z=f(x,y)$ 和平面 $x=x_{0}$ 的交线。对 $z=f(x_{0},y)$ 求 y 偏导
				$$
				z_{y}=\lim\limits_{\Delta{y}\rightarrow 0}\frac{f(x_{0},y_{0}+\Delta{y})-f(x_{0},y_{0})}{\Delta{y}}
				$$
			- 总结：$\frac{\partial f}{\partial x}$ 和 $\frac{\partial f}{\partial y}$ 分别为函数 $f$ 在 y 和 x 固定时，x 和 y 方向上曲线的斜率
			- 某点 $(x_{0},y_{0})$ 处的偏导计算：直接带入值即可
		- 偏导的其他应用：求解函数相对于某一自变量的变化率
	- 3 变量及更多变量函数的偏导定义 & 计算：和前面两个变量的类似，此处不再赘述
	- 2 或 3 变量函数的高阶偏导
		> 最后两种也叫 `mixed partial derivative`，其中，如果 $f_{xy}$ 和 $f_{yx}$ 是开区间 R 上的连续函数，那么对于 R 上的所有 $(x,y)$，都有 $f_{xy}=f_{yx}$。对于 3 个变量及以上的函数，该性质仍然成立。
		> ![](higher%20order%20derivative%20of%203%20variable%20functions.png)
			
		- ![](higher%20order%20differentiate.png)
- 微分
	- 单变量函数的增量和微分复习
		- 增量：$f(x+\Delta{x})-f(x)$
		- 微分：$dy=f'(x)dx$
	- 增量和微分的概念 & 两变量函数的微分定义
		- 设函数为 $z=f(x,y)$，$x$ 的增量为 $\Delta{x}$，$y$ 的增量为 $\Delta{y}$
		- 那么 $z$ 的增量为 $\Delta{z}=f(x+\Delta{x},y+\Delta{y})-f(x,y)$
		- $x$ 的微分为 $dx$，$y$ 的微分为 $dy$
		- 全微分的定义如下
			$$
			dz=\frac{\partial z}{\partial x}dx+\frac{\partial z}{\partial y}dy=f_{x}(x,y)dx+f_{y}(x,y)dy
			$$
		- 全微分公式拓展
			- 对于有多个变量的全微分，其值等于函数对各个自变量的偏导 * 该自变量的微分的和
			- 例如对于函数 $z=f(x,y,u,w)$，其全微分为
				$$
				dz=\frac{\partial z}{\partial x}dx+\frac{\partial z}{\partial y}dy+\frac{\partial z}{\partial u}du+\frac{\partial z}{\partial w}dw
				$$
	- 是否可微判断
		> 注意多变量函数可微的条件和单变量函数不相同，对于单变量函数，只需要其导数存在即可。而对于多变量函数，$f_{x}$ 和 $f_{y}$ 都存在不一定证明其可微。因为在那个点有可能根本就不可导。
		
		- 初步判断
			> 三元函数的微分形式与可微判断与二元函数类似，此处不再赘述。
			
			- 在某个点可微：设函数为 $\Delta{z}$，判断该 $\Delta{z}$ 是否能写成 $f_{x}\Delta{x}+f_{y}\Delta{y}+\epsilon_{1}{\Delta{x}}+\epsilon_{2}{\Delta{y}}$，且当 $(\Delta{x},\Delta{y})\rightarrow(0,0)$ 时，$\epsilon_{1}$ 和 $\epsilon_{2}$ 趋近于 0
			- 在区域 R 内可微：在区域 R 内的每个点都可微
		- 严谨判断：对于函数 $f(x,y)$，若 $f_{x}$ 和 $f_{y}$ 都在开区域 R 上连续，那么 $f(x,y)$ 在区域 R 上可微
	- 微分近似
		- 设函数为 $z=f(x,y)$
		- 函数值的微分
			$$
			dz=f_{x}dx+f_{y}dy
			$$
		- 函数值的变化量
			$$
			\Delta{z}=f_{x}\Delta{x}+f_{y}\Delta{y}+\epsilon_{1}\Delta{x}+\epsilon_{2}\Delta{y}
			$$
		- 而因为函数可微，当 $\Delta{x}$ 和 $\Delta{y}$ 趋近于 0 时，$\epsilon_{1}$ 和 $\epsilon_{2}$ 趋近于 0。因为此时 $\Delta{x}$ 和 $\Delta{y}$ 并不大，因此我们可以试图使用省略后面两项。将函数值的变化量写作如下形式
			$$
			\Delta{z}=f_{x}\Delta{x}+f_{y}\Delta{y}
			$$
		- 那么误差为 $\epsilon_{1}\Delta{x}+\epsilon_{2}\Delta{y}$
		- 这种方法称为线性近似
	- 误差分析
		- 相对误差公式为 $\frac{\Delta{V}}{V}$
		- 其可以近似为 $\frac{dV}{V}$
	- 可导与连续
		- 如果函数 $f(x,y)$ 在区间 R 上可导，那么它在 R 上连续。证明如下
			- 我们的证明目标是从
				$$
				\Delta{z}=(f_{x}(x_{0},y_{0})+\epsilon_{1})\Delta{x}+(f_{y}(x_{0},y_{0})+\epsilon_{2})\Delta{y}
				$$
				到
				$$
				\lim\limits_{(x,y)\rightarrow(x_{0},y_{0})}f(x,y)=f(x_{0},y_{0})
				$$
			- \因为 $f(x,y)$ 在区间 R 上可导，因此
				$$
				\Delta{z}=(f_{x}(x_{0},y_{0})+\epsilon_{1})\Delta{x}+(f_{y}(x_{0},y_{0})+\epsilon_{2})\Delta{y}
				$$
			- 且当 $(\Delta{x},\Delta{y})\rightarrow(0,0)$ 时，$\epsilon_{1}$ 和 $\epsilon_{2}$ 趋近于 0
			- 因为
				$$
				\Delta{z}=f(x_{0}+\Delta{x},y_{0}+\Delta{y})-f(x_{0},y_{0})
				$$
			- 那么
				$$
				f(x_{0}+\Delta{x},y_{0}+\Delta{y})-f(x_{0},y_{0})=(f_{x}(x_{0},y_{0})+\epsilon_{1})\Delta{x}+(f_{y}(x_{0},y_{0})+\epsilon_{2})\Delta{y}
				$$
			- 因为
				$$
				\begin{aligned}
				&\Delta{x}=x-x_{0} \\
				&\Delta{y}=y-y_{0} \\
				\end{aligned}
				$$
			- 那么原式可以改写为
				$$
				f(x_{0}+\Delta{x},y_{0}+\Delta{y})-f(x_{0},y_{0})=(f_{x}(x_{0},y_{0})+\epsilon_{1})(x-x_{0})+(f_{y}(x_{0},y_{0})+\epsilon_{2})(y-y_{0})
				$$
			- 令
				$$
				\begin{aligned}
				&x=x_{0}+\Delta{x} \\
				&y=y_{0}+\Delta{y} \\
				\end{aligned}
				$$
			- 那么原式可以改写为
				$$
				f(x,y)-f(x_{0},y_{0})=(f_{x}(x_{0},y_{0})+\epsilon_{1})(x-x_{0})+(f_{y}(x_{0},y_{0})+\epsilon_{2})(y-y_{0})
				$$
			- 而当 $(\Delta{x},\Delta{y})\rightarrow(0,0)$，我们可以得到
				$$
				\lim_\limits{(x,y)\rightarrow(x_{0},y_{0})}f(x,y)-f(x_{0},y_{0}) = 0
				$$
			- 因此
				$$
				\lim\limits_{(x,y)\rightarrow(x_{0},y_{0})}f(x,y)=f(x_{0},y_{0})
				$$
			- 满足连续性条件，因此当函数 $f(x,y)$ 在 $(x_{0},y_{0})$ 处可微时，函数在该处连续
		- 如果函数 $f(x,y)$ 在区间 R 上不连续，那么它在 R 上一定不可导
- 多变量的链式法则
	- 多变量链式法则
		- 简易方法：假设 $w$ 是关于 $x$ 和 $y$ 的函数，而 $x$ 和 $y$ 又是关于 $s$ 和 $t$ 的函数。我们可以直接带入 $x$ 和 $y$ 的函数到 $w$（构成复合函数），以实现对 $s$ 和 $t$ 偏导的直接求解。
		- 单自变量的链式法则： $w$ 是关于 $x$ 和 $y$ 的函数，而 $x$ 和 $y$ 又是关于 $t$ 的函数。那么 $w$ 关于 $t$ 的导数为
			> 注意 $\frac{dw}{dt}$ 和 $\frac{\partial w}{\partial t}$ 之间的区别，后者是求偏导，是指在有多个自变量的情况下，求解函数关于其中一个自变量的变化率。如果说只有 t 一个参数，而没有其他的，那么就是求导数。否则则用偏导符号，譬如 $\frac{\partial w}{\partial x}$ 和 $\frac{\partial w}{\partial y}$
			
			$$
			\frac{dw}{dt}=\frac{\partial w}{\partial x}\frac{dx}{dt}+\frac{\partial w}{\partial y}\frac{dy}{dt}
			$$
		- 多自变量的链式法则：$w$ 是关于 $x$ 和 $y$ 的函数，而 $x$ 和 $y$ 又是关于 $s$ 和 $t$ 的函数。那么要求 $w$ 关于 $t$ 的偏导，和 $w$ 关于 $s$ 的偏导，我们需要分开求解
			$$
			\begin{aligned}
			&\frac{\partial w}{\partial t}= \frac{\partial w}{\partial x}\frac{\partial x}{\partial t}+\frac{\partial w}{\partial y}\frac{\partial y}{\partial t}\\
			&\frac{\partial w}{\partial s}= \frac{\partial w}{\partial x}\frac{\partial x}{\partial s}+\frac{\partial w}{\partial y}\frac{\partial y}{\partial s}\\
			\end{aligned}
			$$
		- 对于更多自变量的情况，链式法则依然适用
	- 隐函数偏导 & 链式法则
		- 隐函数偏导
			> 回顾：隐函数是无法直接得出 $y$ 和 $x$ 的关系的函数。其结果隐藏在 $F(x,y)=0$ 中
		
			- 设隐函数的格式如下
				$$
				F(x,y)=0
				$$
			- 令 $w=F(x,y)$。我们现在可以看到，$w$ 是关于 $x$ 和 $y$ 的函数，而 $x$ 是关于 $x$ 的函数，$y$ 是关于 x 的函数。
			- 换个符号，我们可以这样看，$w$ 是关于 $u$ 和 $v$ 的函数（$w=G(u,v)$），而 $u=x$，$v=f(x)$。
			- 根据链式法则，$w$ 关于 $x$ 的函数可以这样写
				$$
				\frac{dw}{dx}=\frac{\partial w}{\partial u}\frac{du}{dx}+\frac{\partial w}{\partial v}\frac{dv}{dx}
				$$
			- 根据前文内容，我们知道 $w=0$，那么 $\frac{dw}{dx}=0$；再将 $u=x,v=f(x)$ 带回式子，可得
				$$
				F_{x}+F_{y}\frac{dy}{dx}=0
				$$
			- 因此可得隐函数中
				$$
				\frac{dy}{dx}=-\frac{F_{x}}{F_{y}}
				$$
		- 隐函数链式法则
			![](chain%20rule%20of%20implicit%20differentiation.png)
- 方向导数和梯度
	> 这个油管视频对方向导数和梯度的讲解很清晰：[Directional Derivatives | What's the slope in any direction? - YouTube](https://www.youtube.com/watch?v=GJODOGq7cAY)
	
	- 两变量函数的方向导数
		- 前情提要：设存在一个曲线 $z=f(x,y)$。$f_{x}$ 是当 y 固定时，在 x 方向上的曲线的斜率。$f_{y}$ 是当 x 固定时，在 y 方向上的曲线的斜率。
		- 问题：根据之前的知识，我们只能求解在 x/y 方向上的斜率，无法求解三维曲面任意方向上的斜率（导数）。
		- 解决办法：引入方向导数的概念
			- 设我们想要求解的方向和 $x$ 轴的夹角为 $\theta$，那么该方向在 $x$ 轴和 $y$ 轴上的投影分别是 $\cos\theta$ 和 $\sin\theta$（此处定义的时候我们使用的是 $\theta$，这样做有两个原因，一来是我们暂时不在乎走了多远，只需要定义行走的方向；二来是 $\sqrt{(\cos\theta)^2+(\sin\theta)^2}=1$，说明 $(\cos\theta,\sin\theta)$ 是一个单位向量，后期我们可以用行走的长度乘以这个单位向量，来获取目的地的点坐标）
			- 假设我们的初始点坐标是 $P(x_{0},y_{0})$。**在 xOy 平面上**，往 $\theta$ 夹角方向走 $t$ 个单位，那么 $x$ 方向的坐标为 $x_{0}+t\cos\theta$，$y$ 方向的坐标为 $y_{0}+t\sin\theta$。因此新的目的地的坐标为 $(x_{0}+t\cos\theta,y_{0}+t\sin\theta)$
			- 在定义斜率之前，我们先用一个公式来表达对于函数 $z=f(x,y)$，从 $P(x_{0},y_{0})$ 点触发，沿着与 $x$ 轴为 $\theta$ 的角度走 $t$ 个单位时，其函数值（$z$）的变化
				$$
				\Delta{z}=f(x_{0}+t\cos\theta,y_{0}+t\sin\theta)-f(x_{0},y_{0})
				$$
			- 因为其在 xOy 平面上（**注意不是 x 轴或者 y 轴！**）上行走的单位为 $t$
			- 那么我们 $\frac{\Delta{z}}{t}$ 来定义该行走长度下的切线斜率
				$$
				\frac{\Delta{z}}{t}=\frac{f(x_{0}+t\cos\theta,y_{0}+t\sin\theta)-f(x_{0},y_{0})}{t}
				$$
			- 要求解在 $P(x_{0},y_{0})$ 处的切线，我们需要让 $t\rightarrow 0$，那么该式便改写为
				$$
				\lim\limits_{t\rightarrow 0}\frac{\Delta{z}}{t}=\lim\limits_{t\rightarrow 0}\frac{f(x_{0}+t\cos\theta,y_{0}+t\sin\theta)-f(x_{0},y_{0})}{t}
				$$
			- 若函数在该处可导，根据前文多变量函数微分的性质可得
				$$
				f(x_{0}+t\cos\theta,y_{0}+t\sin\theta)-f(x_{0},y_{0})=f_{x}dx+f_{y}dy
				$$
				> 证明在这里：
				> ![](directional%20derivative%20proof.png)
				
			- 由于 $dx=t\cos\theta$，$dy=t\sin\theta$，因此上述式子可以改写为
				$$
				\lim\limits_{t\rightarrow 0}(f(x_{0}+t\cos\theta,y_{0}+t\sin\theta)-f(x_{0},y_{0}))=dz=f_{x}t\cos\theta+f_{y}t\sin\theta
				$$
			- 用该式除以 $t$， 前面的导数公式可以改写为
				$$
				\lim\limits_{t\rightarrow 0}\frac{\Delta{z}}{t}=f_{x}\cos\theta+f_{y}\sin\theta
				$$
			- 而 $f_{x}\cos\theta+f_{y}\sin\theta$ 可以改写为两个向量的点乘形式
				$$
				f_{x}\cos\theta+f_{y}\sin\theta=<f_{x},f_{y}>\cdot<\cos\theta,\sin\theta>
				$$
			- 那么前面的导数公式可以改写为
				$$
				\lim\limits_{t\rightarrow 0}\frac{\Delta{z}}{t}=f_{x}\cos\theta+f_{y}\sin\theta=<f_{x},f_{y}>\cdot<\cos\theta,\sin\theta>
				$$
			- 这里的向量 $(f_{x},f_{y})$ 被称为梯度，也记作 $\nabla f(x,y)$，用来表示分别在 $x$ 和 $y$ 方向上的斜率，也就是随着 x 和 y 变化带来的函数值的变化量；$\cos\theta$ 和 $\sin\theta$ 被称为方向向量，用来表示行走的方向相对于 $x$ 轴偏离的方向（该方向也可以用 $\vec{u}=\cos\theta\vec{i}+\sin\theta\vec{j}$ 表示）；两者的乘积称为方向导数，以用 $D_{\vec{u}}f$ 表示。
		- 公式总结
			> 注意：方向向量必须是单位向量，否则公式不成立（因为会把方向向量计算到行走的长度里去）；如果方向向量不是单位向量，那么必须化为单位向量

			- 方向导数
				$$
				D_{\vec{u}}f(x,y)=\lim\limits_{t\rightarrow 0}\frac{f(x_{0}+t\cos\theta,y_{0}+t\sin\theta)-f(x_{0},y_{0})}{t}
				$$
				若在 $P(x_{0},y_{0})$ 处可导，那么该导数可以改写为
				$$
				D_{\vec{u}}f(x,y)=f_{x}\cos\theta+f_{y}\sin\theta=<f_{x},f_{y}>\cdot<\cos\theta,\sin\theta>=\nabla f(x,y)\cdot\vec{u}
				$$
	- 两变量函数的梯度
		- 梯度是**平面中**的一个向量（注意不是空间中，因为 $\nabla f(x,y)$ 只有 2 个分量 $(f_{x},f_{y})$），其指向的是函数值增加最快的方向
		- 回忆前文，在 $\vec{u}$ 方向上的方向导数的值是梯度和方向向量 $\vec{u}$ 的点乘
	- 两变量函数梯度的应用
		> 注意：梯度向量的方向和每一层的 Level curve 垂直（重要！）[这个回答](https://math.stackexchange.com/a/1680729/1326289)解释的很好

		- 寻找让函数值增加最快和最慢的方向
		- 可以将方向导数的表达式改写一下
			$$
			D_{\vec{u}}f(x,y)=|\vec{u}||\nabla f(x,y)|\cos\phi
			$$
			由于 $\vec{u}$ 是单位向量，因此 $|\vec{u}|=1$，那么该式由可以改写为
			$$
			D_{\vec{u}}f(x,y)=|\nabla f(x,y)|\cos\phi
			$$
			其中 $\phi$ 是梯度向量和方向向量的夹角。
		- 从该式子中可以看出，方向导数的最大值是在 $\cos\phi=1$ 时达到，也就是方向向量和梯度向量平行，最大值为 $|\nabla f(x,y)|$，沿着该方向走上升最快；最小值是在 $\cos\phi=-1$ 时达到，也就是方向向量和梯度向量刚好相反，最小值为 $-|\nabla f(x,y)|$，沿着该方向走下降最快；若 $\nabla f(x,y)=0$，那么方向导数为 0
		- 对于一个 `Level curve` $f(x(t),y(t))=c$，我们可以对其两边求导得到 $f_{x}x(t)'+f_{y}y(t)'=0$，由于 $(x'(t),y'(t))$ 就是沿着 `level curve` 的方向向量，而 $(f_{x},f_{y})$ 就是对应的梯度，因此对于 `level curve`，梯度向量总是垂直于方向向量
			![](gradient%20is%20normal%20to%20level%20curves.png)
	- 三变量函数中的方向导数和梯度：其他方面都和两变量形式类似，只不过这次方向导数不再是斜率了（因为三变量以及函数值，会构成一个四维空间），此外，$\nabla f(x,y,z)$ 垂直于 `level surface` （不是 `level curve` 噢）
		![](3%20var%20directional%20derivative%20and%20gradient.png)
- 切平面和法线
	- 普通二元函数转化为 `level curve / level surface` 
	- 切平面和曲面法线的方程
	- 空间中平面的倾角求解
	- $\nabla f(x,y)$ 和 $\nabla F(x,y,z)$ 比较
- 两变量函数的极值
	- 寻找两变量函数的绝对极值和相对极值
	- 使用二阶偏导找到两变量函数的相对极值
- 两变量函数极值的应用
	- 多变量函数值的最优化问题
	- 最小二乘法
- 拉格朗日乘子法
	- 拉格朗日乘子法理解
	- 使用拉格朗日乘子法解决限制条件下的最优化问题
	- 2 限制条件下的拉格朗日乘子法
- 总结

## Chapter 14：重积分

- 重积分与平面面积
- 二重积分与体积
- 基底变换：极坐标下的二重积分
- 质心与转动惯量
- 表面积
- 三重积分及其应用
- 圆柱坐标系和球坐标系下的三重积分
- 基地变换的新方法：Jacobians 矩阵
- 总结

## Chapter 15：向量分析（向量场，线积分和平面积分）\*

- 向量场
- 线积分
- 保守向量场（conversative vector fields）和独立路径（independent path）
- 曲面的参数表示
- 曲面积分
- 高斯散度定理
- 斯托克斯定理
- 总结

## 本书难点

## Todo

- [ ] Vector Calculus
- [ ] 不等式
- [ ] 代数
- [ ] 数学分析
- [ ] 解析几何
- [ ] 微分几何
- [ ] 常微分方程
- [ ] 线性代数
- [ ] 矩阵论
- [ ] 代数
- [ ] 立体几何
- [ ] 解析几何
- [ ] 概率论与数理统计
- [ ] 统计学
- [ ] 解析几何
- [ ] 偏微分方程
- [ ] 基础物理
- [ ] 严谨的数学分析
- [ ] 级数的研究
- [ ] 不等式性质的学习
- [ ] 数学分析
- [ ] 圆锥曲线的学习
- [ ] 平面几何
- [ ] 微分几何
- [ ] 分析几何
- [ ] 坐标系 & 仿射几何相关内容学习
- [ ] 平面几何学东西
- [ ] 向量研究
- [ ] 立体几何学习
- [ ] 图形学学习
- [ ] Vector Calculus
- [ ] 电磁学
- [ ] 俄罗斯初等代数学习
- [ ] 抽象代数
