const express = require("express");
const goodCtl = require("../control/goodCtl");
const multer = require("multer");

const goodRouter = express.Router();

//创建存储引擎对象，定制文件上传的路径及名字
var storage = multer.diskStorage({
    //destination定义文件上传的路径
    destination: function(req, file, callback) {
        callback(null, "public/img");
    },
    //filename定义文件的名字
    filename: function(req, file, callback) {
        var fname = file.originalname.split(".")[0];
        var ext = "." + file.originalname.split(".")[1];
        //console.log(file.originalname.split("."));
        callback(null, fname + "_" + Date.now() + ext);
    }
});

//设置文件上传解析对象，使用磁盘存储引擎定制文件上传信息
var upload = multer({
    storage: storage
});

//添加购物车
goodRouter.get("/AddGoods", goodCtl.doAddCart);
goodRouter.get("/saleAddGood", goodCtl.saleAddCart);

goodRouter.get("/goodlist", goodCtl.showGoodList);

goodRouter.get("/goodadd", (req, res) => {
    res.render("admin/goodAdd", {});
});

goodRouter.post("/doAddGood", upload.fields([{ name: "picone" }, { name: "pictwo" }, { name: "picthree" }, { name: "picfour" }]), goodCtl.doAddGood);

goodRouter.get("/del", goodCtl.doDelGood);

//购物车删除
goodRouter.get("/doDelete", goodCtl.doDelCar);

goodRouter.get("/edit", goodCtl.showGoodEdit);

goodRouter.post("/doEdit", upload.fields([{ name: "picone" }, { name: "pictwo" }, { name: "picthree" }, { name: "picfour" }]), goodCtl.doGoodEdit);

goodRouter.get("/selectgood", goodCtl.selectGoods);

goodRouter.get("/down", goodCtl.doUpDown);


module.exports = goodRouter;