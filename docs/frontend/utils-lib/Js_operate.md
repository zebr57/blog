# JavaScript 操作集合

## 树形结构

- 根据节点属性找出所有上级集合

```js

```

- 根据节点属性找出所有子节点

```js

```

## 对象集合

- 清除值为'' 或 null 的字段

```js
/**
 * 清除值为'' 或 null的字段
 * @param {object} params 参数对象.
 * @param {string} fnType pure（纯）| effect（虚），默认pure.
 * @param {boolean} isIncludeNull  是否清除null，默认true.
 * @return {object} params 处理好的参数对象
 */
function clearEmptyParams(params, fnType = "pure", isIncludeNull = true) {
  if (!(params instanceof Object)) {
    throw Error("传入参数必须是Object");
  }
  if (Object.keys(params).length === 0) {
    throw Error("传入参数对象不能为空");
  }

  if (fnType == "pure") params = JSON.parse(JSON.stringify(params));
  const paramsKeys = Object.keys(params);
  for (let i = 0; i < paramsKeys.length; i++) {
    let key = paramsKeys[i];
    let value = params[key];
    console.log(key, value);
    if (
      (!value && typeof value == "string") ||
      (value == null && isIncludeNull)
    ) {
      delete params[key];
    }
  }
  return params;
  // console.log(params)
}
```

- 设置需要的字段值

```js
/**
 * 设置需要的字段值
 * @param {object} params 设置对象.
 * @param {object} data 获取对象.
 * @param {string} fnType pure（纯）| effect（虚），默认pure.
 * @return {object} params 处理好的参数对象
 */
function setDefaultParams(params, data, fnType = "pure") {
  if (!(data instanceof Object)) {
    throw Error("传入参数必须是Object");
  }
  if (Object.keys(data).length === 0) {
    throw Error("传入参数对象不能为空");
  }

  if (fnType == "pure") params = JSON.parse(JSON.stringify(params));
  const paramsKeys = Object.keys(params);
  const dataKeys = Object.keys(data);
  for (let i = 0; i < dataKeys.length; i++) {
    let key = dataKeys[i];
    let value = data[key];
    if (paramsKeys.includes(key)) {
      if (value == null) {
        // todo: 给为空时候的值 or 不处理就按原来的
      } else {
        params[key] = value; // 赋值∂
      }
    }
  }
  console.log("setDefaultParams", params);
  return params;
}

formData = setDefaultParams(formData, formData2);
console.log(formData);
```

- 替换键名
```js
/**
 * 传入需要更换的对象和一个字段对应的 map，返回替换结果
 * @param {object} params 替换对象.
 * @param {object} keysMap 键名映射.
 * @param {string} fnType pure（纯）| effect（虚），默认pure.
 * @return {object} params 处理好的参数对象
 */
function replaceKeys(params, keysMap = {}, fnType = "pure") {
  if (!(params instanceof Object)) {
    throw Error("传入参数必须是Object");
  }
  if (Object.keys(params).length === 0) {
    throw Error("传入参数对象不能为空");
  }

  if (fnType == "pure") params = JSON.parse(JSON.stringify(params));
  const paramsKeys = Object.keys(params);
  for (let i = 0; i < paramsKeys.length; i++) {
    let key = paramsKeys[i];
    let value = params[key];
    console.log(key, value);
    if (keysMap[key]) {
      params[keysMap[key]] = value;
      delete params[key];
    }
  }
  return params;
}

// let formData = { name: '王花花' }
// replaceKeys(formData, {name: 'nickName'});
// => { nickName: '王花花' }
```
<details>
  <summary>展开查看</summary>
  <pre><code> 
    export function dedupeArr(arr) {
      return Array.from(new Set(arr))
    }
  </code></pre>
</details>
