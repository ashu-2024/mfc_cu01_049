// src/components/LoginForm.jsx
import React from "react";
import { useFormInput } from "../hooks/useFormInput";

const LoginForm = () => {
  const username = useFormInput("");
  const password = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${username.value}, Password: ${password.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" {...username} />
      <input placeholder="Password" type="password" {...password} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
