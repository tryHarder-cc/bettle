const { Console } = require("console");
const dbUtil = require("../common/dbUtil");

const config = require('../config');

//根据用户ID查询购物车页面要渲染的所有信息，包括商品的名称和图片
function queryAllCarts(uid, callback) {

    var sql = "select * from shopcarts where userid=?";
    dbUtil.query(sql, [uid], function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(results)
            callback(results);
        }
    });
}
//查询某商品是否存在于购物车表
function isGoodExist(gid, callback) {
    var sql = "select * from shopcarts where goodid=? ";
    var params = [gid];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            if (results.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
}


//添加购物车
module.exports.doAddCart = function(req, res) {
    var gid = req.query.goodid;
    var pic = req.query.pic;
    var saleprice = req.query.saleprice;
    var model = req.query.model;

    if (req.session.currUser) {
        var uid = req.session.currUser.uid;
        var selectSql = "select * from shopcarts where goodid=? and userid=? ";
        var params = [gid, uid];
        dbUtil.query(selectSql, params, function(err, results) {
            if (err) {
                res.send(err.message)
            } else {

                if (results.length > 0) { //商品存在更新
                    console.log("??!!@@")
                    var update = "update shopcarts set quantity=quantity+1,amount=quantity*saleprice where goodid=? and userid=?;";
                    var params = [gid, uid];
                    dbUtil.query(update, params, function(err, results) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            queryAllCarts(uid, function(results) {
                                res.render("ShoppingCar", { data: results })
                            })
                        }
                    });
                } else { //商品不存在，做插入
                    console.log("??!!@@123123123123")
                    var insertSql = "insert into shopcarts values(null,?,?,?,?,?,?,?)";
                    var params = [uid, gid, pic, saleprice, model, 1, saleprice];
                    dbUtil.query(insertSql, params, function(err, results) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            queryAllCarts(uid, function(results) {
                                res.render("ShoppingCar", { data: results })
                            })
                        }
                    })
                }
            }
        })

    } else {
        res.send("<script>alert('please login first!');window.location='/login'</script>");

    }
};
//sale加入购物车
module.exports.saleAddCart = function(req, res) {
    var sid = req.query.saleid;
    var mainpic = req.query.mainpic;
    var price = req.query.price;
    var model = req.query.model;

    if (req.session.currUser) {
        var uid = req.session.currUser.uid;
        var selectSql = "select * from shopcarts where goodid=? and userid=? ";
        var params = [sid, uid];
        console.log(params);
        dbUtil.query(selectSql, params, function(err, results) {
            if (err) {
                res.send(err.message)
            } else {
                if (results.length > 0) { //商品存在更新
                    console.log("发生错误啦!!!")
                    var update = "update shopcarts set quantity=quantity+1,amount=quantity*saleprice where goodid=? and userid=?;";
                    var params = [sid, uid];
                    dbUtil.query(update, params, function(err, results) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            queryAllCarts(uid, function(results) {
                                //渲染

                                res.render("ShoppingCar", { data: results })
                            })
                        }
                    });
                } else { //商品不存在，做插入
                    console.log("??!!@@123123123123")
                    var insertSql = "insert into shopcarts values(null,?,?,?,?,?,?,?)";
                    var params = [uid, sid, mainpic, price, model, 1, price];
                    console.log(params);
                    dbUtil.query(insertSql, params, function(err, results) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            queryAllCarts(uid, function(results) {
                                res.render("ShoppingCar", { data: results })
                            })
                        }
                    })
                }
            }
        })

    } else { //用户没有登录,没有权限访问购物车
        res.send("<script>alert('please login first!');window.location='/login'</script>");

    }
};



//删除购物车商品
module.exports.doDelCar = function(req, res) {
    var goodid = req.query.gid;
    var uid = req.session.currUser.uid;
    console.log(goodid)
    console.log(uid)
    var sql = "delete from shopcarts where goodid=? and userid=?";
    dbUtil.query(sql, [goodid, uid], function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            console.log("delete success");
        }
    });
}






