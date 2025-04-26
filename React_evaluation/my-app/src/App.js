import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';


const firebaseConfig = {
  databaseURL: "https://feedback-board-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const feedbackRef = ref(database, 'feedback');


function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}


function FeedbackItem({ feedback, onDelete }) {
  return (
    <div className="feedback-card">
      <div className="feedback-header">
        <h3>{feedback.name}</h3>
        <span className="feedback-email">{feedback.email}</span>
      </div>
      <p className="feedback-comment">{feedback.comment}</p>
      <div className="feedback-footer">
        <span className="feedback-date">
          {new Date(feedback.timestamp).toLocaleString()}
        </span>
        <button 
          className="delete-btn"
          onClick={() => onDelete(feedback.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}


function FeedbackList({ feedbacks, onDelete }) {
  return (
    <div className="feedback-list">
      <h2>Feedback Entries</h2>
      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedback yet. Be the first to submit!</p>
      ) : (
        feedbacks.map((feedback) => (
          <FeedbackItem 
            key={feedback.id} 
            feedback={feedback} 
            onDelete={onDelete} 
          />
        ))
      )}
    </div>
  );
}


function FeedbackForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.comment.trim()) newErrors.comment = 'Comment is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', comment: '' });
      setSubmitStatus({ success: true, message: 'Feedback submitted successfully!' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Failed to submit feedback. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      {submitStatus && (
        <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
          {submitStatus.message}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error-input' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error-input' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          className={errors.comment ? 'error-input' : ''}
        ></textarea>
        {errors.comment && <span className="error-message">{errors.comment}</span>}
      </div>
      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}


function App() {
  const [theme, setTheme] = useState('light');
  const [feedbacks, setFeedbacks] = useState([]);


  useEffect(() => {
    const savedTheme = localStorage.getItem('feedback-board-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('feedback-board-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  
  useEffect(() => {
    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbacksArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setFeedbacks(feedbacksArray);
      } else {
        setFeedbacks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  
  const submitFeedback = async (feedbackData) => {
    const timestamp = new Date().toISOString();
    await push(feedbackRef, {
      ...feedbackData,
      timestamp
    });
  };

  
  const deleteFeedback = async (id) => {
    const feedbackToDelete = ref(database, `feedback/${id}`);
    await remove(feedbackToDelete);
  };

  return (
    <div className="app">
      <header>
        <h1>Feedback Board</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      
      <div className="main-grid">
        <FeedbackForm onSubmit={submitFeedback} />
        <FeedbackList feedbacks={feedbacks} onDelete={deleteFeedback} />
      </div>
    </div>
  );
}

export default App;