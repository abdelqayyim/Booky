import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import ProvidersPage from './pages/ProvidersPage';
import AppointmentsPage from './pages/AppointmentsPage';
import DisputesPage from './pages/DisputesPage';
import ReviewsPage from './pages/ReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import MonetizationPage from './pages/MonetizationPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPages from './pages/SettingsPages';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg-color)] text-gray-800">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes (wrapped in shared layout) */}
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="providers" element={<ProvidersPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="disputes" element={<DisputesPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="monetization" element={<MonetizationPage />} />

            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPages />} />

          </Route>

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
