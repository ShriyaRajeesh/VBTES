import { Link } from 'react-router-dom';
import { FaMicrophone, FaBusAlt } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="text-white bg-black min-h-screen p-6 ">
      <h1 className="text-3xl font-bold text-[#42f5e6] mb-6">
        Welcome to Your Dashboard 👋
      </h1>
      <p className="text-gray-300 mb-8">
        What would you like to do today?
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* Voice Query */}
        <Link
          to="/voice-query"
          className="bg-[#42f5e6] text-black p-6 rounded-lg shadow-md hover:bg-[#2cdad0] transition"
        >
          <div className="flex items-center justify-between mb-2">
            <FaMicrophone size={24} />
            <span className="text-sm font-semibold">Voice Query</span>
          </div>
          <p className="text-sm">Search transport info with your voice</p>
        </Link>

        {/* Transport Info */}
        <Link
          to="/transport-info"
          className="bg-[#1a1a1a] border border-[#42f5e6] p-6 rounded-lg shadow-md hover:bg-[#121212] transition"
        >
          <div className="flex items-center justify-between mb-2 text-[#42f5e6]">
            <FaBusAlt size={24} />
            <span className="text-sm font-semibold">Transport Info</span>
          </div>
          <p className="text-sm text-gray-300">View available transport and routes</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
