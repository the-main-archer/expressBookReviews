const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}



//only registered users can login


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let filtered_book = books[isbn]
  if (filtered_book) {
      let review = req.query.reviews;
      let reviewer = req.session.authorization['username'];
      if(review) {
          filtered_book['reviews'][reviewer] = review;
          books[isbn] = filtered_book;
      }
      res.send(`The review for the book with ISBN  ${isbn} has been added/updated.`);
  }
  else{
      res.send("Unable to find this ISBN!");
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
    let filtered_book = books[isbn];

    if (filtered_book) {
        let reviewer = req.session.authogitrization ? req.session.authorization['username'] : null;

        if (!reviewer) {
            return res.status(403).json({ message: 'User not authenticated.' });
        }

        let filtered_review = filtered_book.reviews;

        if (filtered_review && filtered_review[reviewer]) {
            delete filtered_review[reviewer];
            res.send(`Review for the ISBN ${isbn} posted by the user ${reviewer} deleted.`);
        } else {
            res.status(403).json({ message: "Can't delete, as this review has been posted by a different user or does not exist." });
        }
    } else {
        res.status(404).json({ message: 'Unable to find this ISBN!' });
    }
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
