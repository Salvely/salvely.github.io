# CIT5950_HW3

<!--more-->

## Overview

本作业要求实现:

- Page 对象：
  - 若 Page 不在 memory 中，那么它的数据被存储在磁盘上的`swap file`部分。在`swap file`中，每一页都有对应的顺序存储的数据。
  - 可以使用 C++ `fstream`类进行 I/O 读写。尤其是`read()`和`write()`方法。
- PageTable 对象
  - 包含多个 page 以及`swap file`
  - 这里主要要求实现 LRU 算法

## 相关文件

### Page

- `Page.h`
- `Page.cc`
- `PageTemplates.cc`

### PageTable

- `PageTable.h`
- `PageTable.cc`

### Testing

- `test_page.cc`
- `test_pagetable.cc`

## 实现提示

- map, unordered_map, list, vector 结构都很有用
- `fstream`中的`read()`和`write()`很有用
- 需要将`uint8_t`切换到`char`类型来使用`fstream`
- 利用初始化列表来初始化引用类型

## Page实现

### Page 源码分析

`simplevm namespace`中存在一个类`Page`，此外还有一个`uint32_t`类型(`pno_t`类型)的变量，用来表示页号。`Page`页的解释如下:

- 页对象存在->页被导入到 physical memory->创建一个`page`，并且从`swap_file`中读`page`数据。页的数据从`virtual_pno * Page::PAGE_SIZE`开始
- 页对象不存在->数据存储在`swap_file`中
- 用户可以
  - 获取数据
  - 存储数据
  - 将数据刷新到`swap file`中（多余的无法放入 physical memory 的虚拟内存所存储的地方）

`Page`类中包含如下`public`方法:

- `Page(fstream& swap_file, pno_t virtual_pno);`
  - 构造函数，传入该`page`对应的`swap_file`和页号
  - 我们从`swap_file`读入页数据，刷新时将页数据写入`swap_file`
  - 页号规定了我们在`swap_file`的哪里写入数据
- `Page(const Page& other);`
  - 利用一个页来复制构造另一个页，两个页具有相同的页号和`swap_file`地址，但是数据是复制了的（不是引用）
- `~Page()`
  - 清理声明的变量
  - 如果当前数据为 dirty 状态，那么将其刷新到对应的`swap_file`
- `Page& operator=(const Page& rhs)`
  - 赋值函数，同复制构造函数，两个`Page`具有相同的`swap_file`和页号，但是`data`是被复制了的
- `template <typename T> T access(uint32_t virtual_address);`
  - 获取该页面的值（需要考虑错误情况）
- `T store(uint32_t virtual address, const T& to_write)`
  - 存储值到该页面中去
- `bool operator<(const Page& rhs);`
  - 比较两个页面顺序
- `pno_t pno();`
  - 获取该页面的页号
- `bool dirty();`
  - 该 page 是否为 dirty 状态(如果有人在 flush 之后，向该 page 写过值就是 dirty)
- `void flush();`
  - 如果该 page 是 dirty 状态，就把内容刷新到`swap_file`
- 变量：`static constexpr size_t PAGE_SIZE = 4096U;`
  - 该 page 的大小

Page 中还包括如下`private`变量:

- `fstream& swap_file_;`
  - 注意这里是个引用，一个 page 没有对`swap_file`的所有权，只能 access 到它，所以这里`swap_file`是个引用
- `pno_t virtual_pno_;`
  - 该 page 的页号
- `uint8_t *bytes_;`
  - 该 page 的字节内容
- `bool dirty_;`
  - 该 page 是否在 flush 后被写入

### Page 设计

### `PageTemplates.cc`实现

`PageTemplates.cc`在`simplevm namespace`中。源码如下:

