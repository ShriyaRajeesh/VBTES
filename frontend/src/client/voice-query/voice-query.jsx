import { useState } from 'react';
import { FaRobot, FaSearch, FaMicrophone } from 'react-icons/fa';
import axios from 'axios';

const VoiceQuery = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userQuery, setUserQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Handle voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice recognition not supported in your browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserQuery(transcript);
      handleQuerySubmit(transcript);
    };

    recognition.onerror = (event) => {
      setError('Error occurred in recognition: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Handle query submission
  const handleQuerySubmit = async (query) => {
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const response = await axios.post('http://localhost:5000/api/voicequeries', {
        query: query
      });

      setResponse(response.data.response);
    } catch (err) {
      console.error('Error submitting query:', err);
      setError(err.response?.data?.error || 'Failed to process your query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#42f5e6] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Transport Enquiry System</h1>

        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg mb-8">
          <div className="mb-6 flex flex-col space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Type your transport query..."
                className="flex-1 bg-gray-700 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#42f5e6]"
                onKeyPress={(e) => e.key === 'Enter' && handleQuerySubmit(userQuery)}
              />
              <button
                onClick={() => handleQuerySubmit(userQuery)}
                className="px-4 py-3 bg-[#42f5e6] text-black rounded font-semibold flex items-center justify-center hover:bg-[#35d9cb] transition-colors"
                disabled={loading}
              >
                <FaSearch />
              </button>
            </div>

            <button
              onClick={handleVoiceInput}
              className={`px-6 py-3 ${isListening ? 'bg-red-500' : 'bg-[#42f5e6]'} text-black rounded-full font-semibold flex items-center justify-center hover:bg-[#35d9cb] transition-colors`}
              disabled={isListening || loading}
            >
              <FaMicrophone className="mr-2" />
              {isListening ? 'Listening...' : 'Speak your query'}
            </button>
          </div>

          {error && (
            <div className="text-red-500 mb-4 p-3 bg-red-900 bg-opacity-30 rounded text-center">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center mb-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#42f5e6]"></div>
              <p className="mt-2">Processing your query...</p>
            </div>
          )}

          {response && !loading && (
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <div className="flex items-start space-x-3">
                <FaRobot className="text-[#42f5e6] mt-1 flex-shrink-0" />
                <p className="whitespace-pre-wrap">{response}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceQuery;