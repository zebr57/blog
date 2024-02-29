# create-react-app 之使用 @craco/craco 修改 webpack 配置

## 前言导读

使用 CRA 脚手架创建的 React 项目，如果想要修改编译配置项，就需要通过 npm run eject 弹出配置后在官方原本的配置上进行魔改，同时 eject 操作是不可逆的，在配置弹出后，你后续将无法跟随官方的脚本去升级 react-script 版本。

为了避免不可逆操作，可以使用其他方式来修改 webpack 配置：

1. 官方支持重写 `react-scripts` 包
2. 使用 `react-app-rewired` + `customize-cra` 来覆盖配置
3. 使用 `@craco/craco` 覆盖，相对于方式二配置更为简单，只有一依赖项

## 安装 @craco/craco

## 1.1 安装

```shell
pnpm i @craco/craco -D
```

## 1.2 修改 package.json 命令

```json
  "scripts": {
      "start": "craco start",
      "build": "craco build",
      "test": "craco test",
  }
```

## 1.3 创建 craco.config.js 文件

```js
/* craco.config.js */
module.exports = function () {
  ...
};
```

## 配置

## 2.1 配置别名

```javascript
module.exports = function () {
  return {
    webpack: {
      // 配置别名
      alias: {
        "@": path.resolve(__dirname, "src")
      },
    },
    configure: (webpackConfig, { env, paths }) => {
      ...
    }
  }
};
```

## 2.2 配置代理

```js
module.exports = function () {
  return {
    //...
    devServer: {
      port: 3000,
      hot: true,
      client: {
        overlay: false
      },
      // 配置代理
      proxy: {
        "/api": {
          target: "http://xxx.com",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/api"
          }
        }
      }
    }
    //...
  };
};
```

## 2.3 配置 less，支持模块化、全局引入 less 文件

- 安装依赖

  ```shell
    /* 安装craco-less,支持覆些webpack loader */
    npn i craco-less -S

    /* 同时需要安装less 和 less-loader */
    npm install --save-dev less-loader less

  ```

- 修改配置

```js
const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");

module.exports = function () {
  const lessModuleRegex = /\.module\.less$/;
  return {
    //...
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          // less loader option
          lessLoaderOptions: {
            lessOptions: {
              /*
                如果项目中有使用TDesign或AntDesign v4版本组件库需要自定义主题，可以在modifyVars中添加对应less变量
                antd v5版本使用css-in-js方式去定制主题，已经没有less变量了
            */
              modifyVars: {
                "@primary-color": "#2378ff"
              },
              javascriptEnabled: true
            }
          },
          modifyLessRule(lessRule) {
            lessRule.exclude = lessModuleRegex;
            return lessRule;
          },
          modifyLessModuleRule(lessModuleRule) {
            // configure the file suffix
            lessModuleRule.test = lessModuleRegex;

            // configure the generated local ident name
            const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
            cssLoader.options.modules = {
              /* 
                注意这里的命名规则：
                - CRA脚手架创建的项目是可以直接使用css modules的，css文件的命名规则默认是[local]_[hash:base64:5]
                - 这里使用css modules的命名规则
            */

              localIdentName: "[local]_[hash:base64:5]"
            };

            return lessModuleRule;
          }
        }
      }
    ]
    //...
  };
};
```

## 2.4 修改打包输出结果

```javascript
module.exports = function () {
  return {
    // ...
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        if (env === "production") {
          // 输出output
          webpackConfig.output = {
            ...webpackConfig.output,
            publicPath: "./" // 打包资源引入路径--目前使用的是相对路径
            // path: path.resolve(__dirname, "dist"), // 打包结果输出目录
          };
        }
        return webpackConfig;
      }
    }
    // ...
  };
};
```

## 2.5 关闭 sourceMap

```javascript
module.exports = function () {
  return {
    // ...
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        if (env === "production") {
          // 去除map文件
          webpackConfig.devtool = false;
        }
        return webpackConfig;
      }
    }
    // ...
  };
};
```

## 2.6 分包优化

```javascript
module.exports = function () {
  return {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        if (env === "production") {
          // 拆包
          webpackConfig.optimization = {
            splitChunks: {
              chunks: "async",
              minSize: 40000, // bite
              maxAsyncRequests: 10, // 最大异步请求数
              maxInitialRequests: 10, // 页面初始化最大异步请求数
              automaticNameDelimiter: "~", // 解决命名冲突
              name: false,
              cacheGroups: {
                antd: {
                  name: "chunk-antd",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
                  priority: -7
                },
                common: {
                  name: "chunk-common",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-redux|react-router-dom|redux)[\\/]/,
                  priority: -9
                },
                // index.jsx没有引入的话是没有打包的
                axios: {
                  name: "chunk-axios",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](axios|axios)[\\/]/,
                  priority: -10
                }
              }
            }
          };
        }
        return webpackConfig;
      }
    }
  };
};
```

## 2.7 压缩文件 gz

```javascript
module.exports = function () {
  return {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // 压缩文件 gz
        webpackConfig.plugins.push(
          new CompressionWebpackPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.js$|\.json$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
            threshold: 10240, // 只有大小大于该值(单位kb)的资源会被处理
            minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
            // deleteOriginalAssets: true // 删除原文件
          })
        );
        return webpackConfig;
      }
    }
  };
};
```

## 2.8 打包结果分析

```shell
pnpm i webpack-bundle-analyzer -D
```

```javascript
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = function () {
  return {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        // 打包分析插件，需要分析时打开注释
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
        return webpackConfig;
      }
    }
  };
};
```

## 2.9 js 代码最小化

