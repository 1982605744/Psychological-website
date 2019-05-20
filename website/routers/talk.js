const express=require("express");
let router=express.Router();
router.get("/",(req,res)=>{
    res.render("./talk/talk", req.data);
});
router.get("/talk-consultation",(req,res)=>{
    res.render("./talk/talk-consultation", req.data);
});
router.get("/talk-consultation/tc-space",(req,res)=>{
    res.render("./talk/tc-space", req.data);
});
router.get("/talk-pourout",(req,res)=>{
    res.render("./talk/talk-pourout",req.data);
});
router.get("/talk-pourout/tp-space",(req,res)=>{
    res.render("./talk/tp-space", req.data);
});
router.get("/talk-QA",(req,res)=>{
    res.render("./talk/talk-QA", req.data);
});
module.exports =router;