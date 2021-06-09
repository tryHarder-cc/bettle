const express = require("express");
const orderCtl = require("../control/orderCtl");
var orderRouter = express.Router();

orderRouter.get("/orderlist", orderCtl.showOderlist);
orderRouter.get("/Edit", orderCtl.showEdit);
orderRouter.post("/doEdit", orderCtl.doEditorder);

orderRouter.get("/del", orderCtl.doDelorder);
//发货
orderRouter.get("/sta", orderCtl.doStatus);

orderRouter.get("/selectorder", orderCtl.selectorder);


module.exports = orderRouter;