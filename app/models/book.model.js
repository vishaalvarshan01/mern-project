const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    book_id: Number,
    author: String,
    book_title: String,
    read_later: Boolean,
    liked_books: Boolean,
  })
);

module.exports = Book;
