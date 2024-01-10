const request = require("request");
module.exports = async function (ctx, next) {
  const id = ctx.request.params.id;
  const res = await new Promise((resolve, reject) => {
    request.get("http://localhost:4000/detail?id=" + id, (err, res, body) => {
      resolve(body);
      console.log(body, "body");
    });
  });
  await ctx.render("detail", JSON.parse(res));
};
