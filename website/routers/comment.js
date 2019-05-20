const comment = require("../model/comment");
module.exports = (req,res)=>{
    if( !req.session.userInfo ){
        return res.send({code:0,msg:"请先登录~"});
    }
    let userID = req.session.userInfo._id;
    let articleID = req.body.articleId;
    let content = req.body.desc;
    if( userID && articleID && content ){
        comment.create({
            content
            ,article:articleID
            ,author:userID
        }).then(data=>{
            return res.send({code:1,msg:"评论成功~"})
        }).catch(e=>{
            return res.send({code:0,msg:"服务器异常，请稍后重试~"})
        })
    }else{
        return res.send({code:0,msg:"评论信息有误~"})
    }
};