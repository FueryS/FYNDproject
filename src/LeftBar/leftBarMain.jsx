import React, { useState, useEffect } from "react";
import { useCart } from "../Backend/CartContext";
import { useUser } from "../Backend/userContext";
import OrderService from "../services/orderService";
import "./leftBarMain.css";
import CartCard from "./CartElements/CartCard";
import OrderButton from "./CartElements/orderButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaClock,
  FaHome,
  FaPhone,
  FaReceipt,
  FaTrashAlt,
} from "react-icons/fa";

function LeftBarMain() {
  const { cartItems, getTotalPrice } = useCart();
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?._id) {
      const fetchOrders = async () => {
        const result = await OrderService.getUserOrders(user._id);
        if (result.error) toast.error("Failed to load your orders");
        else setOrders(result);
      };
      fetchOrders();
    }
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    const result = await OrderService.cancelOrder(orderId);
    if (result.error) toast.error("Failed to cancel order");
    else {
      toast.success("Order cancelled successfully");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    }
  };

  const totalOrderAmount = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  return (
    <div className="menu">
      <ToastContainer position="top-right" autoClose={2000} />
      <CartCard />

      <div className="cart-section">
        <h3>Cart</h3>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <CartCard item={`${item.name} - ₹${item.price}`} />
              </div>
            ))}
            <div className="cart-total">
              <strong>Total: ₹{getTotalPrice()}</strong>
            </div>
            <OrderButton />
          </div>
        ) : (
          <p>Cart is empty</p>
        )}
      </div>

      {user && (
        <div className="orders-section">
          <h3>Your Orders</h3>
          {orders.length > 0 ? (
            <>
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <p className="order-ticket">
                    <FaReceipt className="icon" />{" "}
                    <strong>Order Ticket:</strong> {order._id}
                  </p>
                  <p className="order-total">
                    💰 <strong>Total:</strong> ₹{order.totalPrice.toFixed(2)}
                  </p>
                  <p className="order-details">
                    <FaClock className="icon" /> Your order will arrive in{" "}
                    <strong>7 days</strong>
                    <br />
                    <FaHome className="icon" /> To:{" "}
                    <strong>{order.address}</strong>
                    <br />
                    <FaPhone className="icon" /> We will contact you on:{" "}
                    <strong>{order.email}</strong>
                  </p>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    <FaTrashAlt /> Cancel Order
                  </button>
                  <hr />
                </div>
              ))}
              <div className="orders-summary">
                <strong>
                  Total Spent on Orders: ₹{totalOrderAmount.toFixed(2)}
                </strong>
              </div>
            </>
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LeftBarMain;
