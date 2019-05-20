const express=require("express");
//新建一个子路由
let router = express.Router();
router.get("/",(req,res)=> {
    res.render("./fun/fun", req.data);
});
router.get("/fun-FM",(req,res)=>{
    res.render("./fun/fun-FM",req.data);
});
router.get("/fun-music",(req,res)=>{
    res.render("./fun/fun-music",req.data)
});
router.get("/fun-shortFilms",(req,res)=>{
    res.render("./fun/fun-shortFilms",req.data)
});
router.get("/fun-shortFilms/fs-details",(req,res)=>{
    res.render("./fun/fs-details",req.data)
});
router.get("/fun-images",(req,res)=>{
    res.render("./fun/fun-images",req.data)
});
router.get("/fun-images/fi-details",(req,res)=>{
    res.render("./fun/fi-details",req.data)
});
router.get("/fun-jokes",(req,res)=>{
    res.render("./fun/fun-jokes",req.data)
});
router.get("/fun-jokes/fj-details",(req,res)=>{
    res.render("./fun/fj-details",req.data)
});
router.get("/fun-cartoons",(req,res)=>{
    res.render("./fun/fun-cartoons",req.data)
});
router.get("/fun-cartoons/fc-page",(req,res)=>{
    res.render("./fun/fc-page",req.data)
});
router.get("/fun-healing",(req,res)=>{
    res.render("./fun/fun-healing",req.data)
});
module.exports = router;