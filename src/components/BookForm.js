import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sampleBooks } from './BookList';

const findBookById = (id) => {
  return sampleBooks.find(book => book.id === parseInt(id));
};

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: ''
  });

  useEffect(() => {
    if (isEditMode) {
      fetchBookDetails();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const book = findBookById(id);
      if (!book) {
        throw new Error('Book not found');
      }
      setBookData(book);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        isEditMode 
          ? `http://localhost:3000/api/books/${id}`
          : 'http://localhost:3000/api/books',
        {
          method: isEditMode ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        }
      );
      
      if (!response.ok) throw new Error('Failed to save book');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  if (error) {
    return (
      <div className="book-form">
        <div className="nav-header">
          <h1 className="nav-title">{isEditMode ? 'Edit Book' : 'Add New Book'}</h1>
        </div>
        <div className="error-message">
          {error}
          <button className="btn-secondary" onClick={() => setError(null)}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="book-form">
      <div className="nav-header">
        <h1 className="nav-title">{isEditMode ? 'Edit Book' : 'Add New Book'}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={(e) => setBookData({...bookData, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={(e) => setBookData({...bookData, author: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={(e) => setBookData({...bookData, description: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Published Year:</label>
          <input
            type="number"
            name="publishedYear"
            value={bookData.publishedYear}
            onChange={(e) => setBookData({...bookData, publishedYear: e.target.value})}
          />
        </div>
        <div className="book-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {isEditMode ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm; 