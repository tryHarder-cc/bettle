const dbUtil = require("../common/dbUtil");
//登录
module.exports.doLogin = function(req, res) {
        var uname = req.body.user;
        var upass = req.body.password;
        var sql = "select * from users where username=? and password=?";
        var params = [uname, upass];
        dbUtil.query(sql, params, function(err, results) {
            if (err) {
                console.log(err.message);
            } else {
                if (results.length > 0) {
                    req.session.currUser = {
                        uid: results[0].custid,
                        uname: results[0].username
                    };
                    if (results[0].role == "1") {
                        res.render("admin/admin", {});
                    } else {
                        res.send("<script>alert('login success');window.location='/'</script>");
                    }
                } else {
                    res.send("<script>alert('账户或密码错误请重新登录');window.location='/login'</script>");
                }
            }
        });
    }
    //注册
module.exports.doRegist = function(req, res) {
    var username = req.body.user;
    var password = req.body.password;
    var repeatpassword = req.body.repeatpassword;
    var sql = "select * from users where username=?";
    var params = [username];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            res.send(err.message);
        } else {
            if (results.length > 0) {
                res.send("<script>alert('user registered'); window.location.href='/regist';</script>")
            } else {
                if (password !== repeatpassword) {
                    res.send("<script>alert('两次密码不一致');window.location.href='/regist'</script>")
                } else {
                    var insertSql = "insert into users(custid,username,password) values(null,?,?)";
                    var params = [username, password, sql];
                    dbUtil.query(insertSql, params, function(err, results) {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("<script>alert('user regist ok!'); window.location.href='/login';</script>");
                        }
                    })
                }
            }
        }
    })
};

//查询所有商品信息
module.exports.showGoodLists = function(req, res) {
    var selectSql = "select * from goods where status=1";
    dbUtil.query(selectSql, null, function(err, results) {
        if (err) {
            res.send(err.message);
        } else {
            var goods = results;

            var selectSql = "select * from sales";
            dbUtil.query(selectSql, null, function(err, results) {
                if (err) {
                    res.send(err.message);
                } else {
                    res.render("index", {
                        sales: results,
                        goods: goods
                    });
                }
            });
        }
    })
};

//商品详情页
module.exports.doShowDetailsById = function(req, res) {
    var goodid = req.query.goodid;
    var selectSql = "select * from goods where goodid=?";
    var params = [goodid];
    dbUtil.query(selectSql, params, function(err, results) {
        if (err) {
            res.send(err.message);
        } else {
            res.render("goodsDetails", {
                goodsDetails: results[0]
            });
        }
    })
};


//商品特价页
module.exports.doShowsaleDetailsById = function(req, res) {
    var saleid = req.query.saleid;
    var selectSql = "select * from sales where saleid=?";
    var params = [saleid];
    dbUtil.query(selectSql, params, function(err, results) {
        if (err) {
            res.send(err.message);
        } else {
            res.render("salesDetails", {
                salesDetails: results[0]
            });
        }
    })
};



// 显示当前用户的购物车
module.exports.doShopCart = function(req, res) {
    if (req.session.currUser) {
        var selectSql = "select * from shopcarts where userid=?";
        var uid = req.session.currUser.uid;
        var params = [uid]
        dbUtil.query(selectSql, params, function(err, results) {
            if (err) {
                console.log(err.message)
            } else {
                res.render("ShoppingCar", {
                    data: results
                });
            }
        });
    } else {
        res.send("<script>alert('please login first!');window.location='/login'</script>");
    }
};


//分页查询用户列表信息
module.exports.showUserList = function(req, res) {
    var curpage = 1;
    if (req.query.curpage) {
        curpage = Number(req.query.curpage);
    }
    var pagesize = config.pagesize;
    var sql = "select * from users limit ?,? ; select count(*) as total from users;";
    var params = [(curpage - 1) * pagesize, pagesize];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            var total = results[1][0].total;
            var pages = Math.ceil(total / pagesize);
            res.render("admin/Custlist", {
                total: total,
                curpage: curpage,
                pages: pages,
                users: results[0]
            });
        }
    });
}

//更新当前用户购物车的商品数量和小计
module.exports.cartCoun = function(req, res) {
    var gid = req.query.gid;
    var qty = req.query.qty;
    var uid = req.session.currUser.uid;
    console.log(12);
    var sql = "update shopcarts set quantity=?,amount=saleprice*quantity where goodid=? and userid=?";
    var params = [qty, gid, uid];
    dbUtil.query(sql, params, function(err, results) {
        console.log(sql);
        if (err) {
            console.log(err.message);
        } else {
            console.log("update success");
        }
    });
}

