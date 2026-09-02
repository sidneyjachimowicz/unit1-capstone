import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import type { Recipe } from '../../types/Recipe';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/recipes`);
        setRecipes(res.data);
      } catch (err) {
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    const matchesTitle = recipe.title.toLowerCase().includes(term);
    const matchesTag = recipe.tags.some((tag) => tag.toLowerCase().includes(term));
    const matchesIngredient = recipe.ingredients.some((ing) =>
      ing.name.toLowerCase().includes(term)
    );

    return matchesTitle || matchesTag || matchesIngredient;
  });

  if (isLoading) return <p>Loading recipes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Browse Recipes</h1>
      <input
        type="text"
        placeholder="Search by title, tag, or ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredRecipes.length === 0 ? (
        <p>No matching recipes found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe._id}
              to={`/recipes/${recipe._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                />
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;