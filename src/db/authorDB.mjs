import Author from "../models/authorModel.mjs";

export const saveAuthor = async function (newAuthor) {
  return await newAuthor.save();
};

export const findAuthors = async function (obj, selectBy) {
  return await Author.find(obj).populate("book").select(selectBy).exec();
};

export const findAuthorById = async function (obj, selectBy) {
  return await Author.findOne(obj)
    .populate({ path: "book", fields: "title,ISBN, yearPublished, price " })
    .select(selectBy)
    .exec();
};

export const findAllAuthorIds = async function (obj, selectBy) {
  return await Author.find(obj).select(selectBy).exec();
};

export const updateAuthor = async function (filter, update) {
  return await Author.updateOne(filter, update, { new: true }).exec();
};

export const deleteAuthor = async function (obj, selectBy) {
  return await Author.deleteOne(obj).exec();
};
