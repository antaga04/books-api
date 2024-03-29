const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publication_year: { type: Number, required: true },
  cover: { type: String, required: true },
});

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
  book_id: { type: mongoose.Types.ObjectId, ref: 'Book' },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, required: true, enum: ['user', 'admin'] },
  favourites: [{ type: mongoose.Types.ObjectId, ref: 'Book' }],
});

const Book = mongoose.model('Book', bookSchema);
const Review = mongoose.model('Review', reviewSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Book,
  Review,
  User,
};
