# vite 插件开发

## 前言

开发插件，理解 vite 是如何运行。

## 1. 创建项目

```powershell
pnpm add vite @types/node vitepress typescrip
t @mistjs/tsconfig-vue eslint @mistjs/eslint-config-vue tsup vittest @vitejs/plu
gin-vue vue vite-plugin-inspect -D
```

pnpm add @types/node typescrip
t tsup vittest @vitejs/plu
gin-vue vue vite-plugin-inspect -D

## 2. 搭建目录结构

- .gitgnore
  ```javascript
  node_modules
  .vscode
  .idea
  *.local
  *.log
  dist
  ```
- .eslintrc
  ```json
  {
    "extends": "@mistjs/eslint-config-vue"
  }
  ```
- tsconfig.json
  ```json
  {
    "extends": "@mistjs/tsconfig-vue"
  }
  ```
- README.md
  ```markdown
  # vitepress plugin
  ```
- 创建例子
  ```powershell
  pnpm create vite
  >vue
  >typescript
  # 删除一些gitgnore、package.json\ts config ... 简洁一点
  ```
- vitepress-plugin/example/src/index.ts

```typescript
import type { PluginOption } from "vite";

const VitePluginVitePress = (): PluginOption => {
  return {
    name: "vite-plugin-vitepress"
  };
};

export { VitePluginVitePress };

export default VitePluginVitePress;
```

- 创建单测文件

  vitepress-plugin/tests/index.test.js

  ```javascript
  import { describe, it, expect } from "vitest";
  // it => 断言 expect => 期望
  describe("demo", () => {
    // 是否正常运行
    it("shoud work", () => {
      // 期望 1 是否toBe 1
      expect(1).toBe(1);
    });
  });
  ```

- 配置启动服务命令
  ```
    package.json
  ```

```json
{
  ...
  "scripts": {
    "test": "vitest -u",
    "dev:example": "vite dev example",
    "build:example": "vite build example",
    "preview:example": "vite preview example"
  },
  ...
}
```

## 3. 插件调试

vite 文档：https://cn.vitejs.dev/guide/

## 4. vite 与 rollup 插件兼容性

https://vite-rollup-plugins.patak.dev/

- included 支持
- covered 支持
- compatible 支持
- incompatible 不支持
- a/n 不支持

## 5. 插件执行流程

![截图](attachment:55b83b0c13d3ba05ef29f7814a153a3c)

<br/>

<br/>

## 包信息完善

```json
{
  "main": "dist/index.js",

  "module": "dist/index.mjs",
  "types": "dist/index.d.js",
  "exports": {
    ".": {
      "require": "./dist.index.js",
      "import": "./dist.index.mjs"
    },
    "./theme": {
      "require": "./dsit/theme.js",
      "import": "./dist/theme.mjs"
    },
    "./package.json": "./package.json",
    "./dist/*": "./dist/*"
  },
  "scripts": {
    "test": "vitest -u md-to-vue",
    "build": "tsup",
    "dev:example": "vite dev example",
    "build:example": "vite build example",
    "preview:example": "vite preview example"
  },
  "keywords": ["vite", "vite-plugin", "vitepress"],
  "files": ["dist"]
}
```

## 更新发包版本信息和记录

- 安装
  ```powershell
  pnpm add bumpp -D
  pnpm add changelogen -D
  ```
- 配置执行命令
  ```json
  {
    "script": {
      "release": "bumpp"
      "changelog": "CHANGELOGEN --output changlelog.md"
    }
  }
  ```

## 发布到 npm

1. 切换回 npm 环境
   ```powershell
   nrm use npm
   ```
2. 登录 npm 账号
   ```powershell
   npm login
   ```
3. 修改包名和公开类型
   ```json
   {
     "name": "@/xxx/vite-plugin-vitepress",
     "publishConfig": {
       "access": "public"
     }
   }
   ```
4. 打包
   ```powershell
   pnpm build
   ```
5. 发包
   ```powershell
   npm publish
   ```
