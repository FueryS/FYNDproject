// services/OfferService
// .js
class OfferService {
  constructor() {
    this.apiBase = "http://localhost:5000/api";
    this.imageBase = "http://localhost:5000";
  }

  async getOffers() {
    try {
      const response = await fetch(`${this.apiBase}/offers`);
      if (!response.ok) throw new Error("Failed to fetch offers");
      return await response.json();
    } catch (error) {
      console.error("Error in getOffers:", error);
      return [];
    }
  }

  async getOffersById(id) {
    try {
      const response = await fetch(`${this.apiBase}/offers/${id}`);
      if (!response.ok) throw new Error("Failed to fetch offer by id");
      return await response.json();
    } catch (error) {
      console.error("Error in getOfferById:", error);
      return null;
    }
  }

  getImageUrl(filename) {
    return `${this.imageBase}${filename}`;
  }
}

export default new OfferService();
