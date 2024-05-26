import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "刷课记录",
    prefix: "/course/",
    icon: "edit",
    children: [
      {
        text: "编程入门",
        link: "Intro to Programming/",
      },
      {
        text: "工具使用",
        link: "Tools/",
      },
      {
        text: "人工智能",
        link: "AI/",
      },
      {
        text: "图形学",
        link: "Computer Graphics/",
      },
      {
        text: "数据结构与算法",
        prefix: "DS & Algorithms/",
        children: [
          {
            text: "数据结构",
            link: "Data structure/",
          },
          {
            text: "算法",
            link: "Algorithms/",
          },
        ],
      },
      {
        text: "系统方向",
        icon: "linux",
        prefix: "System/",
        children: [
          {
            text: "系统入门",
            link: "System Intro/",
          },
          {
            text: "数字逻辑",
            link: "Digital Design/",
          },
          {
            text: "计算机组成原理",
            link: "COD/",
          },
          {
            text: "计算机体系结构",
            link: "CA/",
          },
          {
            text: "编译原理",
            link: "Compiler/",
          },
          {
            text: "操作系统",
            link: "OS/",
          },
          {
            text: "计算机网络",
            link: "Network/",
          },
          {
            text: "数据库",
            link: "Database/",
          },
          {
            text: "分布式系统",
            link: "Distributed System/",
          },
        ],
      },
      {
        text: "Web开发",
        prefix: "Web/",
        children: [
          {
            text: "前端开发",
            link: "FrontEnd/",
          },
          {
            text: "后端开发",
            link: "BackEnd/",
          },
          {
            text: "运维",
            link: "DevOps/",
          },
        ],
      },
      {
        text: "移动应用开发",
        prefix: "Mobile/",
        children: [
          {
            text: "安卓开发",
            link: "Android/",
          },
        ],
      },
      {
        text: "安全方向",
        prefix: "Security/",
        children: [
          {
            text: "系统安全",
            link: "System Security/",
          },
          {
            text: "Web安全",
            link: "Web Security/",
          },
          {
            text: "嵌入式系统安全",
            link: "Embedded System Security/",
          },
        ],
      },
      {
        text: "嵌入式开发及IoT",
        prefix: "Embedded/",
        children: [
          {
            text: "IoT",
            link: "IoT/",
          },
          {
            text: "FPGA",
            link: "FPGA/",
          },
          {
            text: "单片机",
            link: "Microprocessor/",
          },
          {
            text: "机器人",
            link: "Robotics/",
          },
        ],
      },
      {
        text: "电子设计",
        prefix: "Hardware/",
        children: [
          {
            text: "电子设计",
            link: "Digital Design/",
          },
          {
            text: "信号处理",
            link: "Signal Processing/",
          },
          {
            text: "电路",
            link: "Circuit/",
          },
        ],
      },
      {
        text: "理论计算机",
        link: "TCS/",
      },
    ],
  },
  {
    text: "数理基础",
    icon: "edit",
    prefix: "/science/",
    children: [
      {
        text: "数学",
        link: "math/",
      },
      {
        text: "物理",
        link: "physics/",
      },
      {
        text: "经济学",
        link: "economics/",
      },
    ],
  },
  {
    text: "做题家",
    icon: "edit",
    prefix: "/competition/",
    children: [
      {
        text: "leetcode",
        link: "leetcode/",
      },
      {
        text: "ctf",
        link: "ctf/",
      },
      {
        text: "OI",
        link: "OI/",
      },
    ],
  },
  {
    text: "博客",
    link: "/posts/",
  },
  {
    text: "生活",
    icon: "news",
    prefix: "/life/",
    children: [
      { text: "计划", link: "plan/" },
      { text: "Minecraft", link: "minecraft/" },
      { text: "下厨", link: "cook/" },
      { text: "乐理", link: "/music" },
      { text: "创新创业", link: "/kickstart" },
      { text: "吉他", link: "/guitar" },
      { text: "围棋", link: "/go" },
      { text: "导游", link: "/guide" },
      { text: "手工", link: "/paperart" },
      { text: "摄影", link: "/photo" },
      { text: "汽车组装", link: "/car" },
      { text: "电影", link: "/movie" },
      { text: "自行车组装", link: "/bike" },
      { text: "英语学习", link: "/english" },
      { text: "记忆练习", link: "/memory" },
      { text: "读书", link: "/reading" },
      { text: "象棋", link: "/chess" },
      { text: "财富管理", link: "/money" },
      { text: "运动健身", link: "/fitness" },
      { text: "魔术学习", link: "/magic" },
    ],
  },
  {
    text: "项目",
    icon: "hk-shoucang1",
    link: "/collect",
  },
  //   {
  //     text: "说说",
  //     icon: "news",
  //     link: "/news/",
  //   },
  {
    text: "留言板",
    icon: "mark",
    link: "/visitorsbook",
  },
  {
    text: "友链",
    icon: "link",
    link: "/friend",
  },
  {
    text: "关于",
    icon: "info",
    children: [
      { text: "关于我", icon: "people", link: "/intro" },
      { text: "关于本站", icon: "info", link: "/about" },
    ],
  },
]);
