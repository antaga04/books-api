const { getAllReviewsFromDB } = require('../../utils/functions');
const { Review } = require('../model/mongo');

const getAllReviews = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const reviews = await getAllReviewsFromDB(filter);
    res.status(200).json({ data: reviews });
  } catch (error) {
    res.status(400).json({ error: 'Error getting Review/s' });
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).populate([
      { path: 'book_id' },
      { path: 'user_id', select: 'name' },
    ]);
    res.status(200).json({ data: review });
  } catch (error) {
    res.status(400).json({ error: 'Error getting Review by id' });
  }
};

const createReview = async (req, res) => {
  try {
    const { user_id, book_id, rating, comment } = req.body;

    const requiredFields = ['user_id', 'book_id', 'rating', 'comment'];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `The field ${field} is required` });
      }
    }

    const newReview = await Review({
      user_id,
      book_id,
      rating,
      comment,
    });
    await newReview.save();

    res.status(201).json({ data: newReview, message: 'Review created successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating Review' });
  }
};

// const postCourse = async (req, res) => {
//   try {
//     const newCourse = new Course(req.body);
//     const course = await newCourse.save();
//     res.status(201).json({ data: newReview, message: 'Review created successfully!' });
//   } catch (error) {
//     res.status(400).json({ error: 'Error creating Review' });
//   }
// };

const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, book_id, rating, comment } = req.body;

    const newReview = await Review.findByIdAndUpdate(
      id,
      {
        user_id,
        book_id,
        rating,
        comment,
      },
      { new: true }
    );

    res.status(201).json({ data: newReview, message: 'Review successfully Updated!' });
  } catch (error) {
    res.status(400).json({ error: 'Error updating Review' });
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Review.deleteOne({ _id: id });

    res.status(200).json({ data: 'OK', message: 'Review successfully Deleted!' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting Review' });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReviewById,
  deleteReview,
};
