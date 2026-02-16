// src/services/trainerService.js
class TrainerService {
  constructor() {
    this.apiBase = "http://localhost:5000/api";
  }

  // Fetch all trainers
  async getAllTrainers() {
    try {
      const response = await fetch(`${this.apiBase}/trainers`);
      if (!response.ok) throw new Error("Failed to fetch trainers");
      return await response.json();
    } catch (error) {
      console.error("Error in getAllTrainers:", error);
      return [];
    }
  }

  // Fetch trainer by ID
  async getTrainerById(id) {
    try {
      const response = await fetch(`${this.apiBase}/trainers/${id}`);
      if (!response.ok) throw new Error("Failed to fetch trainer by ID");
      return await response.json();
    } catch (error) {
      console.error("Error in getTrainerById:", error);
      return null;
    }
  }

  // Fetch trainers by specialization (e.g. Yoga, HIIT, etc.)
  async getTrainersBySpecialization(specialization) {
    try {
      const response = await fetch(
        `${this.apiBase}/trainers/specialization/${encodeURIComponent(
          specialization
        )}`
      );
      if (!response.ok)
        throw new Error("Failed to fetch trainers by specialization");
      return await response.json();
    } catch (error) {
      console.error("Error in getTrainersBySpecialization:", error);
      return [];
    }
  }
}

export default new TrainerService();
