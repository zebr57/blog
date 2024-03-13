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
          svg: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 90 90"><script xmlns=""></script>
          <!-- Generator: Sketch 61.2 (89653) - https://sketch.com -->
          <title>logo</title>
          <desc>Created with Sketch.</desc>
          <g id="LOGO" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Artboard" transform="translate(-532.000000, -431.000000)">
                  <g id="logo" transform="translate(532.000000, 431.000000)">
                      <g id="Group">
                          <circle id="Combined-Shape" fill="#C71D23" cx="44.8544363" cy="44.8544363" r="44.8544363"></circle>
                          <path d="M67.558546,39.8714292 L42.0857966,39.8714292 C40.8627004,39.8720094 39.8710953,40.8633548 39.8701949,42.0864508 L39.8687448,47.623783 C39.867826,48.8471055 40.8592652,49.8390642 42.0825879,49.8393845 C42.0827874,49.8393846 42.0829869,49.8393846 42.0831864,49.8387862 L57.5909484,49.838657 C58.8142711,49.8386283 59.8059783,50.830319 59.8059885,52.0536417 C59.8059885,52.0536479 59.8059885,52.053654 59.8059701,52.0536602 L59.8059701,52.6073539 L59.8059701,52.6073539 L59.8059701,53.161115 C59.8059701,56.8310831 56.8308731,59.80618 53.160905,59.80618 L32.1165505,59.80618 C30.8934034,59.806119 29.9018373,58.8145802 29.9017425,57.5914331 L29.9011625,36.5491188 C29.9008781,32.8791508 32.8758931,29.9039718 36.5458611,29.9038706 C36.5459222,29.9038706 36.5459833,29.9038706 36.5460443,29.9040538 L67.5523638,29.9040538 C68.77515,29.9026795 69.7666266,28.9118177 69.7687593,27.6890325 L69.7721938,22.1516997 C69.774326,20.928378 68.7832423,19.9360642 67.5599198,19.9353054 C67.5594619,19.9353051 67.5590039,19.935305 67.558546,19.9366784 L36.5479677,19.9366784 C27.3730474,19.9366784 19.935305,27.3744208 19.935305,36.549341 L19.935305,67.558546 C19.935305,68.7818687 20.927004,69.7735676 22.1503267,69.7735676 L54.8224984,69.7735676 C63.079746,69.7735676 69.7735676,63.079746 69.7735676,54.8224984 L69.7735676,42.0864509 C69.7735676,40.8631282 68.7818687,39.8714292 67.558546,39.8714292 Z" id="G" fill="#FFFFFF"></path>
                      </g>
                  </g>
              </g>
          </g>
      <script xmlns=""></script></svg>`
        },
        link: "https://gitee.com/shen-linqiang"
      },
      { icon: "github", link: "https://github.com/zebr57" }
    ],
    // 侧边菜单
    sidebar: {
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
        },
        {
          text: "命令行工具",
          items: [{ text: "类型判断", link: "/frontend/zebr-cli/is.md" }],
          collapsible: false,
          collapsed: false
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
