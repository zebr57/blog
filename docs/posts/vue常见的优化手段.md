# Vue 常见的优化手段

不要过早优化
因地制宜，见招拆招

## 使用 key

对于循环生成的列表，应给每个列表项一个稳定且唯一的 key，这有利于在列表变动时，尽量少的删除、新增、更新元素。

## 使用冻结的对象

冻结的对象不会被响应化，适用于接受返回只展示、不需要修改的数据，将数据Object.freeze(obj)复制给定义的变量即可。验证 Object.isFrozen(obj) 

::: tip
定义非响应式数据，可以在data外层定义， const obj = {}，但也就不能再发生更新了
:::

## 使用函数式组件

- [Vue3官方文档](https://cn.vuejs.org/guide/extras/render-function.html#functional-components)
- Vue 2

像一些弹窗提示组件比较简单，没有任何状态管理，也没有任何监听传递它的状态，也没有生命周期，实际上，只是接收props的函数，再这样的场景下，我们可以将这样的组件标记为`functional`，意味着它无状态（没有响应式数据），也没有实例(没有`this`上下文)。一个函数式组件就像这样

```js
// Vue 2
Vue.component('my-component', {
  functional: true,
  // Props 可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例，提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```

- 添加配置 functional：true
- 无状态组件
- vue 不会为它创建实例（vueComponent）
- 即没有this，通过第二个参数 context 作为上下文

## 使用计算属性

如果模版中某个数据会使用多次，并且该数据是通过计算得到的，使用计算属性以缓存他们；
收集计算属性方法中使用到的响应式数据，保存他们的依赖，在他们发生变化时，重新调用。

## 非实时绑定的表单项

- 当使用`v-model`绑定一个表单项时，当用户改变表单项的状态时，也会随之改变数据，从而导致`vue`发生重渲染（rerender），这会带来一些性能的开销。
- 我们可以使用`lazy`修饰符或者不使用`v-model`的方式来解决问题，但要注意，这可能会导致某一段时间内数据与表单的数据不一致。
- `v-model`监听的是`@input`事件，`v-model.lazy`监听的是`@change`事件

## 保持对象应用稳定

在大部分情况下，`vue`触发`rerender`的时机是其依赖的数据发生变化
若数据没有发生变化，哪怕给数据重新赋值了，`vue`也是不会做出任何处理的
下面是`vue`判断数据有没有发生变化的源码

```js
function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
  } else {
    return x === x || y === y;
  }
}
```

因此，如果需要，只要能保证组件的依赖数据不发生变化，组件就不会重新渲染，
对于原始数据类型，保持其值不变即可
对于复杂数据类型，保持其引用不变即可

## 使用 v-show 代替 v-if

使用 v-show 可避免频繁 dom 元素的增删改，有利于保持 dom 树稳定，对于包含大量 dom 元素的节点，这一点很重要。

## 保持延迟装载（defer）

JS 传输完成后，浏览器开始执行 JS 构造页面<br>

但可能一开始要渲染的组件太多，不仅 JS 执行的时间很长，而且执行完成后浏览器要渲染的元素过多，从而导致页面白屏<br>

一个可行的办法就是**延迟装载组件**，让组件按照指定的先后循序一次一个一个渲染出来

::: tip
延迟装载是一个思路，本质上是利用 requestAnimationFrame 事件分批渲染内容，它的具体实现多种多样，React Fiber 就是利用浏览器渲染帧空余时间去处理。
:::

## 使用 keep-alive

## 长列表优化

## 打包体积优化
