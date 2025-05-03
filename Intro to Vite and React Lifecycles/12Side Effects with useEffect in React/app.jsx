import React, { useState, useEffect } from 'react';
import './JokeFetcher.css';

function JokeFetcher() {
  const [joke, setJoke] = useState(null);

  const fetchJoke = async () => {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    setJoke(data);
  };

  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array means it runs only once on mount

  return (
    <div className="joke-container">
      {joke ? (
        <div className="joke-card">
          <h2>Random Joke</h2>
          <p><strong>Setup:</strong> {joke.setup}</p>
          <p><strong>Punchline:</strong> {joke.punchline}</p>
          <button onClick={fetchJoke}>Get Another Joke</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default JokeFetcher;
