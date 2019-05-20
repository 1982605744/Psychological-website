const express = require("express"),
    mongoose = require("mongoose"),
    //cookieParser = require('cookie-parser')
    //引入express-session
    session = require("express-session"),
    mongooseSession = require("connect-mongo")(session);
//启动数据库
mongoose.connect("mongodb://localhost:27017/website", {useNewUrlParser: true})
        .then(() => {
            console.log("数据库连接成功")
        })
        .catch(() => {
            console.log("数据库连接失败")
        });
//创建app
let app = express();
app.listen(6159);

//设置session参数
app.use(session({
    secret: "abcdef",//密钥
    rolling: true,//只要用户和后端有交互（访问页面、跳转页面、ajax……），刷新存储时间
    resave: false,//是否每次请求都重新存储session
    saveUninitialized: false,//初始值
    cookie: {maxAge: 1000 * 60 * 10},//设置session过期时间
    store: new mongooseSession({
        url: "mongodb://localhost:27017/website"
    })//不设置store，服务器内存中存储session信息。通过设置store将session数据存储到数据库
}));
//默认中间件
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use((req,res,next)=>{
    req.data = {};
    if (req.session.userInfo) {
        req.data = req.session.userInfo;
    } else {
        req.data = {_id: null};
    }
    next();
})
//设置模板引擎
app.set("view engine", "ejs");
//监听 根路由
app.get("/",require("./routers/index"));
//注册 路由
app.post("/reg", require("./routers/reg"));
//登录 路由
app.post("/log", require("./routers/log"));
//退出登录 路由
app.get("/logout", (req, res) => {
    //清除session
    req.session.destroy();
    //重定向到首页
    res.redirect("/");
});
//用户中心的路由
app.get("/usercenter", require("./routers/usercenter"));
//更新个人信息 路由
app.post("/update", require("./routers/update"));
//修改密码路由
app.post("/changepassword",require("./routers/changepassword"));
//交流 路由
app.use("/talk", require("./routers/talk"));
//测评 路由
app.get("/test", require("./routers/test"));
//知识 路由，使用use调用子路由
app.use("/knowledge",require("./routers/knowledge"));
//娱乐 路由
app.use("/fun",require("./routers/fun"));
//乐园 路由
app.use("/play", require("./routers/play"));
//文章子路由
app.use("/article",require("./routers/article"));
//删除文章 路由
app.post("/delete",require("./routers/delete"));
//文章查找 路由
app.post("/search",require("./routers/search"));
//评论 路由
app.post("/comment",require("./routers/comment"));
