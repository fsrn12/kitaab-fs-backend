import { Schema, model } from "mongoose";

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  book: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
      // required: true,
    },
  ],
  publisher: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: true,
  },
});

const Author = model("Author", authorSchema);

export default Author;
