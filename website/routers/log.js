//log登录验证
//引入用户表
const student = require("../model/student");
const teacher = require("../model/teacher");
const administrator = require("../model/administrator");
//引入加密模块
const crypto = require("crypto");
module.exports = function(req,res){
    //console.log(req.body);
    //通过ID查找数据
    let identity,idName,id;
    if(req.body.identity==="学生"){
        identity=student;
        idName="studentID";
        id=req.body.studentID;
    }else if(req.body.identity==="管理员"){
        identity=administrator;
        idName="accountID";
        id=req.body.accountID;
    }else{
        identity=teacher;
        idName="jobID";
        id=req.body.jobID;
    }
    //console.log(identity);
    identity.findOne({[idName]:id})
        .then(data=>{
            //console.log(data);
            if(data){
                //用户存在，先验证身份
                let ity=data.identity;
                if(ity!==req.body.identity){   //身份不匹配
                    res.send({code:0,msg:"身份不正确"});
                }else{   //身份匹配，验证密码是否匹配
                    let pwd = crypto.createHash('sha256').update(req.body.password).digest("hex");
                    if( pwd === data.password){   //密码正确
                        //存一个session信息，存储登录的用户
                        req.session.userInfo = data;
                        res.send({code:1,msg:"登录成功"});
                    }else{    //密码错误
                        res.send({code:0,msg:"密码错误"});
                    }
                }
            }else{
                //用户不存在
                res.send({code:0,msg:"用户不存在~"});
            }
        })
        .catch(()=>{
            res.send({code:0,msg:"服务器异常，请稍后重试~"});
        });
};