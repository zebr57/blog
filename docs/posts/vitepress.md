# vitepress + gitee 搭建个人静态网站

## 创建项目

#### 安装 vitepress

::: code-group

```shell [npm]
npm add -D vitepress
```

```shell [pnpm]
pnpm add -D vitepress
```

```shell [yarn]
yarn add -D vitepress
```

```shell [bun]
bun add -D vitepress
```

:::

#### 初始化项目

::: code-group

```shell [npm]
npx vitepress init
```

```shell [pnpm]
pnpm dlx vitepress init
```

```shell [bunx]
bunx vitepress init
```

:::

```shell
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./ (./表示根目录  ./docs表示在新建docs文件夹)
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ○ Default Theme (Out of the box, good-looking docs) （默认）
│  ● Default Theme + Customization (多生成一个.vitepress/theme文件夹)
│  ○ Custom Theme (全自定义)
└
```

#### 初始目录

```js
.
├─ .vitepress
│  ├ theme
│  ├ ├─ index.js
│  ├ └─ style.css
│  └─ config.mjs
├─ index.md
├─ api-examples.md // [!code --]
├─ markdown-examples.md // [!code --]
├─ deploy.sh // [!code ++]
└─ package.json
```

#### 配置修改

```js:line-numbers
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
        link: "/posts/", // /xxxx后加/表示文件夹
      },
      {
        text: "前端",
        items: [
          { text: "vue", link: "/frontend/vue/" },
          { text: "react", link: "/frontend/react/" },
        ],
      },
    ],
    // 顶部右侧 社交icon
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    // 侧边菜单 统一展示[]，根据url路径匹配使用字典{}
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
    },

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
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present LinQiang Shen",
    },
  },
  // md全局配置
  markdown: {
    lineNumbers: true, // 开启显示行数
  },
});
```

## 部署前提

1. 创建仓库: https://gitee.com/projects/new
2. 注册 gitee 账号，开通 git pages 上传身份证审核
3. 项目根目录下创建 deploy.sh 文件

```shell
  #!/usr/bin/env sh

  set -e

  npm run docs:build

  cd docs/.vitepress/dist

  git init
  git add -A
  git commit -m "gitee actions 自动部署"
  git push -f https://gitee.com/shen-linqiang/blog-vitepress.git master

  cd -
  rm -rf docs/.vitepress/dist

```

4. package.json 文件添加运行命令

```json
  {
    "scripts": {
    ....
    "deploy": "bash deploy.sh"
    }
  }
```

## 过程中遇到的问题

1. 本地 git 默认分支名是 main，远程为 master，导致代码推不上去

- 修改 git 默认分支名，执行 git init 初始化

```shell
  git config --global init.defaultBranch 默认分支名
  #or
  git branch -M 默认分支名  (移动分支 重命名)
  #next
  git init
```
#### 参考

- 官方文档：https://vitepress.dev/guide/getting-started
- 中文文档：https://vitejs.cn/vitepress/
- 掘金：https://juejin.cn/post/7164276166084263972
- 视频：https://www.bilibili.com/video/BV1pY4y1J7zd/?spm_id_from=333.337.search-card.all.click
- 视频：https://www.bilibili.com/video/BV1Fc411R7J1/?p=5&spm_id_from=pageDriver