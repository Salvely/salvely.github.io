# ModernCppStarter配置过程记录


之前很久没用`CMake`了，今天想要用C++重新实现一下各个数据结构，想要使用`CMake`来配置整个项目，并且在其中添加测试。无奈一上手发现`CMake`的语法都忘了（太久没写了，挠头）。所幸在`Github`上找到了一个非常好的`CMake`模板：[TheLartians/ModernCppStarter: 🚀 Kick-start your C++! A template for modern C++ projects using CMake, CI, code coverage, clang-format, reproducible dependency management and much more.](https://github.com/TheLartians/ModernCppStarter)，下面详细记录该模板的配置过程。

## 仓库创建

这里我们使用`Use this template`的方式，注意在这个模板中，要保证`github pages`的正常显示，我们选择保留所有的`branch`（因为`github action`是在`gh-pages`分支下响应的）。这里没有什么难度，直接选择`Use this template`，创建完毕后`git clone`到本地就好了。

## 依赖包安装

我是在`Linux`环境下配置这个项目的，系统是`Ubuntu 18.04`。在使用这个模板之前，我们需要安装以下几个包：`pip clang-format cmake-format pyyaml Doxygen jinja2 Pygments`

安装命令如下：

```bash
sudo apt install pip
sudo apt-get install python3-socks #我的电脑上配置了代理，使用socks5，因此要让pip通过代理，需要安装这个工具
pip install clang-format==14.0.6 cmake_format==0.6.11 pyyaml
vim ~/.bashrc # 需要在.bashrc中配置$PATH，添加~/.local/bin到$PATH环境变量中
source ~/.bashrc
sudo apt-get install doxygen
pip install jinja2
pip install pygments
```

## 初次构建项目

项目通过如下命令进行构建，我们将其放在一个`run.sh`中（放在仓库根目录下），命令如下：

```bash
cmake -S all -B build
cmake --build build

# run tests
./build/test/GreeterTests
# format code
cmake --build build --target fix-format
# run standalone
./build/standalone/Greeter --help
# build docs
cmake --build build --target GenerateDocs
```

如果想单独构建各个部分，可以分别进行如下操作：

```bash
# 构建standalone target
cmake -S standalone -B build/standalone
cmake --build build/standalone
./build/standalone/Greeter --help

# 构建测试
cmake -S test -B build/test
cmake --build build/test
CTEST_OUTPUT_ON_FAILURE=1 cmake --build build/test --target test

# or simply call the executable: 
./build/test/GreeterTests

# 构建clang-format
cmake -S test -B build/test

# view changes
cmake --build build/test --target format

# apply changes
cmake --build build/test --target fix-format

# 构建文档
cmake -S documentation -B build/doc
cmake --build build/doc --target GenerateDocs
# view the docs
open build/doc/doxygen/html/index.html
```

安装好上述各个包后，我们进入仓库，输入以下命令构建项目：

```bash
chmod +x run.sh # 为run.sh添加执行权限
./run.sh # 运行构建脚本
cd build
make
```

输出如下信息，表示构建成功：

```bash
gwen@gwen-virtual-machine:~/Documents/ds$ ./run.sh
-- CPM: Adding package cxxopts@3.0.0 (v3.0.0)
-- CPM: Adding package Greeter@ (/home/gwen/Documents/ds/standalone/..)
-- CPM: Greeter: Adding package PackageProject.cmake@1.8.0 (v1.8.0)
-- CPM: Greeter: Adding package fmt@10.2.1 (10.2.1)
-- Version: 10.2.1
-- Build type: 
-- CPM: Adding package doctest@2.4.9 (v2.4.9)
-- CPM: Adding package Format.cmake@1.7.3 (v1.7.3)
-- Found Python: /usr/bin/python3.8 (found version "3.8.10") found components: Interpreter 
-- The C compiler identification is GNU 9.4.0
-- Check for working C compiler: /usr/bin/cc
-- Check for working C compiler: /usr/bin/cc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- CPM: Adding package m.css@0 (a0d292ec311b97fefd21e93cdefb60f88d19ede6)
-- Configuring done
-- Generating done
-- Build files have been written to: /home/gwen/Documents/ds/build
Scanning dependencies of target fmt
[ 10%] Building CXX object _deps/fmt-build/CMakeFiles/fmt.dir/src/format.cc.o
[ 20%] Building CXX object _deps/fmt-build/CMakeFiles/fmt.dir/src/os.cc.o
[ 30%] Linking CXX static library libfmt.a
[ 30%] Built target fmt
Scanning dependencies of target Greeter
[ 40%] Building CXX object _deps/greeter-build/CMakeFiles/Greeter.dir/source/greeter.cpp.o
[ 50%] Linking CXX static library libGreeter.a
[ 50%] Built target Greeter
Scanning dependencies of target GreeterStandalone
[ 60%] Building CXX object standalone/CMakeFiles/GreeterStandalone.dir/source/main.cpp.o
[ 70%] Linking CXX executable Greeter
[ 70%] Built target GreeterStandalone
Scanning dependencies of target GreeterTests
[ 80%] Building CXX object test/CMakeFiles/GreeterTests.dir/source/greeter.cpp.o
[ 90%] Building CXX object test/CMakeFiles/GreeterTests.dir/source/main.cpp.o
[100%] Linking CXX executable GreeterTests
[100%] Built target GreeterTests
[doctest] doctest version is "2.4.9"
[doctest] run with "--help" for options
===============================================================================
[doctest] test cases: 2 | 2 passed | 0 failed | 0 skipped
[doctest] assertions: 5 | 5 passed | 0 failed |
[doctest] Status: SUCCESS!
Scanning dependencies of target fix-clang-format
clang-format did not modify any files
Built target fix-clang-format
Scanning dependencies of target fix-cmake-format
Built target fix-cmake-format
Scanning dependencies of target fix-format
Built target fix-format
A program to welcome the world!
Usage:
  ./build/standalone/Greeter [OPTION...]

  -h, --help      Show help
  -v, --version   Print the current version number
  -n, --name arg  Name to greet (default: World)
  -l, --lang arg  Language code to use (default: en)

Scanning dependencies of target GenerateDocs
warning: ignoring unsupported tag 'M_SHOW_UNDOCUMENTED' at line 31, file /home/gwen/Documents/ds/build/documentation/Doxyfile
Searching for include files...
Searching for example files...
Searching for images...
Searching for dot files...
Searching for msc files...
Searching for dia files...
Searching for files to exclude
Searching INPUT for files to process...
Searching for files in directory /home/gwen/Documents/ds/include
Searching for files in directory /home/gwen/Documents/ds/include/greeter
Searching for files in directory /home/gwen/Documents/ds/documentation/pages
Reading and parsing tag files
Parsing files
Reading /home/gwen/Documents/ds/README.md...
Preprocessing /home/gwen/Documents/ds/include/greeter/greeter.h...
Parsing file /home/gwen/Documents/ds/include/greeter/greeter.h...
Preprocessing /home/gwen/Documents/ds/documentation/pages/about.dox...
Parsing file /home/gwen/Documents/ds/documentation/pages/about.dox...
Building group list...
Building directory list...
Building namespace list...
Building file list...
Building class list...
Computing nesting relations for classes...
Associating documentation with classes...
Building example list...
Searching for enumerations...
Searching for documented typedefs...
Searching for members imported via using declarations...
Searching for included using directives...
Searching for documented variables...
Building interface member list...
Building member list...
Searching for friends...
Searching for documented defines...
Computing class inheritance relations...
Computing class usage relations...
Flushing cached template relations that have become invalid...
Computing class relations...
Add enum values to enums...
Searching for member function documentation...
Creating members for template instances...
Building page list...
Search for main page...
Computing page relations...
Determining the scope of groups...
Sorting lists...
Determining which enums are documented
Computing member relations...
Building full member lists recursively...
Adding members to member groups.
Computing member references...
Inheriting documentation...
Generating disk names...
Adding source references...
Adding xrefitems...
Sorting member lists...
Setting anonymous enum type...
Computing dependencies between directories...
Generating citations page...
Counting members...
Counting data structures...
Resolving user defined references...
Finding anchors and sections in the documentation...
Transferring function references...
Combining using relations...
Adding members to index pages...
Correcting members for VHDL...
Generating style sheet...
Generating search indices...
Generating example documentation...
Generating file sources...
Generating code for file greeter/greeter.h...
Generating file documentation...
Generating docs for file documentation/pages/about.dox...
Generating docs for file greeter/greeter.h...
Generating docs for file README.md...
Generating page documentation...
Generating docs for page about...
Generating group documentation...
Generating class documentation...
Generating namespace index...
Generating docs for namespace greeter
Generating docs for compound greeter::Greeter...
Generating graph info page...
Generating directory documentation...
finalizing index lists...
writing tag file...
Generating XML output...
Generating XML output for class greeter::Greeter
Generating XML output for namespace greeter
Generating XML output for file about.dox
Generating XML output for file greeter.h
Generating XML output for file README.md
Generating XML output for page about
Generate XML output for dir /home/gwen/Documents/ds/documentation/
Generate XML output for dir /home/gwen/Documents/ds/include/greeter/
Generate XML output for dir /home/gwen/Documents/ds/documentation/pages/
Generating XML output for the main page
Running plantuml with JAVA...
Running dot...
lookup cache used 12/65536 hits=31 misses=12
finished...
WARNING:root:indexpage.xml: image badge.svg was not found in XML_OUTPUT
WARNING:root:indexpage.xml: image badge.svg was not found in XML_OUTPUT
WARNING:root:indexpage.xml: image badge.svg was not found in XML_OUTPUT
WARNING:root:indexpage.xml: image badge.svg was not found in XML_OUTPUT
WARNING:root:indexpage.xml: image badge.svg was not found in XML_OUTPUT
WARNING:root:indexpage.xml: image badge.svg was not found in XML_OUTPUT
WARNING:root:indexpage.xml: image 4dfa7580-7ffb-11ea-99d0-46b8fe2f4170 was not found in XML_OUTPUT
WARNING:root:indexpage.xml: image modern-cpp-template&type=Date was not found in XML_OUTPUT
Docs written to: /home/gwen/Documents/ds/build/documentation/doxygen
Built target GenerateDocs
gwen@gwen-virtual-machine:~/Documents/ds$ cd build
gwen@gwen-virtual-machine:~/Documents/ds/build$ make
[ 30%] Built target fmt
[ 50%] Built target Greeter
[ 70%] Built target GreeterStandalone
[100%] Built target GreeterTests
```

运行`Greeter`和测试：

```bash
gwen@gwen-virtual-machine:~/Documents/ds/build$ ./standalone/Greeter
Hello, World!
gwen@gwen-virtual-machine:~/Documents/ds/build$ ./test/GreeterTests
[doctest] doctest version is "2.4.9"
[doctest] run with "--help" for options
===============================================================================
[doctest] test cases: 2 | 2 passed | 0 failed | 0 skipped
[doctest] assertions: 5 | 5 passed | 0 failed |
[doctest] Status: SUCCESS!
```

## 将`Greeter`转化为自己的项目

要将`Greeter`转化为我们自己的项目，需要项目中的`Greeter`（不分大小写）进行一些替换。我们想要将`Greeter`转化为`DsProject`，将`greeter`转化为`dsproject`。

首先我们需要看一下项目的结构：

```bash
gwen@gwen-virtual-machine:~/Documents/ds$ tree -L 2
.
├── all
│   └── CMakeLists.txt
├── build # 这里是生成的构建文件，无需修改
│   ├── cmake
│   ├── CMakeCache.txt
│   ├── CMakeFiles
│   ├── cmake_install.cmake
│   ├── CPackConfig.cmake
│   ├── CPackSourceConfig.cmake
│   ├── CPM_modules
│   ├── cpm-package-lock.cmake
│   ├── CTestTestfile.cmake
│   ├── _deps
│   ├── documentation
│   ├── Makefile
│   ├── standalone
│   └── test
├── cmake # 一些cmake宏定义，无需修改
│   ├── CPM.cmake
│   └── tools.cmake
├── CMakeLists.txt
├── codecov.yaml # 一般情况下用不到codecov，无需修改
├── documentation # 这里是生成文档的配置，无需修改
│   ├── CMakeLists.txt
│   ├── conf.py
│   ├── Doxyfile
│   └── pages
├── include
│   └── greeter
├── LICENSE # 使用的LICENSE，无需修改
├── README.md
├── run.sh # 脚本文件，无需修改
├── source
│   └── greeter.cpp
├── standalone
│   ├── CMakeLists.txt
│   └── source
└── test
    ├── CMakeLists.txt
    └── source

19 directories, 21 files
```

那么我们主要需要修改的部分包括：

- all/CMakeLists.txt：进行子项目管理
- CMakeLists.txt：进行主要的构建配置
- include/greeter：存放头文件，不用多说
- README.md：README.md说明文件，不用多说
- source/greeter.cpp：存放源代码文件，不用多说
- standalone/* ：standalone为一个可以单独构建的子项目，里面有单独的`CMake`，不用多说
- test/* ：存放测试文件，其总体结构和standalone相似，也是一个可以单独构建的子项目，不用多说

接下来我们逐个查看这些文件的内容。

### `all/CMakeLists.txt`

```cmake
# this script adds all subprojects to a single build to allow IDEs understand the full project

# structure.

cmake_minimum_required(VERSION 3.14...22)
project(BuildAll LANGUAGES CXX)
include(../cmake/tools.cmake)

# needed to generate test target

enable_testing()

add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/../standalone ${CMAKE_BINARY_DIR}/standalone)

add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/../test ${CMAKE_BINARY_DIR}/test)

add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/../documentation ${CMAKE_BINARY_DIR}/documentation)
```

可以看到，这个`CMake`文件主要负责子项目的管理，如果要添加子项目进来，就仿照添加`standalone`那样方式就行。测试和文档已经添加进来，如果要进行改动，直接修改`test`和`documentation`下的文件就行。

### `CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.14...3.22)

# ---- Project ----

# Note: update this to your new project's name and version

project(
  Greeter # 这里需要改动
  VERSION 1.0
  LANGUAGES CXX
)

# ---- Include guards ----

if(PROJECT_SOURCE_DIR STREQUAL PROJECT_BINARY_DIR)
  message(
    FATAL_ERROR
      "In-source builds not allowed. Please make a new directory (called a build directory) and run CMake from there."
  )
endif()

# ---- Add dependencies via CPM ----

# see https://github.com/TheLartians/CPM.cmake for more info

include(cmake/CPM.cmake)

# PackageProject.cmake will be used to make our target installable

CPMAddPackage("gh:TheLartians/PackageProject.cmake@1.8.0")

CPMAddPackage(
  NAME fmt
  GIT_TAG 10.2.1
  GITHUB_REPOSITORY fmtlib/fmt
  OPTIONS "FMT_INSTALL YES" # create an installable target
)

# ---- Add source files ----

# Note: globbing sources is considered bad practice as CMake's generators may not detect new files

# automatically. Keep that in mind when changing files, or explicitly mention them here.

file(GLOB_RECURSE headers CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/include/*.h")

file(GLOB_RECURSE sources CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/source/*.cpp")

# ---- Create library ----

# Note: for header-only libraries change all PUBLIC flags to INTERFACE and create an interface

# target: add_library(${PROJECT_NAME} INTERFACE)

add_library(${PROJECT_NAME} ${headers} ${sources})
set_target_properties(${PROJECT_NAME} PROPERTIES CXX_STANDARD 17)

# being a cross-platform target, we enforce standards conformance on MSVC

target_compile_options(${PROJECT_NAME} PUBLIC "$<$<COMPILE_LANG_AND_ID:CXX,MSVC>:/permissive->")

# Link dependencies
target_link_libraries(${PROJECT_NAME} PRIVATE fmt::fmt)
target_include_directories(
  ${PROJECT_NAME} PUBLIC $<BUILD_INTERFACE:${PROJECT_SOURCE_DIR}/include>  $<INSTALL_INTERFACE:include/${PROJECT_NAME}-${PROJECT_VERSION}>
)

# ---- Create an installable target ----

# this allows users to install and find the library via `find_package()`.
# the location where the project's version header will be placed should match the project's regular
# header paths
string(TOLOWER ${PROJECT_NAME}/version.h VERSION_HEADER_LOCATION)
packageProject(
  NAME ${PROJECT_NAME}
  VERSION ${PROJECT_VERSION}
  NAMESPACE ${PROJECT_NAME}
  BINARY_DIR ${PROJECT_BINARY_DIR}
  INCLUDE_DIR ${PROJECT_SOURCE_DIR}/include
  INCLUDE_DESTINATION include/${PROJECT_NAME}-${PROJECT_VERSION}
  VERSION_HEADER "${VERSION_HEADER_LOCATION}"
  COMPATIBILITY SameMajorVersion
  DEPENDENCIES "fmt 10.2.1"
)
```

这里是最主要的配置，文件中的注释阐述的较为清楚了，因此不多进行解释。

### 将`Greeter`转化为`DsProject`

下面我们将`Greeter`转化为`DsProject`，进行如下操作：

1. 首先将`CMakeLists.txt`中所有的`Greeter`都替换为`DsProject`
2. 将其余的`Greeter`也替换为`DsProject`
3. 将源码中的`greeter`全部替换为`dsproject`，其覆盖的范围包括头文件、源码文件、`README.md`文件、部分配置文件
4. 将文件名中的`greeter`全部替换为`dsproject`
5. 有一个`GREETER_VERSION`需要替换为`DSPROJECT_VERSION`

输入`./run.sh`试一下，成功啦！

## 子项目及测试探究

刚刚说到我们想要学习如何添加子项目，如何添加测试，如何在子项目中添加测试，下面我们来进行探究。

### 子项目构建

首先我们在根目录下新建一个`list`文件夹，将该文件夹作为新的子项目。我们首先要做的就是在`all/CMakeLists.txt`下添加这一行：

```cmake
add_subdirectory(${CMAKE_CURRENT_LIST_DIR}/../list ${CMAKE_BINARY_DIR}/list)
```

这里的`${CMAKE_CURRENT_LIST_DIR}`指的就是当前这个`all/CMakeLists.txt`文件夹，而`${CMAKE_BINARY_DIR}`就是`build`文件夹。我们会在`/build/list`下生成对应的构建内容。

接下来我们研究一下`standalone`子项目的结构，该子项目有一个`source`文件夹，存放的是`.cpp`源代码，还有一个`CMakeLists.txt`，存放的是该子项目的构建文件。

其中`main.cpp`的内容如下：

```cpp
#include <dsproject/dsproject.h>
#include <dsproject/version.h>

#include <cxxopts.hpp>
#include <iostream>
#include <string>
#include <unordered_map>

auto main(int argc, char** argv) -> int {
  const std::unordered_map<std::string, dsproject::LanguageCode> languages{
      {"en", dsproject::LanguageCode::EN},
      {"de", dsproject::LanguageCode::DE},
      {"es", dsproject::LanguageCode::ES},
      {"fr", dsproject::LanguageCode::FR},
  };

  cxxopts::Options options(*argv, "A program to welcome the world!");

  std::string language;
  std::string name;

  // clang-format off
  options.add_options()
    ("h,help", "Show help")
    ("v,version", "Print the current version number")
    ("n,name", "Name to greet", cxxopts::value(name)->default_value("World"))
    ("l,lang", "Language code to use", cxxopts::value(language)->default_value("en"))
  ;
  // clang-format on

  auto result = options.parse(argc, argv);

  if (result["help"].as<bool>()) {
    std::cout << options.help() << std::endl;
    return 0;
  }

  if (result["version"].as<bool>()) {
    std::cout << "DsProject, version " << DSPROJECT_VERSION << std::endl;
    return 0;
  }

  auto langIt = languages.find(language);
  if (langIt == languages.end()) {
    std::cerr << "unknown language code: " << language << std::endl;
    return 1;
  }

  dsproject::DsProject dsproject(name);
  std::cout << dsproject.greet(langIt->second) << std::endl;

  return 0;
}
```

我们可以看到，在

其`CMakeLists.txt`的内容如下：

```cmake
cmake_minimum_required(VERSION 3.14...22)

project(DsProjectStandalone LANGUAGES CXX)

# --- Import tools ----

include(../cmake/tools.cmake)

# ---- Dependencies ----

include(../cmake/CPM.cmake)

CPMAddPackage(
  GITHUB_REPOSITORY jarro2783/cxxopts
  VERSION 3.0.0
  OPTIONS "CXXOPTS_BUILD_EXAMPLES NO" "CXXOPTS_BUILD_TESTS NO" "CXXOPTS_ENABLE_INSTALL YES"
)

CPMAddPackage(NAME DsProject SOURCE_DIR ${CMAKE_CURRENT_LIST_DIR}/..)

# ---- Create standalone executable ----

file(GLOB sources CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/source/*.cpp)

add_executable(${PROJECT_NAME} ${sources})

set_target_properties(${PROJECT_NAME} PROPERTIES CXX_STANDARD 17 OUTPUT_NAME "DsProject")

target_link_libraries(${PROJECT_NAME} DsProject::DsProject cxxopts)
```

## 第一个`list`子项目配置

## 添加`list`子项目的测试

