const KoaRouter = require("koa-router");
// const ejs = require("ejs");
// const fs = require("fs");
const router = new KoaRouter();

router.get("/index", async (ctx, next) => {
  /** 方式一
    const _template = fs.readFileSync("./views/index.ejs", 'utf-8');
    const _html = await ejs.render(_template, {
      word: "hello ejs.",
    });
    ctx.body = _html;
  */
  /** 方式二
    ejs.renderFile(
      "./views/index.ejs",
      {
        word: "hello ejs.",
      },
      (err, _html) => {
        ctx.body = _html;
      }
    );
  */
  // 方式三 koa-views 中间件
  await ctx.render("index", {
    word: "hello ejs.",
  });
});

module.exports = router;