```cpp

namespace simplevm {
  // TODO: implement all template member functions for Page

  // This function allows users to read various data types
  // from the page. Trying to read a non-primitive type or use
  // a virtual address that doesn't map to this page results
  // in undefined behaviour. You can also assume that
  // anything being read fits in on the page we are reading
  // is not partially on another page.
  // If you are familiar with endianness, it shouldn't be
  // considered for this function.
  //
  // Arguments:
  //   - virtual_address: a virtual address that maps somewhere
  //     into the page, where we will read data of type T
  //
  // Returns:
  //   - the data of type T that was read from the page
  template <typename T>
  T Page::access(uint32_t virtual_address) {
    if(virtual_address / PAGE_SIZE != virtual_pno_)
        return 0;
    virtual_address = virtual_address % PAGE_SIZE;
    T* address = (T*)(bytes_ + virtual_address);
    return *address;
  }

  // This function allows users to write various data types
  // to the page. Trying to write a non-primitive type or use
  // a virtual address that doesn't map to this page results
  // in undefined behaviour. You can also assume that
  // anything being written fits on the current page
  // is not partially on another page.
  // If you are familiar with endianness, it shouldn't be
  // considered for this function.
  //
  // Arguments:
  //   - virtual_address: a virtual address that maps somewhere
  //     into the page, where we will read data of type T
  //   - to_write: the data of type T to write to the page
  //
  // Returns: nothing

  template <typename T>
  void Page::store(uint32_t virtual_address, const T& to_write) {
    if(virtual_address / PAGE_SIZE != virtual_pno_)
        return;
    virtual_address = virtual_address % PAGE_SIZE;
    T* address = (T*)(bytes_ + virtual_address);
    *address = to_write;
    dirty_ = true;
  }
}

```

### `Page.h`定义

`Page.h`在`simplevm namespace`中。源码如下:

```cpp
#ifndef PAGE_H_
#define PAGE_H_

#include <cstdint>
#include <fstream>

using std::fstream;

namespace simplevm {

// defines the type pno_t, which is the type
// that represents a page number
typedef uint32_t pno_t;

///////////////////////////////////////////////////////////////////////////////
// A Page is a class that represents a page of memory
// in our simple virtual memory model.
// If a page object exists, then we say that the page is loaded
// into physical memory. When the page object doesn't exist, then its
// data is stored in the swap_file. When we load in a page to
// "physical memory", we are creating the page and we read the page's data
// from the swap file. A page's data in the swap file starts at
// virtual_pno * Page::PAGE_SIZE
//
// This Class manages a page's worth of data
// Users can access or store data, sa well as flush the data in the
// page to the specified swap file. A swap file is where exceess virtual
// memory is stored when it can't fit in physical memory.
///////////////////////////////////////////////////////////////////////////////
class Page {
 public:
  // Constructs a new Page object associated
  // with a swap_file and a virtual page number.
  // The swap file is where we will load in the page
  // contents and flush the page contents. The virtual
  // page number decides where in that file we read
  // and write this page.
  // Passing in an invalid page number is undefined behaviour
  // Note that a Page does not have ownership
  // of the swap_file_, just access to it.
  //
  // Arguments:
  //  - swap_file the swap_file associated with the page
  //  - the virtual page number of our new page
  Page(fstream& swap_file, pno_t virtual_pno);

  // Constructs a new Page object that is a copy of
  // another page object. Both pages will have
  // the same page number and swap_file, but should
  // have independent copies of the page data.
  //
  // Misc: this means that there could be issues with
  // having the original and copy page having differnt
  // data. This cctor should only really be used
  // in the context of managing pages with something
  // like STL, where the original page used for the cctor
  // will be discarded. In real C++, we would want to
  // use move semantics here.
  //
  // Arguements:
  //   - other: the page we are copying
  Page(const Page& other);

  // Destructor for the page object
  // Cleans up any dynamically allocated data or
  // otherwise allocated resources AND should flush
  // its contents if the page is dirty at time of
  // destruction.
  ~Page();

  // Set the current Page object so that is a copy of
  // another page object. Both pages will have
  // the same page number and swap_file, but should
  // have independent copies of the page data.
  //
  // Misc: this means that there could be issues with
  // having the original and copy page having differnt
  // data. This op= should only really be used
  // in the context of managing pages with something
  // like STL, where the original page used for the cctor
  // will be discarded. In real C++, we would want to
  // use move semantics here.
  //
  // You can assume each page has the same swap_file.
  //
  // Arguements:
  //   - rhs: the page we are copying
  Page& operator=(const Page& rhs);

  // This function is not required, but you may add it
  // if it is needed for some of the STL containers
  // you use in PageTable
  //
  // Determines if this page should go before another page if they
  // were in sorted order.
  //
  // Arguments:
  //   - rhs: the Page we are comparing this to
  //
  // Returns: true iff this page would show up before the other
  // page in sorted order. False otherwise.
  bool operator<(const Page& rhs);

  // This function allows users to read various data types
  // from the page. Trying to read a non-primitive type or use
  // a virtual address that doesn't map to this page results
  // in undefined behaviour. You can also assume that
  // anything being read fits in on the page we are reading
  // is not partially on another page.
  // If you are familiar with endianness, it shouldn't be
  // considered for this function.
  //
  // Arguments:
  //   - virtual_address: a virtual address that maps somewhere
  //     into the page, where we will read data of type T
  //
  // Returns:
  //   - the data of type T that was read from the page
  template <typename T>
  T access(uint32_t virtual_address);

  // This function allows users to write various data types
  // to the page. Trying to write a non-primitive type or use
  // a virtual address that doesn't map to this page results
  // in undefined behaviour. You can also assume that
  // anything being written fits on the current page
  // is not partially on another page.
  // If you are familiar with endianness, it shouldn't be
  // considered for this function.
  //
  // Arguments:
  //   - virtual_address: a virtual address that maps somewhere
  //     into the page, where we will read data of type T
  //   - to_write: the data of type T to write to the page
  //
  // Returns: nothing
  template <typename T>
  void store(uint32_t virtual_address, const T& to_write);

  // Returns the virtual page number of this page
  //
  // Arguments: None
  //
  // Returns: this page's virtual page number
  pno_t pno();

  // Returns whether or not a page is dirty
  // A page is "dirty" if someone has written to the data managed
  // by the page since the last time the page was flush()'d.
  //
  // Arguments: None
  //
  // Returns: Whether this page is dirty or not
  bool dirty();

  // Flushes the page to the swap file if it is dirty.
  // Flushing a page to the swap file involves writing
  // the page at the the spot correspoding to its page number
  // in the swap_file. For a description of what it means
  // for a page to be dirty, see the dirty() member function.
  // The page should not be written if it is not dirty.
  //
  // Arguments: None
  //
  // Returns: Nothing
  void flush();

  // The amount of memory a page represents
  static constexpr size_t PAGE_SIZE = 4096U;

 private:
  // The file we will be reading/writing to
  // Note how this is a reference
  //
  // also note that a Page does not have ownership
  // of the swap_file_, just access to it.
  fstream& swap_file_;

  // the virtual page number
  pno_t virtual_pno_;

  // The bytes of the page. One byte is 8 bits
  // so we use 8-bit unsigned integers.
  // You can also assume that a 'char' is one byte big
  uint8_t *bytes_;

  // Whether the page is dirty or not
  bool dirty_;
};

}

// since we have template code
#include "./PageTemplates.cc"

#endif  // PAGE_H_

```

