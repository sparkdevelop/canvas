/**
 * Created by john on 2017/4/19.
 */
//实时协作功能
var genUid=getid();
var conarray=new Array(12);
for(var a=0;a<=12;a++){
    conarray[a]="";
}
function getid(){
    return new Date().getTime()+""+Math.floor(Math.random()*899+100);//返回时间和一个随机值
}
function getmatrix(stringa,stringb,id,textBox){
    var la = stringa.length;
    var lb = stringb.length;
    var matrix = new Array(la+1);
    for (var i = 0; i < la + 1; i++) {
        matrix[i] = new Array(lb+1);
        matrix[i][0] = i;
    }
    for (var a = 0; a < lb + 1; a++) {
        matrix[0][a] = a;
    }
    console.log(matrix);
    var t;
    for (var j = 1; j < la + 1; j++) {
        for (var k = 1; k < lb + 1; k++) {
            t = stringa[j - 1] == stringb[k - 1] ? 0 : 1;
            matrix[j][k] = Math.min.apply(null, [matrix[j - 1][k] + 1, matrix[j][k - 1] + 1, matrix[j - 1][k - 1] + t]);
            if (j == la && k == lb) {
                console.log([matrix[j - 1][k] + 1, matrix[j][k - 1] + 1, matrix[j - 1][k - 1] + t]);
            }
        }
    }
    console.log(matrix);

//                if(matrix[la][lb]!=0){
//                for(var a=0;a<la+1;a++){
//                    for(var b=0;b<lb+1;b++){
//                        document.getElementById('matrix').innerHTML+=matrix[a][b];
//                    }document.getElementById('matrix').innerHTML+='\n';
//                }}

//             将结果存入数组
    var x=la;
    var y=lb;
    var tmp=0;
    var step=0;
    var road=new Array();
    // for(var b=0;b<10;b++)
    // {
    //     road[b]=new Array(5);
    // }

//            //需要纠错处理，速度慢的时候可以
    while(x>0||y>0){
        while(x==0&&y>=1){
//                    document.getElementById('road').innerHTML+="添加"+x+stringb[(y-1)]+'\n';
            road.push({
                step:"添加",
                pastpos:x,
                currentpos:stringb[(y-1)],
                user:id,
                textbox:textBox
                });
            // road[step][0]="添加"; road[step][1]=x; road[step][2]=stringb[(y-1)]; road[step][3]=id;road[step][4]=textBox;
            step++; y--;
        }
        while(y==0 && x>=1){
//                    document.getElementById('road').innerHTML+="删除"+(x-1)+'\n';
            road.push({
                step:"删除",
                pastpos:x-1,
                currentpos:null,
                user:id,
                textbox:textBox
            });
            // road[step][0]="删除";  road[step][3]=id;road[step][1]=(x-1);road[step][4]=textBox;
            step++;x--;
        }
        while(x >= 1 && y >= 1)
        {
            tmp=stringa[x-1] == stringb[y-1]? 0:1;
            if((matrix[x][y] == matrix[x-1][y-1] + tmp)&& (x >= 1 )&&(y >= 1))
            {

                if(tmp){
//                            document.getElementById('road').innerHTML+="替换"+(x-1)+stringb[(y-1)]+'\n';
                    road.push({
                        step:"替换",
                        pastpos:x-1,
                        currentpos:stringb[(y-1)],
                        user:id,
                        textbox:textBox
                    });
                    // road[step][0]="替换"; road[step][1]=(x-1); road[step][2]=stringb[(y-1)];road[step][3]=id;road[step][4]=textBox;
                    step++;
                }
                x--; y--;
            }
            else if((matrix[x][y] == matrix[x-1][y] + 1 )&& (x >= 1))
            {
                road.push({
                    step:"删除",
                    pastpos:x-1,
                    currentpos:null,
                    user:id,
                    textbox:textBox
                });
//                        document.getElementById('road').innerHTML+="删除"+(x-1)+'\n';
//                 road[step][0]="删除"; road[step][1]=(x-1); road[step][3]=id;road[step][4]=textBox;
                step++;  x--;
            }
            else if((matrix[x][y] == matrix[x][y-1] + 1) && (y >= 1))
            {
                road.push({
                    step:"添加",
                    pastpos:x,
                    currentpos:stringb[(y-1)],
                    user:id,
                    textbox:textBox
                });
//                        document.getElementById('road').innerHTML+="添加"+x+stringb[(y-1)]+'\n';
//                 road[step][0]="添加"; road[step][1]=x; road[step][2]=stringb[(y-1)]; road[step][3]=id;road[step][4]=textBox;
                step++; y--;
            }
        }}
    return road;
}
function add(pos,con,tb) {
    var t=document.getElementById(tb);
    var pre = t.value.substr(0, pos);
    var en=t.length;
    var post = t.value.substr(pos,en);
    t.value = pre + con + post;
    var conid=gettextid(tb);
    conarray[conid]=t.value;
}
function chg(pos,con,tb) {
    var t=document.getElementById(tb);
    var pre = t.value.substr(0, pos);
    var en=t.length;
    var post = t.value.substr(pos+1,en);
    t.value = pre + con + post;
    var conid=gettextid(tb);
    conarray[conid]=t.value;
}
function del(pos,tb) {
    var t=document.getElementById(tb);
    var pre = t.value.substr(0, pos);
    var en=t.length;
    var post = t.value.substr(pos+1,en);
    t.value = pre + post;
    var conid=gettextid(tb);
    conarray[conid]=t.value;
}
function gettextid(t){
    switch(t)
    {
        case 't_filename':
            return 0;
            break;
        case 't_parterner':
            return 1;
            break;
        case 't_work':
            return 2;
            break;
        case 't_resource':
            return 3;
            break;
        case 't_cost':
            return 4;
            break;
        case 't_relationship':
            return 5;
            break;
        case 't_path':
            return 6;
            break;
        case 't_customer':
            return 7;
            break;
        case 't_frame':
            return 8;
            break;
        case 't_revenue':
            return 9;
            break;
        default:return null;
    }
}
$(function () {
    var url=window.location.pathname;
    var spliturl= url.split('/');
    var roomid=spliturl[spliturl.length - 1];
    var splitid=roomid.split('_');
    var caid=splitid[1];
    $("#cid").val(caid);
    // ----------设置昵称-------------
    var userName =$('#username').text();

    // ---------创建连接-----------
    var socket = io();

    // 加入房间,初始化画布
    socket.on('connect', function () {
        $.ajax({
        url:'../data',
        type:'post',
        data: {'canvasid':caid},
        success: function(data){
            // $("#t_filename").val(data.filename);conarray[0]=data.filename;
            $('#t_filename').text(data.filename);$('#filename_form').val(data.filename);conarray[0]=data.filename;
            $("#t_parterner").val(data.par);conarray[1]=data.par;
            $("#t_work").val(data.wor);conarray[2]=data.wor;
            $("#t_revenue").val(data.rev);conarray[3]=data.rev;
            $("#t_cost").val(data.cos);conarray[4]=data.cos;
            $("#t_customer").val(data.cus);conarray[5]=data.cus;
            $("#t_path").val(data.pat);conarray[6]=data.pat;
            $("#t_relationship").val(data.rel);conarray[7]=data.rel;
            $("#t_frame").val(data.fra);conarray[8]=data.fra;
            $("#t_resource").val(data.res);conarray[9]=data.res;
        }
    });
        socket.emit('join', userName);

    });
    // 监听消息
    socket.on('message', function(message) {//监听数据，如果传来数组，则分析数组，执行OT
        for(var i=0;i<message.length;i++){
            // d('text').innerHTML+=message[i].step;
            // d('text').innerHTML+=message[i].pastpos;
            // d('text').innerHTML+=message[i].currentpos;
            // d('text').innerHTML+=message[i].textbox;
            // d('text').innerHTML+=" ";
            if(message[i].user!=genUid){
                if(message[i].step=='添加'){
                    add(message[i].pastpos,message[i].currentpos,message[i].textbox);
                }
                else if(message[i].step=='替换'){
                    chg(message[i].pastpos,message[i].currentpos,message[i].textbox);
                }
                else if(message [i].step=='删除'){
                    del(message[i].pastpos,message[i].textbox);
                }
            }}
    });
    socket.on('newjoinner', function(message) {//监听数据，如果传来数组，则分析数组，执行OT
        for(var i=0;i<message.length;i++){
                if(message[i].step=='添加'){
                    add(message[i].pastpos,message[i].currentpos,message[i].textbox);
                }
                else if(message[i].step=='替换'){
                    chg(message[i].pastpos,message[i].currentpos,message[i].textbox);
                }
                else if(message [i].step=='删除'){
                    del(message[i].pastpos,message[i].textbox);
                }
            }
    });
    socket.on('filenamechg',function (filenamechg) {
        $('#t_filename').text(filenamechg);$('#filename_form').val(filenamechg);conarray[0]=data.filename;
    });


    // 监听系统消息
    socket.on('sys', function (sysMsg, users) {
        var message = sysMsg;
        d('msglog').innerHTML+=message+'\n';
        $('#count').text(users.length);
        $('#users').text(users);
    });

    // 发送消息
    $(window).keyup(function(e) {//监听按键按下
        var td=$(":focus");//获取焦点对象
        var update = td.val();//获取焦点当前的值
        e.preventDefault();
        var t=td.attr("id");//获取焦点id
        var conid=gettextid(t);
        var con=conarray[conid];
        var matrix=getmatrix(con,update,genUid,t);//获取本机做的改动
        conarray[conid]=update;
        if(matrix[0]!=undefined){
            socket.send(matrix);}//发送本机做的改动
    });

    // 退出房间
    $('#joinOrLeave').click(function () {
        if ($(this).text() === '退出') {
            $(this).text('进入');
            socket.emit('leave');
            var msg = '你已经退出了房间,重新发言请点击"进入房间"';
            d('cover').style.display='block';
            $('#msglog').text(msg);
            window.location.href="../home";

        } else {
            $(this).text('退出');
            d('cover').style.display='none';
            socket.emit('join', userName);
        }
    });
    $('#edithead').click(function () {
       var ed=document.getElementById("filename_edit");
       var pl=document.getElementById("filename_play");
       ed.style.display="block";
       pl.style.display="none";
    });
    $('#editcancel').click(function () {
        var ed=document.getElementById("filename_edit");
        var pl=document.getElementById("filename_play");
        ed.style.display="none";
        pl.style.display="block";
    });
    $('#edityes').click(function () {
        var filenamechg=document.getElementById('t_filename_input').value;
        if(filenamechg!=null) {
            $('#t_filename').text(filenamechg);
            $('#filename_form').val(filenamechg);
            conarray[0] = filenamechg;
            var ed = document.getElementById("filename_edit");
            var pl = document.getElementById("filename_play");
            ed.style.display = "none";
            pl.style.display = "block";
            socket.emit('filenamechg',filenamechg);
        }
        else{
            alert('画布名称不为空！');
        }

    });
});
