export const routeData = {
  1: [
    {
      path: "/page1",
      component: "Page1",
    },
    {
      path: "/page2",
      component: "Page2",
      children: [
        {
          path: "page2Son",
          component: "Page2Son",
        },
        {
          path: "page2Son2",
          component: "Page2Son2",
        },
      ],
    },
  ],
  2: [
    {
      path: "/page2",
      component: "Page2",
      children: [
        {
          path: "page2Son",
          component: "Page2Son",
        },
        {
          path: "page2Son2",
          component: "Page2Son2",
        },
      ],
    },
    {
      path: "/page3",
      component: "Page3",
    },
  ],
};
// 模拟登录接口请求
export function loginAuth(data) {
  console.log('loginauth');
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const { username, password } = data;
      if (username == "admin1" && password == "123456") {
        resolve({
          code: 0,
          id: 1,
          msg: "登录成功",
        });
      } else if (username == "admin2" && password == "123456") {
        resolve({
          code: 0,
          id: 2,
          msg: "登录成功",
        });
      } else {
        resolve({
          code: 2,
          msg: "用户名或密码错误",
        });
      }
    }, 1000);
  });
}
// 模拟获取用户信息
export function getUserInfo(id) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (id) {
        resolve({
          code: 0,
          data: {
            id,
            name: "admin" + id,
            routes: routeData[id],
            msg: "请求成功",
          },
        });
      } else {
        resolve({
          code: 1,
          data: null,
          msg: "请求成功",
        });
      }
    }, 1000);
  });
}