### `Page.cc`实现

`Page.cc`在`simplevm namespace`中。源码如下:

```cpp
#include "./Page.h"
#include <fstream>
#include <iostream>
#include <stdlib.h>
#include <string.h>

namespace simplevm {
  // TODO: implement all non template member functions for Page
    // Constructs a new Page object associated
  // with a swap_file and a virtual page number.
  // The swap file is where we will load in the page
  // contents and flush the page contents. The virtual
  // page number decides where in that file we read
  // and write this page.
  // Passing in an invalid page number is undefined behaviour
  // Note that a Page does not have ownership
  // of the swap_file_, just access to it.
  //
  // Arguments:
  //  - swap_file the swap_file associated with the page
  //  - the virtual page number of our new page
  Page::Page(fstream& swap_file, pno_t virtual_pno):swap_file_(swap_file) {
    this->virtual_pno_ = virtual_pno;
    this->bytes_ = new uint8_t[PAGE_SIZE];
    // seek the correct position
    swap_file_.seekg(virtual_pno_ * PAGE_SIZE, std::ios::beg);
    // read from the swap file
    swap_file_.read((char*)bytes_,PAGE_SIZE);
    if(!swap_file_) {
        std::cerr << "Swap file read failed!" << std::endl;
        exit(1);
    }
    this->dirty_ = false;
  }

  // Constructs a new Page object that is a copy of
  // another page object. Both pages will have
  // the same page number and swap_file, but should
  // have independent copies of the page data.
  //
  // Misc: this means that there could be issues with
  // having the original and copy page having differnt
  // data. This cctor should only really be used
  // in the context of managing pages with something
  // like STL, where the original page used for the cctor
  // will be discarded. In real C++, we would want to
  // use move semantics here.
  //
  // Arguements:
  //   - other: the page we are copying
  Page::Page(const Page& other):swap_file_(other.swap_file_) {
    this->virtual_pno_ = other.virtual_pno_;
    this->bytes_ = new uint8_t[PAGE_SIZE];
    memcpy(this->bytes_,other.bytes_,PAGE_SIZE);
    this->dirty_ = other.dirty_;
  }

  // Destructor for the page object
  // Cleans up any dynamically allocated data or
  // otherwise allocated resources AND should flush
  // its contents if the page is dirty at time of
  // destruction.
  Page::~Page() {
    if(dirty_) {
        flush();
    }
    dirty_ = false;
    delete[] bytes_;
  }

  // Set the current Page object so that is a copy of
  // another page object. Both pages will have
  // the same page number and swap_file, but should
  // have independent copies of the page data.
  //
  // Misc: this means that there could be issues with
  // having the original and copy page having differnt
  // data. This op= should only really be used
  // in the context of managing pages with something
  // like STL, where the original page used for the cctor
  // will be discarded. In real C++, we would want to
  // use move semantics here.
  //
  // You can assume each page has the same swap_file.
  //
  // Arguements:
  //   - rhs: the page we are copying
  Page& Page::operator=(const Page& rhs) {
    if (this!=&rhs)
    {
        this->~Page();
        new (this)Page(rhs);
    }

    return *this;
  }

  // This function is not required, but you may add it
  // if it is needed for some of the STL containers
  // you use in PageTable
  //
  // Determines if this page should go before another page if they
  // were in sorted order.
  //
  // Arguments:
  //   - rhs: the Page we are comparing this to
  //
  // Returns: true iff this page would show up before the other
  // page in sorted order. False otherwise.
  bool Page::operator<(const Page& rhs) {
    return this->virtual_pno_ < rhs.virtual_pno_;
  }

  // Returns the virtual page number of this page
  //
  // Arguments: None
  //
  // Returns: this page's virtual page number
  pno_t Page::pno() {
    return this->virtual_pno_;
  }

  // Returns whether or not a page is dirty
  // A page is "dirty" if someone has written to the data managed
  // by the page since the last time the page was flush()'d.
  //
  // Arguments: None
  //
  // Returns: Whether this page is dirty or not
  bool Page::dirty() {
    return this->dirty_;
  }

  // Flushes the page to the swap file if it is dirty.
  // Flushing a page to the swap file involves writing
  // the page at the the spot correspoding to its page number
  // in the swap_file. For a description of what it means
  // for a page to be dirty, see the dirty() member function.
  // The page should not be written if it is not dirty.
  //
  // Arguments: None
  //
  // Returns: Nothing
  void Page::flush() {
    if(dirty()) {
        // seek the correct position
        swap_file_.seekg(virtual_pno_ * PAGE_SIZE,std::ios::beg);
        // write to the swap file
        swap_file_.write((char*)bytes_,PAGE_SIZE);
        if(!swap_file_) {
            std::cerr << "Swap file write failed!" << std::endl;
            exit(1);
        }
        dirty_ = false;
    }
  }
}

```

