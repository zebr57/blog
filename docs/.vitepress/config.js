import { defineConfig } from "vitepress";

export default defineConfig({
  base: '',
  lastUpdated: true,
  themeConfig: {
    // 顶部左侧 站名
    siteTitle: "Yo, wellcome!!",
    // 顶部右侧 导航栏
    nav: [
      {
        text: "Guide",
        link: "/guide",
        activeMatch: "/guide/what-is-vitepress",
      },
      {
        text: "下拉框选择",
        items: [
          { text: "options-1", link: "/" },
          { text: "options-2", link: "https://www.baidu.com" },
        ],
      },
    ],
    // 顶部右侧 社交icon
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    // 侧边菜单
    sidebar: [
      {
        text: "JavaScript",
        items: [
          { text: "JavaScript的一些操作", link: "/js_operate.html" },
        ],
        collapsible: true,
        collapsed: true,
      },
      {
        text: "Vue",
        items: [{ text: "Vue的一些操作", link: "/vue.html" }],
        collapsible: true,
        collapsed: true,
      },
      {
        text: "Git",
        items: [
          { text: "Git follow", link: "/git_follow.html" },
        ],
        collapsible: true,
        collapsed: true,
      },
    ],
    // 底部文档
    docFooter: { prev: "上一篇", next: "下一篇" },
    // 在Github编辑
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    // 最后更新时间
    lastUpdatedText: "最近更新时间",
    // 页脚 仅在siderbar不存在时显示
    footer: {
    //   message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present LinQiang Shen",
    },
  },
});
