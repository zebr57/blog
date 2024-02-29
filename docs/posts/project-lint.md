# 项目配置之代码规范、提交规范

## 前言导读

每个人的开发原来的编码习惯个不同，在多人协同开发项目过程中，有可能出现该情况代码拉取后重新提交会格式化代码，造成改动处过多的情况，不便查阅，为了避免类似问题，我们给项目统一规范，配置代码校验、美化代码和 git 提交校验。

## 配置

## 1. 安装 eslint

1.1 安装

```shell
pnpm i eslint -D
```

生成配置文件

```shell
npx eslint --init
```

配置文件内容

- react

```js
module.exports = {
  extends: ["react-app", "react-app/jest", "prettier"], // react
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error", // 引用 prettier 规则
    "jsx-a11y/anchor-is-valid": "off" // 对jsx
  }
};
```

- vue ts

```js
module.exports = {
  //运行环境
  env: {
    browser: true, //浏览器端
    es2021: true //es2021
  },
  //规则继承
  extends: [
    //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
    //比如:函数不能重名、对象不能出现重复key
    "eslint:recommended",
    //vue3语法规则
    "plugin:vue/vue3-essential",
    //ts语法规则
    "plugin:@typescript-eslint/recommended"
  ],
  //要为特定类型的文件指定处理器
  overrides: [],
  //指定解析器:解析器
  //Esprima 默认解析器
  //Babel-ESLint babel解析器
  //@typescript-eslint/parser ts解析器
  parser: "@typescript-eslint/parser",
  //指定解析器选项
  parserOptions: {
    ecmaVersion: "latest", //校验ECMA最新版本
    sourceType: "module" //设置为"script"（默认），或者"module"代码在ECMAScript模块中
  },
  //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
  //该eslint-plugin-前缀可以从插件名称被省略
  plugins: ["vue", "@typescript-eslint"],
  //eslint规则
  rules: {}
};
```

添加.eslintignore 忽略文件

```base
dist
node_modules
```

## 2. 安装 prettier

安装

```shell
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

添加规则 .prettierrc.json

```json
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

添加.prettierignore 忽略文件

```base
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

这样我们通过 pnpm run lint 去检测语法，如果出现不规范格式,通过 pnpm run fix 修改

## 3. 安装 husk

在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。让 husk 帮我们强制让开发人员按照代码规范来提交。

利用 husky 在代码提交之前触发 git hook(git 在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

安装`husky`

```shell
 pnpm install -D husky
```

执行

```shell
git init

npx husky-init
```

会在根目录下生成个一个.husky 目录，在这个目录下面会有一个 pre-commit 文件，这个文件里面的命令在我们执行 commit 的时候就会执行

在`.husky/pre-commit`文件添加如下命令：

```shell
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"
    pnpm run format
```

当我们对代码进行 commit 操作的时候，就会执行命令，对代码进行格式化，然后再提交。

## 4. 安装 commmitlint

对于我们的 commit 信息，也需要让每个人都按照统一规范来执行，不能随便写,我们可以利用**commitlint**来实现。

安装包

```shell
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

添加配置文件，新建`commitlint.config.js`(根据遵循的规范创建 js 或者 cjs)，然后添加下面的代码：

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // 校验规则
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "revert", "build"]
    ],
    "type-case": [0],
    "type-empty": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
    "header-max-length": [0, "always", 72]
  }
};
```

在`package.json`中配置 scripts 命令

```json
// 在scrips中添加下面的代码
{
  "scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  }
}
```

配置结束，现在当我们填写`commit`信息的时候，前面就需要带着下面的`subject`

```base
    'feat',//新特性、新功能
    'fix',//修改bug
    'docs',//文档修改
    'style',//代码格式修改, 注意不是 css 修改
    'refactor',//代码重构
    'perf',//优化相关，比如提升性能、体验
    'test',//测试用例修改
    'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
    'revert',//回滚到上一个版本
    'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
```

配置 husky

```shell
npx husky add .husky/commit-msg
```

在生成的 commit-msg 文件中添加下面的命令

```shell
 #!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm commitlint

```

当我们 commit 提交信息时，就不能再随意写了，必须是 git commit -m 'fix: xxx' 符合类型的才可以，**需要注意的是类型的后面需要用英文的 :，并且冒号后面是需要空一格的，这个是不能省略的**

## 5. 安装 lint-staged

之前都是每次提交都都所有代码进行校验，这显然不太合理，lint-staged 帮我们只对所有暂存区的文件做处理

安装包

```shell
pnpm i lint-staged -D
```

修改 package.json 配置

```json
"lint-staged": {
  "src/**/*.{ts,tsx,js,jsx}": [ // 文件类型
    "prettier --write",
    "eslint --cache --fix"
  ]
}
```

修改 pre-commit 钩子 将 pre-commit 钩子的内容修改为如下：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "pre-commit";
npx lint-staged;
```

这样每次提交的时候就只会对暂存区中的文件进行 eslint 校验了。

## 6. 强制使用 pnpm 包管理器工具

团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,

导致项目出现 bug 问题,因此包管理器工具需要统一管理。

在根目录创建 scritps/preinstall.js 文件，添加下面的内容

```js
if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`
  );
  process.exit(1);
}
```

配置命令

```json
"scripts": {
	"preinstall": "node ./scripts/preinstall.js"
}
```

当我们使用 npm 或者 yarn 来安装包的时候，就会报错了。原理就是在 install 的时候会触发 preinstall（npm 提供的生命周期钩子）这个文件里面的代码。
