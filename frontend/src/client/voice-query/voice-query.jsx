import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaStop, FaRobot } from 'react-icons/fa';

const VoiceQuery = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
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
    recognition.lang = 'en-IN'; // use 'en-US' or 'en-IN' based on your region
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);

      // Simulate backend response
      const simulated = simulateResponse(spokenText);
      setResponse(simulated);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleStart = () => {
    setTranscript('');
    setResponse('');
    recognitionRef.current?.start();
  };

  const handleStop = () => {
    recognitionRef.current?.stop();
  };

  const simulateResponse = (text) => {
    // Replace this logic when backend is ready
    if (text.toLowerCase().includes('bus')) return 'Next bus to Mumbai is at 10:45 AM from Gate 2.';
    if (text.toLowerCase().includes('train')) return 'The next train departs at 3:15 PM from Platform 1.';
    return 'Sorry, I could not find that information.';
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#42f5e6] mb-4">🎤 Voice Query</h1>
      <p className="text-gray-400 mb-6">Click the microphone and ask something like “When is the next bus to Delhi?”</p>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          {!listening ? (
            <button
              onClick={handleStart}
              className="bg-[#42f5e6] text-black px-6 py-2 rounded-lg shadow hover:bg-[#2cdad0] transition"
            >
              <FaMicrophone className="inline mr-2" />
              Start Listening
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-500 transition"
            >
              <FaStop className="inline mr-2" />
              Stop
            </button>
          )}
          {listening && <span className="text-[#42f5e6]">Listening...</span>}
        </div>

        {transcript && (
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#42f5e6]">
            <h2 className="text-lg font-semibold text-[#42f5e6]">You said:</h2>
            <p className="mt-1">{transcript}</p>
          </div>
        )}

        {response && (
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#42f5e6] mt-4">
            <h2 className="text-lg font-semibold text-[#42f5e6] flex items-center gap-2">
              <FaRobot /> System Response:
            </h2>
            <p className="mt-1 text-gray-300">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceQuery;
