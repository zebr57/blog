# 数组操作

## dedupeArr

普通数组去重，返回一个新数组

#### 参数说明

| 参数 | 描述     | 类型  | 默认值 |
| ---- | -------- | ----- | ------ |
| arr  | 去重数组 | array | 无     |

#### 代码示例

```js
const arr = [1, 2, 1, 3, 4, 1, 2, [22, 23]];

const res = dedupeArr(arr); // [1, 2, 3, 4, [22, 23]]
```

## dedupeArrByKey

数组对象通过键名去重，重复对象取第一个

#### 参数说明

| 参数 | 描述     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| arr  | 去重对象 | array  | 无     |
| key  | 键名     | string | 无     |

#### 代码示例

```js
const arr = [{ name: "王花花", age: 18 }, { name: "黎明花" }, { name: "王花花", age: 20 }];

const res = dedupeArrByKey(arr, "name"); // [{ name: "王花花", age: 18 }, { name: "黎明花" }]
```

## flatArr

扁平化普通数组

推荐使用 Es6 API：arr.flat(Infinity) 参数 Infinity 表示完全展开，使用起来非常方便、快捷。

#### 代码示例

```js
const arr = [1, 2, 3, [22, 23, [5, 6]]];

const res = flatArr(arr); // [1, 2, 3, 22, 23, 5, 6]
```

## findIntersection

找出普通数组交集

#### 参数说明

| 参数    | 描述             | 类型  | 默认值 |
| ------- | ---------------- | ----- | ------ |
| arr     | 普通数组         | array | 无     |
| ...arrs | 剩余参数（数组） | array | 无     |

#### 代码示例

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 3, 6];
const arr3 = [2, 3, 7];

const res = findIntersection(arr1, arr2, arr3);
console.log(res); // [3]
```

## findPeak

找出普通数组峰值

#### 参数说明

| 参数 | 描述                 | 类型   | 默认值 |
| ---- | -------------------- | ------ | ------ |
| arr  | 普通数组             | array  | 无     |
| type | 峰值朝向 `up`/`down` | string | `up`   |

#### 代码示例

```js
const arr1 = [1, 27, 3, 4, 5, 12, 21, 34, 55, 16, 7, 123, 6, 73];

const res = findPeak(arr1);
console.log(res); // [27, 55, 123]
```

## findPeakByKey

通过指定键值找出数组对象的峰值

#### 参数说明

| 参数 | 描述                 | 类型   | 默认值 |
| ---- | -------------------- | ------ | ------ |
| arr  | 普通数组             | array  | 无     |
| key  | 键名                 | string | 无     |
| type | 峰值朝向 `up`/`down` | string | `up`   |

#### 代码示例

```js
const arr = [{ age: 12 }, { age: 23 }, { age: 20 }, { age: 28 }, { age: 17 }, { age: 25 }];

const res = findPeakByKey(arr, "age");
console.log(res); // [{ age: 23 }, { age: 28 }];
```

## chunkArr

数组分段

#### 参数说明

| 参数 | 描述     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| arr  | 目标数组 | array  | 无     |
| len  | 长度     | string | 无     |

#### 代码示例

```js
const arr = ["a", "b", "c", "d", "e", "f", "g"];

const res = chunkArr(arr, 2);
console.log(res); // [["a", "b"], ["c", "d"], ["e", "f"], ["g"]]
```

## sortArr

普通数组排序

#### 参数说明

| 参数    | 描述                 | 类型    | 默认值 |
| ------- | -------------------- | ------- | ------ |
| arr     | 目标数组             | array   | 无     |
| sortAsc | 是否升序（从小到大） | boolean | 无     |

#### 代码示例

```js
const arr = [1, 27, 3, 4, 5, 12, 21, 34, 55, 16, 7, 123, 6, 73];

const res = sortArr(arr);
console.log(res); // [27, 21, 12, 5, 4, 3, 1]
```

## sortArrByKey

数组对象通过指定键值排序

#### 参数说明

| 参数    | 描述                 | 类型    | 默认值 |
| ------- | -------------------- | ------- | ------ |
| arr     | 目标数组             | array   | 无     |
| key     | 键名                 | string  | 无     |
| sortAsc | 是否升序（从小到大） | boolean | 无     |

#### 代码示例

```js
const arr = [{ age: 12 }, { age: 23 }, { age: 20 }];

const res = sortArrByKey(arr, "age");
console.log(res); // [{ age: 23 }, { age: 20 }, { age: 12 }];
```

## arrMax | arrMin

普通数组中最大值和最小值

#### 代码示例

```js
const arr = [1, 27, 3, 4, 5, 12, 21];

console.log(arrMax(arr)); // 27
console.log(arrMin(arr)); // 1
```

## arrMaxByKey | arrMinByKey

数组对象中指定键值的最大值和最小值对象

#### 参数说明

| 参数    | 描述                 | 类型    | 默认值 |
| ------- | -------------------- | ------- | ------ |
| arr     | 目标数组             | array   | 无     |
| key     | 键名                 | string  | 无     |

#### 代码示例

```js
const arr = [{ age: 12 }, { age: 23 }, { age: 20 }];

console.log(arrMaxByKey(arr, "age")); // {age: 23}
console.log(arrMinByKey(arr, "age")); // {age: 12}
```
