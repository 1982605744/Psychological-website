const student = require("../model/student");
const teacher = require("../model/teacher");
const administrator = require("../model/administrator");
module.exports = function(req,res){
    //console.log(req.body);
    let identity,
        idName,
        id;
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
    //先验证学号是否已经注册占用
    identity.findOne({[idName]:id})
        //检测是否有已经对应的数据
        .then(data=>{
            //console.log(data);
            //如果ID已存在，返回错误信息给前端
            if(data){
                res.send({
                    code : 0,
                    msg : "ID已存在"
                });
            }else{
                //如果ID不存在，先检测两次密码是否一致
                if(req.body.password !== req.body.password2 ){
                    //两次密码不一致，返回前端信息
                    res.send({code : 0,msg:"两次密码不一致"});
                }else{
                    //两次密码一致，添加到数据库
                    identity.create(req.body)
                        .then(()=>{
                            res.send({code : 1,msg : "注册成功"});
                        })
                        .catch(()=>{
                            res.send({code : 0,msg : "服务器异常，请重试~"});
                        });
                }
            }
        })
        //抓错
        .catch(()=>{
            res.send({code : 0, msg : "服务器异常，请重试~"});
        });
};

