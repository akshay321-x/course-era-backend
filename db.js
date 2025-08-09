const mongoose=require("mongoose");
// mongoose.connect("mongodb+srv://bhabanakshay91:DJN9G0cn5nVNmZQ1@cluster0.y1ggu3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;
const Userschema= new Schema({
    email:{ type:String,unique:true},
    password:String,
    First_Name:String,
    Last_Name:String,

})
const adminschema= new Schema({
  email:{ type:String,unique:true},
    password:String,
    First_Name:String,
    Last_Name:String,

})
const courseschema=new Schema({
    Title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId

})
const purchasechema= new Schema({
    userId:ObjectId,
    courseId:ObjectId,
})

const userModel=mongoose.model("user",Userschema);
const adminModel=mongoose.model("admin",adminschema);
const courseModel=mongoose.model("course",courseschema);
const purchaseModel=mongoose.model("purchase",purchasechema);
module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel 

}