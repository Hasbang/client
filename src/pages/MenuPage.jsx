import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItemCard from '../components/MenuItemCard';

const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axios.get('http://resmenubackend.onrender.com')
      .then(res => {
        setItems(res.data);
        setFilteredItems(res.data);
        const uniqueCategories = [...new Set(res.data.map(item => item.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button 
          onClick={() => handleFilter('All')} 
          className={`px-4 py-2 rounded ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => handleFilter(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <MenuItemCard key={item._id} item={item} />
        ))}
        
      </div>
    </div>
  );
};

export default MenuPage;