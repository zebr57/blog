import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const multer = require("multer");

const router = express.Router();
const uploader = multer({
  dest: "upload/",
});

// get，回调也是算是中间件, 不用next，已有res出去结果了
router.get("/api1", (req, res) => {
  res.json({
    a: [1, 2, 3],
  });
});
// post，回调也是算是中间件
router.post("/api2", (req, res) => {
  console.log(4, req.body);
  res.json({
    b: 999,
  });
});

// 文件类型，借助第三方库 multer
router.post("/api3", uploader.single("file"), (req, res) => {
  console.log("api3", req.body);
});

export default router;
