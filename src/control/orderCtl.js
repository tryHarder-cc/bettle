const dbUtil = require("../common/dbUtil");
const config = require("../config");

//分页
module.exports.showOderlist = function(req, res) {
    var curpage = 1;
    if (req.query.curpage) {
        curpage = Number(req.query.curpage);
    }
    var pagesize = config.pagesize;
    var sql = "select * from orders limit ?,? ;select count(*) as total from orders;";
    var params = [(curpage - 1) * pagesize, pagesize];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            var total = results[1][0].total;
            var pages = Math.ceil(total / pagesize);
            res.render("admin/orderlist", {
                total: total,
                curpage: curpage,
                pages: pages,
                order: results[0]
            });
        }
    });
}


//渲染订单
module.exports.showEdit = function(req, res) {
        var orderid = req.query.orderid;
        var sql = "select * from orders where orderid=?";
        dbUtil.query(sql, [orderid], function(err, results) {
            if (err) {
                console.log(err.message);
            } else {
                res.render("admin/orderEdit", { order: results[0] });
            }
        });
    }
    //修改订单
module.exports.doEditorder = function(req, res) {

    var goodid = req.body.goodid;
    var userid = req.body.userid;
    var total = req.body.total;
    var status = req.body.status;
    var sql = "update orders set goodid=?,userid=?, " +
        "total=?,status=?";
    var params = [goodid, userid, total, status];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect("/order/orderlist");
        }
    });
}

//删除订单
module.exports.doDelorder = function(req, res) {
    var orderid = req.query.orderid;
    var sql = "delete from orders where orderid=?"
    var params = [orderid];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect("/order/orderlist");
        }
    });
}



//订单搜索
module.exports.selectorder = function(req, res) {
        let orderid = req.query.orderid;
        var curpage = 1;
        // console.log('${goodname}')
        if (req.query.curpage) {
            curpage = Number(req.query.curpage);
        }
        var pagesize = config.pagesize;
        var sql = `select * from orders where orderid like '%${orderid}%'; select count(*) as total from orders where orderid like '%${orderid}%';`;
        var params = [];
        //执行sql
        dbUtil.query(sql, params, function(err, results) {
            if (err) {
                console.log(err.message);
            } else {
                console.log(results);
                var total = results[1][0].total;
                var pages = Math.ceil(total / pagesize);
                res.render("admin/orderlist", {
                    total: total,
                    curpage: curpage,
                    pages: pages,
                    order: results[0]
                });
            }
        });
    }
    // 订单发货
module.exports.doStatus = function(req, res) {
    var goodid = req.query.goodid;
    var status = req.query.status;
    switch (status) {
        case "0":
            status = "1";
            break;
        case "1":
            status = "0";
            break;
    }
    var sql = "update orders set status=? where goodid=?";
    console.log(status, goodid);
    dbUtil.query(sql, [status, goodid], function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            // console.log(results);
            res.redirect("/order/orderlist");
        }
    });
}