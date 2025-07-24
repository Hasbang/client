import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerMenuPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

 
    useEffect(() => {
    axios.get('http://resmenubackend.onrender.com/menu')
      .then(res => {
        setItems(res.data);
        setFilteredItems(res.data);
        const uniqueCategories = [...new Set(res.data.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setFilteredItems(
      category === 'All' ? items : items.filter(item => item.category === category)
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-center text-2xl font-bold mb-6">📱 View Our Menu</h1>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button onClick={() => handleFilter('All')} className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>All</button>
        {categories.map(category => (
          <button key={category} onClick={() => handleFilter(category)} className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{category}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div key={item._id} className="border rounded p-4 shadow-sm hover:shadow transition">
            <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover rounded mb-3" />
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-1">{item.description}</p>
            <p className="text-blue-600 font-bold">LE {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerMenuPage;