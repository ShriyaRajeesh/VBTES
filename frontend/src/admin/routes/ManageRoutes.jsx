// src/admin/routes/ManageRoutes.jsx
import { useState } from 'react';

export default function ManageRoutes() {
  const [routes, setRoutes] = useState([
    { 
      _id: "route002", 
      start_stop: "stop006", 
      end_stop: "stop010",
      stops: ["stop006", "stop007", "stop008", "stop009", "stop010"],
      distance_km: 30
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({
    _id: '',
    start_stop: '',
    end_stop: '',
    stops: [],
    distance_km: 0
  });
  const [newStop, setNewStop] = useState('');

  // Create or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentRoute._id) {
      // Update existing route
      setRoutes(routes.map(route => 
        route._id === currentRoute._id ? currentRoute : route
      ));
    } else {
      // Create new route
      const newId = `route${Math.floor(1000 + Math.random() * 9000)}`;
      setRoutes([...routes, { ...currentRoute, _id: newId }]);
    }
    
    setIsModalOpen(false);
    setCurrentRoute({
      _id: '',
      start_stop: '',
      end_stop: '',
      stops: [],
      distance_km: 0
    });
  };

  // Edit
  const handleEdit = (route) => {
    setCurrentRoute(route);
    setIsModalOpen(true);
  };

  // Delete
  const handleDelete = (id) => {
    setRoutes(routes.filter(route => route._id !== id));
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Routes</h2>
        <button
          onClick={() => {
            setCurrentRoute({
              _id: '',
              start_stop: '',
              end_stop: '',
              stops: [],
              distance_km: 0
            });
            setIsModalOpen(true);
          }}
          className="bg-[#42f5e6] text-black px-4 py-2 rounded"
        >
          Add New Route
        </button>
      </div>

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
            {routes.map((route) => (
              <tr key={route._id} className="text-white border-t border-[#42f5e6]">
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
                    className="bg-[#42f5e6] text-black px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(route._id)}
                    className="border border-[#42f5e6] px-2 py-1 rounded text-[#42f5e6]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-[#42f5e6] rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#42f5e6] mb-4">
              {currentRoute._id ? 'Edit Route' : 'Add New Route'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white mb-2">Start Stop</label>
                <input
                  type="text"
                  value={currentRoute.start_stop}
                  onChange={(e) => setCurrentRoute({...currentRoute, start_stop: e.target.value})}
                  className="w-full bg-[#1a1a1a] border border-[#42f5e6] rounded p-2 text-white"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">End Stop</label>
                <input
                  type="text"
                  value={currentRoute.end_stop}
                  onChange={(e) => setCurrentRoute({...currentRoute, end_stop: e.target.value})}
                  className="w-full bg-[#1a1a1a] border border-[#42f5e6] rounded p-2 text-white"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-white mb-2">Distance (km)</label>
                <input
                  type="number"
                  value={currentRoute.distance_km}
                  onChange={(e) => setCurrentRoute({...currentRoute, distance_km: parseInt(e.target.value) || 0})}
                  className="w-full bg-[#1a1a1a] border border-[#42f5e6] rounded p-2 text-white"
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
                    className="flex-1 bg-[#1a1a1a] border border-[#42f5e6] rounded p-2 text-white mr-2"
                    placeholder="Add stop"
                  />
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="bg-[#42f5e6] text-black px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {currentRoute.stops.map((stop) => (
                    <div key={stop} className="flex items-center bg-[#42f5e6] text-black px-2 py-1 rounded">
                      <span>{stop}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStop(stop)}
                        className="ml-2 text-black font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#42f5e6] text-[#42f5e6] px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#42f5e6] text-black px-4 py-2 rounded"
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