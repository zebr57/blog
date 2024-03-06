# 格式转化

## arrayToObject

统计数组对象中每一项的属性值，并生成对象，该对象为每个属性在原数组对象中所有的值

#### 参数说明

| 参数 | 描述     | 类型  | 默认值 |
| ---- | -------- | ----- | ------ |
| arr  | 目标数组 | array | 无     |

#### 代码示例

```js
const arr = [
  { a: 14, b: 22 },
  { a: 21, b: 31 }
];
const res = arrayToObject(arr); // {a: [14, 21], b: [22, 31]}
```

## objectToArray

以对象属性值的数组索引关系，转换成数组对象

#### 参数说明

| 参数 | 描述     | 类型                  | 默认值 |
| ---- | -------- | --------------------- | ------ |
| obj  | 目标对象 | object：`{a: [],b[]}` | 无     |

#### 代码示例

```js
const obj = { a: [14, 21], b: [22, 31] };
const res = objectToArray(obj); // [{ a: 14, b: 22 },{ a: 21, b: 31 }];
```

## jsonToFormData

json 对象转 FormData

#### 参数说明

| 参数        | 描述            | 类型   | 默认值 |
| ----------- | --------------- | ------ | ------ |
| obj         | 目标对象        | object | 无     |
| oldFormData | 已有的 formData | 无     |

#### 代码示例

```js
const f = new File(["text1", "text2"], "text.txt", { type: "text/plain" });
const jsonObj = {
  name: "王花花",
  file: f
};
const res = jsonToFormData(jsonObj);
console.log(res); // FormData {}
```

## formDataToJson

formData 转成 json 对象

#### 参数说明

| 参数     | 描述     | 类型     | 默认值 |
| -------- | -------- | -------- | ------ |
| formData | 表单数据 | FormData | 无     |

#### 代码示例

```js
// ...
const res2 = formDataToJson(res);
console.log(res2); // {name: '王花花', file: File}
```

## consoleFormData

控制台打印 FormData 属性值

```js
consoleFormData(res);
```
