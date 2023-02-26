# vitepress + gitee 搭建个人静态网站

## 创建文件夹目录
- 视频：https://www.bilibili.com/video/BV1pY4y1J7zd/?spm_id_from=333.337.search-card.all.click
- 文档：https://vitepress.vuejs.org/guide/getting-started
- 掘金：https://juejin.cn/post/7164276166084263972

## 部署前提
1. 创建仓库: https://gitee.com/projects/new
2. 注册gitee账号，开通git pages 上传身份证审核
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
4. package.json文件添加运行命令
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
  import { defineConfig } from "vitepress"

  export default defineConfig({
      base: "/blog-vitepress/"
  })
```

## 过程中遇到的问题
1. 本地git默认分支名是main，远程为master，导致代码推不上去
  -  修改git默认分支名，执行 git init初始化
```shell
  git config --global init.defaultBranch 默认分支名
  #or
  git branch -M 默认分支名  (移动分支 重命名)
  #next
  git init
````