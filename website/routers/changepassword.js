const student = require("../model/student");
const teacher = require("../model/teacher");
const administrator = require("../model/administrator");
const crypto=require("crypto");
module.exports=function(req,res){
    //如果传来的数据格式不正确
    if(!(req.body.oldpassword && req.body.newpassword)){
        return res.send({code:0,msg:"数据不完整"})
    }
    let identity;
    if(req.session.userInfo.identity==="学生"){
        identity=student;
    }else if(req.session.userInfo.identity==="管理员"){
        identity=administrator;
    }else{
        identity=teacher;
    }
    //判断旧密码正不正确
    identity.findById(req.session.userInfo._id)
        .then(data=>{
            if(data){
                let old=crypto.createHash("sha256").update(req.body.oldpassword).digest("hex");
                //如果原密码正确
                if(old===data.password){
                    data.password=req.body.newpassword;
                    data.save().then(()=>{
                        res.send({code:1,msg:"密码修改成功~"})
                    })
                }else{
                    res.send({code:0,msg:"旧密码不正确"})
                }
            }else{
                //用户不存在
                res.send({code:0,msg:"用户信息加载出错"})
            }
        })
        .catch(()=>{
            res.send({code:0,msg:"服务器异常"})
        })
};