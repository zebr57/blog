## &#x20;检查是否已经安装nodejs，需要先将其卸载

## 下载nvm&#x20;

*   &#x20;地址：<https://github.com/coreybutler/nvm-windows/releases>
*   下载 exe
*   打开安装，一直下一步即可
*   默认安装至C盘，这样不用配置环境变量

## 检查是否已安装

```sh
nvm -v
```

## 下载node

```sh
nvm install 16
nvm install 18
```

## 检查已安装的node

```sh
nvm ls
```

## 切换使用的node版本

```sh
nvm use 18
```

## 查看现环境 node 版本

```sh
node -v
```

