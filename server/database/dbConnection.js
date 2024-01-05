import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose.set("strictQuery", true);
  return mongoose
    .connect(uri)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
