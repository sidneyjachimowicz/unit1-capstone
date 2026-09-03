import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../Login/Login.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/users/signup`, { email, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed. That email may already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Create Account'}
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
<Link to="/login" className="auth-secondary-button">
  <button type="button" className="secondary full-width">Cancel</button>
</Link>
    </div>
  );
}

export default Signup;