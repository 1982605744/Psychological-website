const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let commentSchema = new Schema({
    content : {type:String,required:true},
    author : {type:Schema.Types.ObjectId,ref:"student"},
    article : {type:Schema.Types.ObjectId,ref:"article"},
    date : {type:Date,default:Date.now()}
});
//建表并返回
module.exports = mongoose.model("comment",commentSchema);