import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './Components/User/Registration'; 
import LoginPage from './Components/User/Login';
import MangaListPage from './Components/MangaLists/MangaList';
import ProfilePage from './Components/User/Profile';
import UserInfoUpdate from './Components/User/UserUpdate';
import AdminPage from './Components/Manga/AdminPage';
import MangaPage from './Components/Manga/Manga';
import HomePage from './Components/User/HomePage';
import PurchasePage from './Components/Manga/Purchase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/manga" element={<MangaListPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-profile" element={<UserInfoUpdate />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/manga/:id" element={<MangaPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/" element={<HomePage />} />
        {/* Add other routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;
