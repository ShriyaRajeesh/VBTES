import React, { useState } from "react";

// Dummy data for intercity buses only
const transportData = [
  { id: 1, type: "Bus", departure: "08:30 AM", arrival: "09:00 AM", route: "Route 1" },
  { id: 2, type: "Bus", departure: "10:30 AM", arrival: "11:00 AM", route: "Route 2" },
  { id: 3, type: "Bus", departure: "12:15 PM", arrival: "01:00 PM", route: "Route 3" },
  // Add more bus data as needed
];

const TransportInfo = () => {
  const [filters, setFilters] = useState({
    route: "",
    time: "",
  });

  const filteredData = transportData.filter((item) => {
    return (
      (filters.route === "" || item.route.toLowerCase().includes(filters.route.toLowerCase())) &&
      (filters.time === "" || item.departure.includes(filters.time))
    );
  });

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
            <div key={item.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Bus</h3>
              <p className="mt-2">Route: {item.route}</p>
              <p>Departure: {item.departure}</p>
              <p>Arrival: {item.arrival}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No bus options found.</p>
        )}
      </div>
    </div>
  );
};

export default TransportInfo;
