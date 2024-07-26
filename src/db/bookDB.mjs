import Book from "../models/bookModel.mjs";

export const findBooks = async function (obj, selectBy) {
  return await Book.find(obj).select(selectBy).exec();
};

export const findBook = async function (obj, selectBy) {
  return await Book.findOne(obj).select(selectBy).exec();
};

export const saveBook = async function (newBook) {
  return await newBook.save();
};

export const updateBook = async function (filter, update) {
  return await Book.updateOne(filter, update, { new: true }).exec();
  // return await Book.findByIdAndUpdate(filter, update, { new: true }).exec();
};

export const deleteBook = async function (filter) {
  return await Book.deleteOne(filter).exec();
};
