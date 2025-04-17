import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageTransport() {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Fetch transports when the component mounts
  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transport");
        console.log(response.data); // Log the response to ensure correct structure
        setTransports(response.data); // Set transports to the fetched data
      } catch (err) {
        console.error("Error fetching transports:", err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchTransports();
  }, []); // Empty dependency array ensures it runs only once when component mounts

  // Handle adding a new transport
  const handleAddTransport = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/transport", {
        _id: "bus002", // Example transport data, update as per your needs
        type: "bus",
        operator_id: "op002",
        capacity: 40,
        registration_number: "KA02CD5678",
      });
      setTransports([...transports, response.data]);
    } catch (err) {
      console.error("Error adding transport:", err);
    }
  };

  // Handle deleting a transport
  const handleDeleteTransport = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transport/${_id}`);
      setTransports(transports.filter((transport) => transport._id !== _id));
    } catch (err) {
      console.error("Error deleting transport:", err);
    }
  };

  // Handle updating a transport
  const handleEditTransport = async (_id, updatedTransport) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/transport/${_id}`,
        updatedTransport
      );
      setTransports(
        transports.map((transport) =>
          transport._id === _id ? { ...transport, ...response.data } : transport
        )
      );
    } catch (err) {
      console.error("Error updating transport:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Manage Transport</h2>

      {loading ? (
        <div className="text-white">Loading...</div> // Show loading state while fetching data
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-[#0f0f0f] border border-[#42f5e6] rounded-xl">
            <thead>
              <tr className="text-[#42f5e6] border-b border-[#42f5e6]">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Operator ID</th>
                <th className="p-3 text-left">Capacity</th>
                <th className="p-3 text-left">Registration Number</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-white">
                    No transports available
                  </td>
                </tr>
              ) : (
                transports.map((t) => (
                  <tr key={t._id} className="text-white border-t border-[#42f5e6]">
                    <td className="p-3">{t._id}</td>
                    <td className="p-3">{t.type}</td>
                    <td className="p-3">{t.operator_id}</td>
                    <td className="p-3">{t.capacity}</td>
                    <td className="p-3">{t.registration_number}</td>
                    <td className="p-3">
                      <button
                        className="bg-[#42f5e6] text-black px-2 py-1 rounded mr-2"
                        onClick={() =>
                          handleEditTransport(t._id, {
                            ...t,
                            capacity: t.capacity + 10, // Example change
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="border border-[#42f5e6] px-2 py-1 rounded text-[#42f5e6]"
                        onClick={() => handleDeleteTransport(t._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add new transport form (for demonstration purposes) */}
      <div className="mt-6">
        <button
          onClick={handleAddTransport}
          className="bg-[#42f5e6] text-black px-4 py-2 rounded"
        >
          Add Transport
        </button>
      </div>
    </div>
  );
}