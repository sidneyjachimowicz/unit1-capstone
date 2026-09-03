import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Recipe } from '../../types/Recipe';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, userId, logout } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/recipes`);
        const mine = res.data.filter((r: Recipe & { ownerId?: string }) => r.ownerId === userId);
        setRecipes(mine);
      } catch (err) {
        setError('Failed to load your recipes.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [userId]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert('Failed to delete recipe.');
    }
  };

  if (isLoading) return <p>Loading your recipes...</p>;

  return (
    <div className="dashboard">
      <h1>Your Recipes</h1>

      {error && <p className="error-text">{error}</p>}

      {recipes.length === 0 ? (
        <p>You haven't created any recipes yet.</p>
      ) : (
        <div className="dashboard-grid">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="dashboard-card">
              {recipe.image && <img src={recipe.image} alt={recipe.title} />}
              <div className="dashboard-card-body">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="dashboard-card-actions">
                  <Link to={`/dashboard/edit/${recipe._id}`}>
                    <button className="secondary">Edit</button>
                  </Link>
                  <button className="danger" onClick={() => handleDelete(recipe._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="dashboard-buttons">
        <Link to="/dashboard/new">
          <button>Create Recipe</button>
        </Link>
        <Link to="/recipes">
          <button className="secondary">Browse Recipes</button>
        </Link>
        <button className="secondary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;