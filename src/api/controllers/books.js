const { Book } = require('../../api/model/mongo');
const { getAllBooksFromDB } = require('../../utils/functions');

const getAllBooks = async (req, res) => {
  try {
    const queryParams = req.query;
    const books = await getAllBooksFromDB(queryParams);
    res.status(200).json({ data: books });
  } catch (error) {
    res.status(400).json({ error: 'Error getting Book/s' });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json({ data: book });
  } catch (error) {
    res.status(400).json({ error: 'Error getting Book by id' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, genre, publication_year } = req.body;
    const coverPath = req.file ? req.file.path : 'none';

    const requiredFields = ['title', 'author'];

    const alreadyExists = await Book.findOne({ title: title });

    if (alreadyExists) {
      return res.status(400).json({ error: 'Book already exists' });
    }

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `The field ${field} is required` });
      }
    }

    const newBook = await new Book({
      title,
      author,
      genre,
      publication_year,
      cover: coverPath ?? 'none',
    });
    await newBook.save();

    res.status(201).json({ data: newBook, message: 'Book created successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating Book' });
  }
};

const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, publication_year } = req.body;
    const coverPath = req.file ? req.file.path : 'none';

    const newBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        genre,
        publication_year,
        cover: coverPath ?? 'none',
      },
      { new: true }
    );

    res.status(201).json({ data: newBook, message: 'Book successfully Updated!' });
  } catch (error) {
    res.status(400).json({ error: 'Error updating Book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.deleteOne({ _id: id });
    res.status(200).json({ data: 'OK', message: 'Book successfully Deleted!' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting Book' });
  }
};

const updateBookCover = async (req, res) => {
  const { path } = req.file;
  const { id } = req.params;

  await Book.updateOne({ _id: id }, { cover: path });

  res.status(201).json({ data: path });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBook,
  updateBookCover,
};
