---
authors:
  - Salvely
title: WSL2 下的 Arch Linux 探索记录
tags:
  - Arch
  - Linux
categories:
  - Linux
seriesNavigation: true
enableLastMod: true
enableWordCount: true
enableReadingTime: true
toc:
  enable: true
  auto: false
code:
  maxShownlines: 100
date: 2025-05-23T18:03:43+08:00
lastmod: 2025-06-28T14:13:54+08:00
series:
  - Arch 探索
draft: true
---

<!--more-->

要开始折腾Arch辣！自由探索时间到！

## 用户管理

添加用户并设置密码：

```bash
[root@DESKTOP-ROOSFVQ ~]# useradd -m gwen
[root@DESKTOP-ROOSFVQ ~]# passwd gwen
New password:
Retype new password:
passwd: password updated successfully
```

接下来我们想要将`gwen`设置为默认用户，需要在`/etc/wsl.conf`中进行如下设置：

```
[user]
default=_username_
```

要进行如上更改，我们需要一个文本编辑器。

## Pacman 初探

我们先来看看我们都安装了啥，通过Google检索【arch linux how many packages and tools I have installed】，它告知我们可以使用`pacman -Qq`命令来查看所有安装的包：

```shell
[root@DESKTOP-ROOSFVQ ~]# pacman -Qq
warning: database file for 'core' does not exist (use '-Sy' to download)
warning: database file for 'extra' does not exist (use '-Sy' to download)
acl
archlinux-keyring
attr
audit
base
bash
brotli
bzip2
ca-certificates
ca-certificates-mozilla
ca-certificates-utils
coreutils
cryptsetup
curl
dbus
dbus-broker
dbus-broker-units
dbus-units
device-mapper
e2fsprogs
expat
file
filesystem
findutils
gawk
gcc-libs
gdbm
gettext
glib2
glibc
gmp
gnulib-l10n
gnupg
gnutls
gpgme
grep
gzip
hwdata
iana-etc
icu
iproute2
iptables
iputils
json-c
kbd
keyutils
kmod
krb5
leancrypto
libarchive
libassuan
libbpf
libcap
libcap-ng
libelf
libevent
libffi
libgcrypt
libgpg-error
libidn2
libksba
libldap
libmnl
libnetfilter_conntrack
libnfnetlink
libnftnl
libnghttp2
libnghttp3
libnl
libnsl
libp11-kit
libpcap
libpsl
libsasl
libseccomp
libsecret
libssh2
libsysprof-capture
libtasn1
libtirpc
libunistring
libusb
libverto
libxcrypt
libxml2
licenses
linux-api-headers
lmdb
lz4
mpfr
ncurses
nettle
npth
openssl
p11-kit
pacman
pacman-mirrorlist
pam
pambase
pciutils
pcre2
pinentry
popt
procps-ng
psmisc
readline
sed
shadow
sqlite
systemd
systemd-libs
systemd-sysvcompat
tar
tpm2-tss
tzdata
util-linux
util-linux-libs
xz
zlib
zstd
```