## PageTable实现

### PageTable 源码分析

PageTable 的作用如下：

- 管理一个进程的地址空间
- 包括`swap_file`
- 从 physical memory 中读取页
- 选择页淘汰，进行页替换

`PageTable.cc`中有如下一些方法：

- `PageTable(std::string swap_file_name, size_t page_capacity);`
  - 初始化页表，制定`swap_file`名称和页容量
  - 存储的页不可超过页容量
- `~PageTable();`
  - 清理所有变量
  - flush dirty pages
- `Page& get_page(uint32_t virtual_address);`
  - 返回一个虚拟地址对应的 page
  - 将该页导入 physical memory
  - 返回它
  - 有几种可能情况
    - 该页在 Physical memory 中，返回对应的页的引用，并且将该页标记为最新（挪到 vector 最前）
    - 该页不在 physical memory 中，并且 physical memory 还没满。那么将其导入 physical memory，并且标记为最新（挪到 vector 最前），返回该页引用
    - 该页不在 Physical memory 中，并且 physical memory 已经满了，那么先执行淘汰算法，淘汰最老的页，将其写入`swap_file`。然后将该页从`swap_file`中导入进来，放在 vector 最前
  - 注意：
    - virtual address != 页号，可能有多个 virtual address 对应同一个页号(一页有 4096 个字节嘛)
    - 页的最新和最老完全取决于`get_page`函数的调用情况
