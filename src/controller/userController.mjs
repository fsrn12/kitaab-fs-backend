import { findUser, findUsers } from "../db/db.mjs";
import response from "../templates/successRes.mjs";
import AppError from "../utils/appError.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import msgs from "../utils/msgs.mjs";

export const getAllUsers = catchAsync(async function (req, res, next) {
  const users = await findUsers();
  if (!users || users.length < 0) {
    return next(new AppError(msgs.noUsers, 404));
  }
  return response(res, 200, msgs.usersFound, users);
});

export const getUser = catchAsync(async function (req, res, next) {
  const user = await findUser({ _id: req.params.userId });
  if (!user) {
    return next(new AppError(msgs.noUser, 404));
  }
  return response(res, 200, msgs.userFound, user);
});
