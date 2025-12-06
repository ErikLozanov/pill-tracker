import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { AddPill } from './pages/AddPill';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddPill />} />
    </Routes>
  );
}

export default App;