- `size_t capacity();`
  - 返回页容量
- `size_t loaded_pages();`
  - 返回导入 physical memory 的页数目
- `bool page_available(pno_t virtual_pno);`
  - 返回对应页是否存在 physical memory 中
- `void flush_all_pages();`
  - 将所有页都刷新到`swap_file`中
- `void flush_page(pno_t virtual_pno);`
  - 将对应的页刷新到`swap_file`中
- `void discard_page(pno_t virtual_pno);`
  - 从页表中丢弃对应的页。如果该页不存在，则返回。否则，若该页为 dirty，则将该页数据写入`swap_file`，然后丢弃它
- `void evict_page();`
  - 若没有 page 在页表中，则什么也不做。否则丢弃最老的一页（丢弃前记得将其写入`swap_file`）

`PageTable.cc`有两个`private`变量：

- `fstream swap_file_`: 交换文件
- `size_t capacity`: 页容量
- `size_t page_num`: 当前已经导入 physical memory 的页数目
- `std::vector<Page*> page_list`: 记录所有在 physical memory 中的页
- `std::unordered_map<pno_t,Page*> mp`:

### `PageTable.h`设计

```cpp
#ifndef PAGE_TABLE_H_
#define PAGE_TABLE_H_

#include <fstream>
#include <cstdint>
// #include <vector>
#include <unordered_map>
#include <list>

#include "./Page.h"

using std::fstream;

namespace simplevm {

///////////////////////////////////////////////////////////////////////////////
// A PageTable manages a processes memeory for our simplified
// virtual memory model. This involves managing a swap_file
// which is where pages of data are stored when they aren't loaded
// into physical memory. For our software model, we will say a page
// is in "physical memory" if it is loaded into our memory space
// (e.g. it is on the heap). Pages that aren't loaded in will have
// their contents stored in the swap_file and will not have an
// associated Page object (see Page.h). Our page table can only have
// so many pages stored in memory at one time, which is specified
// on PageTable Creation. We implement an LRU page replacement
// policy to decide which pages to evict if we need to load a new page
// and we already have reached our capacity on the numberof pages we can
// hold.
//
// Users can get a page from the cache, flush pages to the swap_file,
// request any page is evicted, and specifically ask for a page to be evicted.
///////////////////////////////////////////////////////////////////////////////
class PageTable {
 public:
  // Constructs a new page table with the specified
  // swap file and the specified page capacity, which is
  // the number of pages that can be held in memory
  // at one time. There cannot be more than page_capacity
  // number of pages loaded in at a time.
  //
  // Arguments:
  //   - swap_file_name: the name of the swap_file
  //   - page_capacity: the maximum number of pages that can be held
  //     in memory at one time.
  PageTable(std::string swap_file_name, size_t page_capacity);

  // Destructs the page table, freeing any allocated resources
  // and flushing any pages currently loaded into memory that
  // are dirty
  ~PageTable();

  // Given a virtual address, gets the associated
  // page for that virtual address. This page will
  // be "loaded" into physical memory by the time it
  // is returned.
  //
  // There are three possiblities when a page is requested:
  // 1. The page is currently in the "loaded" and in the cache.
  //    In this case, a reference to the page is returned and
  //    and the page is marked as most recently used in the cache
  // 2. The page is not currently "loaded", and the PageTable
  //    has not reached its page capacity:
  //    In this case, the page is loaded from the swap file and added
  //    to the cache as the most recently used page.
  // 3. The page is not currently "loaded", and the PageTable
  //    is at page capacity:
  //    The least recently used page in the cache is evicted from the
  //    cache. Afterwards the requested page is loaded from the swap file
  //    and added to the cache as the most recently used page.
  //
  // NOTE: What decides how recntly used a page was used is entirely
  // decided by how recntly it was returned by a call to get_page.
  //
  // Arguments:
  //   - virtual_address: A virtual address that is associated
  //     with a requested page. The virutal address is represented
  //     as a unsigned 32 bit integer. NOTE: a virtual address
  //     is NOT the same as a page number. Multiple virtual addresses
  //     could be associated with the same page number.
  //
  // Returns:
  //   - the requested page, which is loaded into the cache and
  //     marked as the most recently used page
  Page& get_page(uint32_t virtual_address);

  // Returns the page capacity of the page table
  //
  // Arguments: None
  //
  // Returns: the page capacity of the page table
  size_t capacity();

  // Returns the number of pages currently loaded into "physical memory"
  //
  // Arguments: None
  //
  // Returns: the number of pages currently loaded into "physical memory"
  size_t loaded_pages();

  // Checks to see if the specified page is loaded into memory
  //
  // Arguments: The virtual page number of the page to check for
  //
  // Returns: True iff the page is loaded into memory, false otherwise
  bool page_available(pno_t virtual_pno);

  // Makes sure that all currently loaded pages are flushed
  // meaning tha the page contents are updated on the swap file.
  // This should not affect how recently used each page is and all pages
  // will remain loaded into memory after this operation is performed.
  //
  // Arguments: None
  //
  // Returns: Nothing
  void flush_all_pages();

  // Flushes the specified page to the swap file.
  // This should not affect how recently used each page is and all pages
  // will remain loaded into memory after this operation is performed.
  //
  // Arguments: the virtual page number of the page to flush
  //
  // Returns: Nothing
  void flush_page(pno_t virtual_pno);

  // Discards the specified page from the PageTable.
  // If the page is dirty, then it is flushed before it is discarded.
  // If the page is not in the table, then nothing happens.
  //
  // Arguments: the virtual page number of the page to discard.
  //
  // Returns: Nothing
  void discard_page(pno_t virtual_pno);

  // Evicts a page from the PageTable. The page evicted
  // should be the least recntly used page in the cache.
  // If the evicted page is dirty, then it is flushed before it is evicted.
  // If there are no pages in the cache, then do nothing.
  //
  // Arguments: None
  //
  // Returns: Nothing
  void evict_page();

 private:
  // The swap file where pages are stored
  fstream swap_file_;

  // The number of pages that can be stored
  // in the PageTable at one time.
  size_t capacity_;

  // TODO: add fields
  size_t page_num;

  // a vector to store pages in physical memory
  std::list<std::pair<pno_t,Page*>> page_list;

  // use an unordered_map to quickly determined the corresponding page
  std::unordered_map<pno_t,Page*> mp;
};

}


#endif  // PAGE_TABLE_H_

```

