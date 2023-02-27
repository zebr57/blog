import { defineConfig } from "vitepress";

export default defineConfig({
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
        text: "前端",
        items: [{ text: "js", link: "http://localhost:5173/front/js/test" }],
        collapsible: true,
        collapsed: true,
      },
      {
        text: "大杂烩",
        items: [
          { text: "搭建过程", link: "http://localhost:5173/other/vitepress" },
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
