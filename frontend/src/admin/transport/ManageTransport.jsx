import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageTransport() {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newTransport, setNewTransport] = useState({
    _id: "",
    capacity: "",
    registration_number: "",
  });

  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/transport");
        setTransports(response.data);
      } catch (err) {
        console.error("Error fetching transports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransports();
  }, []);

  const handleDeleteTransport = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transport/${_id}`);
      setTransports(transports.filter((t) => t._id !== _id));
    } catch (err) {
      console.error("Error deleting transport:", err);
    }
  };

  const handleEditClick = (transport) => {
    setEditingId(transport._id);
    setEditData({
      capacity: transport.capacity,
      registration_number: transport.registration_number,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSaveEdit = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/transport/${_id}`,
        editData
      );
      setTransports(
        transports.map((t) => (t._id === _id ? { ...t, ...response.data } : t))
      );
      setEditingId(null);
      setEditData({});
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };

  const handleAddTransport = async () => {
    if (!newTransport._id || !newTransport.capacity || !newTransport.registration_number) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/transport", {
        ...newTransport,
        type: "bus", // default value
        operator_id: "op_default", // you can change this default if needed
      });

      setTransports([...transports, response.data]);
      setNewTransport({ _id: "", capacity: "", registration_number: "" });
    } catch (err) {
      console.error("Error adding transport:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Manage Transport</h2>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-[#0f0f0f] border border-[#42f5e6] rounded-xl">
            <thead>
              <tr className="text-[#42f5e6] border-b border-[#42f5e6]">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Capacity</th>
                <th className="p-3 text-left">Registration Number</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transports.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-white">
                    No transports available
                  </td>
                </tr>
              ) : (
                transports.map((t) => (
                  <tr key={t._id} className="text-white border-t border-[#42f5e6]">
                    <td className="p-3">{t._id}</td>

                    <td className="p-3">
                      {editingId === t._id ? (
                        <input
                          type="number"
                          className="bg-gray-700 text-white px-2 py-1 rounded"
                          value={editData.capacity}
                          onChange={(e) =>
                            setEditData({ ...editData, capacity: e.target.value })
                          }
                        />
                      ) : (
                        t.capacity
                      )}
                    </td>

                    <td className="p-3">
                      {editingId === t._id ? (
                        <input
                          type="text"
                          className="bg-gray-700 text-white px-2 py-1 rounded"
                          value={editData.registration_number}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              registration_number: e.target.value,
                            })
                          }
                        />
                      ) : (
                        t.registration_number
                      )}
                    </td>

                    <td className="p-3">
                      {editingId === t._id ? (
                        <>
                          <button
                            className="bg-[#42f5e6] text-black px-2 py-1 rounded mr-2"
                            onClick={() => handleSaveEdit(t._id)}
                          >
                            Save
                          </button>
                          <button
                            className="border border-[#42f5e6] px-2 py-1 rounded text-[#42f5e6]"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-[#42f5e6] text-black px-2 py-1 rounded mr-2"
                            onClick={() => handleEditClick(t)}
                          >
                            Edit
                          </button>
                          <button
                            className="border border-[#42f5e6] px-2 py-1 rounded text-[#42f5e6]"
                            onClick={() => handleDeleteTransport(t._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add new transport section */}
      <div className="mt-6 bg-[#0f0f0f] border border-[#42f5e6] p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Transport</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Transport ID"
            className="px-4 py-2 rounded bg-gray-800 text-white"
            value={newTransport._id}
            onChange={(e) => setNewTransport({ ...newTransport, _id: e.target.value })}
          />
          <input
            type="number"
            placeholder="Capacity"
            className="px-4 py-2 rounded bg-gray-800 text-white"
            value={newTransport.capacity}
            onChange={(e) => setNewTransport({ ...newTransport, capacity: e.target.value })}
          />
          <input
            type="text"
            placeholder="Registration Number"
            className="px-4 py-2 rounded bg-gray-800 text-white"
            value={newTransport.registration_number}
            onChange={(e) =>
              setNewTransport({ ...newTransport, registration_number: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleAddTransport}
          className="mt-4 bg-[#42f5e6] text-black px-4 py-2 rounded"
        >
          Add Transport
        </button>
      </div>
    </div>
  );
}