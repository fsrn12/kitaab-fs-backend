import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUser, saveUser } from "../db/db.mjs";
import User from "../models/userModel.mjs";
import response from "../templates/successRes.mjs";
import AppError from "../utils/appError.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import msgs from "../utils/msgs.mjs";

const createToken = function (user) {
  const { _id } = user;
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * (24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  };
  if (process.env.NODE_ENV === "development") {
    cookieOptions.secure = false;
  }
  return { token, cookieOptions };
};

/** ------------------------
**       SIGNUP
---------------------------- */
export const signup = catchAsync(async function signup(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return next(new AppError(msgs.emailRegisterFail, 400));
  }
  // 1: CHECK IF USER ALREADY REGISTERED IN DB
  let user = await findUser({ email });
  if (user) {
    return next(new AppError(msgs.emailExists, 501));
  }
  //2: CREATE NEW USER IN DB
  const newUser = Object.assign(new User(), req.body);
  //3: ENCRYPT/HASH USER PASSWORD
  const hash = await bcrypt.hash(newUser.password, 10);
  newUser.password = hash;
  //4: SAVE USER IN DB & RETURN JSON RESPONSE
  const dbUser = await saveUser(newUser);
  return response(res, 201, msgs.registrationSuccess, dbUser);
});

/** ------------------------
**       LOGIN
---------------------------- */
export const login = catchAsync(async function login(req, res, next) {
  //1: If user/password provided
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(msgs.invalidLogin, 400));
  }
  //2: Find/Return user in db with given email+password
  const user = await findUser({ email });
  if (!user) {
    return next(new AppError(msgs.userLoginFail, 501));
  }
  //3: Compare user password with dbUser password with bcrypt
  const isPasswordCorrect = await user.correctPassword(password, user.password);
  //4: Authentication Failed if no match
  if (!isPasswordCorrect) {
    return next(new AppError(msgs.authFail, 401));
  }
  //5: Authentication Successful -> Create JWT
  // const { token, cookieOptions } = createToken(user);
  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * (24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  };
  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  res.cookie("token", token, cookieOptions);
  user.password = undefined;
  return response(res, 200, msgs.loginSuccess, user, token, true);
});

/** ------------------------
**   AUTHORIZATION/PROTECT
---------------------------- */
export const auth = catchAsync(async function (req, res, next) {
  const token = req?.headers?.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET);
  next();
});
