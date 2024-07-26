import { describe, expect, test, vi } from "vitest";
import Author from "../models/authorModel.mjs";
import {
  deleteAuthor,
  findAuthorById,
  findAuthors,
  saveAuthor,
  updateAuthor,
} from "./authorDB.mjs";

vi.mock("./authorDB.mjs");
const testBook = {
  title: "The Smartest Giant in Southfields",
  author: "Marvelous Moody",
  ISBN: "1234551205360",
  price: 9.99,
  publisher: "Penguin Putnam Inc",
  yearPublished: "Jan-01-2002",
  numberOfPages: 224,
};
const testAuthor = {
  name: "Marvelous Moody",
  twitter: "@moody",
  publisher: "Mad House Publications",
  website: "www.marvelmoody.com",
  books: [testBook, testBook],
};

describe("Author DB Tests", () => {
  test("User should be able to SAVE a Author to DB", async () => {
    console.log("MOCK SAVE AUTHOR");
    const newAuthor = Object.assign(new Author(), testAuthor);
    const author = await saveAuthor(newAuthor);

    expect(author.name).toEqual("Marvelous Moody");
    expect(author.website).toEqual("www.marvelmoody.com");
    expect(author.publisher).toEqual("Mad House Publications");
    expect(author.twitter).toEqual("@moody");
    expect(author.books[0].title).toEqual("The Smartest Giant in Southfields");
  });

  test("User should be able to FIND a Author to DB", async () => {
    console.log("MOCK FIND AUTHORS");
    const authors = await findAuthors();

    expect(authors[0].name).toEqual("Marvelous Moody");
    expect(authors[0].website).toEqual("www.marvelmoody.com");
    expect(authors[0].publisher).toEqual("Mad House Publications");
    expect(authors[0].twitter).toEqual("@moody");
    expect(authors[0].books[0].title).toEqual(
      "The Smartest Giant in Southfields",
    );
  });

  test("User should be able to SAVE a Author to DB", async () => {
    console.log("MOCK FIND AUTHOR");
    const author = await findAuthorById();

    expect(author.name).toEqual("Marvelous Moody");
    expect(author.website).toEqual("www.marvelmoody.com");
    expect(author.publisher).toEqual("Mad House Publications");
    expect(author.twitter).toEqual("@moody");
    expect(author.books[0].title).toEqual("The Smartest Giant in Southfields");
  });
  test("User should be able to UPDATE a Author in DB", async () => {
    console.log("MOCK UPDATE AUTHOR");
    const result = await updateAuthor();

    expect(result.acknowledged).toEqual(true);
    expect(result.modifiedCount).toEqual(1);
    expect(result.upsertedId).toEqual(null);
    expect(result.upsertedCount).toEqual(0);
    expect(result.matchedCount).toEqual(1);
  });

  test("User should be able to DELETE a Author from DB", async () => {
    console.log("MOCK DELETE AUTHOR");
    const result = await deleteAuthor();

    expect(result.acknowledged).toEqual(true);
    expect(result.deletedCount).toEqual(1);
  });
});
