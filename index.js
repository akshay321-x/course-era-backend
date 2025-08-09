const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect("mongodb+srv://bhabanakshay91:slNoJQmZtPrO6kYo@cluster0.y1ggu3y.mongodb.net/");
  console.log("Connected to MongoDB");

  app.listen(3002, () => {
    console.log("App is listening on port 3002");
  });
}

main().catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});
