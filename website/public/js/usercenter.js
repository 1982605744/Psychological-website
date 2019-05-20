//修改表单验证,注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use(['element','form','layedit','inputTags'], function(){
    //表单提交
    var form = layui.form;
    //富文本
    var layedit = layui.layedit;
    var index = layedit.build('article'); //建立编辑器
    //标签
    var inputTags = layui.inputTags;
    inputTags.render({
      elem:'#inputTags',//定义输入框input对象
      content: [],//默认标签
      aldaBtn: true//是否开启获取所有数据的按钮
    })
    //前端表单验证
    form.verify({
        age : function(value) {
            if(value){
                var intValue=parseInt(value);
                if(intValue<18||intValue>90) return "年龄不正确"
            }
        },
        department:function(value){
            if(value){
                if(["计算机系","生物系","外语系","化学系","中文系","历史系","体育系","音乐舞蹈系","思政部","数学系","物理系","教育系"].indexOf(value)===-1){
                    return "系别不正确"
                }
            }
        },
        class:function(value){
            if(value){
                if(["网络2101班","大数据2101班","计科2101班","生科2101班","体育2101班","历史2101班"].indexOf(value)===-1){
                    return "班级不正确"
                }
            }
        },
        tel : function(value){
            if(value){
                if( !/^1\d{10}$/.test(value)) return "手机号格式不正确"
            }
        },
        email : function(value){
            if(value){
                if( !/^[\da-z_]+@[\da-z]+(\.[a-z]+)+$/i.test(value))return "邮箱格式不正确"
            }
        },
        oldpassword:function(value){
            if(value===""){
                return "请输入原密码"
            }else if( !/^[\da-z_!@#$%^&*()+\[\]{}\-=,\.<>?]{6,18}$/i.test(value)){
                return "原密码格式有误";
            }
        },
        newpassword:function(value){
            if(value===""){
                return "请输入新密码";
            }else if(!/^[\da-z_!@#$%^&*()+\[\]{}\-=,\.<>?]{6,18}$/i.test(value)){
                return "新密码格式不正确";
            }
        },
        password3:function(value){
            //获取新密码的value
            var val =$("#newpassword").val();
            //和确认密码框的value作比较
            if(value===""){
                return "请再次输入密码";
            }else if(value !== val){
                return "两次密码输入不一致";
            }
        }
    });
    //保存修改信息按钮提交
    form.on('submit(update)', function(data){
        //console.log(data.field);
        var postData = {
            age : data.field.age,
            sex : data.field.sex || "",
            department : data.field.department,
            class : data.field.class,
            email : data.field.email,
            tel : data.field.tel,
            status : data.field.status
        };
        $.ajax({
            method : "POST",
            url : "/update",
            data : postData,
            success : function(data){
                if ( data.code === 1 ){
                    layer.alert(data.msg,function(){
                        location.reload()
                    });
                    $(".save-btn").hide();
                }else{
                    layer.alert(data.msg,function(){
                        layer.close(layer.index);
                    });
                }
            }
        });
        return false;
    });
    //修改密码按钮提交
    form.on('submit(change)',function(data){
        $.ajax({
            method : "POST",
            url : "/changepassword",
            data : data.field,
            success : function(data){
                if ( data.code === 1 ){
                    layer.alert(data.msg,function(){
                        location.reload()
                    });
                }else{
                    layer.alert(data.msg,function(){
                        layer.close(layer.index);
                    });
                }
            }
        });
        return false;
    });
    //监听文章发表
    form.on('submit(article)',function(data){
        var $title = $("#article-title"),
            $tags = $("#tags span em"),
            $content = $("#article");
        var postData = {
            title : $title.val()
            ,tags : []
            ,content : layedit.getContent(index)
        };
        $tags.each(function(){postData.tags.push($(this).text())});
        $.ajax({
            method : "POST"
            ,url : "/article"
            ,data : postData
            ,success : function(data){
                if ( data.code === 1 ){
                    layer.alert(data.msg,function(){
                        location.reload()
                    });
                }else{
                    layer.alert(data.msg,function(){
                        layer.close(layer.index);
                    });
                }
            }
            // ,error:function(xhr){alert(xhr.responseText)}
        });
        return false;
    });
});
//表单修改js
$(".update").click(function(){
    var $content = $(this).parent().siblings(".info-content");
    $content.find(".show").hide();
    $content.find(".hide").show();
    $(".save-btn").show();
});
//管理文章
//1查找按钮的点击
setTimeout(function(){
    var $searchInput = $("#search-input");
    let val = $searchInput.val();
    $.ajax({
        method : "POST"
        ,url : "/search"
        ,data : {keyword:val}
        ,success : function(data){
            if ( data.code === 1 ){
                append(data.data);
            }else{
                layer.alert(data.msg,function(){
                    layer.close(layer.index);
                });
            }
        }
        // ,error:function(xhr){alert(xhr.responseText)}    500错误提示哦
    });
},1000);
//2 查询文章和删除文章
function append(data){
    var html = "";
    var $tbody = $("#article-table tbody");
    data.forEach(v=>{
        html += `<tr><td><a href="article/${v._id}">${v.title}</a></td><td>${new Date(v.date)}</td><td><div class="layui-btn delete">删除</div></td></tr>`;
    });
    $tbody.append(html);
    var $delete = $tbody.find(".delete");
    $delete.each(function(i){$(this).data("_id",data[i])})
    $delete.click(function(){
        var _id = $(this).data("_id");
        var $this = $(this);
        $.ajax({
            method : "post"
            ,url : "/delete"
            ,data : {_id}
            ,success : function(data){
                if ( data.code === 1 ){
                    $this.parent().parent().remove();
                }else{
                    layer.alert(data.msg,function(){
                        layer.close(layer.index);
                    });
                }
            }
        });
    });
}
