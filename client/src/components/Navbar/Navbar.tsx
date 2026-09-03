import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Logo />
      <div className="navbar-links">
        <Link to="/recipes">Recipes</Link>
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Signup</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
        <Link to="/ai-assistant">AI Assistant</Link>
        {token && (
          <button type="button" className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;