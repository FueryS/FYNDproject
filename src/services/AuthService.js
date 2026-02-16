class AuthService {
  constructor() {
    this.apiBase = "http://localhost:5000/api";
  }

  // POST signup with address
  async signup({ username, email, password, address }) {
    try {
      const response = await fetch(`${this.apiBase}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, address }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Signup failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in signup:", error);
      return { error: error.message };
    }
  }

  // FIX: Use POST for login, no address field
  async login({ email, password }) {
    try {
      const response = await fetch(`${this.apiBase}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Login failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error in login:", error);
      return { error: error.message };
    }
  }
}

export default new AuthService();
