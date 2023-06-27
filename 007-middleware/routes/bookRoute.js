const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');
const { v4: uuid } = require('uuid')

class Book {
  constructor(
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = "",
    fileBook = ""
  ) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook
  }
}

const stor = {
  books: [
    new Book(
      'Книга 1',
      'Преступление и наказание',
      'Ф.М. Достоевский',
    ),
    new Book(
      'Книга 2',
      'Идиот',
      'Ф.М. Достоевский',
    ),
    new Book(
      'Книга 3',
      'Сон смешного человека',
      'Ф.М. Достоевский',
    ),
  ],
};

router.get('/', (req, res) => {
  const { books } = stor
  res.json(books)
})

router.get('/:id', (req, res) => {
  const { books } = stor
  const { id } = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx !== -1) {
    res.json(books[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

router.get('/:id/download', (req, res) => {
  const { books } = stor
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1 && books[index].fileBook) {
    res.download(books[index].fileBook, books[index].fileName)
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

router.post('/:id/upload', fileMulter.single('file'), (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  if (!req.file) {
    res.json(null);
    return;
  }

  const { path } = req.file;
  const index = books.findIndex(el => el.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      fileBook: path
    }
  } else {
    res.status(404);
    res.json('404 | страница не найдена');
  }
});

router.post('', (req, res) => {
  const { books } = stor
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
  books.push(newBook)
  res.status(201)
  res.json(newBook)
})

router.put('/:id', (req, res) => {
  const { books } = stor
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    books[index] = {
      ...books[index],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    }
    res.json(books[index])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

router.delete('/:id', (req, res) => {
  const { books } = stor
  const { id } = req.params
  const index = books.findIndex(book => book.id === id)
  if (index !== -1) {
    books.splice(index, 1)
    res.status(200)
    res.send("Ok");
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

module.exports = router;