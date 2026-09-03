import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { Recipe } from '../../types/Recipe';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setError('Recipe not found.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) return <p>Loading recipe...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!recipe) return null;

  return (
    <div>
      <Link to="/recipes">&larr; Back to Recipes</Link>
      <h1>{recipe.title}</h1>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '400px' }} />
      )}
      <p>{recipe.description}</p>

      <div>
        {recipe.tags.map((tag) => (
          <span key={tag} style={{ marginRight: '0.5rem', background: '#eee', padding: '0.25rem 0.5rem' }}>
            {tag}
          </span>
        ))}
      </div>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>
            {ing.quantity} {ing.name}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((inst) => (
          <li key={inst.step}>{inst.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;