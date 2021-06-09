//用户路由
const express = require("express");
const userCtl = require("../control/userCtl");

const userRouter = express.Router();

//首页
//
userRouter.get("/", userCtl.showGoodLists);


//登录页面
userRouter.get("/login", (req, res) => {
    res.render("login", {});
});

//注册页面
userRouter.get("/regist", (req, res) => {
    res.render("regist", {});
});

//商品详情信息
userRouter.get("/goodsDetails", userCtl.doShowDetailsById);
userRouter.get("/salesDetails", userCtl.doShowsaleDetailsById);
// 显示购物车

userRouter.get("/ShoppingCar", userCtl.doShopCart);

//用户登录
userRouter.post("/doLogin", userCtl.doLogin);

//用户注册
userRouter.post("/doRegist", userCtl.doRegist);

//购物车增加
userRouter.get("/doAdd", userCtl.cartCoun);

//结算
userRouter.get("/doClearCart", userCtl.doClearCart);


//立即购买
userRouter.get("/buyNow", userCtl.doBuyNow);
userRouter.get("/buySale", userCtl.doBuySale);


//用户反馈
userRouter.post("/doFeedback", userCtl.doFeedback);

//返回
userRouter.get("/docomeback", (req, res) => {
    res.render("/", {});
});

//退出登录
userRouter.get("/logout", function(req, res, next) {
    req.session.YzmMessageIsAdmin = false;
    req.session.YzmMessageUsername = "";
    res.send("<script>alert('退出成功');location.href='/login'</script>");
});


module.exports = userRouter;