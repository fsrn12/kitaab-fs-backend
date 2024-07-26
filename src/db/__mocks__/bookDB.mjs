const testBook = {
  title: "The Smartest Giant in Southfields",
  author: "Marvelous Moody",
  ISBN: "1234551205360",
  price: 9.99,
  publisher: "Penguin Putnam Inc",
  yearPublished: "Jan-01-2002",
  numberOfPages: 224,
};
export const saveBook = async function (newBook) {
  return Promise.resolve(testBook);
};

export const findBooks = async function () {
  return Promise.resolve([testBook, testBook]);
};

export const findBook = async function () {
  return Promise.resolve(testBook);
};

export const updateBook = async function (filter, update) {
  return Promise.resolve({
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  });
};

export const deleteBook = async function (filter) {
  return Promise.resolve({
    acknowledged: true,
    deletedCount: 1,
  });
};
