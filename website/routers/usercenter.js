const student = require("../model/student");
const teacher = require("../model/teacher");
const administrator = require("../model/administrator");
module.exports = function(req,res){
    if( req.session.userInfo ){
        let identity;
        if(req.session.userInfo.identity==="学生"){
            identity=student;
        }else if(req.session.userInfo.identity==="管理员"){
            identity=administrator;
        }else{
            identity=teacher;
        }
        identity.findById(req.session.userInfo._id).then(data=>{
            res.render("usercenter",data);
        });
    }else{
        res.render("usercenter",{_id:null});
    }
};