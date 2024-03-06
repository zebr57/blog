# 本地存储

## isEmptyStorage

localStorage 和 sessionStorage 根据键名判断是否为空

#### 参数说明

| 参数 | 描述              | 类型   | 默认值  |
| ---- | ----------------- | ------ | ------- |
| name | 键名              | string | 无      |
| type | `local`/`session` | array  | `local` |

#### 代码示例

```js
localStorage.setItem("username", "王花花");
const res1 = isEmptyStorage("username");
const res2 = isEmptyStorage("username", "session");
console.log(res1); // false
console.log(res2); // true
```

## setCookie

设置 cookie

#### 参数说明

| 参数  | 描述         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| name  | 键名         | string | 无     |
| value | 键值         | string | 无     |
| days  | 有效期（天） | array  | 无     |

#### 代码示例

```js
setCookie("token", "admin-123", 1);
```

## getCookie

根据键名获取 cookie 键值

#### 参数说明

| 参数 | 描述 | 类型   | 默认值 |
| ---- | ---- | ------ | ------ |
| name | 键名 | string | 无     |

#### 代码示例

```js
setCookie("token", "admin-123", 1);
const token = getCookie("token");
console.log(token); // admin-123
```

## removeCookie

根据 键名 移除 cookie 键值

#### 参数说明

| 参数 | 描述 | 类型   | 默认值 |
| ---- | ---- | ------ | ------ |
| name | 键名 | string | 无     |

#### 代码示例

```js
removeCookie("token");
const token = getCookie("token");
console.log(token); // null
```

## isEmptyCookie

根据键名判断 cookie 键值是否为空，该方法为调用 getCookie 实现

#### 参数说明

| 参数 | 描述 | 类型   | 默认值 |
| ---- | ---- | ------ | ------ |
| name | 键名 | string | 无     |

#### 代码示例

```js
removeCookie("token");
isEmptyCookie("token"); // true
```

::: tip
cookie 的异步操作可使用 `cookieStore`，注意：该 API 兼容性较差，[MDN CookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore)
:::
