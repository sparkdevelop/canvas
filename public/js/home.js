/**
 * Created by john on 2017/4/21.
 */
function news(){
    window.location.href="/new";
}
function join() {
    var canvasid=prompt("请输入画布ID","");
    if(canvasid){
        $.ajax({
            url:'/join',
            type:'post',
            data: {'canvasid':canvasid},
            success: function(data,status){
                if(status == 'success'){
                    window.location.href = '/room/room_'+canvasid;
                }
            },
            error: function(data,status){
                if(status == 'error'){
                    window.location.href = 'home';
                }
            }
        })
    }
}
$(function(){
    $.ajax({
        url: '/canvalist',
        type: 'POST',
        success : function(response){
            for(var i=0;i<response.length;i++){
                if(i%2){
                    var strwhite="<tr><td bgcolor=\"#ffffff\"><a href=\"/room/room_"+response[i].id+"\">"+response[i].name+"</a><span class='del'><a href=\"/del_"+response[i].id+"\">删除</a></span></td></tr>";
                    $("#list").append(strwhite);
                }
                else{
                    var strgray="<tr><td bgcolor=\"#ffffcc\"><a href=\"/room/room_"+response[i].id+"\">"+response[i].name+"</a><span class='del'><a href=\"/del_"+response[i].id+"\">删除</a></span></td></tr>";
                    $("#list").append(strgray);
                }
            }}
    })
});