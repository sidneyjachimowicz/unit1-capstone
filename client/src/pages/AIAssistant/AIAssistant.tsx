import { useState } from 'react';
import './AIAssistant.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface HistoryItem {
  prompt: string;
  answer: string;
}

function AIAssistant() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setError('');

    let fullText = '';
    let buffer = '';

    try {
      const res = await fetch(`${BACKEND_URL}/api/ai/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
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
              setResponse(fullText);
            }
          } catch {
            // incomplete chunk, continue
          }
        }
      }

      setHistory((prev) => [{ prompt, answer: fullText }, ...prev].slice(0, 3));
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

 return (
  <div className="ai-assistant">
    <h1>AI Assistant</h1>
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !prompt.trim()}>
        {isLoading ? 'Generating...' : 'Submit'}
      </button>
    </form>

    {error && <p className="error-text">{error}</p>}
    {isLoading && !response && <p>Gemini is thinking...</p>}
    {response && <pre className="ai-response">{response}</pre>}

    {history.length > 0 && (
      <div className="ai-history">
        <h3>Recent History</h3>
        {history.map((h, i) => (
          <div key={i} className="ai-history-item">
            <p><strong>Q:</strong> {h.prompt}</p>
            <p><strong>A:</strong> {h.answer}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default AIAssistant;