# Vue 响应式

## What？

- 数据与函数关联
- 数据发生改变，自动调用依赖该数据的函数

## How？

- 依赖 defineProperty 做数据劫持
- 靠 get 收集依赖，保存有哪个函数在用
- 修改属性的值时，在 set 中调用与依赖该属性的每个函数

## Example

修改单一属性值，并执行更新方法

```js
let user = {
  name: "王花花",
};

function showName() {
  const doc = document.querySelector(".name");
  doc.textContent = `姓名： ${user.name}`;
}

// 定义一个内部属性，用于保存劫持的值
let internalValue = user.name;
let func = null;
Object.defineProperty(user, "name", {
  get() {
    console.log("获取 name");
    func = showName; // 收集： 相关函数
    return internalValue;
  },
  set(value) {
    console.log("设置 name 为", value);
    internalValue = value; // 派发： 执行函数
    func();
  },
});

user.name; // 获取 name
user.name = "李明花"; // 设置 name 为 李明花
```

以上代码实现单一指定的数据发生变化时调用执行相关函数，如果多个呢？
例如：

```js
let user = {
  name: "王花花",
  gender: "男", // [!code ++]
  age: "20", // [!code ++]
};

function showName() {
  const doc = document.querySelector(".name");
  doc.textContent = `姓名： ${user.name}`;
}

function showGender() {
  // [!code ++]
  const doc = document.querySelector(".gender"); // [!code ++]
  doc.textContent = `性别： ${user.gender}`; // [!code ++]
} // [!code ++]

function showAge() {
  // [!code ++]
  const doc = document.querySelector(".age"); // [!code ++]
  doc.textContent = `年龄： ${user.age}`; // [!code ++]
} // [!code ++]

showName();
```

把它定义为一个名为 observe 函数，接收一个对象，遍历对象对所有属性进行数据劫持，在 get 中收集对应依赖函数，在 set 中派发执行所有依赖函数。

::: code-group

```js [vue.js]
/**
 * @description: 观察对象属性值变化
 * @param {*} data 观察对象
 */
function observe(data) {
  for (const key in data) {
    let internalValue = data[key];
    let funcs = [];
    Object.defineProperty(data, key, {
      get() {
        // 收集依赖: 哪个函数在用我
        funcs.push(fn); // [!code ++] // fn未知！
        return internalValue;
      },
      set(value) {
        internalValue = value;
        // 派发更新，执行用我的函数
        for (let i = 0; i < funcs.length; i++) {
          // [!code ++]
          const fn = funcs[i]; // [!code ++]
          fn(); // [!code ++]
        } // [!code ++]
      },
    });
  }
}
```

```js [index.js]
// ...
// 这部分代码抽离为公共方法
let internalValue = user.name;
Object.defineProperty(user, "name", {
  get() {
    console.log("获取 name");
    func = showName; // 收集： 相关函数
    return internalValue;
  },
  set(value) {
    console.log("设置 name 为", value);
    internalValue = value;
    func(); // 派发：执行函数
  },
});
// ...
```

:::

fn 未知 - 谁在用我？

- 不要直接调用 showName
- 找个地方保存，比如 window.\_\_func = showName

::: code-group

```js [vue.js]
function observe(data) {
  for (const key in data) {
    let internalValue = data[key];
    let funcs = [];
    Object.defineProperty(data, key, {
      get() {
        // 收集依赖: 哪个函数在用我
        // funcs.push(fn); // [!code --] // fn未知！
        const fn = window.__func; // [!code ++]
        if (fn && !funcs.includes(fn)) { // [!code ++]
          funcs.push(fn);// [!code ++]
        }// [!code ++]
        return internalValue;
      },
      set(value) {...},
    });
  }
}

function autoRun(fn) { // [!code ++]
  window.__func = fn; // 存储依赖 // [!code ++]
  fn(); // 获取依赖并收集 // [!code ++]
  window.__func = null; // 收集完置空 // [!code ++]
}// [!code ++]
```

```js [index.js]
// ...
windows.__func = showName;
showName();
windows.__func = null;

windows.__func = showGender;
showGender();
windows.__func = null;

windows.__func = showAge;
showAge();
windows.__func = null;

// 封装一下 autoRun(fn)
autoRun(showName);
autoRun(showGender);
autoRun(showAge);
```

:::

## demo

::: code-group
<<< @/demo/vue-defineProperty/index.html
<<< @/demo/vue-defineProperty/index.js
<<< @/demo/vue-defineProperty/vue.js
:::

学习视频：https://ke.qq.com/course/5892689/13883885517138513#term_id=106109971
