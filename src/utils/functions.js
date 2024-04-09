const { Book, Review } = require('../api/model/mongo');

const getAllBooksFromDB = async (queryParams) => {
  const filterOptions = getFilterOptions(queryParams);

  try {
    const books = await Book.find(filterOptions);
    return books;
  } catch (error) {
    throw new Error(`Error fetching books: ${error.message}`);
  }
};

const getAllReviewsFromDB = async (queryParams) => {
  const filterOptions = getFilterOptions(queryParams);

  try {
    const reviews = await Review.find(filterOptions).populate([
      { path: 'book_id' },
      { path: 'user_id', select: 'name' },
    ]);
    return reviews;
  } catch (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
};

const getFilterOptions = (queryParams) => {
  const filterOptions = {};

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      filterOptions[key] = { $regex: new RegExp(queryParams[key], 'i') };
    }
  }

  return filterOptions;
};

module.exports = {
  getAllBooksFromDB,
  getAllReviewsFromDB,
};
