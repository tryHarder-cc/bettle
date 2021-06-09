const dbUtil = require("../common/dbUtil");
const config = require("../config");

//查询商品信息
module.exports.showGoods = function(req, res) {
    var selectSql = "select * from goods";
    dbUtil.query(selectSql, null, function(err, results) {
        if (err) {
            res.send(err.message);
        } else {
            res.render("admin/admin", { data: results });
        }
    });
};

//分页 good
module.exports.showGoodList = function(req, res) {
    var curpage = 1;
    if (req.query.curpage) {
        curpage = Number(req.query.curpage); //获取页面传过来的当前页码
    }
    //获取每页大小
    var pagesize = config.pagesize;
    var sql = "select * from goods limit ?,? ; select count(*) as total from goods;";
    var params = [(curpage - 1) * pagesize, pagesize];
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

//分页 order
module.exports.showOrder = function(req, res) {
    var curpage = 1;
    if (req.query.curpage) {
        curpage = Number(req.query.curpage);
    }
    //获取每页大小
    var pagesize = config.pagesize;
    //定义sql语句
    var sql = "select * from orders limit ?,? ; select count(*) as total from orders;";
    var params = [(curpage - 1) * pagesize, pagesize];
    //执行sql
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


//删除用户
module.exports.doDelUser = function(req, res) {
    var custid = req.query.custid;
    isUserExist(custid, function(flag) {
        if (flag) {
            res.send("<script>alert('can not delete');window.location.href='/admin/userList'</script>");
        } else {
            var sql = "delete from users where custid=?";
            dbUtil.query(sql, [custid], function(err, results) {
                if (err) {
                    console.log(err.message);
                } else {
                    res.redirect("/admin/userList");
                }
            });
        }
    });
}




//查询当前用户是否存在于购物车表中
function isUserExist(uid, callback) {
    var sql = "select * from shopcarts where  userid=?";
    var params = [uid];
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



//查询
module.exports.selectUser = function(req, res) {
    let { username } = req.query;
    var curpage = 1;
    if (req.query.curpage) {
        curpage = Number(req.query.curpage);
    }
    var pagesize = config.pagesize;
    var sql = `select * from users where username like '%${username}%'; select count(*) as total from users where username like '%${username}%';`;
    var params = [];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(results);
            var total = results[1][0].total;
            var pages = Math.ceil(total / pagesize);
            res.render("admin/CustList", {
                total: total,
                curpage: curpage,
                pages: pages,
                users: results[0]
            });
        }
    });

}

//用户的添加
module.exports.doAdduser = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var address = req.body.address;
    console.log(username);
    var phone = req.body.phone;
    var sql = "insert into users values (null,?,?,?,?,?,?,?)"
    var params = [username, password, sex, birthday, address, phone, 0];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect("/admin/userlist");
        }
    });
}

//修改用户信息
module.exports.showEdit = function(req, res) {
    var custid = req.query.custid;
    var sql = "select * from users where custid=?";
    dbUtil.query(sql, [custid], function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            res.render("admin/custedit", { customer: results[0] });
        }
    });
}

module.exports.doEdituser = function(req, res) {
    var custid = req.body.custid;
    var username = req.body.username;
    var password = req.body.password;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var address = req.body.address;
    var phone = req.body.phone;
    var sql = "update users set username=?,password=?,sex=?," +
        "birthday=?,address=?,phone=? where custid=?";
    var params = [username, password, sex, birthday, address, phone, custid];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect("/admin/userList");
        }
    });
}




module.exports.showFeedList = function(req, res) {
    var curpage = 1;
    if (req.query.curpage) {
        curpage = Number(req.query.curpage);
    }
    var pagesize = config.pagesize;
    var sql = "select * from feedback limit ?,? ; select count(*) as total from feedback;";
    var params = [(curpage - 1) * pagesize, pagesize];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            var total = results[1][0].total;
            var pages = Math.ceil(total / pagesize);
            res.render("admin/feedlist", {
                total: total,
                curpage: curpage,
                pages: pages,
                feed: results[0]
            });
        }
    });
}

//留言删除
module.exports.doDelFeedlist = function(req, res) {
    var custid = req.query.custid;
    var sql = "delete from feedback where custid=?"
    var params = [custid];
    dbUtil.query(sql, params, function(err, results) {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect("/admin/feedlist");
        }
    });
}