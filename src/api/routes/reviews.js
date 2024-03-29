const express = require('express');

const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReviewById,
  deleteReview,
} = require('../controllers/reviews');
const { hasValidAuthJwt } = require('../../middlewares/authenticated');

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.post('/', hasValidAuthJwt, createReview);
router.put('/:id', hasValidAuthJwt, updateReviewById);
router.delete('/:id', hasValidAuthJwt, deleteReview);

module.exports = router;
