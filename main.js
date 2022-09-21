class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static newClass(title, author) {
    const books = Book.getBooks();
    books.forEach((book, index) => {
      if (book.title === title && book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {
    const books = Book.getBooks();
    books.forEach((book) => Book.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#list');

    const text = document.createElement('h4');

    text.innerHTML = `<div class = "bkHtml">
      <div class = "bookauthor">
      <h3>"${book.title}" </h3>
      <h3> by ${book.author}</h3>
      </div>
      <button type="button" class= "delete">Remove </button>
      </div>
      `;
    list.appendChild(text);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }
  // static clearFields() {
  //   document.querySelector('#title').value = '';
  //   document.querySelector('#author').value = '';
  // }
}

document.addEventListener('DOMContentLoaded', Book.displayBooks);
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = new Book(title, author);
  Book.addBookToList(book);
  Book.addBook(book);
  Book.clearFields();
});

document.querySelector('#list').addEventListener('click', (e) => {
  Book.deleteBook(e.target);

  Book.newClass(e.target.previousSibling.previousSibling.previousSibling.previousSibling
    .textContent,
  e.target.previousSibling.previousSibling.textContent);
});
