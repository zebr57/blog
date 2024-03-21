import { defineConfig } from "vitepress";

export default defineConfig({
  // 应用级配置选项
  base: "/blog-vitepress/",
  lastUpdated: true,
  lang: "en-US",
  title: "LinQiang.Shen",
  description: "Vite & Vue powered static site generator.",
  // 主题配置
  themeConfig: {
    // 顶部左侧 站名
    siteTitle: "LinQiang·Shen",
    logo: "/assets/WechatIMG56.jpg",
    // 顶部右侧 导航栏
    nav: [
      {
        text: "博客",
        link: "/posts/"
      },
      {
        text: "前端",
        items: [
          // { text: "vue", link: "/frontend/vue/" },
          { text: "React", link: "/frontend/react/" },
          { text: "Node", link: "/frontend/node/" },
          { text: "工具函数库", link: "/frontend/utils-lib/" },
          { text: "命令行工具", link: "/frontend/zebr-cli/" }
        ]
      }
    ],
    // 顶部右侧 社交icon
    socialLinks: [
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="120 13 72 72"><script xmlns=""/><g fill="none" fill-rule="evenodd" transform=""><path d="m0 0h312v100h-312z"/><path d="m156 85c-19.882251 0-36-16.117749-36-36s16.117749-36 36-36 36 16.117749 36 36-16.117749 36-36 36zm18.222232-39.9993426-20.444332.0004656c-.981652 0-1.777511.7956502-1.777768 1.7773025l-.002109 4.4442415c-.000258.9818341.795468 1.7779763 1.777302 1.7782335h.00048l12.446471-.0005988c.981834-.0000082 1.777775.795919 1.777783 1.7777532v.0000148l-.000015.4443924v.4444466c0 2.9455024-2.387801 5.3333039-5.333304 5.3333039l-16.890119-.000049c-.981693 0-1.77752-.7958052-1.777547-1.7774984l-.000662-16.8884814c-.000081-2.9455025 2.387655-5.3333698 5.333157-5.333451h.000147l24.885554-.0009559c.981404 0 1.777159-.795262 1.777768-1.7766654l.004962-4.4442409c.000609-.981834-.794831-1.7782613-1.776665-1.7788703-.000368-.0000002-.000735-.0000003-.001103-.0000003l-24.888752.0011758c-7.363727 0-13.333219 5.9694589-13.333259 13.3331863l-.000221 24.8878699c-.000005.9818342.795924 1.7777724 1.777758 1.7777778l26.222571-.0000098c6.627235 0 11.999671-5.3724358 11.999671-11.9996713v-10.2219033c0-.9818341-.795934-1.777768-1.777768-1.777768z" fill="#c71d23"/></g><script xmlns=""/></svg>`
        },
        link: "https://gitee.com/shen-linqiang"
      },
      { icon: "github", link: "https://github.com/zebr57" }
    ],
    // 侧边菜单
    sidebar: {
      "/posts/": [
        { text: "README", link: "/posts/readme.md" },
        { text: "BLOG-LIST", link: "/posts/" },
        {
          text: "DAILY-LIFE",
          items: [{ text: "文档驱动", link: "/posts/docs-drive.md" }]
        },
        {
          text: "开发工具",
          items: [{ text: "window 安装 nvm 管理", link: "/posts/window 安装 nvm 管理.md" }]
        },

        {
          text: " NEW-TECHNOLOGY",
          items: [
            {
              text: "Vite plugin",
              link: "/posts/vite-plugin.md"
            },
            {
              text: "Webpack plugin",
              link: "/posts/webpack-plugin.md"
            },
            {
              text: "Chrome extension",
              link: "/posts/chrome-extension.md"
            },
            {
              text: "Vscode extension",
              link: "/posts/vscode-extension.md"
            }
          ]
        },
        {
          text: "发布",
          items: [
            { text: "npm 发包", link: "/posts/npm-publish.md" },
            { text: "vitepress+gitee发布个人站点", link: "/posts/vitepress.md" }
          ]
        },
        {
          text: "项目配置",
          items: [
            {
              text: "项目统一规范配置",
              link: "/posts/project-lint.md"
            },
            {
              text: "craco 修改 webpack 配置",
              link: "/posts/craoco-webpack-config.md"
            }
          ]
        },
        {
          text: "命令行指令",
          items: [
            {
              text: "github22端口连接超时报错",
              link: "/posts/github22端口连接超时报错的解决办法.md"
            }
          ]
        }
      ],
      "/frontend/": [
        // {
        //   text: "Vue",
        //   items: [{ text: "What is Vue?", link: "/frontend/vue/" }],
        //   collapsible: true,
        //   collapsed: true
        // },
        {
          text: "React",
          items: [{ text: "What is React?", link: "/frontend/react/" }],
          collapsible: true,
          collapsed: true
        },
        {
          text: "Node",
          items: [
            { text: "What is Node?", link: "/frontend/node/" },
            { text: "常用模块", link: "/frontend/node/base.md" },
            { text: "文件操作", link: "/frontend/node/file-actions.md" },
            { text: "buffer和stream", link: "/frontend/node/Buffer-and-stream.md" },
            { text: "http 服务", link: "/frontend/node/http.md" },
            { text: "Express 和 Koa 框架", link: "/frontend/node/Express-and-koa.md" },
            { text: "koa 做 bff 中间层", link: "/frontend/node/koa-bff.md" },
            { text: "工程化工具-cli", link: "/frontend/node/node-cli.md" }
          ],
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
          collapsible: false,
          collapsed: false
        }
      ],
      "/frontend/zebr-cli/": [
        {
          text: "开始",
          items: [{ text: "说明", link: "/frontend/zebr-cli/index.md" }]
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
