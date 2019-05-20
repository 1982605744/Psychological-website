const student = require("../model/student");
const teacher = require("../model/teacher");
const administrator = require("../model/administrator");
module.exports = (req,res)=>{
    //console.log(req.session.userInfo);
    let _id = req.session.userInfo._id;
    let postData = req.body;
    let data = {};
    let identity;
    //console.log(Object.entries(postData));
    for(let [key,value] of Object.entries(postData)){
        if( value ) data["userInfo."+key] = value;
    }
    //console.log(data);
    if(req.session.userInfo.identity==="学生"){
        identity=student;
    }else if(req.session.userInfo.identity==="管理员"){
        identity=administrator;
    }else{
        identity=teacher;
    }
    //改
    identity.updateOne(
        {_id},
        {$set:data},
        {runValidators:true}
    ).then(()=>{
        res.send({
            code:1,
            msg:"更新成功！"
        });
    }).catch(e=>{
        throw e;
        /*let msg = e.ValidationError?"更新失败，服务器异常，请重试":"更新失败，数据格式不正确！";
        res.send({code:0,msg});*/
    });
};