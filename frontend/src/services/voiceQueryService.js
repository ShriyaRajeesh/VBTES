const voiceQueryService = {
  // Function to handle the API request for submitting the voice query
  submitVoiceQuery: async ({ query }) => {
    try {
      const response = await fetch('http://localhost:5000/api/voicequeries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }), // Sending the query in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the response from the server');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error submitting query: ' + err.message);
    }
  },

  // Function to handle the API request for getting voice query data
  getVoiceQueries: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/voicequeries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch voice queries from the server');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error getting voice queries: ' + err.message);
    }
  },
};

export { voiceQueryService };
