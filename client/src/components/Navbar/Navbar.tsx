import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <div className="navbar-links">
        <Link to="/recipes">Recipes</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/ai-assistant">AI Assistant</Link>
      </div>
    </nav>
  );
}

export default Navbar;