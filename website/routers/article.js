const express = require("express");
const article = require("../model/article");
const comment = require("../model/comment");
const router = express.Router();

//发表文章
router.post("/",(req,res)=>{
    let {title,tags,content} = req.body;
    if(!(title&&tags.length&&content)){
        return res.send({code:0,msg:"格式错误"});
    }
    article.create({
        title
        ,content
        ,tags:tags.join(",")
        ,author: req.session.userInfo._id
    }).then((data)=>{
        if(data){
            res.send({code:1,msg:"文章发表成功"});
        }else{
            res.send({code:0,msg:"服务器异常，请稍后重试~"});
        }
    }).catch(e=>{
        res.send({code:0,msg:"服务器异常，请稍后重试~"});
    })
});
//访问文章页面
router.get("/:_id",(req,res)=>{
    let _id = req.params._id;
    article.findById(_id)
        .then(data=>{
            if(data){
                req.data.aData=data;
                comment.find({"article":_id})
                    .then(data=>{
                        req.data.cData=data;
                        //console.log(req.data.aData)
                        //console.log(req.data.cData)
                        res.render("article",req.data);
                    })
                    .catch(e=>{
                        console.log(e);
                    })
            }else{
                req.data.aData={};
                res.render("article",req.data);
            }
        })
        .catch(e=>{
            console.log(e)
        });
});
module.exports = router;
