import {
  deleteBook,
  findBook,
  findBooks,
  saveBook,
  updateBook,
} from "../db/bookDB.mjs";
import Book from "../models/bookModel.mjs";
import response from "../templates/successRes.mjs";
import AppError from "../utils/appError.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import msgs from "../utils/msgs.mjs";

export const getAllBooks = catchAsync(async function (req, res, next) {
  const books = await findBooks({}, "-__v");
  if (!books || books.length < 0) {
    return next(new AppError(msgs.noBooks, 404));
  }

  return response(res, 200, msgs.getAllBooks, books);
});

export const getAllBookIds = catchAsync(async function (req, res) {
  const books = await findBooks({}, "_id, title");
  if (!books || books.length < 0) {
    return next(new AppError(msgs.noBooks, 404));
  }
  return response(res, 200, msgs.getBookIds, books);
});

export const getBookById = catchAsync(async function (req, res, next) {
  const book = await findBook({ _id: req.params.bookId }, "-__v");
  if (!book) {
    return next(new AppError(msgs.noBook, 404));
  }
  return response(res, 200, msgs.getBook, book);
});

export const createBook = catchAsync(async function (req, res, next) {
  let book = await findBook({ ISBN: req.body.ISBN }, "-__v");
  if (book) {
    return next(new AppError(msgs.bookExists, 509));
  }

  book = Object.assign(new Book(), req.body);
  const newBook = await saveBook(book);
  if (!newBook) {
    return next(new AppError(msgs.noBookCreated, 500));
  }
  return response(res, 201, msgs.bookCreated, newBook);
});

export const updateOneBook = catchAsync(async function (req, res, next) {
  const result = await updateBook({ _id: req.params.bookId }, req.body);
  return response(res, 201, msgs.bookUpdated, result);
});

export const deleteOneBook = catchAsync(async function (req, res, next) {
  const result = await deleteBook({ _id: req.params.bookId });
  return response(res, 200, msgs.bookDeleted, result);
});
