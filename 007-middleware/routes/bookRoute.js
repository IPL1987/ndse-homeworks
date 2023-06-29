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
  const book = books.findIndex(el => el.id === id)

  if (book !== -1) {
    res.json(books[book])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

router.get('/:id/download', (req, res) => {
  
  const { books } = stor
  const { id } = req.params
  const book = books.find(el => el.id === id)
  if (book) {
    res.download(books[book].fileBook, books[book].fileName)
  } else {
    res.status(404)
    res.json('404 | Книга не найдена')
  }
})

router.post('/:id/upload', fileMulter.single('file'), (req, res) => {
  const fileBook = req.file;
    if (!fileBook){
        res.json('Ошибка при загрузке файла');
        return;
    }

    const {books} = stor;
    const {title, desc, authors, favorite, fileCover} = req.body;
    const fileName = fileBook.originalname;

    const newBook = new Book(title, desc, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);

    res.json('Файл загружен');
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
  const book = books.findIndex(book => book.id === id)
  if (book !== -1) {
    books[book] = {
      ...books[book],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    }
    res.json(books[book])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

router.delete('/:id', (req, res) => {
  const { books } = stor
  const { id } = req.params
  const book = books.findIndex(book => book.id === id)
  if (book !== -1) {
    books.splice(book, 1)
    res.status(200)
    res.send("Ok");
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

module.exports = router;