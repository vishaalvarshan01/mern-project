const db = require("../models");
const Book = db.book;
const User = db.user;
const mongoose = require("mongoose");

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.books = (req, res) => {
  console.log(res.locals.user);
  // res.send(locals.user.id);
  Book.find()
    .then((items) => res.json({ username: res.locals.user, data: items }))
    .catch((error) => res.sendStatus(400).json("Error : ", error));
};

exports.addBookLike = (req, res) => {
  const id = req.params.id;
  const updatedItem = {
    liked_books: true,
  };
  Book.findOneAndUpdate({ book_id: id }, { $set: updatedItem }, (req, res, err) => {
    if (!err) console.log("item updated");
    else console.log(err);
  });
  res.send("book added to liked section");
};

exports.addBookReadLater = (req, res) => {
  const id = req.params.id;
  const updatedItem = {
    read_later: true,
  };
  Book.findOneAndUpdate({ book_id: id }, { $set: updatedItem }, (req, res, err) => {
    if (!err) console.log("item updated");
    else console.log(err);
  });
  res.send("book added to read later section");
};

exports.likedBooks = (req, res) => {
  Book.find({ liked_books: true })
    .then((book) => res.json({ username: res.locals.user, data: book }))
    .catch((error) => res.sendStatus(400).json("Error : ", error));
};

exports.readLaterBooks = (req, res) => {
  Book.find({ read_later: true })
    .then((book) => res.json({ username: res.locals.user, data: book }))
    .catch((error) => res.sendStatus(400).json("Error : ", error));
};

exports.adminBoard = (req, res) => {
  console.log(res.locals.user);
  res.status(200).send("Admin Content.");
};

exports.deleteUser = (req, res) => {
  console.log(res.locals.user);
  User.find({ username: req.params.name }).then((user) => {
    console.log(user[0].roles);
    if (user[0].roles.includes("62aea54c31906c56647f18a2")) {
      console.log("found");
      User.findOneAndDelete({ username: req.params.name }).then(() => {
        res.send(`${req.params.name} has been deleted !`);
      });
    } else {
      console.log("not an user");
      res.send(`${req.params.name} is not an user !`);
    }
  });
};

exports.deleteBook = (req, res) => {
  console.log(res.locals.user);
  Book.findOneAndDelete({ book_id: req.params.id }, (req, res, err) => {
    if (!err) console.log("item updated");
    else console.log(err);
  });
  res.send(`A book with id ${req.params.id} has been deleted !`);
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
