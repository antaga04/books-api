const express = require('express');
const authRouter = require('./auth');
const booksRouter = require('./books');
const reviewsRouter = require('./reviews');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/books', booksRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
