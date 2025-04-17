import { Link } from 'react-router-dom';
import { FaMicrophone, FaBusAlt } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="text-white bg-black min-h-screen p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#42f5e6] mb-6">
          Welcome to Your Dashboard 👋
        </h1>
        <p className="text-gray-300 mb-8">
          What would you like to do today?
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
        <div className="flex justify-center">
          <Link
            to="/voice-query"
            className="bg-[#42f5e6] text-black p-6 rounded-lg shadow-md hover:bg-[#2cdad0] transition w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <FaMicrophone size={24} />
              <span className="text-sm font-semibold">Voice Query</span>
            </div>
            <p className="text-sm">Search transport info with your voice</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
