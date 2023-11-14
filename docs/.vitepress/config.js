import { defineConfig } from "vitepress";

export default defineConfig({
  base: "",
  lastUpdated: true,
  themeConfig: {
    // 顶部左侧 站名
    siteTitle: "LinQiang·Shen",
    logo: "/logo.svg",
    // 顶部右侧 导航栏
    nav: [
      {
        text: "博客",
        link: "/posts/",
      },
      {
        text: "前端",
        items: [
          { text: "工具函数库", link: "/frontend/utils-lib/" },
          { text: "vue", link: "/frontend/vue/" },
          { text: "react", link: "/frontend/react/" },
          { text: "工程化", link: "/" },
        ],
      },
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
          collapsed: true,
        },
        {
          text: "react",
          items: [{ text: "What is React?", link: "/frontend/react/" }],
          collapsible: true,
          collapsed: true,
        },
      ],
      "/frontend/utils-lib/": [
        {
          text: "工具函数库",
          items: [
            { text: "is", link: "/frontend/utils-lib/is.md" },
            { text: "Js_operate", link: "/frontend/utils-lib/Js_operate.md" },
          ],
          collapsible: true,
          collapsed: true,
        },
      ],
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
      copyright: "Copyright © 2023-present LinQiang Shen",
    },
  },
});
