const express = require('express');

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBook,
  updateBookCover,
} = require('../controllers/books');
const uploadFile = require('../../middlewares/uploadFile');
const { hasValidAuthJwt } = require('../../middlewares/authenticated');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', hasValidAuthJwt, uploadFile.single('cover'), createBook);
router.put('/:id', hasValidAuthJwt, uploadFile.single('cover'), updateBookById);
router.delete('/:id', hasValidAuthJwt, deleteBook);

router.put('/:id', hasValidAuthJwt, uploadFile.single('cover'), updateBookCover);

module.exports = router;
