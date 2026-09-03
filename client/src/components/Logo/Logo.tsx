import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {
  return (
    <Link to="/" className="logo">
      <svg width="20" height="24" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
        <path d="M4 3c0 1.2-1 1.2-1 2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M7 3c0 1.2-1 1.2-1 2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M10 3c0 1.2-1 1.2-1 2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <ellipse cx="6.5" cy="12" rx="6" ry="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M2 12c0 2.5 2 5 4.5 5s4.5-2.5 4.5-5" stroke="currentColor" strokeWidth="2" fill="none" />
        <path
          d="M6.5 17c0 4 5 4 5 8.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span>poonful</span>
    </Link>
  );
}

export default Logo;