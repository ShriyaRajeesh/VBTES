// API configuration
const config = {
  // Base URL for API requests
  API_BASE_URL: import.meta.env.PROD 
    ? 'https://your-production-domain.com/api' // Replace with your production API URL
    : '/api', // This will use the Vite proxy in development

  // Helper function to build API URLs
  buildUrl: (endpoint) => `${config.API_BASE_URL}${endpoint}`,

  // Common headers for API requests
  headers: {
    'Content-Type': 'application/json',
  },

  // Helper function to make API requests
  async fetchApi(endpoint, options = {}) {
    const url = this.buildUrl(endpoint);
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  },
};

export default config; 