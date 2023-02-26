#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vitepress/dist

git init 
git add -A 
git commit -m "gitee actions 自动部署"
git push -f https://gitee.com/shen-linqiang/blog-vitepress.git master

cd -
rm-rf docs/.vitepress/dist