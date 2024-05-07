import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.CE7GJjuD.js";const k=JSON.parse('{"title":"koa 实现 bff 中间层（demo）","description":"","frontmatter":{},"headers":[],"relativePath":"demo/koa-bff-demo/readme.md","filePath":"demo/koa-bff-demo/readme.md","lastUpdated":1704849434000}'),p={name:"demo/koa-bff-demo/readme.md"},i=e(`<h1 id="koa-实现-bff-中间层-demo" tabindex="-1">koa 实现 bff 中间层（demo） <a class="header-anchor" href="#koa-实现-bff-中间层-demo" aria-label="Permalink to &quot;koa 实现 bff 中间层（demo）&quot;">​</a></h1><h2 id="项目依赖" tabindex="-1">项目依赖 <a class="header-anchor" href="#项目依赖" aria-label="Permalink to &quot;项目依赖&quot;">​</a></h2><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;dependencies&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;ejs&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;^3.1.9&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;koa&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;^2.15.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;koa-router&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;^12.0.1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;koa-views&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;^8.1.0&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Now using node v18.14.2 (npm v9.5.0)</p><h2 id="项目目录" tabindex="-1">项目目录 <a class="header-anchor" href="#项目目录" aria-label="Permalink to &quot;项目目录&quot;">​</a></h2><p>介绍 demo</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>koa-bff-demo</span></span>
<span class="line"><span>├── router</span></span>
<span class="line"><span>│   └── index.js  // 路由模块</span></span>
<span class="line"><span>├── views</span></span>
<span class="line"><span>│   └── index.ejs  // ejs模版页面</span></span>
<span class="line"><span>├── app.js  // 启动文件</span></span>
<span class="line"><span>├── package-lock.json</span></span>
<span class="line"><span>├── package.json</span></span>
<span class="line"><span>└── readme.md</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>实战 demo</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>koa-bff-demo</span></span>
<span class="line"><span>├── models          // 处理请求对应页面的逻辑处理</span></span>
<span class="line"><span>│   ├── detail.js</span></span>
<span class="line"><span>│   ├── index.js</span></span>
<span class="line"><span>│   └── login.js</span></span>
<span class="line"><span>├── router  // 路由</span></span>
<span class="line"><span>│   └── index.js    // 首页、登录页、详情页</span></span>
<span class="line"><span>├── static          // 静态资源目录</span></span>
<span class="line"><span>│   └── index.css</span></span>
<span class="line"><span>├── views           // 页面模版</span></span>
<span class="line"><span>│   ├── detail.ejs</span></span>
<span class="line"><span>│   ├── index.ejs</span></span>
<span class="line"><span>│   ├── list.ejs</span></span>
<span class="line"><span>│   └── login.ejs</span></span>
<span class="line"><span>├── app.js          // 程序入口</span></span>
<span class="line"><span>├── package-lock.json</span></span>
<span class="line"><span>├── package.json</span></span>
<span class="line"><span>├── readme.md</span></span>
<span class="line"><span>└── server.js   // 模拟请求服务</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,9),l=[i];function r(t,c,o,d,b,h){return n(),a("div",null,l)}const m=s(p,[["render",r]]);export{k as __pageData,m as default};
