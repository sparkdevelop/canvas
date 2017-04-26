/**
 * Created by john on 2017/4/19.
 */
function d(id) {
    return document.getElementById(id);
}//获取ID为id的内容
function getHeight(a) {
    var fontSize = 20;//获取字体大小
    var txt = a.value;//获取文字内容
    var canvasWidth = a.offsetWidth;//画布宽度为每行显示多少字乘以字体宽度大小。
    var len = Math.ceil(canvasWidth *3/ fontSize/2);//获取每行显示多少个字
    var canvasHeight=a.offsetHeight;
    if(fontSize * (3 / 2) * (Math.ceil(txt.length / len) + txt.split('\n').length - 2)>=a.offsetHeight)
    {
        canvasHeight = fontSize * (3 / 2) * (Math.ceil(txt.length / len) + txt.split('\n').length - 2);
    }
    else
    {
        canvasHeight =a.offsetHeight;
    }
    return canvasHeight;
}
function pro(a,b,c) {//a:指定textarea，b:指定画布，c:画布高度
    var i = 0;
    var fontSize = 20;//获取字体大小
//            var fontWeight = 'normal';//获取字体粗细
    var txt = a.value;//获取文字内容
    var can =b;//获取画布位置
    can.width = a.offsetWidth;
    var len = Math.ceil(can.width *3/ fontSize/2);//获取每行显示多少个字
    can.height = c;
    var context = can.getContext('2d');//创建一个2维画布
    context.strokeStyle="#000";
    context.lineWidth=3;
    context.rect(0,0,can.width,can.height);
    context.stroke();//绘制边框
    context.clearRect(1,1,can.width-2,can.height-2);//清空画布
    context.font = 'nomal' + ' ' + 20 + 'px sans-serif';//设置字体
    context.textBaseline = 'top';//设置文字基准线在上
    can.style.display = 'none';//设置不显示元素
    function fillTxt(text) {
        while (text.length > len) {
            var txtLine = text.substring(0, len);//提取第一行
            text = text.substring(len);//将文本减去第一行
            context.fillText(txtLine, 0, fontSize * (3 / 2) * i++,can.width);//输出一行文本

        }
        context.fillText(text, 0, fontSize * (3 / 2) * i, can.width);//输出最后一行文本
    }//输出文本
    var txtArray = txt.split('\n');//文章在换行符处分割填入数组
    for ( var j = 0; j < txtArray.length; j++) {
        fillTxt(txtArray[j]);
        context.fillText('\n', 0, fontSize * (3 / 2) * i++, can.width);
    }//将数组逐一输出
    var imageData = context.getImageData(0, 0, can.width, can.height);//将画布导出为图片
    return imageData;
//            var imageData = context.getImageData(0, 0, can.width, can.height);
//            var img = d("img");
//            img.src = can.toDataURL("image/png");
}//将每个textarea的内容转为图片
function  textToImg() {
    var topHeight=Math.max(getHeight(d("t_parterner")),getHeight(d("t_work"))+getHeight(d("t_resource")),getHeight(d("t_cost")),getHeight(d("t_relationship"))+getHeight(d("t_path")),getHeight(d("t_customer")));
    var bottomHeight=Math.max(getHeight(d("t_frame")),getHeight(d("t_revenue")));
    var work=getHeight(d("t_work"));
    var relationship=getHeight(d("t_relationship"));
    var resource=Math.max(getHeight(d("t_resource")),topHeight-getHeight(d("t_work")));
    var path=Math.max(getHeight(d("t_path")),topHeight-getHeight(d("t_relationship")));

    var par=pro(d("t_parterner"),d('canvas'),topHeight);
    var wor=pro(d("t_work"),d('canvas_1'),work);
    var res=pro(d("t_resource"),d('canvas_2'),resource);
    var cos=pro(d("t_cost"),d('canvas_3'),topHeight);
    var rel=pro(d("t_relationship"),d('canvas_4'),relationship);
    var pat=pro(d("t_path"),d('canvas_5'),path);
    var cus=pro(d("t_customer"),d('canvas_6'),topHeight);
    var fra=pro(d("t_frame"),d('canvas_7'),bottomHeight);
    var rev=pro(d("t_revenue"),d('canvas_8'),bottomHeight);
    var canvas =d("mycanvas");
    canvas.height= topHeight+bottomHeight;
    canvas.width=1010;
    var context = canvas.getContext('2d');
    context.putImageData(par,0,0);
    context.putImageData(wor,200,0);
    context.putImageData(res,200,work);
    context.putImageData(cos,400,0);
    context.putImageData(rel,600,0);
    context.putImageData(pat,600,getHeight(d("t_relationship")));
    context.putImageData(cus,800,0);
    context.putImageData(fra,0,topHeight);
    context.putImageData(rev,500,topHeight);
    canvas.style.display = 'none';
//            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//            var img = d('img');
//            img.src = canvas.toDataURL("image/png");
}//将整个表单转为整个图片
function Download(){
    //cavas 保存图片到本地  js 实现
    //------------------------------------------------------------------------
    //1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
    textToImg();
    var type ='png';//你想要什么图片格式 就选什么吧
    var d=document.getElementById("mycanvas");
    var imgdata=d.toDataURL(type);
    //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype=function(type){
        type=type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
        var r=type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/'+r;
    };
    imgdata=imgdata.replace(fixtype(type),'image/octet-stream');
    //3.0 将图片保存到本地
    var savaFile=function(data,filename)
    {
        var save_link=document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href=data;
        save_link.download=filename;
        var event=document.createEvent('MouseEvents');
        event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
        save_link.dispatchEvent(event);
    };
    var filename=''+new Date().getSeconds()+'.'+type;
    //我想用当前秒是可以解决重名的问题了 不行你就换成毫秒
    savaFile(imgdata,filename);
}