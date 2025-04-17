import api from '../config/api';

export const voiceQueryService = {
  // Submit a voice query
  async submitVoiceQuery(queryData) {
    return api.fetchApi('/voicequeries', {
      method: 'POST',
      body: JSON.stringify(queryData),
    });
  },

  // Get voice query logs
  async getVoiceQueryLogs() {
    return api.fetchApi('/voicequeries/logs');
  },

  // Get voice query by ID
  async getVoiceQueryById(id) {
    return api.fetchApi(`/voicequeries/${id}`);
  },

  // Get voice query status
  async getVoiceQueryStatus(id) {
    return api.fetchApi(`/voicequeries/${id}/status`);
  }
}; 