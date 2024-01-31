# github 22 端口连接超时报错的解决办法

## 起因

最近发现 git push 不上去，提示连接超时，项目是用 ssh 拉取的

```shell
ssh: connect to host github.com port 22: Operation timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

## 原因

很可能是你的网络供应商（比如广电网）在出口防火墙上屏蔽了 22 端口，这意味着你将无法访问其他主机的 22 端口。

## 解决方案

github 提供了一种解决方案，允许你使用 443 端口进行 ssh 连接，因为 443 端口是访问 https 网站所必须的，大部分防火墙都会允许通过，但如果使用代理服务器可能产生干扰。

## 解决过程

先输入以下命令，看看是否有成功提示，如果成功，则可以使用这个解决方案。

```shell
ssh -T -p 443 git@ssh.github.com
```

打开 ~/.ssh 文件夹

```shell
 open ~/.ssh
```

打开 config 文件

```shell
vim config
```

输入以下内容

```shell
Host github.com
Hostname ssh.github.com
Port 443
```

按 esc 输入 :wq 退出保存文件

更多 vim 命令

```html
<p>
  :w 保存文件但不退出vi <br />
  :w file 将修改另外保存到file中，不退出vi <br />
  :w! 强制保存，不推出vi <br />
  :wq 保存文件并退出vi <br />
  :wq! 强制保存文件，并退出vi <br />
  :q 不保存文件，退出vi <br />
  :q! 不保存文件，强制退出vi <br />
  :e! 放弃所有修改，从上次保存文件开始再编辑命令历史
</p>
```

参考链接: 
- [stack overflow] [ssh: connect to host github.com port 22: Connection timed out](https://stackoverflow.com/questions/15589682/ssh-connect-to-host-github-com-port-22-connection-timed-out)
