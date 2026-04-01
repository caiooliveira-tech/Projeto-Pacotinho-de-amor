import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';

// Páginas públicas
import Home from './pages/Home';
import Animals from './pages/Animals';
import AnimalDetail from './pages/AnimalDetail';
import Fairs from './pages/Fairs';
import Help from './pages/Help';
import AdoptionProcess from './pages/AdoptionProcess';
import SuccessStories from './pages/SuccessStories';
import AdoptionGuide from './pages/AdoptionGuide';
import Contact from './pages/Contact';

// Admin
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminAnimals from './pages/admin/Animals';
import AdminAnimalForm from './pages/admin/AnimalForm';
import AdminFairs from './pages/admin/Fairs';
import AdminFairForm from './pages/admin/FairForm';
import AdminStories from './pages/admin/Stories';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🐾</div>
        <p className="text-brand-purple font-semibold">Carregando...</p>
      </div>
    </div>
  );
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* Rotas públicas */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="adocao" element={<Animals />} />
      <Route path="adocao/:id" element={<AnimalDetail />} />
      <Route path="feirinhas" element={<Fairs />} />
      <Route path="ajude" element={<Help />} />
      <Route path="como-adotar" element={<AdoptionProcess />} />
      <Route path="historias" element={<SuccessStories />} />
      <Route path="guia-adotante" element={<AdoptionGuide />} />
      <Route path="contato" element={<Contact />} />
    </Route>

    {/* Login admin */}
    <Route path="/admin/login" element={<AdminLogin />} />

    {/* Rotas protegidas */}
    <Route path="/admin" element={
      <ProtectedRoute><AdminLayout /></ProtectedRoute>
    }>
      <Route index element={<AdminDashboard />} />
      <Route path="animais" element={<AdminAnimals />} />
      <Route path="animais/novo" element={<AdminAnimalForm />} />
      <Route path="animais/:id/editar" element={<AdminAnimalForm />} />
      <Route path="feirinhas" element={<AdminFairs />} />
      <Route path="feirinhas/nova" element={<AdminFairForm />} />
      <Route path="feirinhas/:id/editar" element={<AdminFairForm />} />
      <Route path="historias" element={<AdminStories />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
