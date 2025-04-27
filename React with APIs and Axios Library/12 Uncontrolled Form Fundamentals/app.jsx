import React, { useRef } from 'react';

const UncontrolledForm = () => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredText = inputRef.current.value;
    alert(`Entered text: ${enteredText}`);
    inputRef.current.value = '';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Text:
          <input type="text" ref={inputRef} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
