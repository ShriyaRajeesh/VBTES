// src/admin/transport/ManageTransport.jsx
export default function ManageTransport() {
    const transports = [
      { id: 1, name: "Bus 101", type: "Bus", status: "On Time" },
      { id: 2, name: "Train 204", type: "Train", status: "Delayed" },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Manage Transport</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-[#0f0f0f] border border-[#42f5e6] rounded-xl">
            <thead>
              <tr className="text-[#42f5e6] border-b border-[#42f5e6]">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((t) => (
                <tr key={t.id} className="text-white border-t border-[#42f5e6]">
                  <td className="p-3">{t.id}</td>
                  <td className="p-3">{t.name}</td>
                  <td className="p-3">{t.type}</td>
                  <td className="p-3">{t.status}</td>
                  <td className="p-3">
                    <button className="bg-[#42f5e6] text-black px-2 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button className="border border-[#42f5e6] px-2 py-1 rounded text-[#42f5e6]">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  