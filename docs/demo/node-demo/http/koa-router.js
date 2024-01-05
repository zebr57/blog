import koaRouter from "koa-router";

const router = new koaRouter();

router.get("/api1", (ctx, next) => {
  ctx.body = {
    a: [1, 2, 3],
  };
});

router.post("/api2", (ctx, next) => {
  ctx.body = {
    b: 999,
  };
});

export default router;
