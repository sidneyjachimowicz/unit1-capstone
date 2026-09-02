import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing/Landing';
import Recipes from './pages/Recipes/Recipes';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import AIAssistant from './pages/AIAssistant/AIAssistant';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>
    </>
  );
}

export default App;