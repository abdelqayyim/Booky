import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import HomePageLayout from './pages/HomePageLayout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/home' element={<HomePageLayout />} >
            <Route index element={<HomePage/>} /> 
          </Route>
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
