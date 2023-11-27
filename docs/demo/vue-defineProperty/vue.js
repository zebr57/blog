/**
 * @description: 观察对象属性值变化
 * @param {*} data 观察对象
 * @return {*}
 */
function observe(data) {
  for (const key in data) {
    let internalValue = data[key];
    let funcs = [];
    Object.defineProperty(data, key, {
      get() {
        const fn = window.__func;
        if (fn && !funcs.includes(fn)) {
          funcs.push(fn);
        }
        return internalValue;
      },
      set(value) {
        internalValue = value;
        for (let i = 0; i < funcs.length; i++) {
          const fn = funcs[i];
          fn();
        }
      },
    });
  }
}
/**
 * @description: 存储依赖、首次触发收集依赖、收集完置空
 * @param {*} fn 用到数据的函数
 */
function autoRun(fn) {
  window.__func = fn; // 存储依赖
  fn(); // 获取依赖并收集
  window.__func = null; // 收集完置空
}