那么问题来了，`pacman`是什么，选项`-Qq`又是什么？通过查阅 [pacman - Arch Linux 中文维基](https://wiki.archlinuxcn.org/wiki/Pacman)，我们可以知道`pacman`是一款Arch下的包管理器，其作用相当于Ubuntu中的`apt`。而`-Q`选项查询本地软件包数据库。那么`-q`是做什么的呢？通过[pacman(8)](https://pacman.archlinux.page/pacman.8.html) 手册，我们查到如下内容：

> **-q, --quiet**
>
> Show less information for certain query operations. This is useful when pacman's output is processed in a script. Search will only show package names and not version, group, and description information; owns will only show package names instead of "file is owned by pkg" messages; group will only show package names and omit group names; list will only show files and omit package names; check will only show pairs of package names and missing files; a bare query will only show package names rather than names and versions.

简单来说也就是把查询的输出简化一下打印出来。

但是这样的话， 我们并不清楚这些包到底是做什么用的。经过Web检索[what pacman option explain the package info - Google 搜索](https://www.google.com/search?q=what+pacman+option+explain+the+package+info&oq=what+pacman+option+explain+the+package+info&gs_lcrp=EgRlZGdlKgYIABBFGDkyBggAEEUYOTIKCAEQABiABBiiBDIKCAIQABiABBiiBDIKCAMQABiABBiiBDIHCAQQABjvBTIHCAUQABjvBdIBCTE1NTE1ajBqMagCALACAA&sourceid=chrome&ie=UTF-8)，我们了解到选项`-i`可以把各个包的详细信息打印出来。其中：

- `pacman -Si [package name]` 会详细显示还未安装的包的信息；
- `pacman -Qi [package name]` 会详细显示安装过的包的信息；

因为我们这里是看的安装过的包，因此我们使用`pacman -Qi`命令看一下：

其中打印出来的每一项都非常的长，各个包的信息格式如下：

```bash
Name            : acl
Version         : 2.3.2-1
Description     : Access control list utilities, libraries and headers
Architecture    : x86_64
URL             : https://savannah.nongnu.org/projects/acl
Licenses        : LGPL
Groups          : None
Provides        : xfsacl  libacl.so=1-64
Depends On      : glibc
Optional Deps   : None
Required By     : coreutils  gettext  libarchive  sed  shadow  systemd  tar
Optional For    : None
Conflicts With  : xfsacl
Replaces        : xfsacl
Installed Size  : 329.98 KiB
Packager        : Christian Hesse <eworm@archlinux.org>
Build Date      : Wed Jan 24 16:57:20 2024
Install Date    : Thu May 1 18:04:07 2025
Install Reason  : Installed as a dependency for another package
Install Script  : No
Validated By    : Signature
```

如果我们只想要`Name`和`Description`这两项，我们该怎么做呢？有没有命令可以实现？

通过查看手册，我们发现有个叫`--print-format`的选项好像可以实现，但是仔细一看，它是这样写的：

> Specify a printf-like format to control the output of the _--print_ operation.

那么`--print`选项又是什么呢？它是这样的：

> Only print the targets instead of performing the actual operation (sync, remove or upgrade)

这是什么意思呢，我又查了一下：[what is pacman --print option - Google 搜索](https://www.google.com/search?q=what+is+pacman+--print+option&sca_esv=495b9ab80c09e44b&sxsrf=AHTn8zoJ9eaQJ9q-N8Ha6WQNrgh_uFiwBw%3A1747996324310&ei=pE4waPHWEq_g1e8Ps4nS6Ag&ved=0ahUKEwjxuOrfsbmNAxUvcPUHHbOEFI0Q4dUDCBA&uact=5&oq=what+is+pacman+--print+option&gs_lp=Egxnd3Mtd2l6LXNlcnAiHXdoYXQgaXMgcGFjbWFuIC0tcHJpbnQgb3B0aW9uSOgRUO8EWOoPcAZ4AZABAJgBXqABgwaqAQIxMLgBA8gBAPgBAZgCAqACB8ICChAAGLADGNYEGEeYAwCIBgGQBgqSBwEyoAf-A7IHALgHAMIHBTAuMS4xyAcF&sclient=gws-wiz-serp)，`print`命令也就是在运行`pacman`命令的时候，只输出所有会执行的操作（包括升级/删除等），而不实际执行他们。这能让你看看执行过程中会发生什么事情。这个选项我们记住了，但是他并不能满足我们的要求。

那么剩下的只有一条路了，使用`grep`命令把所有的`Description`和`Name`行提取出来，并且把它们之间用换行符分割。`grep`命令怎么提取呢？因为`-E`是将PATTERNS作为正则解释，`^`代表行开始，`$`代表行末尾。那么那么我们可以使用`Name|Descrption|^$`来匹配带有Name的行、带有Description的行、和空行。输出如下：

```txt
warning: database file for 'core' does not exist (use '-Sy' to download)
warning: database file for 'extra' does not exist (use '-Sy' to download)
Name            : acl
Description     : Access control list utilities, libraries and headers

Name            : archlinux-keyring
Description     : Arch Linux PGP keyring

Name            : attr
Description     : Extended attribute support library for ACL support

Name            : audit
Description     : Userspace components of the audit framework

Name            : base
Description     : Minimal package set to define a basic Arch Linux installation

Name            : bash
Description     : The GNU Bourne Again shell

Name            : brotli
Description     : Generic-purpose lossless compression algorithm

Name            : bzip2
Description     : A high-quality data compression program

Name            : ca-certificates
Description     : Common CA certificates - default providers

Name            : ca-certificates-mozilla
Description     : Mozilla's set of trusted CA certificates

Name            : ca-certificates-utils
Description     : Common CA certificates (utilities)

Name            : coreutils
Description     : The basic file, shell and text manipulation utilities of the GNU operating system

Name            : cryptsetup
Description     : Userspace setup tool for transparent encryption of block devices using dm-crypt

Name            : curl
Description     : command line tool and library for transferring data with URLs

Name            : dbus
Description     : Freedesktop.org message bus system

Name            : dbus-broker
Description     : Linux D-Bus Message Broker

Name            : dbus-broker-units
Description     : Linux D-Bus Message Broker - Service units

Name            : dbus-units
Description     : D-Bus service units (default provider)

Name            : device-mapper
Description     : Device mapper userspace library and tools

Name            : e2fsprogs
Description     : Ext2/3/4 filesystem utilities

Name            : expat
Description     : An XML parser library

Name            : file
Description     : File type identification utility

Name            : filesystem
Description     : Base Arch Linux files

Name            : findutils
Description     : GNU utilities to locate files

Name            : gawk
Description     : GNU version of awk

Name            : gcc-libs
Description     : Runtime libraries shipped by GCC

Name            : gdbm
Description     : GNU database library

Name            : gettext
Description     : GNU internationalization library

Name            : glib2
Description     : Low level core library

Name            : glibc
Description     : GNU C Library

Name            : gmp
Description     : A free library for arbitrary precision arithmetic

Name            : gnulib-l10n
Description     : The Gnulib localizations

Name            : gnupg
Description     : Complete and free implementation of the OpenPGP standard

Name            : gnutls
Description     : A library which provides a secure layer over a reliable transport layer

Name            : gpgme
Description     : A C wrapper library for GnuPG

Name            : grep
Description     : A string search utility

Name            : gzip
Description     : GNU compression utility

Name            : hwdata
Description     : hardware identification databases

Name            : iana-etc
Description     : /etc/protocols and /etc/services provided by IANA

Name            : icu
Description     : International Components for Unicode library

Name            : iproute2
Description     : IP Routing Utilities

Name            : iptables
Description     : Linux kernel packet control tool (using legacy interface)

Name            : iputils
Description     : Network monitoring tools, including ping

Name            : json-c
Description     : JSON implementation in C

Name            : kbd
Description     : Keytable files and keyboard utilities

Name            : keyutils
Description     : Linux Key Management Utilities

Name            : kmod
Description     : Linux kernel module management tools and library

Name            : krb5
Description     : The Kerberos network authentication system

Name            : leancrypto
Description     : Lean cryptographic library usable for bare-metal environments

Name            : libarchive
Description     : Multi-format archive and compression library

Name            : libassuan
Description     : IPC library used by some GnuPG related software

Name            : libbpf
Description     : Library for loading eBPF programs and reading and manipulating eBPF objects from user-space

Name            : libcap
Description     : POSIX 1003.1e capabilities

Name            : libcap-ng
Description     : A library for Linux that makes using posix capabilities easy

Name            : libelf
Description     : Handle ELF object files and DWARF debugging information (libraries)

Name            : libevent
Description     : Event notification library

Name            : libffi
Description     : Portable foreign function interface library

Name            : libgcrypt
Description     : General purpose cryptographic library based on the code from GnuPG

Name            : libgpg-error
Description     : Support library for libgcrypt

Name            : libidn2
Description     : Free software implementation of IDNA2008, Punycode and TR46

Name            : libksba
Description     : Library for working with X certificates, CMS data and related objects

Name            : libldap
Description     : Lightweight Directory Access Protocol (LDAP) client libraries

Name            : libmnl
Description     : Minimalistic user-space library oriented to Netlink developers.

Name            : libnetfilter_conntrack
Description     : Library providing an API to the in-kernel connection tracking state table

Name            : libnfnetlink
Description     : Low-level library for netfilter related kernel/userspace communication

Name            : libnftnl
Description     : Netfilter library providing interface to the nf_tables subsystem

Name            : libnghttp2
Description     : Framing layer of HTTP/2 is implemented as a reusable C library

Name            : libnghttp3
Description     : HTTP/3 library written in C

Name            : libnl
Description     : Library for applications dealing with netlink sockets

Name            : libnsl
Description     : Public client interface library for NIS(YP)

Name            : libp11-kit
Description     : Loads and enumerates PKCS#11 modules (library)

Name            : libpcap
Description     : A system-independent interface for user-level packet capture

Name            : libpsl
Description     : Public Suffix List library

Name            : libsasl
Description     : Cyrus Simple Authentication Service Layer (SASL) library

Name            : libseccomp
Description     : Enhanced seccomp library

Name            : libsecret
Description     : Library for storing and retrieving passwords and other secrets

Name            : libssh2
Description     : A library implementing the SSH2 protocol as defined by Internet Drafts

Name            : libsysprof-capture
Description     : Kernel based performance profiler - capture library

Name            : libtasn1
Description     : The ASN library used in GNUTLS

Name            : libtirpc
Description     : Transport Independent RPC library (SunRPC replacement)

Name            : libunistring
Description     : Library for manipulating Unicode strings and C strings

Name            : libusb
Description     : Library that provides generic access to USB devices

Name            : libverto
Description     : Main event loop abstraction library

Name            : libxcrypt
Description     : Modern library for one-way hashing of passwords

Name            : libxml2
Description     : XML C parser and toolkit

Name            : licenses
Description     : A set of common license files

Name            : linux-api-headers
Description     : Kernel headers sanitized for use in userspace

Name            : lmdb
Description     : Symas Lightning Memory-Mapped Database

Name            : lz4
Description     : Extremely fast compression algorithm

Name            : mpfr
Description     : Multiple-precision floating-point library

Name            : ncurses
Description     : System V Release 4.0 curses emulation library

Name            : nettle
Description     : A low-level cryptographic library

Name            : npth
Description     : The new GNU portable threads library

Name            : openssl
Description     : The Open Source toolkit for Secure Sockets Layer and Transport Layer Security

Name            : p11-kit
Description     : Loads and enumerates PKCS#11 modules

Name            : pacman
Description     : A library-based package manager with dependency support

Name            : pacman-mirrorlist
Description     : Arch Linux mirror list for use by pacman

Name            : pam
Description     : PAM (Pluggable Authentication Modules) library

Name            : pambase
Description     : Base PAM configuration for services

Name            : pciutils
Description     : PCI bus configuration space access library and tools

Name            : pcre2
Description     : A library that implements Perl 5-style regular expressions. 2nd version

Name            : pinentry
Description     : Collection of simple PIN or passphrase entry dialogs which utilize the Assuan protocol

Name            : popt
Description     : A commandline option parser

Name            : procps-ng
Description     : Utilities for monitoring your system and its processes

Name            : psmisc
Description     : Miscellaneous procfs tools

Name            : readline
Description     : GNU readline library

Name            : sed
Description     : GNU stream editor

Name            : shadow
Description     : Password and account management tool suite with support for shadow files and PAM

Name            : sqlite
Description     : A C library that implements an SQL database engine

Name            : systemd
Description     : system and service manager

Name            : systemd-libs
Description     : systemd client libraries

Name            : systemd-sysvcompat
Description     : sysvinit compat for systemd

Name            : tar
Description     : Utility used to store, backup, and transport files

Name            : tpm2-tss
Description     : Implementation of the TCG Trusted Platform Module 2.0 Software Stack (TSS2)

Name            : tzdata
Description     : Sources for time zone and daylight saving time data

Name            : util-linux
Description     : Miscellaneous system utilities for Linux

Name            : util-linux-libs
Description     : util-linux runtime libraries

Name            : xz
Description     : Library and command line tools for XZ and LZMA compressed files

Name            : zlib
Description     : Compression library implementing the deflate compression method found in gzip and PKZIP

Name            : zstd
Description     : Zstandard - Fast real-time compression algorithm
```

看完了我们发现，除了一些基础工具（包括sqlite），archlinux确实是啥啥没有。

## 默认终端美化

> [!WARNING]
> 本节内容由deepseek生成，这个操作实际上没有美化linux终端，是把windows终端美化了，windows终端安装见此：[Windows 终端安装 | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/terminal/install)。

在 Windows 终端（Windows Terminal）中修改配置是通过编辑其 JSON 配置文件实现的。以下是详细的操作步骤：

### 1. 打开 Windows 终端的设置文件

#### 方法 1：通过界面快捷打开

1. 打开 **Windows 终端**（Windows Terminal）。
2. 点击窗口右上角的 **下拉箭头 ▼**，选择 **设置**（或按快捷键 `Ctrl + ,`）。
3. 在设置界面底部，找到 **"打开 JSON 文件"** 按钮并点击，会自动用默认文本编辑器（如 VS Code 或记事本）打开配置文件。

#### **方法 2：直接定位文件路径**

配置文件默认路径为：

```
C:\Users\<你的用户名>\AppData\Local\Packages\Microsoft.WindowsTerminal_<随机字符串>\LocalState\settings.json
```

- 按 `Win + R` 输入 `%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_*\LocalState\` 可快速跳转到目录。
- 找到 `settings.json` 并用文本编辑器打开。

### 2. 修改配置文件（以 Arch Linux WSL2 为例）

在 `settings.json` 的 `profiles.list` 字段中找到 Arch Linux 的配置段（通过 `"name": "Arch Linux"` 或 `"commandline": "wsl -d ArchLinux"` 识别），然后添加或修改以下参数：

#### 示例配置

```json
{
    "name": "Arch Linux",
    "commandline": "wsl -d ArchLinux",
    "hidden": false,
    "colorScheme": "One Half Dark",  // 深色主题
    "fontFace": "Cascadia Code PL",  // 推荐等宽字体
    "fontSize": 11,
    "background": "#282C34",         // 自定义背景色（可选）
    "cursorColor": "#FFFFFF",       // 光标颜色
    "acrylicOpacity": 0.8,          // 透明度（0-1）
    "useAcrylic": true,             // 启用亚克力效果
    "padding": "8, 8, 8, 8"        // 内边距（可选）
}
```

#### 关键参数说明

| 参数               | 作用       | 推荐值                                              |
| ---------------- | -------- | ------------------------------------------------ |
| `colorScheme`    | 内置颜色主题   | `"One Half Dark"`、`"Dracula"`、`"Solarized Dark"` |
| `fontFace`       | 字体       | `"Cascadia Code PL"`（微软官方字体）或 `"JetBrains Mono"` |
| `fontSize`       | 字号       | `11` 或 `12`                                      |
| `background`     | 自定义背景色   | 十六进制颜色（如 `"#282C34"`）                            |
| `acrylicOpacity` | 透明度      | `0.8`（需启用 `useAcrylic`）                          |
| `useAcrylic`     | 亚克力毛玻璃效果 | `true` 或 `false`                                 |

### 3. 保存并生效

1. 保存 `settings.json` 文件。
2. **重启 Windows 终端**，Arch Linux 的标签页会自动应用新配置。

### 4. 推荐的内置颜色主题

Windows 终端内置了多种主题，直接通过 `colorScheme` 指定即可：

```json
"colorScheme": "Dracula"
```

#### **常用主题列表**

- `"One Half Dark"`（经典深色）
- `"Dracula"`（紫色调）
- `"Solarized Dark"`（柔和低对比）
- `"Campbell"`（默认主题）
- `"Vintage"`（复古绿屏）

### 5. 安装新字体（可选）

如果喜欢更美观的等宽字体（如 `Cascadia Code` 或 `JetBrains Mono`）：

1. 下载字体：

    - [Cascadia Code](https://github.com/microsoft/cascadia-code/releases)（微软官方）
    - [JetBrains Mono](https://www.jetbrains.com/lp/mono/)（开发者常用）

2. 安装字体：双击 `.ttf` 文件，点击"安装"。
3. 在 `settings.json` 中指定字体名：

```json
"fontFace": "JetBrains Mono"
```

### 6. 验证效果

- 打开 Arch Linux 标签页，观察提示符、`ls` 命令输出颜色和背景是否变化。
- 运行 `neofetch` 查看系统信息（如果已安装）。

### 常见问题

#### Q1：修改后终端未生效？

- 检查 JSON 语法是否正确（可用 [JSON 校验工具](https://jsonlint.com/)）。
- 确保 `"name"` 或 `"commandline"` 匹配你的 Arch Linux 配置。

#### Q2：想恢复默认配置？

- 删除自定义字段或重装 Windows 终端。

通过以上步骤，你可以直接在 Windows 终端中为 WSL2 的 Arch Linux 配置美观的深色主题和字体，无需额外安装终端模拟器！

## Vim 安装

运行`pacman -S vim`搜索`vim`，但是报了如下错误：

```bash
[root@DESKTOP-ROOSFVQ ~]# pacman -S vim
warning: database file for 'core' does not exist (use '-Sy' to download)
warning: database file for 'extra' does not exist (use '-Sy' to download)
error: target not found: vim
```

经过搜索：[Pacman complains "database 'core' does not exist" - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/408920/pacman-complains-database-core-does-not-exist)，答案要我们输入如下命令：

```bash
pacman -Syu
pacman -S [package-name]
```

命令运行效果如下：

```bash
[root@DESKTOP-ROOSFVQ ~]# pacman -Syu
:: Synchronizing package databases...
 core downloading...
 extra downloading...
:: Starting full system upgrade...
resolving dependencies...
looking for conflicting packages...

Package (21)                  Old Version   New Version   Net Change  Download Size

core/bash                     5.2.037-2     5.2.037-5      -0.02 MiB
core/ca-certificates-mozilla  3.110-1       3.111-1         0.00 MiB       0.38 MiB
core/device-mapper            2.03.31-1     2.03.32-1       0.01 MiB       0.27 MiB
core/filesystem               2024.11.21-1  2025.05.03-1    0.00 MiB       0.01 MiB
core/gettext                  0.24-3        0.25-1          6.87 MiB
core/glib2                    2.84.1-1      2.84.2-1        0.01 MiB
core/gnupg                    2.4.7-1       2.4.7-2         0.00 MiB
core/gpgme                    1.24.2-1      1.24.3-2        0.00 MiB       0.45 MiB
core/hwdata                   0.394-1       0.395-1         0.03 MiB       1.63 MiB
core/iana-etc                 20250328-1    20250502-1      0.00 MiB       0.39 MiB
core/json-c                   0.18-1        0.18-2          0.00 MiB       0.06 MiB
core/libarchive               3.7.9-2       3.8.0-1         0.02 MiB       0.55 MiB
core/libgcrypt                1.11.0-3      1.11.1-1        0.03 MiB       0.70 MiB
core/libtirpc                 1.3.6-1       1.3.6-2         0.00 MiB       0.17 MiB
core/libxml2                  2.14.2-2      2.14.3-1        0.00 MiB       0.78 MiB
core/ncurses                  6.5-3         6.5-4           0.00 MiB       1.13 MiB
core/pacman-mirrorlist        20250311-1    20250522-1     -0.01 MiB       0.01 MiB
core/sqlite                   3.49.1-1      3.49.2-1       -0.02 MiB
core/systemd                  257.5-2       257.5-3        -0.09 MiB
core/systemd-libs             257.5-2       257.5-3        -0.03 MiB       1.20 MiB
core/systemd-sysvcompat       257.5-2       257.5-3         0.00 MiB       0.01 MiB

Total Download Size:     7.72 MiB
Total Installed Size:  153.38 MiB
Net Upgrade Size:        6.81 MiB

:: Proceed with installation? [Y/n] Y
:: Retrieving packages...
 gnupg-2.4.7-2-x86_64 downloading...
 hwdata-0.395-1-any downloading...
 systemd-libs-257.5-3-x86_64 downloading...
 ncurses-6.5-4-x86_64 downloading...
 libxml2-2.14.3-1-x86_64 downloading...
 libgcrypt-1.11.1-1-x86_64 downloading...
 libarchive-3.8.0-1-x86_64 downloading...
 gpgme-1.24.3-2-x86_64 downloading...
 iana-etc-20250502-1-any downloading...
 ca-certificates-mozilla-3.111-1-x86_64 downloading...
 device-mapper-2.03.32-1-x86_64 downloading...
 libtirpc-1.3.6-2-x86_64 downloading...
 json-c-0.18-2-x86_64 downloading...
 filesystem-2025.05.03-1-any downloading...
 pacman-mirrorlist-20250522-1-any downloading...
 systemd-sysvcompat-257.5-3-x86_64 downloading...
checking keyring...
checking package integrity...
loading package files...
checking for file conflicts...
:: Processing package changes...
upgrading iana-etc...
upgrading filesystem...
warning: /etc/hosts installed as /etc/hosts.pacnew
warning: directory permissions differ on /srv/ftp/
filesystem: 755  package: 555
upgrading ncurses...
upgrading bash...
upgrading libgcrypt...
upgrading systemd-libs...
upgrading sqlite...
upgrading libtirpc...
upgrading ca-certificates-mozilla...
upgrading device-mapper...
upgrading libxml2...
upgrading gettext...
New optional dependencies for gettext
    appstream: for appstream support
upgrading glib2...
upgrading json-c...
upgrading gnupg...
upgrading gpgme...
upgrading hwdata...
upgrading libarchive...
upgrading pacman-mirrorlist...
warning: /etc/pacman.d/mirrorlist installed as /etc/pacman.d/mirrorlist.pacnew
upgrading systemd...
upgrading systemd-sysvcompat...
ldconfig: /usr/lib/wsl/lib/libcuda.so is not a symbolic link

:: Running post-transaction hooks...
( 1/12) Creating system user accounts...
( 2/12) Updating journal message catalog...
( 3/12) Reloading system manager configuration...
( 4/12) Reloading user manager configuration...
( 5/12) Updating udev hardware database...
( 6/12) Restarting marked services...
( 7/12) Applying kernel sysctl settings...
Couldn't write '16' to 'kernel/sysrq', ignoring: No such file or directory
( 8/12) Creating temporary files...
( 9/12) Reloading device manager configuration...
(10/12) Arming ConditionNeedsUpdate...
(11/12) Rebuilding certificate stores...
(12/12) Reloading system bus configuration...
```

下面是安装vim的过程：

```bash
[root@DESKTOP-ROOSFVQ ~]# pacman -S vim
resolving dependencies...
looking for conflicting packages...

Package (3)        New Version            Net Change  Download Size

core/gpm           1.20.7.r38.ge82d1a6-6    0.38 MiB
extra/vim-runtime  9.1.1376-1              37.99 MiB       6.84 MiB
extra/vim          9.1.1376-1               4.89 MiB       1.47 MiB

Total Download Size:    8.31 MiB
Total Installed Size:  43.27 MiB

:: Proceed with installation? [Y/n] Y
:: Retrieving packages...
 vim-runtime-9.1.1376-1-x86_64 downloading...
 vim-9.1.1376-1-x86_64 downloading...
checking keyring...
checking package integrity...
loading package files...
checking for file conflicts...
:: Processing package changes...
installing vim-runtime...
Optional dependencies for vim-runtime
    sh: support for some tools and macros [installed]
    python: demoserver example tool
    gawk: mve tools upport [installed]
installing gpm...
installing vim...
Optional dependencies for vim
    python: Python language support
    ruby: Ruby language support
    lua: Lua language support
    perl: Perl language support
    tcl: Tcl language support
ldconfig: /usr/lib/wsl/lib/libcuda.so is not a symbolic link

:: Running post-transaction hooks...
(1/2) Reloading system manager configuration...
(2/2) Arming ConditionNeedsUpdate...
[root@DESKTOP-ROOSFVQ ~]#
```

成功！

我们利用`vim`配置之前提到过的用户管理，接下来一打开终端就可以看到用户为`[gwen@DESKTOP-ROOSFVQ ~]$`，添加用户成功！

## 一点用户管理小问题及其解决

这里我们发现`gwen`用户下无法编辑`/etc/`下的文件，也无法使用`pacman`。我们想要使用`pacman`安装`Git`，可是要使用`pacman`需要`root`权限。通过`su`命令需要输密码，可是我们并没有设置密码，直接回车也不对。如果通过`sudo`来使用`root`权限下的`pacman`，可是发现`sudo`需要使用`pacman`安装。发生死循环了。找了很久才找到解决方法，还是通过[WSL 默认用户名root的问题 - 哔哩哔哩](https://www.bilibili.com/opus/630325268668481561)这个链接下的一个人的回复看到的。

解决方法是，通过`wsl -u root`进入`root`下，然后把`/etc/wsl.conf`中的`[user] default=gwen`两行删去，然后再重新打开窗口。可以看到用户显示的是`root`了。

这个问题也给了我们一个教训，发现了arch的权限管理的严谨之处，下次也记得在没有安装`sudo`之前、或者没有设置`root`密码之前，不要直接把默认用户改成`gwen`，否则就出现死循环了。要不是这是用我自己的电脑，就解不开这个死结了。

## `Git`，`sudo`和`make` 安装

在`root`账户下（重要，`gwen`账户无法安装），我们用`pacman`安装以上三个工具：

```bash
pacman -S git sudo make
```

## `Git`代理配置

我使用HTTP协议，代理配置只需要`git config --global http.proxy http://172.17.112.1:10808`这一条语句即可。用`curl -v https://github.com`测试，能获取到数据就算成功。详细的arch linux代理配置部分见博客文章：Arch Linux下的代理配置。

## 命令高亮

> [!WARNING]
> 以下内容使用deepseek生成。

在 **Windows 终端（Windows Terminal）** 中实现 **Bash 命令、Git 命令高亮**，可以通过以下方法配置（无需安装完整 Oh My Zsh，仅用 `.bashrc` 和工具增强）：

### 启用 Bash 命令语法高亮

#### 方法 1：使用 `bash-syntax-highlighting`

安装插件（适用于 WSL 的 Arch Linux）：

```bash
# 克隆仓库到本地
git clone https://github.com/akinomyoga/ble.sh.git ~/.blesh
# 编译安装
make -C ~/.blesh install
```

在 `~/.bashrc` 中添加：

```bash
# 启用 ble.sh 实时语法高亮
source ~/.blesh/ble.sh
```

- **效果**：输入命令时实时高亮（正确绿色，错误红色）。

#### 方法 2：使用 `highlight` 工具

安装 `highlight`：

```bash
sudo pacman -S highlight
```

在 `~/.bashrc` 中添加别名：

```bash
alias cat='highlight -O ansi --force'
alias less='less -R'
```

效果：`cat` 文件时自动高亮语法。

### Git 命令高亮

#### 方法 1：Git 原生颜色配置

1. 启用 Git 默认高亮：

```bash
git config --global color.ui auto
```

- **效果**：`git status`、`git diff` 等命令输出彩色。

#### 方法 2：增强 Git 提示符（显示分支/状态）

在 `~/.bashrc` 中添加：

```bash
# 加载 Git 提示符功能（需 git-prompt）
source /usr/share/git/completion/git-prompt.sh
export GIT_PS1_SHOWDIRTYSTATE=1      # 显示未暂存(*)和已暂存(+)更改
export GIT_PS1_SHOWUNTRACKEDFILES=1  # 显示未跟踪文件(%)
export GIT_PS1_SHOWUPSTREAM="auto"   # 显示与上游的差异

# 将 Git 信息添加到 PS1
PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]$(__git_ps1 " (%s)")\$ '
```

**效果**：

```bash
user@host:~/project (main *+$)%
```

- `*`：未暂存更改
- `+`：已暂存更改
- `%`：未跟踪文件
- `$`：落后于上游分支

### 文件列表高亮（`ls` 命令）

安装 `lsd`（替代 `ls` 的现代化工具）：

```bash
sudo pacman -S lsd
```

在 `~/.bashrc` 中添加别名：

```bash
alias ls='lsd --color=auto'
alias ll='lsd -l --color=auto'
alias la='lsd -a --color=auto'
```

**效果**：
![lsd 高亮效果](https://raw.githubusercontent.com/Peltoche/lsd/assets/screen_lsd.png)

### 终端主题优化（Windows 终端配置）

1. 打开 Windows 终端的 `settings.json`（`Ctrl + ,` → 打开 JSON 文件）。
2. 修改 Arch Linux 的配置段，添加：

```json
{
    "name": "Arch Linux",
    "colorScheme": "One Half Dark",  // 深色主题
    "fontFace": "Cascadia Code PL", // 等宽字体
    "fontSize": 11,
    "useAcrylic": true,            // 毛玻璃效果
    "acrylicOpacity": 0.8
}
```

- **推荐主题**：`Dracula`、`Solarized Dark`、`Gruvbox`。

### 最终效果

| 功能            | 效果                       |
| ------------- | ------------------------ |
| **Bash 命令高亮** | 输入时实时红/绿高亮               |
| **Git 高亮**    | `git status` 彩色 + 分支状态提示 |
| **文件列表高亮**    | `ls` 显示图标和颜色             |
| **终端主题**      | 深色背景 + 等宽字体              |

### **一键配置脚本**

将以下内容粘贴到 `~/.bashrc` 后运行 `source ~/.bashrc`：

```bash
# 语法高亮（ble.sh）
source ~/.blesh/ble.sh

# Git 提示符
source /usr/share/git/completion/git-prompt.sh
export GIT_PS1_SHOWDIRTYSTATE=1
export GIT_PS1_SHOWUNTRACKEDFILES=1
export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]$(__git_ps1 " (%s)")\$ '

# lsd 替代 ls
alias ls='lsd --color=auto'
alias ll='lsd -l --color=auto'
alias la='lsd -a --color=auto'

# Git 默认高亮
git config --global color.ui auto
```

### **注意事项**

- **WSL 2 兼容性**：所有工具均适用于 Arch Linux on WSL。
- **字体支持**：确保 Windows 终端使用 [Powerline 字体](https://github.com/ryanoasis/nerd-fonts)（如 `Cascadia Code PL`）。
- **性能问题**：若 `ble.sh` 卡顿，可改用 `syntax-highlighting` 轻量版：

```bash
git clone https://github.com/arzzen/git-prompt.git ~/.git-prompt
source ~/.git-prompt/git-prompt.sh
```

完成后，你的 Windows 终端将拥有接近 Oh My Zsh 的高亮体验！ 🎨

## 尾记

后面我发现其实WSL2下的Arch Linux还是没有虚拟机下的那么好，它并不是一个完整的系统，而是一个子系统。我是想对操作系统进行完整的探究，并且可能还要使用Qemu进行一些实验，因此我在后面还是会使用VMWare下的Arch Linux。但是这次也是一个新鲜的尝试了，因此本文会依然保留在博客中，以供后来者学习。
