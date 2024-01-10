const KoaRouter = require("koa-router");
const list = require("../models/list.js");
const login = require("../models/login.js");
const detail = require("../models/detail.js");

const router = new KoaRouter();

/* ===================================== demo ===================================== */
router.get("/list", async (ctx, next) => {
  await list(ctx, next);
});
router.get("/login", async (ctx, next) => {
  await login(ctx, next);
});
router.get("/detail/:id", async (ctx, next) => {
  await detail(ctx, next);
});

module.exports = router;
