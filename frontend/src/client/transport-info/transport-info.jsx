import React, { useState, useEffect } from "react";
import { transportService } from "../../services/transportService";

const TransportInfo = () => {
  const [transportData, setTransportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    route: "",
    time: "",
  });

  useEffect(() => {
    const fetchTransportData = async () => {
      try {
        const data = await transportService.getAllTransport();
        setTransportData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load transport data");
        setLoading(false);
        console.error("Error fetching transport data:", err);
      }
    };

    fetchTransportData();
  }, []);

  const filteredData = transportData.filter((item) => {
    return (
      (filters.route === "" || item.route.toLowerCase().includes(filters.route.toLowerCase())) &&
      (filters.time === "" || item.departure.includes(filters.time))
    );
  });

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-black text-[#42f5e6] flex items-center justify-center">
        <div className="text-2xl">Loading transport information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 min-h-screen bg-black text-[#42f5e6] flex items-center justify-center">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-black text-[#42f5e6]">
      <h2 className="text-3xl font-bold mb-6 text-center">🚌 Intercity Bus Schedule</h2>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Filter by Route"
          value={filters.route}
          onChange={(e) => setFilters({ ...filters, route: e.target.value })}
          className="px-4 py-2 bg-gray-800 text-white rounded-md"
        />
        <input
          type="text"
          placeholder="Filter by Time"
          value={filters.time}
          onChange={(e) => setFilters({ ...filters, time: e.target.value })}
          className="px-4 py-2 bg-gray-800 text-white rounded-md"
        />
      </div>

      {/* Bus Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item._id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{item.type}</h3>
              <p className="mb-1">Route: {item.route}</p>
              <p className="mb-1">Departure: {item.departure}</p>
              <p className="mb-1">Arrival: {item.arrival}</p>
              <p className="mb-1">Status: {item.status || 'On Time'}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl">
            No transport found matching your filters
          </div>
        )}
      </div>
    </div>
  );
};

export default TransportInfo;
