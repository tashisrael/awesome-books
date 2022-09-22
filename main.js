const displaySection = document.querySelector('.list');
const author = document.getElementById('author');
const title = document.getElementById('title');
const addBtn = document.getElementById('btn');
class Book {
  availableBooks;

  constructor() {
    this.getFromLocalStorage();
  }

  saveToLocalStorage = (addedBooks) => localStorage.setItem('availableBooks', JSON.stringify(addedBooks));

  getFromLocalStorage = () => {
    this.availableBooks = JSON.parse(localStorage.getItem('availableBooks')) ?? [];
  };

  displayItem = () => {
    this.getFromLocalStorage();
    displaySection.innerHTML = '';
    this.availableBooks.forEach((availableBook, i) => {
      displaySection.innerHTML += `<div class="availableBook">
        <p>"${availableBook.title}" by ${availableBook.author}</p>
        <button class="remove" id=${i}>Remove</button>
        </div>`;
    });
  };

  addBook = (e) => {
    e.preventDefault();
    const addedBook = {
      title: title.value,
      author: author.value,
    };
    this.availableBooks.push(addedBook);
    this.clear();
    this.saveToLocalStorage(this.availableBooks);
    this.displayItem();
  };

  deleteBook = (i) => {
    const filterBooks = this.availableBooks
      .filter((availableBook) => availableBook !== this.availableBooks[i]);
    this.saveToLocalStorage(filterBooks);
    this.displayItem();
  };

clear = () => {
  title.value = '';
  author.value = '';
};
}
const availableBook = new Book();
document.addEventListener('DOMContentLoaded', () => {
  availableBook.displayItem();
});
addBtn.addEventListener('click', availableBook.addBook);
displaySection.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const targetId = +e.target.getAttribute('id');
    availableBook.deleteBook(targetId);
  }
});