module.exports.doAddGood = function(req, res) {
    var goodname = req.body.goodname;
    var Goodsprice = req.body.Goodsprice;
    var Introduce = req.body.Introduce;
    var picone;
    if (req.files.picone) {
        picone = req.files.picone[0].filename;
    }
    var pictwo;
    if (req.files.pictwo) {
        pictwo = req.files.pictwo[0].filename;
    }
    var picthree;
    if (req.files.picthree) {
        picthree = req.files.picthree[0].filename;
    }
    var picfour;
    if (req.files.picfour) {
        picfour = req.files.picfour[0].filename;
    }
    var inventory = req.body.inventory;
    var status = req.body.status;

    var sql = "insert into goods values(?,?,?,?,?,?,?,?,?,?)";
    var params = [null, goodname, Goodsprice, Introduce, picone, pictwo, picthree, picfour, inventory, status];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.massage);
        } else {
            res.redirect("/good/goodlist");
        }
    });
}


//分页查询商品列表
module.exports.showGoodList = function(req, res) {
    var curpage = 1;
    if (req.query.curpage) {
        curpage = Number(req.query.curpage);
    }
    var pagesize = config.pagesize;
    var sql = "select * from goods limit ?,? ; select count(*) as total from goods;";
    var params = [(curpage - 1) * pagesize, pagesize];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(results);
            var total = results[1][0].total;
            var pages = Math.ceil(total / pagesize);
            res.render("admin/goodlist", {
                total: total,
                curpage: curpage,
                pages: pages,
                goods: results[0]
            });
        }
    });
}

//商品的删除
module.exports.doDelGood = function(req, res) {
    var gid = req.query.goodid;
    isGoodExist(gid, function(flag) {
        if (flag) {
            res.send("<script>alert('can not delete');window.location.href='/good/goodlist'</script>");
        } else {
            var sql = "delete from goods where goodid=?";
            dbUtil.query(sql, [gid], function(err, result) {
                if (err) {
                    console.log(err.message);
                } else {
                    res.redirect("/good/goodlist");
                }
            });
        }
    });
}


//显示某个商品的信息
module.exports.showGoodEdit = function(req, res) {
    //获取商品id
    var goodid = req.query.goodid;
    var sql = "select * from goods where goodid=?";
    dbUtil.query(sql, [goodid], function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            res.render("admin/goodedit", { good: results[0] });
        }
    });
}

module.exports.doGoodEdit = function(req, res) {
    var goodid = req.body.goodid;
    var goodname = req.body.goodname;
    var Goodsprice = req.body.Goodsprice;
    var Introduce = req.body.Introduce;
    var picone;
    if (req.files.picone) {
        picone = req.files.picone[0].filename;
    } else {
        picone = req.body.piconeimg;
    }
    var pictwo;
    if (req.files.pictwo) {
        pictwo = req.files.pictwo[0].filename;
    } else {
        pictwo = req.body.pictwoimg;
    }
    var picthree;
    if (req.files.picthree) {
        picthree = req.files.picthree[0].filename;
    } else {
        picthree = req.body.picthreeimg;
    }
    var picfour;
    if (req.files.picfour) {
        picfour = req.files.picfour[0].filename;
    } else {
        picfour = req.body.picfourimg;
    }
    var inventory = req.body.inventory;
    var sql = "update goods set goodname=?, Goodsprice=? ,Introduce=?," +
        "picone=? , pictwo=? ,picthree=?,picfour=? ,inventory=? where goodid=?";
    var params = [goodname, Goodsprice, Introduce, picone, pictwo, picthree, picfour, inventory, goodid];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.massage);
        } else {
            res.redirect("/good/goodlist");
        }
    });
}

//商品搜索
module.exports.selectGoods = function(req, res) {
    let { goodname } = req.query;
    var curpage = 1;
    // console.log('${goodname}')
    if (req.query.curpage) {
        curpage = Number(req.query.curpage);
    }
    var pagesize = config.pagesize;
    var sql = `select * from goods where goodname like '%${goodname}%'; select count(*) as total from goods where goodname like '%${goodname}%' ;`;
    var params = [];
    //执行sql
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            var total = results[1][0].total;
            var pages = Math.ceil(total / pagesize);
            res.render("admin/goodlist", {
                total: total,
                curpage: curpage,
                pages: pages,
                goods: results[0]
            });
        }
    });
}

//商品上下架
module.exports.doUpDown = function(req, res) {
    var goodid = req.query.goodid;
    var status = req.query.status;
    switch (status) {
        case '0':
        case '2':
            status = '1';
            break;
        case '1':
            status = '2';
            break;

    }
    var sql = 'update goods set status = ? where goodid = ?';
    dbUtil.query(sql, [status, goodid], function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(goodid, status);
            res.redirect("/good/goodlist");
        }
    });
}