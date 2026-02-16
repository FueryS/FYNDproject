class HireService {
  constructor() {
    this.apiBase = "http://localhost:5000/api";
  }

  async hireTrainer({ trainerEmail, trainerName, userEmail, userName }) {
    try {
      const response = await fetch(`${this.apiBase}/hire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trainerEmail,
          trainerName,
          userEmail,
          userName,
        }),
      });
      if (!response.ok) throw new Error("Failed to hire trainer");
      return await response.json();
    } catch (error) {
      console.error("Error hiring trainer:", error);
      return { error: "Hiring failed" };
    }
  }

  //Get all hired trainers for a user
  async getHiredTrainers(userEmail) {
    try {
      const response = await fetch(`${this.apiBase}/hired/${userEmail}`);
      if (!response.ok) throw new Error("Failed to fetch hired trainers");
      return await response.json();
    } catch (error) {
      console.error("Error fetching hired trainers:", error);
      return [];
    }
  }

  // Remove a hired trainer
  async removeHiredTrainer(id) {
    try {
      const response = await fetch(`${this.apiBase}/hired/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove trainer");
      return await response.json();
    } catch (error) {
      console.error("Error removing hired trainer:", error);
      return { error: "Removal failed" };
    }
  }
}

export default new HireService();
