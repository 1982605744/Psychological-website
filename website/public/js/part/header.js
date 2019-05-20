/*头部js样式*/
(function(){
    //登录窗js
    let navSign = $("#nav-signup"),//获取登录窗
        close = navSign.find(".sign-center-close"),//获取登录窗关闭
        login=$("#user-login");//获取“登录”
    login.on("click",function(){
        navSign.fadeIn(300);
    });
    close.on("click",function(){
        navSign.fadeOut(300);
    });
    //导航栏js
    $(".hnav-item>li").click(function(){
        $(".hnav-item>li").css({"backgroundColor":"#09f"});
        $(this).css({"backgroundColor":"#40b3ff"});
    });
    //选项卡 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function(){});
    //表单 依赖
    layui.use('form', function(){
        var form = layui.form;
        //前端验证
        form.verify({
            identity:function(value){
                if(value==="")return "请选择身份"
            },
            logID:function(value,item){
                if(value===""){
                    return item.placeholder;
                }else if( !/\d{6}/i.test(value) ){
                    return item.placeholder.slice(3)+"格式错误";
                }
            },
            regID:function(value,item){
                if(value===""){
                    return item.placeholder;
                }else if( !/\d{6}/i.test(value) ){
                    return item.placeholder.slice(3)+"格式错误";
                }
            },
            username:function(value){
                if(value===""){
                    return "请输入姓名";
                }else if( !/[\u4e00-\u9fa5]{2,4}/i.test(value) ){
                    return "姓名格式错误";
                }
            },
            password:function(value){
                //数字 字母 _!@#$%^&*()+{}[]-=,.<>?
                if(value===""){
                    return "请输入密码"
                }else if( !/^[\da-z_!@#$%^&*()+\[\]{}\-=,\.<>?]{6,18}$/i.test(value) ){
                    return "密码格式有误";
                }
            },
            password2:function(value){
                //获取password框的value
                let val = $("#reg-password").val();
                //和确认密码框的value作比较
                if(value===""){
                    return "请再次输入密码";
                }else if(value !== val){
                    return "两次密码输入不一致";
                }
            }
        });
        //登录提交监听
        form.on('submit(login)', function(data){
            $.ajax({
                method : "POST",
                url : "/log",
                data : data.field,
                success : function(data){
                    //console.log(msg);
                    if(data.code === 1){
                        //登录成功，跳转用户个人中心
                        layer.alert(data.msg,function(){
                            location.href = "/";
                        });
                    }else if(data.code === 0){
                        //登录失败，点击确定，关弹窗
                        layer.alert(data.msg,function(){
                            layer.close(layer.index);
                        });
                    }
                }
            });
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
        //注册提交监听
        form.on('submit(reg)', function(data){
            $.ajax({
                method : "POST",
                url : "/reg",
                data : data.field,
                success : function(data){
                    if(data.code === 1){
                        //注册成功，跳转回主页
                        layer.alert(data.msg,function(){
                            location.href = "/";
                        });
                    }else if(data.code === 0){
                        //登录失败，点击确定，关弹窗
                        layer.alert(data.msg,function(){
                            layer.close(layer.index);
                        });
                    }
                }
            });
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
        //登录窗身份选择事件监听
        form.on('select(log-identity)', function(data){
            let a=data.value;
            if(a==="学生"){
                $(".user-logID>label").text("学号：");
                $(".user-logID input").attr({"name":"studentID","placeholder":"请输入学号"});
                $(".login-req").css({display:"block"});
            }else if(a==="管理员"){
                $(".user-logID>label").text("账号：");
                $(".user-logID input").attr({"name":"accountID","placeholder":"请输入账号"});
                $(".login-req").css({display:"block"});
            }else if(a===""){
                $(".user-logID>label").text("");
                $(".user-logID input").attr({"name":"","placeholder":""});
                $(".login-req").css({display:"none"});
            }else{
                $(".user-logID>label").text("工号：");
                $(".user-logID input").attr({"name":"jobID","placeholder":"请输入工号"})
                $(".login-req").css({display:"block"});
            }
        });
        //注册窗身份选择事件监听
        form.on('select(reg-identity)', function(data){
            let a=data.value;
            if(a==="学生"){
                $(".user-regID>label").text("学号：");
                $(".user-regID input").attr({"name":"studentID","placeholder":"请输入学号"});
                $(".reg-req").css({display:"block"});
            }else if(a==="管理员"){
                $(".user-regID>label").text("账号：");
                $(".user-regID input").attr({"name":"accountID","placeholder":"请输入账号"});
                $(".reg-req").css({display:"block"});
            }else if(a===""){
                $(".user-regID>label").text("");
                $(".user-regID input").attr({"name":"","placeholder":""});
                $(".reg-req").css({display:"none"});
            }else{
                $(".user-regID>label").text("工号：");
                $(".user-regID input").attr({"name":"jobID","placeholder":"请输入工号"});
                $(".reg-req").css({display:"block"});
            }
        });
    });
})();