# 类型判断

## typeOf

根据 Object.prototype.toString 返回数据类型

```js
typeOf("hello"); // string
```

## isObject

是否为对象

```js
const obj = { name: "王花花" };

isObject(obj); // true
```

## isArray

是否为数组

```js
const arr = ["1", "2", "3"];

isObject(arr); // true
```

## isString

是否为字符串

```js
isString("hello"); // true
```

## isNumber

是否为数字

```js
isNumber(1); // true
```

## isJson

是否为 JSON

```js
const jsonData = "{ name: '王花花' }";

isJson(jsonData); // true
```

## isEmptyObject

是否为空对象

```js
const obj = {};

isEmptyObject(obj); // true
```

## isEmptyArray

是否为空数组

```js
const arr = [];

isEmptyArray(arr); // true
```
