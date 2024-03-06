# 字符串操作

## padLeft

个位数补 0, 传入多位数、无法计算的类型则返回原参数

```js
padLeft(1); // '01'
padLeft("1"); // '01'
padLeft("hello"); // 'hello'
```

## htmlEscape

html 转义, 可用于在 vue 中 v-html 完整显示 html 标签

```js
const div = `<div>hello</div>`;
const divStr = htmlEscape(div);
console.log(divStr); // &lt;div&gt;hello&lt;/div&gt;
```

## textHighlight

vue 模版中的文本高亮

```js
const text = "utils 支持多种下载方式。";
const style = `fontWeight: bold ;color: #333;`;
const res = textHighlight(text, "支持", style); // 'utils <span  class="highlight" style="">支持</span>多种下载方式。';
```
