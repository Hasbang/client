import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const MenuItemCard = ({ item }) => {
  const navigate = useNavigate();



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://resmenubackend.onrender.com/menu/${id}`);
      alert('Deleted!');
      window.location.reload(); // or trigger state refresh
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete failed');
    }
  };

const handleEdit = (item) => {
  navigate(`/edit/${item._id}`, { state: item });
};


  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <img
        src={item.imageURL}
        alt={item.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="text-blue-600 font-semibold">LE {item.price}</p>
      <button
        onClick={() => handleEdit(item)}
        className="mt-2 text-green-600 hover:underline text-sm"
      >
        Edit
      </button>
      <br />
      <button
        onClick={() => handleDelete(item._id)}
        className="mt-2 text-red-600 hover:underline text-sm"
      >
        Delete
      </button>

    </div>
  )
};

export default MenuItemCard;