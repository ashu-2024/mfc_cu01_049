import React, { useState } from 'react';

const DynamicEmailForm = () => {
  const [emails, setEmails] = useState([{ id: 1, email: '' }]);
  const [error, setError] = useState('');

  const handleEmailChange = (id, value) => {
    setEmails(emails.map(email => email.id === id ? { ...email, email: value } : email));
  };

  const handleAddEmail = () => {
    setEmails([...emails, { id: emails.length + 1, email: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const invalidEmail = emails.find(email => !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email.email));
    
    if (invalidEmail) {
      setError('Please enter valid email addresses.');
    } else {
      alert('Submitted emails: ' + emails.map(email => email.email).join(', '));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {emails.map((emailField) => (
          <div key={emailField.id}>
            <input
              type="email"
              value={emailField.email}
              onChange={(e) => handleEmailChange(emailField.id, e.target.value)}
              placeholder={`Email ${emailField.id}`}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddEmail}>Add Email</button>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Entered Emails:</h3>
        <ul>
          {emails.map((emailField, index) => (
            <li key={index}>{emailField.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicEmailForm;
