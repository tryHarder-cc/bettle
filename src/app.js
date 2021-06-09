/**
 * 1. 创建web服务器
 * 2. 应用各种中间件：模板引擎、表单解析、会话管理等等
 * 3. 分发路由
 */
const express = require('express');
const path = require("path");
const userRouter = require("./routes/userRouter");
const goodRouter = require("./routes/goodRouter")
const adminRouter = require("./routes/adminRouter");
const orderRouter = require("./routes/orderRouter");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const app = express();
//应用会话管理
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "1234"
}));

//托管静态资源
app.use(express.static(path.join('public')));
//更换模板引擎
app.engine(".html", require("express-art-template"));
app.set("view engine", "html");
//应用表单解析模块
app.use(bodyParser.urlencoded({ extended: false }));
//应用日志模块
app.use(logger("dev"));

//分发路由
//  "/" 自定义请求地址
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/good", goodRouter);
app.use("/order", orderRouter);

app.listen(3000, function() {
    console.log("server is running")
});