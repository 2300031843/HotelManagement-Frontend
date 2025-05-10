import { useState } from 'react';
import { foodItems } from '../assets/data/food';
import FoodItem from '../components/FoodItem';
import '../styles/FoodPage.css';

function FoodPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get unique categories
  const categories = ['All', ...new Set(foodItems.map(item => item.category))];
  
  // Filter food items by category
  const filteredItems = selectedCategory === 'All' 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

  return (
    <div className="food-page">
      <div className="food-header">
        <h1>Our Menu</h1>
        <p>Delicious cuisines prepared by our expert chefs</p>
      </div>
      
      <div className="food-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="food-items-container">
        {filteredItems.map(item => (
          <FoodItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FoodPage;