var express = require('express');
var router=express.Router();
var mysql=require('dao/mysql');

router.get('/', function(req, res) {
    res.render('login');
});
router.route('/login').get(function(req,res){
    res.render('login');
}).post(function(req,res){
    var data=req.body;
    var usn=data.username;
    var psw=data.password;

    if(usn==""||psw==""){
        req.session.error = "请输入用户名密码";
        res.sendStatus(404);

    }
    else{
        var client=mysql.connect();
        mysql.selectUsr(client,usn,function(result){
            if(result[0]===undefined){
                req.session.error = "用户不存在";
                res.sendStatus(404);

            }else{
                if(result[0].password===req.body.password){
                    req.session.user = req.body.username;
                    res.sendStatus(200);
                }else
                {
                    req.session.error = "密码错误";
                    res.sendStatus(404);
                }
            }
        })
    }
});
router.route('/register').get(function(req,res){
    res.render('register');
}).post(function(req,res){
    var data=req.body;
    var usn=data.username;
    var psw=data.password;
    var cof=data.confirm;
    if(usn==""||psw==""||cof==""){
        req.session.error = "请完整输入！";
        res.sendStatus(500);
    }
    else{
        if(psw == cof){
            if(psw.length>=6) {
                // console.log(psw.length);
                var client = mysql.connect();
                mysql.selectUsr(client, usn, function (result) {
                    if (result[0] === undefined) {
                        mysql.insertUsr(client, usn, psw, function (err) {
                            if (err) throw err;
                            res.sendStatus(200);
                        });
                    }
                    else {
                        req.session.error = "用户名已存在！";
                        res.sendStatus(500);
                    }
                })
            }else{
                req.session.error = "密码长度不小于6位！";
                res.sendStatus(500);
            }
        }
        else{
            req.session.error = "密码不一致！";
            res.sendStatus(500);
        }
    }
});
router.get('/home',function(req,res){
    if(req.session.user){
        res.render('home');
    }else{
        req.session.error = "请先登录!";
        res.redirect('login');
    }
});
router.post('/canvalist',function(req,res){
    if(req.session.user){
        var usn=req.session.user;
        var client=mysql.connect();
        mysql.selectMts(client,usn,function(result){
            if(result){
                var arrcava=[];
                for (var i = 0; i<result.length;i++) {
                    mysql.selectOpt(client,result[i].canvasid,function (rest) {
                        if(rest[0]!=undefined){
                        arrcava.push({
                            id: rest[0].canvasid,
                            name: rest[0].filename
                        });
                       if(arrcava.length==result.length){
                           res.send(arrcava);
                      }}
                    });
                }
            }
        })
    }
    else{
        req.session.error = "请先登录!";
        res.redirect('login');
    }
});
router.get('/logout',function(req,res){
    req.session.user = null;
    req.session.error = null;
    res.redirect('login');
});
router.post('/join',function(req,res){
    if(req.session.user){
        var username=req.session.user;
        var client=mysql.connect();
        var data=req.body;
        var canvasid=data.canvasid;
        mysql.selectOpt(client,canvasid,function (result) {
            if(result[0]==undefined){
                req.session.error="画布不存在";
                res.sendStatus(404);
            }
            else{
                mysql.ifmatch(client,username,canvasid,function (result) {
                    if(result[0]==undefined){
                        mysql.insertMts(client,username,canvasid,function (err) {
                            if(err)throw err;
                            res.sendStatus(200);
                        })
                    }else{
                        req.session.error="请勿重复加入画布！";
                        res.sendStatus(404);
                    }
                })
            }
        })
    }
    else{
        req.session.error = "请先登录!";
        res.redirect('login');
    }
});
router.get('/new',function(req,res){
    if(req.session.user){
        var username=req.session.user;
        var client=mysql.connect();
        mysql.insertCav(client,username,function (err) {
            if(err)throw err;
            mysql.selectlast(client,function (result) {
                if(err)throw err;
                var canvasid=result[0].canvasid;
                console.log(canvasid);
                mysql.insertMts(client,username,canvasid,function (err) {
                    if(err)throw err;
                    res.redirect('/room/room_'+canvasid);
                })
            })
        })
    }
    else{
        req.session.error = "请先登录!";
        res.redirect('login');
    }
});
router.post('/data',function(req,res){
    if(req.session.user){
        var data=req.body;
        var canvasid=data.canvasid;
        var client=mysql.connect();
        mysql.selectOpt(client,canvasid,function (result) {
            if(result[0]!=undefined){
                res.send(result[0]);
            }else{
                res.redirect('home');
            }

        })
    }
    else{
        req.session.error = "请先登录!";
        res.redirect('login');
    }
});

router.get('/:del',function(req,res){
    if(req.session.user) {
        var username = req.session.user;
        var url = req.params.del;
        var split = url.split('_');
        var roomid = split[1];
        if(roomid!=undefined) {
            var client = mysql.connect();
            mysql.selectCava(client, username, roomid, function(result) {
                if (result[0] != undefined) {
                    mysql.delCava(client, username, roomid, function(err) {
                        if(err)throw err;
                        res.redirect('/home');
                    });
                }
                else if(result[0]==undefined){
                    mysql.delMts(client, username, roomid, function(err) {
                        if(err)throw err;
                        res.redirect('/home');
                    });
                }
            });

        }
    }
    else{
        req.session.error = "请先登录!";
        res.redirect('login');
    }
});


module.exports = router;