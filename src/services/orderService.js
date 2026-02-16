// src/services/orderService.js
class OrderService {
  constructor() {
    this.apiBase = "http://localhost:5000/api";
  }

  async placeOrder({ userId, items }) {
    try {
      const response = await fetch(`${this.apiBase}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, items }),
      });

      if (!response.ok) throw new Error("Failed to place order");

      const data = await response.json();
      return data; // ✅ this will include { message, order }
    } catch (error) {
      console.error("Error in placeOrder:", error);
      return { error: "Order placement failed" };
    }
  }

  async getUserOrders(userId) {
    try {
      const response = await fetch(`${this.apiBase}/orders/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      return await response.json();
    } catch (error) {
      console.error("Error in getUserOrders:", error);
      return [];
    }
  }

  async cancelOrder(orderId) {
    try {
      const response = await fetch(`${this.apiBase}/order/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to cancel order");
      return await response.json();
    } catch (error) {
      console.error("Error in cancelOrder:", error);
      return { error: "Cancel order failed" };
    }
  }
}

export default new OrderService();