### `PageTable.cc`实现

```cpp
#include "./PageTable.h"
#include "./Page.h"

namespace simplevm {
  // TODO: implment PageTable member functions
  // Constructs a new page table with the specified
  // swap file and the specified page capacity, which is
  // the number of pages that can be held in memory
  // at one time. There cannot be more than page_capacity
  // number of pages loaded in at a time.
  //
  // Arguments:
  //   - swap_file_name: the name of the swap_file
  //   - page_capacity: the maximum number of pages that can be held
  //     in memory at one time.
  PageTable::PageTable(std::string swap_file_name, size_t page_capacity) {
    swap_file_.open(swap_file_name);
    this->capacity_ = page_capacity;
    this->page_num = 0;
  }

  // Destructs the page table, freeing any allocated resources
  // and flushing any pages currently loaded into memory that
  // are dirty
  PageTable::~PageTable() {
    while(page_num > 0) {
        Page* deleted_page = page_list.back().second;
        page_list.pop_back();
        deleted_page->~Page();
        page_num -= 1;
    }
    mp.clear();
    page_list.clear();
  }

  // Given a virtual address, gets the associated
  // page for that virtual address. This page will
  // be "loaded" into physical memory by the time it
  // is returned.
  //
  // There are three possiblities when a page is requested:
  // 1. The page is currently in the "loaded" and in the cache.
  //    In this case, a reference to the page is returned and
  //    and the page is marked as most recently used in the cache
  // 2. The page is not currently "loaded", and the PageTable
  //    has not reached its page capacity:
  //    In this case, the page is loaded from the swap file and added
  //    to the cache as the most recently used page.
  // 3. The page is not currently "loaded", and the PageTable
  //    is at page capacity:
  //    The least recently used page in the cache is evicted from the
  //    cache. Afterwards the requested page is loaded from the swap file
  //    and added to the cache as the most recently used page.
  //
  // NOTE: What decides how recntly used a page was used is entirely
  // decided by how recntly it was returned by a call to get_page.
  //
  // Arguments:
  //   - virtual_address: A virtual address that is associated
  //     with a requested page. The virutal address is represented
  //     as a unsigned 32 bit integer. NOTE: a virtual address
  //     is NOT the same as a page number. Multiple virtual addresses
  //     could be associated with the same page number.
  //
  // Returns:
  //   - the requested page, which is loaded into the cache and
  //     marked as the most recently used page
  Page& PageTable::get_page(uint32_t virtual_address) {
    // obtain the virtual_pno according to the virtual address
    pno_t pno = virtual_address / Page::PAGE_SIZE;
    if(page_available(pno)) {
        Page* p = mp[pno];
        page_list.remove(std::make_pair(pno,p));
        page_list.push_front(std::make_pair(pno,p));
        return *p;
    }
    else {
        Page* pg = new Page(swap_file_,pno);

        if(page_num < capacity_) {
            page_list.push_front(std::make_pair(pno,pg));
            flush_page(pno);
            page_num += 1;
        }
        else {
            // LRU Algorithms
            // evict the oldest page, and flush it
            evict_page();
            // add the new page to the front of the list
            page_list.push_front(std::make_pair(pno,pg));
            page_num += 1;
        }
        mp[pno] = pg;
        return *(mp[pno]);
    }
  }

  // Returns the page capacity of the page table
  //
  // Arguments: None
  //
  // Returns: the page capacity of the page table
  size_t PageTable::capacity() {
    return capacity_;
  }

  // Returns the number of pages currently loaded into "physical memory"
  //
  // Arguments: None
  //
  // Returns: the number of pages currently loaded into "physical memory"
  size_t PageTable::loaded_pages() {
    return page_num;
  }

  // Checks to see if the specified page is loaded into memory
  //
  // Arguments: The virtual page number of the page to check for
  //
  // Returns: True iff the page is loaded into memory, false otherwise
  bool PageTable::page_available(pno_t virtual_pno) {
    return mp.find(virtual_pno) != mp.end();
  }

  // Makes sure that all currently loaded pages are flushed
  // meaning tha the page contents are updated on the swap file.
  // This should not affect how recently used each page is and all pages
  // will remain loaded into memory after this operation is performed.
  //
  // Arguments: None
  //
  // Returns: Nothing
  void PageTable::flush_all_pages() {
    for(auto p:page_list) {
        p.second->flush();
    }
  }

  // Flushes the specified page to the swap file.
  // This should not affect how recently used each page is and all pages
  // will remain loaded into memory after this operation is performed.
  //
  // Arguments: the virtual page number of the page to flush
  //
  // Returns: Nothing
  void PageTable::flush_page(pno_t virtual_pno) {
    if(page_available(virtual_pno)){
        Page* p = mp.find(virtual_pno)->second;
        p->flush();
    }
  }

  // Discards the specified page from the PageTable.
  // If the page is dirty, then it is flushed before it is discarded.
  // If the page is not in the table, then nothing happens.
  //
  // Arguments: the virtual page number of the page to discard.
  //
  // Returns: Nothing
  void PageTable::discard_page(pno_t virtual_pno) {
    if(page_available(virtual_pno)){
        Page* p = mp.find(virtual_pno)->second;
        p->flush();
        page_list.remove(std::make_pair(virtual_pno,p));
        mp.erase(virtual_pno);
        page_num -= 1;
    }
  }

  // Evicts a page from the PageTable. The page evicted
  // should be the least recntly used page in the cache.
  // If the evicted page is dirty, then it is flushed before it is evicted.
  // If there are no pages in the cache, then do nothing.
  //
  // Arguments: None
  //
  // Returns: Nothing
  void PageTable::evict_page() {
    pno_t current_pno = page_list.back().first;
    Page* p = page_list.back().second;
    // find the value in unordered_map
    for(auto it = mp.begin(); it != mp.end(); it++) {
        if(it->first == current_pno && it->second == p) {
            mp.erase(it);
            break;
        }
    }
    page_list.pop_back();
    p->flush();
    page_num -= 1;
  }
}

```

