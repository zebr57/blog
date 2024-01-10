const request = require("request");
module.exports = async function (ctx, next) {
  const res = await new Promise((resolve, reject) => {
    request.get("http://localhost:4000/list", (err, res, body) => {
      resolve(body);
      console.log(body,'body');
    });
  });
  
  await ctx.render("list", JSON.parse(res));
};
