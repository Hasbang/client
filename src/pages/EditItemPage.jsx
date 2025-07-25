import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditItemPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: state.name || '',
    description: state.description || '',
    category: state.category || '',
    price: state.price || '',
    image: '',
    isAvailable: state.isAvailable || true
  });

  const [previewURL, setPreviewURL] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.put(`https://resmenubackend.onrender.com/menu/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Item updated!');
      navigate('/menu');
    } catch (err) {
      console.error('Edit error:', err);
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Menu Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />

        {previewURL && (
          <img src={previewURL} alt="Preview" className="w-full h-48 object-cover rounded shadow mb-4" />
        )}

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Item
        </button>
      </form>
    </div>
  );
};

export default EditItemPage;