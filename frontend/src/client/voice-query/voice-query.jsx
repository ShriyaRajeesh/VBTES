import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop, FaRobot, FaKeyboard } from 'react-icons/fa';
import { voiceQueryService } from '../../services/voiceQueryService';

const VoiceQuery = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textQuery, setTextQuery] = useState('');
  const [activeTab, setActiveTab] = useState('voice'); // 'voice' or 'text'
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Init SpeechRecognition only once
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Sorry, your browser does not support Speech Recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      await handleQuery(spokenText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
      setError('Error recognizing speech. Please try again.');
    };

    recognitionRef.current = recognition;
  }, []);

  const handleStart = () => {
    setTranscript('');
    setResponse('');
    setError(null);
    recognitionRef.current?.start();
  };

  const handleStop = () => {
    recognitionRef.current?.stop();
  };

  const handleQuery = async (query) => {
    try {
      setLoading(true);
      const result = await voiceQueryService.submitVoiceQuery({ query });
      setResponse(result.response);
    } catch (err) {
      console.error('Error processing query:', err);
      setError('Failed to process your query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textQuery.trim()) {
      handleQuery(textQuery);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#42f5e6] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Query System</h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('voice')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'voice' ? 'bg-[#42f5e6] text-black' : 'text-gray-400'
              }`}
            >
              <FaMicrophone className="inline mr-2" />
              Voice Query
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'text' ? 'bg-[#42f5e6] text-black' : 'text-gray-400'
              }`}
            >
              <FaKeyboard className="inline mr-2" />
              Text Query
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          {activeTab === 'voice' ? (
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={handleStart}
                disabled={listening}
                className={`px-6 py-3 rounded-full ${
                  listening ? 'bg-gray-600' : 'bg-[#42f5e6] text-black'
                } font-semibold flex items-center space-x-2`}
              >
                <FaMicrophone />
                <span>Start Recording</span>
              </button>
              <button
                onClick={handleStop}
                disabled={!listening}
                className={`px-6 py-3 rounded-full ${
                  !listening ? 'bg-gray-600' : 'bg-red-500'
                } font-semibold flex items-center space-x-2`}
              >
                <FaStop />
                <span>Stop Recording</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleTextSubmit} className="mb-6">
              <div className="flex flex-col space-y-4">
                <textarea
                  value={textQuery}
                  onChange={(e) => setTextQuery(e.target.value)}
                  placeholder="Type your query here..."
                  className="w-full h-32 p-4 bg-gray-700 text-white rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#42f5e6]"
                />
                <button
                  type="submit"
                  disabled={!textQuery.trim()}
                  className={`px-6 py-3 rounded-full ${
                    !textQuery.trim() ? 'bg-gray-600' : 'bg-[#42f5e6] text-black'
                  } font-semibold flex items-center justify-center space-x-2`}
                >
                  <FaRobot />
                  <span>Submit Query</span>
                </button>
              </div>
            </form>
          )}

          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}

          {(transcript || textQuery) && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Your Query:</h2>
              <p className="bg-gray-700 p-4 rounded">{activeTab === 'voice' ? transcript : textQuery}</p>
            </div>
          )}

          {loading && (
            <div className="text-center mb-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#42f5e6]"></div>
            </div>
          )}

          {response && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Response:</h2>
              <div className="bg-gray-700 p-4 rounded flex items-start space-x-2">
                <FaRobot className="text-[#42f5e6] mt-1" />
                <p>{response}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceQuery;
