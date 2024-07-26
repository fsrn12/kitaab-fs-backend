import mongoose from "mongoose";
import User from "../models/userModel.mjs";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE);
    console.log("✅ Database connected successfully");
  } catch (e) {
    console.error(`😡 Database failed to connect\n ${e}`);
  }
};

export const disconnect = async () => {
  await mongoose.connection.close();
};

export const findUser = async (obj) => {
  const user = await User.findOne(obj).exec();
  return user;
};

export const saveUser = async (newUser) => {
  return await newUser.save();
};

export const findUsers = async (selectBy = "-__v") => {
  return await User.find().select(selectBy).exec();
};
