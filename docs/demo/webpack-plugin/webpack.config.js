const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");
const MyPlugin = require('./plugins/index')

const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "管理输出"
    }),
    new MyPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    static: "./dist"
  }
};
