import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';

import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import ProvidersPage from './pages/ProvidersPage';

import ProviderAppointmentsPage from './pages/Appointments/ProviderAppointmentsPage';
import ClientAppointmentsPage from './pages/Appointments/ClientAppointmentsPage';
import AdminAppointmentsPage from './pages/Appointments/AdminAppointmentsPage';

import DisputesPage from './pages/DisputesPage';
import ReviewsPage from './pages/ReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import MonetizationPage from './pages/MonetizationPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPages from './pages/SettingsPages';
import { ROLES } from './redux/ui/uiSlice';
function App() {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes (wrapped in shared layout) */}
          <Route path="/" element={<Layout />}>
            
            {/* Dashboard Pages */}
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Users Pages */}
            <Route path="users" element={<UsersPage />} />

            {/* Providers Pages */}
            <Route path="providers" element={<ProvidersPage />} />

            {/* Appointments Pages */}
            <Route path="appointments" element={ user?.role === ROLES.PROVIDER ? (<ProviderAppointmentsPage />) : user?.role === ROLES.CLIENT ? (<ClientAppointmentsPage />) : user?.role === ROLES.ADMIN ? (<AdminAppointmentsPage /> ) : ( <NotFound /> )}/>

            {/* Disputes Pages */}
            <Route path="disputes" element={<DisputesPage />} />

            {/* Reviews Pages */}
            <Route path="reviews" element={<ReviewsPage />} />

            {/* Notifications Pages */}
            <Route path="notifications" element={<NotificationsPage />} />

            {/* Monetization Pages */}
            <Route path="monetization" element={<MonetizationPage />} />

            {/* Reports Pages */}
            <Route path="reports" element={<ReportsPage />} />
            
            {/* Settings Pages */}
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
