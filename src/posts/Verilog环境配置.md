---
title: Windows 10 下 Verilog 开发环境的配置：Vivado 2023.2 + Vscode
shortTitle: Windows 10 下 Verilog 开发环境的配置：Vivado 2023.2 + Vscode
author: Salvely
date: 2024-5-6
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
category:
  - Vivado
  - 安装教程
  - FPGA
  - VSCode
date updated: 2024-05-06 11:34
---

以前学习组成原理与体系结构的时候，用的都是Logisim和Proteus这样的仿真工具，并没有实际写过Verilog代码。教学资源受限是一方面，没有板子又是另一个方面。但是最近找到了中科大的[Digital Lab 2023 (ustc.edu.cn)](https://soc.ustc.edu.cn/Digital/)数字逻辑实验（这是普通班的链接，还有提高班），发现他们提供了一个[About - FPGA Online (ustc.edu.cn)](https://fpgaol.ustc.edu.cn/fpga/usage/)，其中的游客通道可以供校外学生使用，因此我这个暂时没有钱买板子，但是又想学习的学生，终于迎来了系统学习体系结构的机会。（非常感谢中科大开放这么好的资源！）

工欲善其事，必先利其器。学习体系结构的第一步就是安装Vivado（之前学校推荐的是Quartus，但是教学资源不是很多），我准备的环境是Vivado + Vscode Verilog插件，下面开始正式配置环境。

## Vivado 下载

vivado可以从xilinx的官网下载，地址在[Downloads (xilinx.com)](https://www.xilinx.com/support/download.html)，其中有一些早期的版本，还有2023.1和2023.2版本。据中科大数字逻辑实验网站[Vivado 安装教程 - Digital Lab 2023 (ustc.edu.cn)](https://soc.ustc.edu.cn/Digital/lab0/vivado/)，较早期的版本中会报出上千个的警告，导致真正需要修改的警告被隐匿在海洋中。但是2023.1及以后的版本修复了这个毛病。因此我们选择下载最新的2023.2版本。2023.2版本提供了Windows下的安装程序和Linux下的安装程序。在下载之前，我们需要注册一个账号，登录账号后即可下载对应的软件，这里我们下载Windows版本。

## Vivado安装

Vivado在Windows下的安装过程可以参考中科大的[Vivado 安装教程 - Digital Lab 2023 (ustc.edu.cn)](https://soc.ustc.edu.cn/Digital/lab0/vivado/)，写的非常详细，此处不再阐述。此外，如果空间不够大，可以参考这个PDF：[Vivado2022.2超省空间安装指南.pdf (ustc.edu.cn)](https://soc.ustc.edu.cn/Digital-Pro/appendix/Vivado2022.2%E8%B6%85%E7%9C%81%E7%A9%BA%E9%97%B4%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97.pdf)。2023.2版本的部分安装界面与2023.1版本稍有不同，但是不影响整体过程。

## Vivado工程的建立

> 一个新的Vivado工程的建立和使用可以参考中科大数字逻辑提高班的教程：[Vivado的使用 - Digital Lab Pro 2023 (ustc.edu.cn)](https://soc.ustc.edu.cn/Digital-Pro/lab0/IDE/)和北理工的组成原理课程环境配置教程：[利用 Vivado 创建项目 | Build Your PC (spencerwoo.com)](https://zanpu.spencerwoo.com/1_Preparations/1-2_Vivado.html#%E5%88%9B%E5%BB%BA%E5%B7%A5%E7%A8%8B%E9%A1%B9%E7%9B%AE)

## VSCode Verilog / SystemVerilog环境的配置

> 将Vscode设置为默认编辑器，及安装一些辅助插件的方式可以看这里：[使用 VS Code 作为 Vivado 的默认代码编辑器 | Build Your PC (spencerwoo.com)](https://zanpu.spencerwoo.com/1_Preparations/1-3_Editor.html#%E6%9B%B4%E6%8D%A2%E9%BB%98%E8%AE%A4%E4%BB%A3%E7%A0%81%E7%BC%96%E8%BE%91%E5%99%A8)