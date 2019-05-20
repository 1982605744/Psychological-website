const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.render("./play/play",req.data);
});
router.get("/play-treeHole",(req,res)=>{
    res.render("./play/play-treeHole",req.data)
});
router.get("/play-fortunate",(req,res)=>{
    res.render("./play/play-fortunate",req.data)
});
router.get("/play-smileWall",(req,res)=>{
    res.render("./play/play-smileWall",req.data)
});
module.exports=router;