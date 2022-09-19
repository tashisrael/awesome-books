const addBook = document.querySelector('#btn');
const bookList = document.querySelector('#list');
const form = document.querySelector('#form');

const Book = function objBook(title, author) {
	this.title = title;
	this.author = author;
};

let storedBooks = [];

function addBooks(newBook) {
	const bookStore = `<div class = "book">
	<h2> Title: ${newBook.title}</h2> 
	<h2> Author: ${newBook.author}</h2>
	<button id="delete" type="button">Remove</button>
	<hr>
	</div>`;
	bookList.innerHTML += bookStore;
	return bookList.innerHTML;
}

addBook.addEventListener('click', (e) => {
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const newBook = new Book(title.value, author.value);
addBooks(newBook);
title.value ='';
author.value = '';
});
