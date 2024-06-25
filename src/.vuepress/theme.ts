import { MyTheme } from "./theme/index";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";
import { commentPlugin } from "vuepress-plugin-comment2";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default MyTheme({
  hotReload: true,
  hostname: "https://salvely.github.io",
  themeColor: true,
  fullscreen: true,
  author: {
    name: "salvely",
    url: "https://salvely.github.io",
  },

  iconAssets: [
    // 默认：
    "//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css",
    // 自己的
    "//at.alicdn.com/t/c/font_3941380_40oya9bsklp.css",
  ],

  logo: "/logo.svg",

  repo: "Salvely/salvely.github.io",

  docsDir: "src",

  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Language", "Repo", "Wormhole", "Travelling", "Outlook", "Search"],
  },

  blog: {
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      Email: "https://iamgwen9@gmail.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/Salvely",
      // Gitlab: "https://example.com",
      Gmail: "https://iamgwen9@gmail.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
    },
    name: "Salvely",
  },
  locales: {
    /**
     * Chinese locale config
     */
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "默认页脚",

      displayFooter: false,

      blog: {
        description: "自己买花自己戴，爱恨多自在。只为人生不重来，何不放开坏。",
        intro: "/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },
  // navbarAutoHide: "always",
  // 加密
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/life/plan/": ["1234"],
    },
  },
  plugins: {
    searchPro: true,
    comment: {
      // 选择一个评论服务
      provider: "Giscus",
      repo: "Salvely/salvely.github.io",
      repoId: "R_kgDOLoDIxw",
      category: "Announcements",
      categoryId: "DIC_kwDOLoDIx84CeZBE",
    },
    components: {
      components: ["BiliBili", "Badge"],
    },
    blog: {
      filter: ({ filePathRelative, frontmatter }) => {
        // 将标记为非文章，并且是说说的加入文章采集中，以便后续筛选
        if (!frontmatter.article && frontmatter.news) return true;

        return true;
      },

      type: [
        {
          key: "news",
          filter: (page) => page.frontmatter.news === true,
          layout: "News",
          frontmatter: () => ({ title: "说说" }),
        },
      ],
    },
    photoSwipe: {
      selector: [
        ".theme-hope-content :not(a) > img:not([no-view])",
        ".news-content :not(a) > .vp-article-excerpt img",
      ],
    },
    git: true,
    feed: {
      rss: true,
    },
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://talk.salvely.github.io/", // your server url
    //   reaction: true,
    //   requiredMeta: ["nick"],
    //   wordLimit: 300,
    //   emoji: [
    //     "https://unpkg.com/@waline/emojis@1.1.0/tieba",
    //     "https://unpkg.com/@waline/emojis@1.1.0/weibo",
    //     "https://emoji.shojo.cn/bili/webp/tv_小电视_动图",
    //     "https://emoji.shojo.cn/bili/webp/罗小黑战记",
    //     "https://emoji.shojo.cn/bili/webp/2233娘",
    //     "https://emoji.shojo.cn/bili/webp/装扮小姐姐梦幻冬季",
    //     "https://emoji.shojo.cn/bili/webp/装扮小姐姐·秋日午后",
    //     "https://emoji.shojo.cn/bili/webp/星尘",
    //     "https://emoji.shojo.cn/bili/webp/池年"
    //   ],
    //   locales: {
    //     "/": {
    //       placeholder:
    //         "欢迎留言~ _(≧∇≦」∠)_ (填写常用邮箱即可快速收到回复通知~)",
    //     },
    //   },
    // },
    prismjs: false,
    copyright: {
      author: "Salvely",
      license: "CC BY-NC-SA 4.0",
      global: true,
    },
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      include: true,
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      tasklist: true,
      imgLazyload: true,
      imgSize: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a PWA
    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});
