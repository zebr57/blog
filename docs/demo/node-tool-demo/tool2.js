/*
 * @Author: 沈林强
 * @Description: 根据页面路径查找对应组件文件
 */
import cp from "copy-paste"

let routeArr = []

let url = process.argv[2]
url = url.split('/#')[1]

routeArr.forEach((item) => {
  if(item.path == url) {
    console.log(item.component);
    // 自动拷贝
    cp.copy(item.component)
  }
})
