import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import type { Ingredient, Instruction } from '../../types/Recipe';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function RecipeForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState<Instruction[]>([{ step: 1, description: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEditMode) return;

    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/recipes/${id}`);
        const recipe = res.data;
        setTitle(recipe.title);
        setDescription(recipe.description);
        setImage(recipe.image);
        setTags(recipe.tags.join(', '));
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
      } catch (err) {
        setError('Failed to load recipe for editing.');
      }
    };

    fetchRecipe();
  }, [id, isEditMode]);

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '' }]);
  const removeIngredient = (index: number) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const handleInstructionChange = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = { ...updated[index], description: value };
    setInstructions(updated);
  };

  const addInstruction = () =>
    setInstructions([...instructions, { step: instructions.length + 1, description: '' }]);
  const removeInstruction = (index: number) =>
    setInstructions(
      instructions.filter((_, i) => i !== index).map((inst, i) => ({ ...inst, step: i + 1 }))
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   if (!title.trim() || !description.trim()) {
  setError('Title and description are required.');
  return;
}

    setIsLoading(true);
    setError('');

    const payload = {
      title,
      description,
      image,
      ingredients,
      instructions,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (isEditMode) {
        await axios.put(`${BACKEND_URL}/api/recipes/${id}`, payload, { headers });
      } else {
        await axios.post(`${BACKEND_URL}/api/recipes`, payload, { headers });
      }

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>{isEditMode ? 'Edit Recipe' : 'Create Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <h3>Ingredients</h3>
        {ingredients.map((ing, i) => (
          <div key={i}>
            <input
              type="text"
              placeholder="Name"
              value={ing.name}
              onChange={(e) => handleIngredientChange(i, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ing.quantity}
              onChange={(e) => handleIngredientChange(i, 'quantity', e.target.value)}
            />
            <button type="button" onClick={() => removeIngredient(i)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          + Add Ingredient
        </button>

        <h3>Instructions</h3>
        {instructions.map((inst, i) => (
          <div key={i}>
            <span>Step {inst.step}: </span>
            <input
              type="text"
              placeholder="Description"
              value={inst.description}
              onChange={(e) => handleInstructionChange(i, e.target.value)}
            />
            <button type="button" onClick={() => removeInstruction(i)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addInstruction}>
          + Add Step
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditMode ? 'Update Recipe' : 'Create Recipe'}
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;