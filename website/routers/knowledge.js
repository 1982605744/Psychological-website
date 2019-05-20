const express=require("express");
//新建一个子路由
let router = express.Router();
router.get("/",(req,res)=> {
    res.render("./knowledge/knowledge", req.data);
});
router.get("/knowledge-classes",(req,res)=>{
    res.render("./knowledge/knowledge-classes",req.data);
});
router.get("/knowledge-classes/kc-details",(req,res)=>{
    res.render("./knowledge/kc-details",req.data);
});
router.get("/knowledge-articles",(req,res)=>{
    res.render("./knowledge/knowledge-articles",req.data)
});
router.get("/knowledge-articles/ka-details",(req,res)=>{
    res.render("./knowledge/ka-details",req.data);
});
router.get("/knowledge-books",(req,res)=>{
    res.render("./knowledge/knowledge-books",req.data)
});
router.get("/knowledge-books/kb-details",(req,res)=>{
    res.render("./knowledge/kb-details",req.data);
});
module.exports = router;
