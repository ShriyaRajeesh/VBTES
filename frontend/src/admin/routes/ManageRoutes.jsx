import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageRoutes() {
  const [routes, setRoutes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({
    _id: '',
    start_stop: '',
    end_stop: '',
    stops: [],
    distance_km: 0
  });
  const [newStop, setNewStop] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all routes
  const fetchRoutes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/routes');
      setRoutes(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching routes:", err);
      setError("Failed to load routes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Create or Update Route
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentRoute._id) {
        // Update existing route
        const response = await axios.put(
          `http://localhost:5000/api/routes/${currentRoute._id}`,
          currentRoute
        );
        setRoutes(routes.map(route => 
          route._id === currentRoute._id ? response.data : route
        ));
      } else {
        // Create new route
        const response = await axios.post(
          'http://localhost:5000/api/routes',
          currentRoute
        );
        setRoutes([...routes, response.data]);
      }
      
      setIsModalOpen(false);
      setCurrentRoute({
        _id: '',
        start_stop: '',
        end_stop: '',
        stops: [],
        distance_km: 0
      });
      setError(null);
    } catch (err) {
      console.error("Error saving route:", err);
      setError("Failed to save route. Please try again.");
    }
  };

  // Edit Route
  const handleEdit = (route) => {
    setCurrentRoute(route);
    setIsModalOpen(true);
  };

  // Delete Route
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/routes/${_id}`);
      setRoutes(routes.filter(route => route._id !== _id));
      setError(null);
    } catch (err) {
      console.error("Error deleting route:", err);
      setError("Failed to delete route. Please try again.");
    }
  };

  // Add stop to the stops array
  const handleAddStop = () => {
    if (newStop && !currentRoute.stops.includes(newStop)) {
      setCurrentRoute({
        ...currentRoute,
        stops: [...currentRoute.stops, newStop]
      });
      setNewStop('');
    }
  };

  // Remove stop from the stops array
  const handleRemoveStop = (stop) => {
    setCurrentRoute({
      ...currentRoute,
      stops: currentRoute.stops.filter(s => s !== stop)
    });
  };

  // Reset form
  const resetForm = () => {
    setCurrentRoute({
      _id: '',
      start_stop: '',
      end_stop: '',
      stops: [],
      distance_km: 0
    });
    setNewStop('');
    setIsModalOpen(false);
    setError(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Routes</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-[#42f5e6] text-black px-4 py-2 rounded hover:bg-[#35d9cb] transition-colors"
        >
          Add New Route
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center text-white py-8">Loading routes...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-[#0f0f0f] border border-[#42f5e6] rounded-xl">
            <thead>
              <tr className="text-[#42f5e6] border-b border-[#42f5e6]">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Start Stop</th>
                <th className="p-3 text-left">End Stop</th>
                <th className="p-3 text-left">Stops</th>
                <th className="p-3 text-left">Distance (km)</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.length > 0 ? (
                routes.map((route) => (
                  <tr key={route._id} className="text-white border-t border-[#42f5e6] hover:bg-[#1a1a1a]">
                    <td className="p-3">{route._id}</td>
                    <td className="p-3">{route.start_stop}</td>
                    <td className="p-3">{route.end_stop}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {route.stops.map(stop => (
                          <span key={stop} className="bg-[#42f5e6] text-black px-2 py-1 rounded text-xs">
                            {stop}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{route.distance_km}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEdit(route)}
                        className="bg-[#42f5e6] text-black px-2 py-1 rounded mr-2 hover:bg-[#35d9cb] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(route._id)}
                        className="border border-[#42f5e6] px-2 py-1 rounded text-[#42f5e6] hover:bg-[#42f5e6] hover:text-black transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-white">
                    No routes found. Add your first route!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f0f0f] border border-[#42f5e6] rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#42f5e6] mb-4">
              {currentRoute._id ? 'Edit Route' : 'Add New Route'}
            </h3>
            
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white mb-2">Start Stop</label>
                <input
                  type="text"
                  value={currentRoute.start_stop}
                  onChange={(e) => setCurrentRoute({
                    ...currentRoute, 
                    start_stop: e.target.value
                  })}
                  className="w-full bg-[#1a1a1a] border border-[#42f5e6] rounded p-2 text-white focus:outline-none focus:ring-1 focus:ring-[#42f5e6]"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">End Stop</label>
                <input
                  type="text"
                  value={currentRoute.end_stop}
                  onChange={(e) => setCurrentRoute({
                    ...currentRoute, 
                    end_stop: e.target.value
                  })}
                  className="w-full bg-[#1a1a1a] border border-[#42f5e6] rounded p-2 text-white focus:outline-none focus:ring-1 focus:ring-[#42f5e6]"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">Distance (km)</label>
                <input
                  type="number"
                  min="0"
                  value={currentRoute.distance_km}
                  onChange={(e) => setCurrentRoute({
                    ...currentRoute, 
                    distance_km: parseInt(e.target.value) || 0
                  })}
                  className="w-full bg-[#1a1a1a] border border-[#42f5e6] rounded p-2 text-white focus:outline-none focus:ring-1 focus:ring-[#42f5e6]"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">Stops</label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={newStop}
                    onChange={(e) => setNewStop(e.target.value)}
                    className="flex-1 bg-[#1a1a1a] border border-[#42f5e6] rounded p-2 text-white mr-2 focus:outline-none focus:ring-1 focus:ring-[#42f5e6]"
                    placeholder="Add stop ID"
                  />
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="bg-[#42f5e6] text-black px-4 py-2 rounded hover:bg-[#35d9cb] transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 min-h-10">
                  {currentRoute.stops.length > 0 ? (
                    currentRoute.stops.map((stop) => (
                      <div key={stop} className="flex items-center bg-[#42f5e6] text-black px-2 py-1 rounded">
                        <span className="text-sm">{stop}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveStop(stop)}
                          className="ml-2 text-black font-bold hover:text-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No stops added yet</span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-[#42f5e6] text-[#42f5e6] px-4 py-2 rounded hover:bg-[#42f5e6] hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#42f5e6] text-black px-4 py-2 rounded hover:bg-[#35d9cb] transition-colors"
                >
                  {currentRoute._id ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}