import { useState, useEffect } from 'react';
import { FaRobot, FaSearch } from 'react-icons/fa';
import { voiceQueryService } from '../../services/voiceQueryService';

const TextQuery = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all the voice queries when the component mounts
  useEffect(() => {
    const fetchQueries = async () => {
      setError(null);
      setResponse('');
      try {
        setLoading(true);
        const result = await voiceQueryService.getVoiceQueries();
        setResponse(result); // Assuming result is the list or data of queries
      } catch (err) {
        setError('Failed to fetch queries. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#42f5e6] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Text Query System</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <button
              onClick={() => {}}
              className="px-6 py-3 bg-[#42f5e6] text-black rounded-full font-semibold flex items-center justify-center"
            >
              <FaSearch className="mr-2" /> Fetch Voice Queries
            </button>
          </div>

          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

          {loading && (
            <div className="text-center mb-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#42f5e6]"></div>
            </div>
          )}

          {response && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Fetched Queries:</h2>
              <div className="bg-gray-700 p-4 rounded flex items-start space-x-2">
                <FaRobot className="text-[#42f5e6] mt-1" />
                <p>{JSON.stringify(response, null, 2)}</p> {/* Display the fetched queries here */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextQuery;
