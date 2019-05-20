const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//引入node自带加密模块
const crypto = require("crypto");
//定义Schema
let studentSchema = new Schema({
    identity:{
        type:String,
        required:true
    },
    studentID : {
        type:String,
        required:true,
        match : /^[\d]{8}$/i
    },
    username:{
        type:String,
        required:true,
        match : /[\u4e00-\u9fa5]{2,4}/i
    },
    password : {
        type:String,
        required:true,
        match : /^[\da-z_!@#$%^&*()+\[\]{}\-=,\.<>?]{6,18}$/i
    },
    userInfo : {
        sex : {type:String,enum:["男","女"]},
        age : {type:Number,min:18,max:99},
        department : {type:String,enum:["计算机系","生物系","外语系","化学系"]},
        class : {type:String,enum:["网络2102班","大数据2101班"]},
        tel : {type:String,match : /^1\d{10}$/},
        email : {type:String,match : /^[\da-z_]+@[\da-z]+(\.[a-z]+)+$/i},
        status : {type:String,default : "静若处子，动若疯兔~"}
    }
});

//密码加密 中间件
studentSchema.pre("save",function(next){
    //console.log("我是保存之前的中间件函数");
    //console.log(this.password);
    //this.password = "";
    //使用node自带的加密模块，对传入的原始密码进行加密
    let newPwd = crypto.createHash('sha256').update(this.password).digest("hex");
    //替换将要保存的password字段
    this.password = newPwd;
    next();
});
//建表并返回
module.exports = mongoose.model("student",studentSchema);

