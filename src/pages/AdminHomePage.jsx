import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow mb-6 p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Manage your menu and settings</p>
      </header>

      {/* 🧭 Navbar */}
      <nav className="bg-white shadow rounded mb-6 p-4 flex justify-center gap-6">
        <Link to="/qr" className="text-blue-600 hover:underline">QR Code</Link>
        <Link to="/view-menu" className="text-blue-600 hover:underline">Customer Menu</Link>
        <Link to="/admin" className="text-blue-600 hover:underline">Add Items</Link>
        <Link to="/edit/:id" className="text-blue-600 hover:underline">Edit Item</Link>
      </nav>

      {/* 👋 Welcome Section */}
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-semibold text-gray-700">Welcome, Admin!</h2>
        <p className="text-gray-500 mt-2">
          Use the links above to manage your restaurant app. From uploading dishes to generating QR codes, it’s all one click away.
        </p>
      </div>
    </div>
  );
};

export default AdminHomePage;