```shell
pnpm i uglifyJS-webpack-plugin -D
```

```javascript
const UglifyJsPlugin = require("uglifyJS-webpack-plugin");

module.exports = function () {
  return {
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.optimization.minimizer: [
          new UglifyJsPlugin({
            test: /.js(?.*)?$/i, // 测试匹配文件,
            cache: false, // 是否启用文件缓存
            parallel: true, // 使用多进程并行运行来提高构建速度
            uglifyOptions: {
              warning: false,
              compress: {
                drop_debugger: true, // 清除debugger
                drop_console: false, // 是否清除所有console
                pure_funcs: ["console.log", "console.info"] // 需要清除的console
              }
            }
          })
        ]
        return webpackConfig;
      }
    }
  };
};
```

## 2.10 删除 console 调试信息

```javascript
module.exports = function () {
  return {
    bable: {
      plugins: [
        // 生产环境只留console.error\warn,去除console.log
        [
          "babel-plugin-transform-remove-console",
          { exclude: isProduction ? ["error", "warn"] : ["error", "warn", "log"] }
        ]
      ]
    }
  };
};
```

## 2.11 美化打包进度

```shell
pnpm i webpackBar -D
```

```js
module.exports = function () {
  return {
    webpack: {
      plugins: {
        add: [
          new WebpackBar({
            name: "webpack开始构建......",
            color: "#2d56f8",
            profile: true
          })
        ]
      }
    }
  };
};
```

## 完整代码

```js
const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackBar = require("webpackbar"); // webpack 编译进度条
const path = require("path");

module.exports = function (webpackEnv) {
  const lessModuleRegex = /\.module\.less$/;
  const isProduction = process.env.NODE_ENV === "production";
  return {
    webpack: {
      // 配置别名
      alias: {
        "@": path.resolve(__dirname, "src")
      },
      // 移除cdn外部资源不打包
      externals: {
        // echarts: "echarts"
      },
      configure: (webpackConfig, { env, paths }) => {
        if (isProduction) {
          // 输出output
          webpackConfig.output = {
            ...webpackConfig.output,
            publicPath: "./" // 打包资源引入路径--目前使用的是相对路径
            // path: path.resolve(__dirname, "dist"), // 打包结果输出目录
          };
          /* ===================================== 优化项 ===================================== */
          // 去除map文件
          webpackConfig.devtool = false;
          // 拆包
          webpackConfig.optimization = {
            splitChunks: {
              chunks: "async",
              minSize: 40000, // bite
              maxAsyncRequests: 10, // 最大异步请求数
              maxInitialRequests: 10, // 页面初始化最大异步请求数
              automaticNameDelimiter: "~", // 解决命名冲突
              name: false,
              cacheGroups: {
                antd: {
                  name: "chunk-antd",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
                  priority: -7
                },
                common: {
                  name: "chunk-common",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-redux|react-router-dom|redux)[\\/]/,
                  priority: -9
                },
                // index.jsx没有引入的话是没有打包的
                axios: {
                  name: "chunk-axios",
                  chunks: "all",
                  test: /[\\/]node_modules[\\/](axios|axios)[\\/]/,
                  priority: -10
                }
              }
            }
          };
          // 压缩文件 gz
          webpackConfig.plugins.push(
            new CompressionWebpackPlugin({
              filename: "[path][base].gz",
              algorithm: "gzip",
              test: /\.js$|\.json$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
              threshold: 10240, // 只有大小大于该值(单位kb)的资源会被处理
              minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
              // deleteOriginalAssets: true // 删除原文件
            })
          );
        }

        // 打包分析插件，需要分析时打开注释
        // webpackConfig.plugins.push(new BundleAnalyzerPlugin());
        console.warn(env + "-url=" + process.env.REACT_APP_URL);

        return webpackConfig;
      },
      plugins: {
        add: [
          new WebpackBar({
            name: "webpack开始构建......",
            color: "#2d56f8",
            profile: true
          })
        ]
      }
    },
    devServer: {
      port: 3000,
      hot: true,
      client: {
        overlay: false
      },
      // 配置代理
      proxy: {
        "/": {
          target: "http://xxx.com",
          changeOrigin: true,
          pathRewrite: {
            "^/": ""
          }
        }
      }
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          // less loader option
          lessLoaderOptions: {
            lessOptions: {
              /*
                如果项目中有使用TDesign或AntDesign v4版本组件库需要自定义主题，可以在modifyVars中添加对应less变量
                antd v5版本使用css-in-js方式去定制主题，已经没有less变量了
            */
              modifyVars: {
                "@primary-color": "#2378ff"
              },
              javascriptEnabled: true
            }
          },
          modifyLessRule(lessRule) {
            lessRule.exclude = lessModuleRegex;
            return lessRule;
          },
          modifyLessModuleRule(lessModuleRule) {
            // configure the file suffix
            lessModuleRule.test = lessModuleRegex;

            // configure the generated local ident name
            const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
            cssLoader.options.modules = {
              /* 
                注意这里的命名规则：
                - CRA脚手架创建的项目是可以直接使用css modules的，css文件的命名规则默认是[local]_[hash:base64:5]
                - 这里使用css modules的命名规则
            */

              localIdentName: "[local]_[hash:base64:5]"
            };

            return lessModuleRule;
          }
        }
      }
    ],
    bable: {
      plugins: [
        // 生产环境只留console.error\warn,去除console.log
        [
          "babel-plugin-transform-remove-console",
          { exclude: isProduction ? ["error", "warn"] : ["error", "warn", "log"] }
        ]
      ]
    }
  };
};
```
