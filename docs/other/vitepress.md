# vitepress + gitee 搭建个人静态网站

## 创建项目

- 视频：https://www.bilibili.com/video/BV1pY4y1J7zd/?spm_id_from=333.337.search-card.all.click
- 文档：https://vitepress.vuejs.org/guide/getting-started
- 掘金：https://juejin.cn/post/7164276166084263972

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

## 创建配置文件 .vitepress/config.js， 可自定义配置页面

```js
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
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present LinQiang Shen'
    }
  },
});
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
