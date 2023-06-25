const { v4: uuid } = require('uuid')

class Book {
  constructor(
    title = 'title',
    desc = 'description',
    authors = 'authors',
    favorite = 'favorite',
    fileCover = 'fileCover',
    fileName = 'fileName',
    fileBook = 'fileBook',
    id = uuid()
    ) {
    this.title = title;
    this.desc = desc;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = id;
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

module.exports = Book;
module.exports = stor;