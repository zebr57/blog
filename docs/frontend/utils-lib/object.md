# 对象操作

::: tip
fnType 字段说明：由于对象操作直接修改会导致原来数据发生改变，默认设为 `pure`表示纯函数，没有副作用，它将返回一个新的对象，即不会修改到原来的数据。
:::

## clearEmptyParams

清除值为'' 或 null 的字段，常用于后台接口传参，清除无效字段

#### 参数说明

| 参数          | 描述                        | 类型    | 默认值 |
| ------------- | --------------------------- | ------- | ------ |
| params        | 对象                        | object  | 无     |
| fnType        | 纯函数(pure)/虚函数(effect) | string  | pure   |
| isIncludeNull | 是否清除 null               | boolean | true   |

#### 代码示例

```js
const obj = { name: "", age: 18, gender: 0 };

const res = clearEmptyParams(obj);
console.log(res, obj); // {"age": 18, "gender": 0} {"name: "", age": 18, "gender": 0}

const res = clearEmptyParams(obj, "effect");
console.log(res, obj); // {"age": 18, "gender": 0} {age": 18, "gender": 0}
```

## setDefaultParams

给对象设置默认值，常用于接收后台接口数据并做回显

#### 参数说明

| 参数   | 描述                        | 类型   | 默认值 |
| ------ | --------------------------- | ------ | ------ |
| params | 设置对象                    | object | 无     |
| data   | 获取对象                    | object | 无     |
| fnType | 纯函数(pure)/虚函数(effect) | string | pure   |

#### 代码示例

```js
const obj = { name: "", age: 18, gender: 0 };
const defaultObj = { name: "王花花", age: 20, like: "code" };

const res = setDefaultParams(obj, defaultObj);
console.log(res); // {name: '王花花', age: 20, gender: 0}
```

## replaceKeys

替换对象键名，传入需要更换的对象和一个字段对应的 map，返回替换结果

#### 参数说明

| 参数    | 描述                         | 类型   | 默认值 |
| ------- | ---------------------------- | ------ | ------ |
| params  | 设置对象                     | object | 无     |
| keysMap | 替换键名：`{oldKey: newKey}` | object | {}     |
| fnType  | `pure`/`effect`              | string | pure   |

#### 代码示例

```js
const obj = { name: "", age: 18, gender: 0 };

const res = replaceKeys(obj, { name: "userName", gender: "sex" });
console.log(res); // {age: 18, userName: '', sex: 0}
```

## jsonClone

通过 JSON.parse(JSON.stringify())方式克隆

```js
const obj = { name: "", age: 18, gender: 0 };
jsonClone(obj);
```

## deepClone

递归深拷贝

#### 参数说明

| 参数   | 描述              | 类型   | 默认值 |
| ------ | ----------------- | ------ | ------ |
| target | 克隆目标对象      | object | 无     |
| type   | 类型：`obj`/`arr` | string | `obj`  |

#### 代码示例

```js
const res = deepClone(obj);

console.log(obj, res, obj == res); // {name: '', age: 18, gender: 0} {name: '', age: 18, gender: 0} false
```

## mergeParams

合并对象

#### 参数说明

| 参数 | 描述   | 类型   | 默认值 |
| ---- | ------ | ------ | ------ |
| tar1 | 对象 1 | object | 无     |
| tar2 | 对象 2 | object | 无     |

#### 代码示例

```js
const tar1 = { name: "王花花", age: 18, gender: 0 };
const tar2 = { name: "黎明花", age: 20, like: "code" };

const res = mergeParams(tar1, tar2); // {name: '黎明花', age: 20, gender: 0, like: 'code'}
```

## pickParams

选出指定字段值，并返回一个新对象

#### 参数说明

| 参数   | 描述         | 类型   | 默认值 |
| ------ | ------------ | ------ | ------ |
| params | 克隆目标对象 | object | 无     |
| keyArr | 键名集合     | array  | 无     |

#### 代码示例

```js
const obj = { name: "王花花", age: 18, gender: 0 };
const res = pickParams(obj, ["name", "age"]); // {name: '王花花', age: 18}
```

## 
