/**
 * Created by john on 2017/4/17.
 */
$(function(){
    $("#login").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var data = {"username":username,"password":password};
        $.ajax({
            url:'/login',
            type:'post',
            data: data,
            success: function(data,status){
                if(status == 'success'){
                    window.location.href = 'home';
                }
            },
            error: function(data,status){
                if(status == 'error'){
                    window.location.href = 'login';
                }
            }
        });
    });
});