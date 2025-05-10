import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import '../styles/FoodItem.css';

function FoodItem({ item, showOrderForm = true }) {
  const { currentUser } = useAuth();
  const { orderFood } = useBooking();
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrder = () => {
    if (!currentUser) {
      // Redirect to login or show message
      alert('Please login to order food');
      return;
    }

    const order = {
      id: Date.now().toString(),
      foodId: item.id,
      foodName: item.name,
      quantity: quantity,
      price: item.price,
      totalPrice: item.price * quantity,
      userId: currentUser.id,
      userName: currentUser.name,
      orderDate: new Date().toISOString(),
      status: 'Ordered'
    };

    orderFood(order);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  return (
    <div className="food-item">
      <div className="food-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="food-item-content">
        <h3 className="food-item-title">{item.name}</h3>
        <p className="food-item-description">{item.description}</p>
        <div className="food-item-price">₹{item.price.toLocaleString()}</div>
        
        {showOrderForm && (
          <div className="food-item-order">
            <div className="quantity-control">
              <button 
                className="quantity-btn"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button 
              className="order-btn"
              onClick={handleOrder}
              disabled={!currentUser}
            >
              Order Now
            </button>
          </div>
        )}
        
        {orderSuccess && (
          <div className="order-success">
            Food ordered successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodItem;