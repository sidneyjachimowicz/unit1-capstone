import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h1>Welcome to Spoonful</h1>
      <p>Discover, create, and share your favorite recipes.</p>
      <Link to="/recipes">
        <button>Explore Recipes</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default Landing;