//购物车结算提交 并删除提交商品
module.exports.doClearCart = function(req, res) {
    var id = req.session.currUser.uid;
    var selectSql = "select * from goods"
    dbUtil.query(selectSql, null, function(err, results) {
        if (results.inventory == 0) {
            res.send("<script>alert('库存不足!');window.location='/ShoppingCar'</script>")
        } else {
            var selectSql = "select * from shopcarts";
            dbUtil.query(selectSql, null, function(err, results) {
                var gid = req.query.goodid;
                var model = req.query.model[0];
                var quantity = req.query.quantity[0];
                var insertSql = "insert into orders(orderid,goodid,userid,model,total) values(null,?,?,?,?)";
                var params = [gid, id, model, quantity];
                console.log(params);
                dbUtil.query(insertSql, params, function(err, results) {
                    if (err) {
                        console.log(err.message);
                    } else {
                        var deleteSql = "delete from shopcarts where userid=? and goodid=?";
                        var params = [id, gid];
                        console.log("aklwjmdlkawmda");
                        dbUtil.query(deleteSql, params, function(err, results) {
                            if (err) {
                                console.log(err.message);
                            } else {
                                var updateSql = "update goods set inventory=inventory-? where goodid=?";
                                dbUtil.query(updateSql, [quantity, gid], function(err, results) {
                                    if (err) {
                                        console.log(err.message)
                                    } else {
                                        res.send("<script>alert('提交订单成功');window.location='/'</script>")
                                    }
                                })

                            }

                        })
                    }
                })
            });
        }
    })

}


//用户反馈
module.exports.doFeedback = function(req, res) {
        var custid = req.session.currUser.uid;
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var message = req.body.message;
        var sql = "insert into feedback values(?,?,?,?,?)";
        var params = [custid, name, email, phone, message];
        console.log(params);
        dbUtil.query(sql, params, function(err, results) {
            if (err) {
                console.log(err.message);
            } else {
                res.send("<script>alert('提交成功');window.location.href='/'</script>");
            }
        });
    }
    //立即购买
module.exports.doBuyNow = function(req, res) {
    if (req.session.currUser) {
        var id = req.session.currUser.uid;
        var selectSql = "select * from goods"
        dbUtil.query(selectSql, null, function(err, results) {
            if (results.inventory == 0) {
                res.send("<script>alert('库存不足!');window.location='/ShoppingCar'</script>")
            } else {
                console.log(id);
                var selectSql = "select * from goods";
                dbUtil.query(selectSql, null, function(err, results) {
                    var gid = req.query.goodid;
                    console.log(gid);
                    var model = req.query.model;
                    var quantity = 1;
                    var insertSql = "insert into orders(orderid,goodid,userid,model,total) values(null,?,?,?,?)";
                    var params = [gid, id, model, quantity];
                    console.log(params);
                    dbUtil.query(insertSql, params, function(err, results) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            res.send("<script>alert('提交订单成功');window.location='/'</script>")
                        }

                    })
                });
            }
        })
    } else {
        res.send("<script>alert('please login first!');window.location='/login'</script>");
    }
}

module.exports.doBuySale = function(req, res) {
    if (req.session.currUser) {
        var id = req.session.currUser.uid;
        var selectSql = "select * from goods"
        dbUtil.query(selectSql, null, function(err, results) {
            if (results.inventory == 0) {
                res.send("<script>alert('库存不足!');window.location='/ShoppingCar'</script>")
            } else {
                console.log(id);
                var selectSql = "select * from goods";
                dbUtil.query(selectSql, null, function(err, results) {
                    var gid = req.query.goodid;
                    console.log(gid);
                    var model = req.query.model;
                    var quantity = 1;
                    var insertSql = "insert into orders(orderid,goodid,userid,model,total) values(null,?,?,?,?)";
                    var params = [gid, id, model, quantity];
                    console.log(params);
                    dbUtil.query(insertSql, params, function(err, results) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            res.send("<script>alert('提交订单成功');window.location='/'</script>")
                        }

                    })
                });
            }
        })
    } else {
        res.send("<script>alert('please login first!');window.location='/login'</script>");
    }
}