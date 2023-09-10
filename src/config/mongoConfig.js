import mongoose from "mongoose";
export const mongoConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    conn && console.log("Mongo Db is Connected to " + process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};
