import{_ as e,c as a,o as t,a4 as o}from"./chunks/framework.CE7GJjuD.js";const _=JSON.parse('{"title":"Vue 性能优化解析","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/vue/performance.md","filePath":"frontend/vue/performance.md","lastUpdated":1714745250000}'),r={name:"frontend/vue/performance.md"},l=o('<h1 id="vue-性能优化解析" tabindex="-1">Vue 性能优化解析 <a class="header-anchor" href="#vue-性能优化解析" aria-label="Permalink to &quot;Vue 性能优化解析&quot;">​</a></h1><h2 id="优化方案" tabindex="-1">优化方案 <a class="header-anchor" href="#优化方案" aria-label="Permalink to &quot;优化方案&quot;">​</a></h2><p>减少更新次数、缩小更新范围。如何做到，先了解下更新最小单位。</p><p>vue 和 react 最小单位都是一个组件，更新优化策略区别在于 vue 有依赖收集，可以做到最小范围 diff 计算，而 react 是直接一整颗组件树重新 diff 计算。</p><h2 id="依赖收集" tabindex="-1">依赖收集 <a class="header-anchor" href="#依赖收集" aria-label="Permalink to &quot;依赖收集&quot;">​</a></h2><p>vue3 通过 proxy 中的 get 收集依赖，set 触发更新。流程如下：</p><p>页面第一次渲染时，根据使用到的值，触发 get 监听，记录这个页面用到该数据的地方（组件），加到该数据专属的 dep 对象（dep 对象保存依赖该数据的组件），每当我们修改值触发 set 就会这个 dep 对象中的组件更新一次。</p><h2 id="更新过程" tabindex="-1">更新过程 <a class="header-anchor" href="#更新过程" aria-label="Permalink to &quot;更新过程&quot;">​</a></h2><p>页面第一次渲染时，会创建一颗虚拟 DOM 树，根据虚拟 DOM 树创建真实 DOM；产生变化时，重新遍历虚拟 DOM 树，进行新旧虚拟 DOM 对比，确定哪里修改了，改了什么，用最简单的更新策略更新。</p><h2 id="更新策略" tabindex="-1">更新策略 <a class="header-anchor" href="#更新策略" aria-label="Permalink to &quot;更新策略&quot;">​</a></h2><p>通过对比某个虚拟 dom 的某一个 dom：</p><ol><li>key 值、标签类型改变：直接删除就 dom，重新使用 createElement() 创建新的 dom</li><li>写死的 dom：直接跳过对比</li><li>文字、属性改变：使用 innerHtml 和 setAttribute 修改原 dom</li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>观察 f12 控制台-Element，发生闪烁的地方，就是发生改变的地方。</p></div><h2 id="q-a" tabindex="-1">Q&amp;A <a class="header-anchor" href="#q-a" aria-label="Permalink to &quot;Q&amp;A&quot;">​</a></h2><ul><li>dep 对象的数据格式是什么?</li><li>有哪些更新策略？</li></ul>',15),i=[l];function d(n,c,s,p,h,u){return t(),a("div",null,i)}const f=e(r,[["render",d]]);export{_ as __pageData,f as default};
