import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`);
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  if (!book) {
    return <div className="error">Book not found</div>;
  }

  return (
    <div className="book-details">
      <div className="nav-header">
        <h1 className="nav-title">Book Details</h1>
      </div>
      <div className="details-container">
        <h2>{book.title}</h2>
        <div className="detail-item">
          <strong>Author:</strong> {book.author}
        </div>
        <div className="detail-item">
          <strong>Description:</strong>
          <p>{book.description}</p>
        </div>
        <div className="detail-item">
          <strong>Published Year:</strong> {book.publishedYear}
        </div>
        <div className="book-actions">
          <button className="view-button" onClick={() => navigate('/')}>Back to List</button>
          <Link to={`/edit-book/${id}`} className="edit-button">Edit Book</Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails; 