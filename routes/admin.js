const { Router } = require("express");
const { adminMiddleware } = require("../middelware/admin");
const adminRouter = Router();
const {adminModel, courseModel}=require("../db")
const jwt=require("jsonwebtoken");
const{JWT_ADMIN_PASSWORD}=require("../config");
adminRouter.post("/signup", async function(req, res) {
  
    const { email, password, First_Name, Last_Name } = req.body;

    await adminModel.create({
      email,
      password,
      First_Name,
      Last_Name,
    });
  res.json({
    message: "signup endpoint"
  });
});

  
adminRouter.post("/signin", async function(req, res) {
   const { email, password } = req.body;
  const admin = await adminModel.findOne({ email, password });

  if (admin) {
    const token = jwt.sign(
      { id: admin._id },
      JWT_ADMIN_PASSWORD
    );

    res.json({ token });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials"
    });
  }
});

adminRouter.post("/course", adminMiddleware,async function(req, res) {
  const adminId=req.userId;
  const{title,description,price,imageurl}=req.body;
  const course=await courseModel.create({
    title:title,
    description:description,
    price:price,
    imageUrl: imageurl,
    creatorId: adminId

  })


  res.json({
    message: "signup endpoint",
    courseId:course._id
  });
});

adminRouter.put("/course", adminMiddleware,async function(req, res) {
  const adminId=req.userId;
  const {title,description,imageUrl,price,courseId}=req.body;
  const course=await courseModel.updateOne({
    _id:courseId,
    creatorId:adminId
  },{
    title:title,
    description:description,
    imageUrl:imageUrl,
    price:price
  })
});

adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
 const adminId=req.userId;
  const course=await courseModel.updateOne({
    creatorId:adminId
  });
  res.json({
    message:"course updated"
  })
});
module.exports={
    adminRouter:adminRouter

}