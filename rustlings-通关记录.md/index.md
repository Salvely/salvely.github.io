# rustlings 通关记录


> [!WARNING]
>
> 在使用`rustlings`之前，我们需要学习一些基础的`rust`语法，并且写一些小程序，否则会因为练习的难度过大而被劝退。

## 环境配置

### `Rust`环境配置

1. 新建一个仓库，我的叫`rustlings-exercises`

	> [!WARNING]
	>
	> 错误的做法是进入[rust-lang/rustlings: :crab: Small exercises to get you used to reading and writing Rust code!](https://github.com/rust-lang/rustlings)，然后点击`fork`，得到自己的仓库。对于清华操作系统训练仓库的`rustlings`练习可以这么干，但是对于`rustlings`官方的不行。原因是清华的可能修改了`rustlings`构建的路径。

2. 点击绿色的`Code`，选择`Codespaces`，点击`create new codespaces on main`，创建一个`codespaces`（不想配置`Ubuntu`环境的话，可以采取这种懒人做法，也可以采用`README`中的环境配置方法）
3. 进入`codespaces`，等待初始化结束。下面我们参考[Rust 开发环境配置 - ArceOS Tutorial Book](https://rcore-os.cn/arceos-tutorial-book/ch01-02.html)来配置`rust`开发环境。
4. 首先安装 Rust 版本管理器 rustup 和 Rust 包管理器 cargo，这里我们用官方的安装脚本来安装：

	```bash
	curl https://sh.rustup.rs -sSf | sh
	```

	安装时选择`default`选项即可。

5. 安装完成后，我们可以重新打开一个终端来让之前设置的环境变量生效。我们也可以手动将环境变量设置应用到当前终端，只需要输入以下命令：

	```bash
	source $HOME/.cargo/env
	```

	接下来验证`rustc`的版本

	```bash
	rustc --version
	```

   输出如下：

   ```bash
   @Salvely ➜ /workspaces/rustlings (main) $ rustc --version rustc 1.82.0 (f6e511eec 2024-10-15)
    ```

6. 接下来我们配置`cargo`软件包的源镜像地址，在`~/.cargo/config.toml`文件中进行如下配置：

	```yaml
	[source.crates-io]
	registry = "https://github.com/rust-lang/crates.io-index"
	replace-with = 'ustc'
	[source.ustc]
	registry = "git://mirrors.ustc.edu.cn/crates.io-index"
	```

7. 接下来安装一些Rust相关的软件包：

	```bash
	rustup target add riscv64gc-unknown-none-elf
	rustup component add llvm-tools-preview
	rustup component add rust-src
	```

### `Rustlings`环境配置

首先我们需要安装`rustlings`，使用如下命令：

```bash
cargo install rustlings
```

然后使用如下命令初始化`rustlings`文件夹：

```bash
rustlings init
```

输入`cd rustlings`，来进入`rustlings`文件夹，并且运行`rustlings`来启动`rustlings`：

```bash
cd rustlings
rustlings
```

出现提示语：

```bash
Is this your first time? Don't worry, Rustlings is made for beginners!
We are going to teach you a lot of things about Rust, but before we can
get started, here are some notes about how Rustlings operates:

1. The central concept behind Rustlings is that you solve exercises. These
   exercises usually contain some compiler or logic errors which cause the
   exercise to fail compilation or testing. It's your job to find all errors
   and fix them!
2. Make sure to have your editor open in the `rustlings/` directory. Rustlings
   will show you the path of the current exercise under the progress bar. Open
   the exercise file in your editor, fix errors and save the file. Rustlings
   will automatically detect the file change and rerun the exercise. If all
   errors are fixed, Rustlings will ask you to move on to the next exercise.
3. If you're stuck on an exercise, enter `h` to show a hint.
4. If an exercise doesn't make sense to you, feel free to open an issue on
   GitHub! (https://github.com/rust-lang/rustlings). We look at every issue, and
   sometimes, other learners do too so you can help each other out!

Press ENTER to continue 
```

环境配置成功！

## Rustlings 漫游

首先，rustlings 可以和以下两本书配套使用：

1. [The Rust Programming Language - The Rust Programming Language](https://doc.rust-lang.org/book/)
2. [Introduction - Rust By Example](https://doc.rust-lang.org/rust-by-example/)

接下来我们熟悉一下`Rustlings`的一些命令，以便后面更好的做题：

```bash
# 查看rustlings 做题状况
rustlings watch
# 查看rustlings 做题状况，只查看一次
rustlings verify
# 只验证某个练习
rustlings run [exercise-name]
# 运行下一个未解决的问题
rustlings run next
# 获取练习提示
rustlings hint [exercise-name]
# 获得下一个未解决问题的提示
rustlings hint next
# 检查进度
rustlings list
# 启用rust-analyzer
rustlings lsp
# 卸载rustlings（通过删除rustlings文件夹）
rm -rf rustlings
# 或者通过cargo卸载
cargo uninstall rustlings
```

## Rustlings 题解

