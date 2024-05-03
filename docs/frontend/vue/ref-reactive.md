# ref 和 reactive

## 使用上区别

两者都能定义响应式数据，在什么情况下用哪种？

一般来说 `ref` 定义基本类型数据，`reactive` 定义引用类型数据

**而事实是根据你赋值方式来决定的，ref 也可以定义 引用类型 ，只是需要通过.value 方式修改，并且能够直接赋值，reactive 只能修改属性值，否则会失去响应式**

## ref 定义响应式数据

如果 ref 接收的初始值时，第一步创建 RefImpl 对象，然后判断数据类型，如果是 Array 或 Object，它会调用 reactive() 进行转化 proxy **对象**。并保存到 \_value 属性，ref 通过 es6 class 写法，定义了 get 和 set 方法

## reactive 定义数组和对象

reactive只能定义数组和对象，设置Proxy的get和set，get：收集依赖，set：触发更新

## Q&A

Q：为什么 ref 需要通过.value 方式修改响应式数据？<br/>
A：ref 是通过 new refImpl 类创建的对象，由这个对象中的 value 和对应的 set，get 方法来触发更新的，\_value 保存转化的响应式数据，我们通过 .value 触发 get 方法返回 \_value ，如果是直接赋值就等同于赋一个普通的值。

Q：为什么 ref 定义引用类型的响应式数据？<br/>
A：createRef 使先判断数据类型，如果是引用类型的话，他会调用 reactive() 将数据通过 proxy 进行包装保存到\_value，也是通过.value 触发 get 去获取。

Q：使用哪种方式定义引用类型响应式数据 <br/>
A：取决你的修改响应式数据的方式，直接修改/通过 .value 修改
