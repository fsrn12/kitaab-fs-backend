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

export const saveAuthor = async function (newAuthor) {
  return Promise.resolve(testAuthor);
};

export const findAuthors = async function (obj, selectBy) {
  return Promise.resolve([testAuthor, testAuthor]);
};

export const findAuthorById = async function () {
  return Promise.resolve(testAuthor);
};

// export const findAllAuthorIds = async function (obj, selectBy) {
//   return await Author.find(obj).select(selectBy).exec();
// };

export const updateAuthor = async function (filter, update) {
  return Promise.resolve({
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  });
};

export const deleteAuthor = async function (obj, selectBy) {
  return Promise.resolve({
    acknowledged: true,
    deletedCount: 1,
  });
};
