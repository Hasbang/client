import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';




const AdminFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    isAvailable: true


  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    // data.append(key, value);
     // });
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('image', formData.image); // ✅ Only this will be picked up by Multer


  try {
    await axios.post('https://resmenubackend.onrender.com/menu', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Item added!');
    navigate('/menu');

  } catch (error) {
    console.error('💥 Upload failed:', error);
    alert('Upload failed');
  }
};



return (
  <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border rounded"
        required
      />

      {/* 🖼️ Image Upload — Just This One File Input */}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) =>
          setFormData(prev => ({ ...prev, image: e.target.files[0] }))
        }
        className="w-full p-2 border rounded"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Item
      </button>
    </form>
  </div>
);
};

export default AdminFormPage;