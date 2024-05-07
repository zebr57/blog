import{_ as e,c as a,o as l,a4 as t}from"./chunks/framework.CE7GJjuD.js";const f=JSON.parse('{"title":"vue2 和 vue3 的区别","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/vue/version-diff.md","filePath":"frontend/vue/version-diff.md","lastUpdated":1714745250000}'),i={name:"frontend/vue/version-diff.md"},o=t('<h1 id="vue2-和-vue3-的区别" tabindex="-1">vue2 和 vue3 的区别 <a class="header-anchor" href="#vue2-和-vue3-的区别" aria-label="Permalink to &quot;vue2 和 vue3 的区别&quot;">​</a></h1><h2 id="使用上" tabindex="-1">使用上 <a class="header-anchor" href="#使用上" aria-label="Permalink to &quot;使用上&quot;">​</a></h2><ul><li><p>选项式 API 替代组合式 API，逻辑更加聚合</p></li><li><p>一些使用细节</p></li></ul><ol><li>没有 this</li><li>没有 create 生命周期，用 setup 取代，卸载改为 unmount</li><li>vue3 中 v-if 优先级高于 v-for</li><li>根实例的创建从 new app 变成了 createApp 方法</li><li>一些全局注册，比如 mixin，注册全局组件，use 改成了用 app 实例调用，而不是 vue 类调用</li><li>新增了传送门 teleport 组件</li><li>template 模版不需要根节点，支持多节点</li></ol><h2 id="响应式" tabindex="-1">响应式 <a class="header-anchor" href="#响应式" aria-label="Permalink to &quot;响应式&quot;">​</a></h2><p>改成了用 proxy，解决了数组无法通过下标修改，无法监听到对象属性的新增和删除的问题，也提升了响应式的效率。</p><p>ref 还是使用 refImpl 类创建对象，跟 defineProperty 相似，定义了 value 属性的 get、set 方法去获取、修改值。</p><h2 id="体积" tabindex="-1">体积 <a class="header-anchor" href="#体积" aria-label="Permalink to &quot;体积&quot;">​</a></h2><p>vue3 是选项式 API，支持按需引入，可以更好 tree-shaking</p><h2 id="性能" tabindex="-1">性能 <a class="header-anchor" href="#性能" aria-label="Permalink to &quot;性能&quot;">​</a></h2><p>性能优化，增加了静态节点标记。会标记静态节点，不对静态节点进行比对。从而增加效率</p><p>像文本内容为变量会标记为 1，属性为动态会标记为 2，如果静态则不标记跳过比对</p><h2 id="一些改进" tabindex="-1">一些改进 <a class="header-anchor" href="#一些改进" aria-label="Permalink to &quot;一些改进&quot;">​</a></h2><ol><li><p>vue3 不推荐使用 mixin 进行复用逻辑提取，而是推荐写成 hook</p></li><li><p>v-model 应用于组件时，监听的事件和传递的值改变</p></li></ol><ul><li>vue2: value 监听 change/input 事件</li><li>vue3: modelValue 监听 update:modelValue 事件</li></ul><p><a href="https://cn.vuejs.org/guide/components/v-model.html#component-v-model" target="_blank" rel="noreferrer">v-model</a></p><ol start="3"><li>ts 更好地配合</li></ol>',17),r=[o];function n(u,p,d,s,h,c){return l(),a("div",null,r)}const m=e(i,[["render",n]]);export{f as __pageData,m as default};
