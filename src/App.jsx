// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminHomePage';
import EditItemPage from './pages/EditItemPage';
import CustomerMenuPage from './pages/CustomerMenuPage';
import QRCodePage from './pages/QRCodePage'
import AdminFormPage from './pages/AdminFormPage';



function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Things & Something
        </h1>
      </header>

      <main className="p-6">

        
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/admin-home" element={<AdminPage />} />
            <Route path="/admin" element={<AdminFormPage />} />
            <Route path="/edit/:id" element={<EditItemPage />} />
            <Route path="/view-menu" element={<CustomerMenuPage />} />
            <Route path="/qr" element={<QRCodePage />} />

          </Routes>
       


      </main>

      <footer className="bg-white p-4 mt-8 text-center text-sm text-gray-500">
        &copy; 2025 Things and Something Menu All rights reserved.
      </footer>
    </div>
  );
}

export default App;