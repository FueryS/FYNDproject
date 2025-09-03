import React, { use } from "react";
import { useCart } from "../Backend/CartContext"; // adjust path as needed
import "./leftBarMain.css";
import CartCard from "./CartElements/CartCard";
import OrderButton from "./CartElements/orderButton";

function LeftBarMain() {
  const { cartItems, clearCart, getTotalPrice } = useCart();

  const handleOrder = () => {
    clearCart();
  };

  return (
    <div className="menu">
      <CartCard />

      {/* Cart Section - wrapped in div for easy styling */}
      <div className="cart-section">
        <h3>Cart</h3>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <CartCard item={`${item.id}  -   Price :   ${item.price}rs`} />
              </div>
            ))}
            <div className="cart-total">
              <strong>Total: {getTotalPrice()}rs</strong>
            </div>
            <OrderButton handleclick={handleOrder} />
          </div>
        ) : (
          <p>Cart is empty</p>
        )}
      </div>
    </div>
  );
}

export default LeftBarMain;
