import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

// const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [2, "Name must be at least 3 characters long"],
    maxLength: [12, "Name must be below 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [2, "Name must be at least 3 characters long"],
    maxLength: [12, "Name must be below 20 characters"],
  },
  // photo: {
  //   type: String,
  //   default: "default.webp",
  // },
  // role: {
  //   type: String,
  //   enum: ["admin", "user", "guide", "lead-guide"],
  //   default: "user",
  // },
  address: {
    type: String,
    minLength: [4, "Address name must be at least 4 characters long"],
    maxLength: [50, "Address name must not be more than 20 characters long"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City name is required"],
    minLength: [3, "City name must be at least 3 characters long"],
    maxLength: [24, "City name must not be more than 12 characters long"],
    trim: true,
  },
  postcode: {
    type: String,
    required: [true, "Postcode is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "You must provide an Email"],
    unique: [true, "Please provide another email"],
    lowercase: true,
    // validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please choose a password"],
    trim: true,
    // minLength: [8, "Password must have at least 8 characters"],
    // maxLength: [64, "Password cannot be more than 64 characters"],
    // select: false,
  },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, "Please confirm your password"],
  //   validate: {
  //     validator: function (pass) {
  //       return pass === this.password;
  //     },
  //     message: "Password doesn't match",
  //   },
  //   select: false,
  // },
  // passwordChangedAt: Date,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  // active: {
  //   type: Boolean,
  //   default: true,
  //   select: false,
  // },
});

// HASH CHECK Login Password with user Password
userSchema.methods.correctPassword = async (
  suppliedPassword,
  storedPassword,
) => {
  return await bcrypt.compare(suppliedPassword, storedPassword);
};

const User = model("User", userSchema);

export default User;
