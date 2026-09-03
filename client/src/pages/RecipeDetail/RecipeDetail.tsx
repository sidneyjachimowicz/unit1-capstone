import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Recipe } from '../../types/Recipe';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './RecipeDetail.css';

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
  <div className="recipe-detail-wrapper">
    <div className="recipe-detail">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Recipe List', to: '/recipes' }, { label: recipe.title }]} />
{recipe.image && <img src={recipe.image} alt={recipe.title} />}
<h1>{recipe.title}</h1>
<p>{recipe.description}</p>

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

<h3>Tags</h3>
<div className="tags-row">
  {recipe.tags.map((tag) => (
    <span key={tag} className="tag">
      {tag}
    </span>
  ))}
</div>
    </div>
  </div>
  );
}

export default RecipeDetail;