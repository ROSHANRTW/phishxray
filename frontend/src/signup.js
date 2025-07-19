import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const API_BASE = "https://phishxray.onrender.com"; // ✅ Render backend URL
  const url = isLoginMode
    ? `${API_BASE}/api/auth/login`
    : `${API_BASE}/api/auth/signup`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post(url, formData);
      setMessage(res.data.message || 'Success!');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="signup-container">
      <h2>{isLoginMode ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isLoginMode ? 'Login' : 'Signup'}</button>
      </form>

      <p>
        {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Signup' : 'Login'}
        </button>
      </p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
