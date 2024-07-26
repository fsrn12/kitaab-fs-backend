import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book must have a title"],
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  publisher: {
    type: String,
  },
  yearPublished: {
    type: String,
    required: true,
  },
  numberOfPages: {
    type: Number,
  },
});

const Book = model("Book", bookSchema);

export default Book;
