# 树结构操作

<details>

<!-- 这个源码引用方式是 vitepress 提供的 -->

```js
const tree = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            disableCheckbox: true
          },
          {
            title: "leaf",
            key: "0-0-0-1"
          }
        ]
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [{ title: '<span style={{ color: "#1677ff" }}>sss</span>', key: "0-0-1-0" }]
      }
    ]
  },
  {
    title: "parent 2",
    key: "0-1",
    children: [
      {
        title: "parent 2-0",
        key: "0-1-0",
        disabled: true,
        children: [
          {
            title: "leaf",
            key: "0-1-1-0",
            disableCheckbox: true
          },
          {
            title: "leaf",
            key: "0-1-1-1"
          }
        ]
      },
      {
        title: "parent 2-1",
        key: "0-1-1",
        children: [{ title: '<span style={{ color: "#1677ff" }}>sss</span>', key: "0-0-1-0" }]
      }
    ]
  }
];
```

<summary>演示数据，点击查看</summary>

</details>

## findParentKey

查找所有上层节点的 id 或键值

#### 参数说明

| 参数        | 描述       | 类型   | 默认值   |
| ----------- | ---------- | ------ | -------- |
| array       | 树结构数组 | array  | 无       |
| value       | 查找键值   | any    | 无       |
| valueKey    | 查找键名   | string | id       |
| childrenKey | 子节点键名 | string | children |

#### 代码示例

```js
const res1 = findParentKey(tree, "0-0-0-0", "key");
console.log(res1); // ['0-0', '0-0-0']
```

## findNode

根据指定键值查找节点

#### 参数说明

| 参数        | 描述       | 类型   | 默认值   |
| ----------- | ---------- | ------ | -------- |
| array       | 树结构数组 | array  | 无       |
| value       | 查找键值   | any    | 无       |
| valueKey    | 查找键名   | string | id       |
| childrenKey | 子节点键名 | string | children |

#### 代码示例

```js
const res2 = findNode(tree, "0-1-0", "key");
console.log(res2); // {title: 'parent 2-0', key: '0-1-0', disabled: true, children: Array(2)}
```

## flatTree

扁平化树结构

#### 参数说明

| 参数        | 描述       | 类型   | 默认值   |
| ----------- | ---------- | ------ | -------- |
| array       | 树结构数组 | array  | 无       |
| childrenKey | 子节点键名 | string | children |

#### 代码示例

```js
const res3 = flatTree(tree, "children");
console.log("res3", res3); // [{…}, {…}, {…}, {…}, {…}, {…}]
```

::: tip
建议树结构子节点新增一个父节点 key 属性，方便查找
:::
