import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of decadence and excess.",
    publishedYear: "1925"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    description: "A dystopian social science fiction.",
    publishedYear: "1949"
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A story of racial injustice.",
    publishedYear: "1960"
  }
];

const BookList = () => {
  const [books, setBooks] = useState(sampleBooks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  return (
    <>
      <div className="nav-header">
        <h1 className="nav-title">Book System</h1>
      </div>
      <div className="book-list">
        <Link to="/add-book" className="add-button">+ Add New Book</Link>
        {books.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            No books found. Add a new book to get started!
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <div className="book-actions">
                  <Link to={`/book/${book.id}`} className="btn-secondary">View Details</Link>
                  <Link to={`/edit-book/${book.id}`} className="btn-primary">Edit</Link>
                  <button className="btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookList; 