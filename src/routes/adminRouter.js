//管理员路由

const express = require("express");
const adminCtl = require("../control/adminCtl");
const userCtl = require("../control/userCtl");
var adminRouter = express.Router();


adminRouter.get("/ShoppingCar", userCtl.doShopCart);

adminRouter.get("/admin", adminCtl.showGoods);

adminRouter.get("/userlist", adminCtl.showUserList);
adminRouter.get("/del", adminCtl.doDelUser);

adminRouter.get("/selectUser", adminCtl.selectUser);
adminRouter.get("/custAdd", (req, res) => {
    res.render("admin/CustAdd", {});
});



adminRouter.get("/CustList", adminCtl.showUserList);
adminRouter.get("/goodlist", adminCtl.showGoodList);

adminRouter.get("/orderlist", adminCtl.showOrder);



adminRouter.post("/doAdduser", adminCtl.doAdduser);
adminRouter.get("/edit", adminCtl.showEdit);
adminRouter.post("/doEdit", adminCtl.doEdituser);

adminRouter.get("/feedlist", adminCtl.showFeedList);

adminRouter.get("/DelFeed", adminCtl.doDelFeedlist)

module.exports = adminRouter;