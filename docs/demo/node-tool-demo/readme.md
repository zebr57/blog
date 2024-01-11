# 基于 node 搭建的简易的脚手架

## 步骤指南

1. 创建 package.json 和 index.js 文件
2. 添加 package.json 文件中 bin 字段，添加脚手架指令 node-cli
3. index.js 中说明运行环境
4. 进行全局安装
5. 窗口交互 -- inquirer 第三方库

- 提供选项用户选择
- 根据选择结果，创建目录并 copy git 上下载的模版代码

6. 携带配置参数、执行指令 -- commander 第三方库

## 依赖介绍

"chalk": "^5.3.0", // 修改窗口字体颜色
"commander": "^11.1.0", // 定义指令
"download-git-repo": "^3.0.2", // 下载 git 上代码
"inquirer": "^9.2.10", // 定义窗口交互
"ora": "^8.0.1", // 加载提示图标
"progress": "^2.0.3" // 进度提示
