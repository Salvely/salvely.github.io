# HW4: Shell & Pipe 实现记录

<!--more-->

## 要求

实现一个只含有基本命令和 Pipe(不含重定向符及其他符号)的 Shell。

## 指南

### 相关文件

- `pipe_shell.cc`:在其中实现 shell 程序
- `sh.cc`: 传入一个附带参数的程序，`fork()`子程序然后`execvp()`去执行它
- `stdin_echo.cc`: 从`stdin`中读取，输出读取的内容，直到获取`EOF`，然后停止
- `example_tests/`: 其中含有示例输入和对应输出
- `solution_binaries/`: 官方答案执行码

### 具体要求

- 程序一次从标准输入读取一行命令
- 一行命令包括命令本身和连接他们的 Pipe
- 不停读入直到读入`EOF`/用户输入`exit`
- 在当前命令完成之后才能运行下一条命令
- 命令可以是绝对路径或者是程序名（用`execvp`执行）

### 建议方法

- 通读该指南和提供的源代码，搞清楚作业是在做什么
- 执行一下`./solution_binaries/pipe_shell`，看看结果长什么样
- 开始实现`pipe_shell.cc`，从循环提示用户输入开始，并且打印`$`提示符，直到无输入或者遇到`EOF`/输入`exit`
- 实现`fork()`，`pipe`连接和命令的执行(`execvp`或者直接运行命令路径)

### 实现提示

- 可以使用`boost`库中的`split()`和`trim()`方法，
- 使用`execvp(), fork(), pipe(), waitpid()`等函数
- 注意不同情形：无管道，一个管道，多于一个管道
- 两种方法
  - 使用一个 pipe 数组
  - 每次`fork()`之前创建一个`pipe`
- 每个子进程只需要两个端口，从上一个进程送来的读端口，和给下一个子进程的写端口
- 子进程用完端口之后关闭端口，否则程序无法正常退出

### 测试

- 普通测试: `make && ./pipe_shell`
- 内存泄漏测试: `valgrind --leak-check=full ./pipe_shell`
- 比较自己的程序和`solution_binaries/pipe_shell`的结果：

```bash
cat ./tests/simple_input.txt | ./pipe_shell &> my_output.txt
diff my_output.txt ./tests/simple_output.txt
```

### `pipe_shell.cc`

> 实现核心：`pipe`的内存在操作系统内核中。在每次循环前创建一个`pipe`，然后`fork()`一个子进程读取上一个`pipe`的内容，写入当前这个`pipe`。使用完毕后关闭这个`pipe`的写端，保留这个`pipe`的读端口。进而让下一次`dup2`导入时使用，使用完后可关闭该`pipe`的读端口。`pipe`不会像本地变量那样随着循环的进行而消失，只要保存一下读/写端口，在下一轮循环中就可以正常的进行读写。
> 此外，我们使用`dup2`来进行端口的重定向。

```cpp
#include <unistd.h>    // for fork()
#include <sys/types.h> // for pid_t
#include <sys/wait.h>  // for wait(), waitpid(), etc.

#include <cstdlib> // for exit(), EXIT_SUCCESS, and EXIT_FAILURE
#include <iostream>
#include <vector>
#include <string.h>
#include <boost/algorithm/string.hpp>

using namespace std;

#define BUF_SIZ 1000

int main()
{
    string s;
    cout << "$ ";
    while (getline(std::cin, s))
    {
        if (s == "exit")
        {
            return EXIT_SUCCESS;
        }

        int fd[2];
        int in_fd = 0; // input fd

        // split the command into multiple parts
        vector<string> tokens;
        boost::algorithm::split(tokens, s, boost::is_any_of("|"), boost::token_compress_on);

        int count = 1;
        int command_num = tokens.size();

        for (auto &command : tokens)
        {
            // initialize a pipe
            if (pipe(fd) == -1)
            {
                perror("pipe creation failed!");
                return EXIT_FAILURE;
            }

            // prepare to run the current command

            // get the current command
            boost::algorithm::trim(command);
            // split the command into an array of args
            vector<string> args;
            boost::algorithm::split(args, command, boost::is_any_of(" "), boost::token_compress_on);
            int argc = args.size();
            if (argc < 1)
            {
                cerr << "We need a command!" << endl;
                return EXIT_FAILURE;
            }

            // run the current command
            pid_t child = fork();
            if (child == 0)
            {
                // setup the file name and input arguments
                const char *filename = args[0].c_str();
                char **argv = new char *[argc + 1];
                for (int i = 0; i < argc; i++)
                {
                    string args_str = args[i];
                    argv[i] = new char[10];
                    strcpy(argv[i], args_str.c_str());
                }
                argv[argc] = nullptr;

                if (in_fd != 0)
                {
                    // write the pipe value into stdin
                    dup2(in_fd, STDIN_FILENO);
                    close(in_fd);
                }

                if (count != command_num)
                {
                    // write stdout to the pipe
                    dup2(fd[1], STDOUT_FILENO);
                    close(fd[1]);
                }

                // use execvp() to run the commmand
                execvp(filename, argv);

                // exec didn't work, so an error must have been occurred
                cerr << strerror(errno) << endl;
                delete[] argv;
                return EXIT_FAILURE;
            }

            // wait for the child process to complete
            int status;
            waitpid(child, &status, 0);

            // close the current pipe write fd
            close(fd[1]);
            in_fd = fd[0];
            count += 1;
        }

        // // read out the pipe
        // char buffer[BUF_SIZ];
        // int count = read(in_fd, buffer, BUF_SIZ);
        // buffer[count] = '\0';
        // if (count > 0)
        // {
        //     fprintf(stdout, "%s", buffer);
        // }
        close(in_fd);

        cout << "$ ";
    }
    return EXIT_SUCCESS;
}
```

