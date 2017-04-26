var express = require('express');
var path = require('path');
var IO = require('socket.io');
var bodyParser = require('body-parser');
var multer=require('multer');
var mysql  = require('mysql');

// var sql=require('dao/mysql');
var routes = require('./routes/index');
var session=require('express-session');


var app = express();
var server = require('http').Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//__dirname变量获取当前模块文件所在目录的完整绝对路径
// app.use(express.static(__dirname, 'public'));//将静态文件目录设置为项目根目录+/public
app.use(express.static(__dirname + '/public'));
//视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置session
app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000*60*30//过期时间设置(单位毫秒)
    }
}));

app.use(function(req,res,next){
    res.locals.user = req.session.user;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();  //中间件传递
});

// 创建socket服务
var socketIO = IO(server);
// 房间用户名单
var roomInfo = {};
var messages = {};


socketIO.on('connection', function (socket) {
    // 获取请求建立socket连接的url
    // 如: http://localhost:3000/room/room_1, roomID为room_1
    var url = socket.request.headers.referer;
    var splited = url.split('/');
    var spliteded = splited[splited.length - 1];   // 获取url参数
    var splitededed=spliteded.split('?');
    var roomID=splitededed[0];//获取房间ID
    var user = '';


    socket.on('join', function (userName) {
        user = userName;
        // 将用户昵称加入房间名单中
        if (!roomInfo[roomID]) {
            roomInfo[roomID] = [];
        }
        roomInfo[roomID].push(user);

        socket.join(roomID);    // 加入房间
        // 通知房间内人员
        socketIO.to(roomID).emit('sys', user + '加入了房间', roomInfo[roomID]);
        console.log(user + '加入了' + roomID);
        if (messages[roomID]) {
                socketIO.to(socket.id).emit('newjoinner', messages[roomID]);
        }

    });

    socket.on('leave', function () {
        socket.emit('disconnect');
    });
    socket.on('out', function () {
        socket.emit('disconnect');
    });

    socket.on('disconnect', function () {
        // 从房间名单中移除
        var index = roomInfo[roomID].indexOf(user);
        if (index !== -1) {
            roomInfo[roomID].splice(index, 1);
        }

        socket.leave(roomID);    // 退出房间
        socketIO.to(roomID).emit('sys', user + '退出了房间', roomInfo[roomID]);
        console.log(user + '退出了' + roomID);
    });

    socket.on('message', function(msg) {
        if (roomInfo[roomID].indexOf(user) === -1) {
            return false;
        }
        // console.log('Received: ', msg);
        if (!messages[roomID]) {
            messages[roomID] = [];
        }
        for(var i=0;i<msg.length;i++){
            messages[roomID].push(msg[i]);
        }
        socketIO.to(roomID).emit('message', msg);
    });

});


app.use('/', routes);  // 即为为路径 / 设置路由
app.use('/login',routes); // 即为为路径 /login 设置路由
app.use('/register',routes); // 即为为路径 /register 设置路由
app.use('/home',routes); // 即为为路径 /home 设置路由
app.use('/canvalist',routes);
app.use('/join',routes);
app.use('/new',routes);
app.use('/data',routes);
app.use('/:del',routes);
routes.get('/room/:roomID', function (req, res) {
    if(req.session.user){
        var roomID = req.params.roomID;
        var user=req.session.user;
        var length=roomInfo.length;

        // 渲染页面数据(见views/room.hbs)    //把数据填充进模板
        res.render('room', {
            roomID: roomID,
            users: roomInfo[roomID],
            length:length,
            user:user
        });
    }else{
        req.session.error = "请先登录!";
        res.redirect('../login');
    }
});
routes.post('/room/handle', function(req, res) {
    var data=req.body;
    var cid=data.cid;
    var filename=data.filename;
    var par=data.parterner;
    var wor=data.work;
    var reso=data.resource;
    var cos=data.cost;
    var rel=data.relationship;
    var pat=data.path;
    var cus=data.customer;
    var fra=data.frame;
    var rev=data.revenue;

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '12345',
        database: 'test'
    });

    connection.connect();
    var modSql ='UPDATE cooperation SET filename=?,par=?,wor=?,res=?,cos=?,rel=?,pat=?,cus=?,fra=?,rev=? WHERE canvasid=?';
    var modSqlParams = [filename,par,wor,reso,cos,rel,pat,cus,fra,rev,cid];
//改
    connection.query(modSql,modSqlParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        console.log('--------------------------UPDATE----------------------------');
        console.log('保存成功！');
        console.log('-----------------------------------------------------------------\n\n');
        var roomID ='room_'+ cid;
        messages[roomID]=[];
        socketIO.to(roomID).emit('sys',  '保存成功');

    });
    connection.end();


});

server.listen(3000, function () {
    console.log('server listening on port 3000');
});
