
const firebaseConfig = {
    databaseURL: "https://feedback-board-b1800-default-rtdb.firebaseio.com/", 
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database().ref('feedbacks');
  
  function ThemeToggle({ theme, toggleTheme }) {
    return (
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    );
  }
  
  function FeedbackForm({ addFeedback }) {
    const [formData, setFormData] = React.useState({ name: '', email: '', comment: '' });
    const [message, setMessage] = React.useState('');
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    };
  
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.comment) {
        setMessage('All fields are  mandatory.');
        return;
      }
      if (!validateEmail(formData.email)) {
        setMessage('Invalid email type.');
        return;
      }
      try {
        await fetch(`${firebaseConfig.databaseURL}/feedbacks.json`, {
          method: "POST",
          body: JSON.stringify({...formData, timestamp: Date.now()}),
        });
        setFormData({ name: '', email: '', comment: '' });
        setMessage('Feedback submitted!');
        addFeedback();
      } catch (error) {
        setMessage('Error submitting feedback.');
      }
    };
  
    return (
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <textarea name="comment" placeholder="Comment" value={formData.comment} onChange={handleChange}></textarea>
        <button type="submit">Submit</button>
        {message && <p className="message">{message}</p>}
      </form>
    );
  }
  
  
  function FeedbackItem({ feedback, id, deleteFeedback }) {
    return (
      <div className="feedback-card">
        <h3>{feedback.name}</h3>
        <p>{feedback.comment}</p>
        <small>{feedback.email}</small>
        <button onClick={() => deleteFeedback(id)}>Delete</button>
      </div>
    );
  }
  
  
  function FeedbackList({ feedbacks, deleteFeedback }) {
    return (
      <div className="feedback-list">
        {Object.entries(feedbacks).reverse().map(([id, feedback]) => (
          <FeedbackItem key={id} id={id} feedback={feedback} deleteFeedback={deleteFeedback} />
        ))}
      </div>
    );
  }
  
  
  function App() {
    const [feedbacks, setFeedbacks] = React.useState({});
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  
    React.useEffect(() => {
      fetchFeedbacks();
    }, []);
  
    const fetchFeedbacks = async () => {
      const res = await fetch(`${firebaseConfig.databaseURL}/feedbacks.json`);
      const data = await res.json();
      setFeedbacks(data || {});
    };
  
    const deleteFeedback = async (id) => {
      await fetch(`${firebaseConfig.databaseURL}/feedbacks/${id}.json`, { method: "DELETE" });
      fetchFeedbacks();
    };
  
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };
  
    React.useEffect(() => {
      document.body.className = theme;
    }, [theme]);
  
    return (
      <div className="container">
        <header className="header">
          <h1>Feedback Board</h1>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>
        <main>
          <FeedbackForm addFeedback={fetchFeedbacks} />
          <FeedbackList feedbacks={feedbacks} deleteFeedback={deleteFeedback} />
        </main>
      </div>
    );
  }
  
  
  ReactDOM.render(<App />, document.getElementById('root'));
  
    