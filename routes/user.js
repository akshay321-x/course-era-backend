const { Router } = require("express");
const { userModel,purchaseModel, courseModel } = require("../db"); // or wherever your models are
const userRouter = Router();
const jwt=require("jsonwebtoken");
const{JWT_USER_PASSWORD}=require("../config");
const { userMiddleware } = require("../middelware/user");
const course = require("./course");
userRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, First_Name, Last_Name } = req.body;

    await userModel.create({
      email,
      password,
      First_Name,
      Last_Name,
    });

    res.json({ message: "signup succeeded" });
  } catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
  userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });

  if (user) {
    const token = jwt.sign(
      { id: user._id },
      JWT_USER_PASSWORD
    );

    res.json({ token });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials"
    });
  }
});
userRouter.get("/purchases",userMiddleware,async function(req,res){
  const userId=req.userId;
  const purchase=await purchaseModel.find({
    userId
  })
  let purchase_course_id=[];
  for (let i=0;i<purchase.length;i++){
    purchase_course_id.push(purchase[i].courseId)
  }
  const courseData=await courseModel.find({
    _id:{$in:purchase_course_id}
  })
  res.json({
    purchase,
    courseData

  })
})


module.exports = { userRouter };
