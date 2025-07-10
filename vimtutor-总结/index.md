# vimtutor 总结


<!--more-->

> [!TIP]
> [chloneda/vim-cheatsheet: 🍁Vim cheat sheet with everything you want to know.](https://github.com/chloneda/vim-cheatsheet) 这个表更全面。此外，如果你的终端是gb2312编码，vimtutor会是中文版本，详情见此[如何获取VIM自带的vimtutor中文版 – 小顾de杂记](https://blog.ihipop.com/2011/01/2026.html)。如果你想要获得vimtutor的中文版本，可以输入`vimtutor zh_cn`；英文版是`vimtutor en`。

- 打开`vim`：`vim <file>`
- 不保存强制退出`vim`：`:q!`
- 保存：`:w`，`:w <file>` 保存到文件file中
- `w`是下一个单词开头，`e`是下一个文字结尾，`$`是行末，`0`是行开头
- 删除：`dw de d$ dd`，要指明删除到哪里：`d2w d2e`，命令模式：operation num motion
- 撤回：`u` 撤回一个操作 ，`U` 撤回一行 ，`CTRL+R` redo
- 单个替换：`r`，多个替换：`R`
- `c`是change，c后可接`c/e/$`
- `dd` 删除一行 `p` 粘贴刚才删除的那行
- `CTRL+G` 获得当前光标位置（文件，行号，列号等），`G` 跳到末尾 `gg` 跳到开头 `行号+G` 跳到该行
- `/` 搜索并向后查找，`?`搜索并向前查找， `n` 向后找 `N` 向前找
- `CTRL+O` 上一个查找到的 `CTRL+I` 下一个查找到的
- `wrpscan`模式 当查找到最后一个以后，下一次查找就找到第一个
- `%` 匹配括号 `( [ { } ] )`
- `:s/old/new` 搜索到该行第一个old并替换为new
- `:s/old/new/g` 搜索到该行所有的old并替换为new
- `:%s/old/new` 在整个文件搜索到第一个old并替换为new
- `:%s/old/new/g` 在整个文件搜索到所有的old并替换为new
- `gc` 逐个询问你是否替换
- `:#,#s` 从某行到某行之间替换
- `:! <外部命令>` 执行外部命令（如ls dir cat等等）
- `y`复制 `p` 粘贴
- `v` 视觉模式 `v`后再输入:可以输入普通模式下的命令（如`!cat <file>`）
- `:r` 读内容，并复制到光标处，比如`:r !ls`就是把`ls`命令的结果输出到光标处；
- `o`在该行下面插入一行 `O`在该行上面插入一行
- `a`在该字符后面插入字符  `A`在该行末尾插入字符
- `:set` 设置模式
- `hls` `hlsearch` 高亮搜索 `nohls` `nohlsearch` 非高亮搜索
- `ic` `ignorecase`忽略大小写 `noic` `noignorecase`不忽略大小写
- 如果仅仅想要在一次搜索中忽略大小写，可以使用/c，如`/[text]\c`
- `is` `incsearch` 查找输入时动态增量显示查找结果 `nois` `noicsearch` 不动态增量显示
- `nocp` 不兼容vi
- 按F1或输入`:help [命令]`调出命令帮助，直接输入`:help`调出vim帮助，如`:help vimrc-intro`
- vim配置文件：~/.vimrc
- `:e`，在进入vim后， 在不离开vim的情况下打开其他文件
- `CTRL+D` 列出所有候选命令，`Tab` 补全当前命令

