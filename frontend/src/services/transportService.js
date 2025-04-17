import api from '../config/api';

export const transportService = {
  // Get all transport information
  async getAllTransport() {
    return api.fetchApi('/transport');
  },

  // Get transport by ID
  async getTransportById(id) {
    return api.fetchApi(`/transport/${id}`);
  },

  // Get transport by route
  async getTransportByRoute(routeId) {
    return api.fetchApi(`/transport/route/${routeId}`);
  },

  // Get real-time updates for transport
  async getRealTimeUpdates(transportId) {
    return api.fetchApi(`/realtimeupdates/${transportId}`);
  },

  // Get schedule for transport
  async getSchedule(transportId) {
    return api.fetchApi(`/schedule/${transportId}`);
  }
}; 