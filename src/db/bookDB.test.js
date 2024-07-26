import { describe, expect, test, vi } from "vitest";
import Book from "../models/bookModel.mjs";
import {
  deleteBook,
  findBook,
  findBooks,
  saveBook,
  updateBook,
} from "./bookDB.mjs";

vi.mock("./bookDB.mjs");

const testBook = {
  title: "The Smartest Giant in Southfields",
  author: "Marvelous Moody",
  ISBN: "1234551205360",
  price: 9.99,
  publisher: "Penguin Putnam Inc",
  yearPublished: "Jan-01-2002",
  numberOfPages: 224,
};

describe("Book DB Tests", () => {
  test("User should be able to SAVE a Book to DB", async () => {
    console.log("MOCK SAVE BOOK");
    const newBook = Object.assign(new Book(), testBook);
    const savedBook = await saveBook(newBook);

    expect(savedBook.title).toEqual("The Smartest Giant in Southfields");
    expect(savedBook.author).toEqual("Marvelous Moody");
    expect(savedBook.ISBN).toEqual("1234551205360");
    expect(savedBook.price).toEqual(9.99);
    expect(savedBook.publisher).toEqual("Penguin Putnam Inc");
    expect(savedBook.yearPublished).toEqual("Jan-01-2002");
    expect(savedBook.numberOfPages).toEqual(224);
  });

  test("User should be able to FIND a Book to DB", async () => {
    console.log("MOCK FIND BOOKS");
    const books = await findBooks();

    expect(books[0].title).toEqual("The Smartest Giant in Southfields");
    expect(books[0].author).toEqual("Marvelous Moody");
    expect(books[0].ISBN).toEqual("1234551205360");
    expect(books[0].price).toEqual(9.99);
    expect(books[0].publisher).toEqual("Penguin Putnam Inc");
    expect(books[0].yearPublished).toEqual("Jan-01-2002");
    expect(books[0].numberOfPages).toEqual(224);
  });

  test("User should be able to SAVE a Book to DB", async () => {
    console.log("MOCK FIND BOOK");
    const book = await findBook({
      title: "The Smartest Giant in Southfields",
    });

    expect(book.title).toEqual("The Smartest Giant in Southfields");
    expect(book.author).toEqual("Marvelous Moody");
    expect(book.ISBN).toEqual("1234551205360");
    expect(book.price).toEqual(9.99);
    expect(book.publisher).toEqual("Penguin Putnam Inc");
    expect(book.yearPublished).toEqual("Jan-01-2002");
    expect(book.numberOfPages).toEqual(224);
  });
  test("User should be able to UPDATE a Book in DB", async () => {
    console.log("MOCK UPDATE BOOK");
    const result = await updateBook();

    expect(result.acknowledged).toEqual(true);
    expect(result.modifiedCount).toEqual(1);
    expect(result.upsertedId).toEqual(null);
    expect(result.upsertedCount).toEqual(0);
    expect(result.matchedCount).toEqual(1);
  });

  test("User should be able to DELETE a Book from DB", async () => {
    console.log("MOCK DELETE BOOK");
    const result = await deleteBook();

    expect(result.acknowledged).toEqual(true);
    expect(result.deletedCount).toEqual(1);
  });
});
