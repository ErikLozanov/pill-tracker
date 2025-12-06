import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { AddPill } from './pages/AddPill';
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';

function App() {
  return (
    <Routes>
      <Route 
        path="/sign-in/*" 
        element={<div className="flex justify-center items-center h-screen bg-gray-50"><SignIn routing="path" path="/sign-in" /></div>} 
      />
      <Route 
        path="/sign-up/*" 
        element={<div className="flex justify-center items-center h-screen bg-gray-50"><SignUp routing="path" path="/sign-up" /></div>} 
      />

      <Route
        path="/*"
        element={
          <>
            <SignedIn>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={<AddPill />} />
                <Route path="/edit/:id" element={<AddPill />} />
              </Routes>
            </SignedIn>
            
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
}

export default App;