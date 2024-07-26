import {
  deleteAuthor,
  findAuthorById,
  findAuthors,
  saveAuthor,
  updateAuthor,
} from "../db/authorDB.mjs";
import Author from "../models/authorModel.mjs";
import response from "../templates/successRes.mjs";
import AppError from "../utils/appError.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import msgs from "../utils/msgs.mjs";

//#: GET All Authors
export const getAllAuthors = catchAsync(async function (req, res, next) {
  const authors = await findAuthors({}, "-__v");
  if (!authors || authors.length < 0) {
    return next(new AppError(msgs.noAuthors, 404));
  }
  return response(res, 200, msgs.getAllAuthors, authors);
});

//#: GET All Author Ids
export const getAllAuthorIds = catchAsync(async function (req, res, next) {
  const authors = await findAuthors({}, "_id, name");
  if (!authors) {
    return next(new AppError(msgs.noAuthors, 404));
  }
  return response(res, 200, msgs.getAllAuthors, authors);
});

//#: GET an Author by ID
export const getAuthorById = catchAsync(async function (req, res, next) {
  const author = await findAuthorById({ _id: req.params.authorId }, "-__v");
  if (!author) {
    return next(new AppError(msgs.noAuthor, 404));
  }
  return response(res, 200, msgs.getAuthor, author);
});

//#: Create New Author
export const createAuthor = catchAsync(async function (req, res, next) {
  const bookId = req.body.book[0];
  let author = await findAuthorById(
    {
      name: req.body.name,
      book: bookId,
      twitter: req.body.twitter,
    },
    "-__v",
  );
  if (author) {
    return next(new AppError(msgs.authorExists, 509));
  }
  author = Object.assign(new Author(), req.body);
  const newAuthor = await saveAuthor(author);
  if (!newAuthor) {
    return next(new AppError(msgs.noAuthorCreated, 500));
  }
  return response(res, 201, msgs.authorCreate, newAuthor);
});

//#: Update an Author
export const updateOneAuthor = catchAsync(async function (req, res, next) {
  const result = await updateAuthor({ _id: req.params.authorId }, req.body);
  if (result.matchedCount === 0 || result.modifiedCount === 0) {
    return next(new AppError(msgs.authorUpdateFailed, 500));
  }
  return response(res, 201, msgs.authorUpdated, result);
});

//#: Delete an Author
export const deleteOneAuthor = catchAsync(async function (req, res, next) {
  const result = await deleteAuthor({ _id: req.params.authorId });
  if (result.deletedCount === 0) {
    return next(new AppError(msgs.authorDeletionFailed, 500));
  }
  return response(res, 200, msgs.authorDeleted, result);
});
