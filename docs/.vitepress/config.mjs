import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/blog-vitepress/",
  lastUpdated: true,
  themeConfig: {
    // 顶部左侧 站名
    siteTitle: "LinQiang·Shen",
    logo: "/logo.svg",
    // 顶部右侧 导航栏
    nav: [
      {
        text: "博客",
        link: "/posts/"
      },
      {
        text: "前端",
        items: [
          { text: "vue", link: "/frontend/vue/" },
          { text: "React", link: "/frontend/react/" },
          { text: "Node", link: "/frontend/node/" },
          { text: "工具函数库", link: "/frontend/utils-lib/" }
        ]
      }
    ],
    // 顶部右侧 社交icon
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    // 侧边菜单
    sidebar: {
      "/frontend/": [
        {
          text: "Vue",
          items: [{ text: "What is Vue?", link: "/frontend/vue/" }],
          collapsible: true,
          collapsed: true
        },
        {
          text: "React",
          items: [{ text: "What is React?", link: "/frontend/react/" }],
          collapsible: true,
          collapsed: true
        },
        {
          text: "Node",
          items: [{ text: "What is Node?", link: "/frontend/node/" }],
          collapsible: true,
          collapsed: true
        }
      ],
      "/frontend/utils-lib/": [
        {
          text: "开始",
          items: [{ text: "说明", link: "/frontend/utils-lib/index.md" }]
        },
        {
          text: "工具函数库",
          items: [
            { text: "类型判断", link: "/frontend/utils-lib/is.md" },
            { text: "数字计算", link: "/frontend/utils-lib/calculate.md" },
            { text: "字符串操作", link: "/frontend/utils-lib/string.md" },
            { text: "对象操作", link: "/frontend/utils-lib/object.md" },
            { text: "数组操作", link: "/frontend/utils-lib/array.md" },
            { text: "树结构操作", link: "/frontend/utils-lib/tree.md" },
            { text: "格式转化", link: "/frontend/utils-lib/format.md" },
            { text: "本地存储", link: "/frontend/utils-lib/storage.md" }
          ],
          collapsible: true,
          collapsed: true
        }
      ]
    },

    // 底部文档
    docFooter: { prev: "上一篇", next: "下一篇" },
    // 在Github编辑
    // editLink: {
    //   pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    //   text: "Edit this page on GitHub",
    // },
    // 最后更新时间
    lastUpdatedText: "最近更新时间",
    // 页脚 仅在siderbar不存在时显示
    footer: {
      //   message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present LinQiang Shen"
    }
  },
  markdown: {
    lineNumbers: true
  }
});
