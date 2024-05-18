const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();







// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const get_books = new Promise ((resolve, reject) => {
      resolve(res.send(JSON.stringify(books,null,4)));
  });
  get_books.
      then(function(){
        console.log("Promise is resolved");
      }).
      catch(function(){
        console.log("Could not locate book");
      });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const get_books_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;

    if (req.params.isbn <=10) {
      resolve(res.send(books[isbn]));
    }

    else {
      reject(res.send('Could not locate ISBN'));
    }
  });
  get_books_isbn.
        then(function(){
            console.log("Promise is resolved");
   }).
        catch(function () { 
                console.log('Could not locate ISBN');
  });

});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const get_books_author = new Promise((resolve, reject) => {

    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
      }


    });
    reject(res.send("The mentioned author does not exist "))
        
    });

    get_books_author.then(function(){
            console.log("Promise is resolved");
   }).catch(function () { 
                console.log('The mentioned author does not exist');
  });

  });


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const get_books_title = new Promise((resolve, response) => {

    let booksbytitle = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        booksbytitle.push({"isbn":isbn,
        "title":books[isbn]["title"],
        "reviews":books[isbn]["reviews"]});
      }
    });

    resolve(res.send(JSON.stringify({booksbytitle},null,4)));
    reject(res.send("Cannot locate a book with this title"))
  });

  get_books_title.then(function(){
    console.log("Promise is resolved");
  }).catch(function(){
    console.log("Cannot locate a book with this title");
  });
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const review = req.params.isbn;
    res.send(books[review]);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
