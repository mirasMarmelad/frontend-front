import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy-loaded components
const RegistrationPage = lazy(() => import('./Components/User/Registration'));
const LoginPage = lazy(() => import('./Components/User/Login'));
const MangaListPage = lazy(() => import('./Components/MangaLists/MangaList'));
const ProfilePage = lazy(() => import('./Components/User/Profile'));
const UserInfoUpdate = lazy(() => import('./Components/User/UserUpdate'));
const AdminPage = lazy(() => import('./Components/Manga/AdminPage'));
const MangaPage = lazy(() => import('./Components/Manga/Manga'));
const HomePage = lazy(() => import('./Components/User/HomePage'));
const PurchasePage = lazy(() => import('./Components/Manga/Purchase'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/manga" element={<MangaListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/update-profile" element={<UserInfoUpdate />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/manga/:id" element={<MangaPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
