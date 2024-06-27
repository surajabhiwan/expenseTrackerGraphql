import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB to :", connection.connection.host);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};
