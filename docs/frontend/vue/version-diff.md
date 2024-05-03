# vue2 和 vue3 的区别

## 使用上

- 选项式 API 替代组合式 API，逻辑更加聚合

- 一些使用细节

1. 没有 this
2. 没有 create 生命周期，用 setup 取代，卸载改为 unmount
3. vue3 中 v-if 优先级高于 v-for
4. 根实例的创建从 new app 变成了 createApp 方法
5. 一些全局注册，比如 mixin，注册全局组件，use 改成了用 app 实例调用，而不是 vue 类调用
6. 新增了传送门 teleport 组件
7. template 模版不需要根节点，支持多节点

## 响应式

改成了用 proxy，解决了数组无法通过下标修改，无法监听到对象属性的新增和删除的问题，也提升了响应式的效率。

ref 还是使用 refImpl 类创建对象，跟 defineProperty 相似，定义了 value 属性的 get、set 方法去获取、修改值。

## 体积

vue3 是选项式 API，支持按需引入，可以更好 tree-shaking

## 性能

性能优化，增加了静态节点标记。会标记静态节点，不对静态节点进行比对。从而增加效率

像文本内容为变量会标记为 1，属性为动态会标记为 2，如果静态则不标记跳过比对

## 一些改进

1. vue3 不推荐使用 mixin 进行复用逻辑提取，而是推荐写成 hook

2. v-model 应用于组件时，监听的事件和传递的值改变

- vue2: value 监听 change/input 事件
- vue3: modelValue 监听 update:modelValue 事件

[v-model](https://cn.vuejs.org/guide/components/v-model.html#component-v-model)

3. ts 更好地配合
