// src/components/OrderButton.jsx
import React from "react";
import styled from "styled-components";
import { useCart } from "../../Backend/CartContext";
import { useUser } from "../../Backend/userContext";
import OrderService from "../../services/orderService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledWrapper = styled.div`
  button {
    position: relative;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 10px;
    cursor: pointer;
    background: linear-gradient(90deg, #ff6a00, #ee0979);
    color: white;
    transition: 0.3s ease;
  }

  button:hover {
    transform: scale(1.05);
  }
`;

const OrderButton = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();

  const handleOrder = async () => {
    if (!user) {
      toast.warning("⚠️ Please login to place an order");
      return;
    }

    if (cartItems.length === 0) {
      toast.info("🛒 Your cart is empty!");
      return;
    }

    const items = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    toast.info("🕒 Placing your order...");

    const result = await OrderService.placeOrder({
      userId: user._id,
      items,
    });

    if (result.error) {
      toast.error("❌ Order failed! Please try again later.");
    } else {
      clearCart();
      toast.success(
        `✅ Order placed successfully! Total: ₹${result.order.totalPrice.toFixed(
          2
        )}`
      );
    }
  };

  return (
    <StyledWrapper>
      <button onClick={handleOrder}>
        <span>Place Order</span>
      </button>
    </StyledWrapper>
  );
};

export default OrderButton;
