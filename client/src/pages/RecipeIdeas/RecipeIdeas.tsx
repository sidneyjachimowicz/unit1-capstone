import { useState } from 'react';
import './RecipeIdeas.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface HistoryItem {
  ingredients: string;
  idea: string;
}

function RecipeIdeas() {
  const [ingredients, setIngredients] = useState('');
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim() || isLoading) return;

    setIsLoading(true);
    setIdea('');
    setError('');

    let fullText = '';
    let buffer = '';

    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/recipe-ideas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorBody.error || `Server error: ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const data = line.replace(/^data:\s*/, '').trim();
          if (!data) continue;

          try {
            const parsed = JSON.parse(data);
            const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              fullText += text;
              setIdea(fullText);
            }
          } catch {
            // incomplete chunk, continue
          }
        }
      }

      setHistory((prev) => [{ ingredients, idea: fullText }, ...prev].slice(0, 3));
      setIngredients('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-assistant">
      <h1>What Can I Cook?</h1>
      <p>Tell us what ingredients you have, and we'll suggest a recipe idea.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g. chicken, rice, broccoli..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !ingredients.trim()}>
          {isLoading ? 'Thinking...' : 'Get Recipe Idea'}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {isLoading && !idea && <p>Coming up with something tasty...</p>}
      {idea && <pre className="ai-response">{idea}</pre>}

      {history.length > 0 && (
        <div className="ai-history">
          <h3>Recent Ideas</h3>
          {history.map((h, i) => (
            <div key={i} className="ai-history-item">
              <p><strong>Ingredients:</strong> {h.ingredients}</p>
              <p><strong>Idea:</strong> {h.idea}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeIdeas;