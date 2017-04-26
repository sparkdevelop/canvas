/**
 * Created by john on 2017/4/17.
 */
$(function(){
    $("#register").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        var confirm = $("#confirm").val();
        var data = {"username":username,"password":password,"confirm":confirm};
        $.ajax({
            url:'/register',
            type:'post',
            data: data,
            success: function(data,status){
                if(status == 'success'){
                    window.location.href = 'login';
                }
            },
            error: function(data,status){
                if(status == 'error'){
                    window.location.href = 'register';
                }
            }
        });
    });
});