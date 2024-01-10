const Koa = require("koa");
const router = require("./router/index");
const static = require("koa-static");
const views = require("koa-views");

const app = new Koa();

// 自动解析views目录下ejs文件，
app.use(
  views("./views", {
    extension: "ejs",
  })
);

// 静态资源
app.use(static("./static"));

// 验证
app.use(async (ctx, next) => {
  if (ctx.url != "/login") {
    if (!ctx.cookies.get("username")) {
      ctx.redirect("/login");
    } else {
      return next();
    }
  } else {
    return next();
  }
});

app.use(router.routes());
app.listen(3000);
