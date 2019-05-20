const article = require("../model/article");
module.exports = (req, res) => {
    if (!req.session.userInfo) {
        res.send({ code: 0, msg: "登录失败，请重新登录哦~" })
    }
    let _id = req.session.userInfo._id;
    //关键词组成条件
    let conditions = {};
    let keyword = req.body.keyword;
    if (keyword) {
        let reg = new RegExp(keyword);
        conditions = {
            author: _id,
            $or: [
                { title: reg },
                { tags: reg },
                { content: reg }
            ]
        }
    } else {
        conditions = { author: _id }
    }
    //开始查找
    article.find(conditions)
        .then(data => {
            if (data.length) {
                res.send({ code: 1, data });
            } else {
                res.send({code: 0 , msg:"没有查找到相关数据~"})
            }
        })
        .catch(e => {
            res.send({code:0,msg:"服务器异常，请稍后再试~"})
        });
};