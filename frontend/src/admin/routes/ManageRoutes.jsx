// src/admin/routes/ManageRoutes.jsx
export default function ManageRoutes() {
    const routes = [
      { id: 1, from: "City A", to: "City B", distance: "200 km" },
      { id: 2, from: "City C", to: "City D", distance: "350 km" },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Manage Routes</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-[#0f0f0f] border border-[#42f5e6] rounded-xl">
            <thead>
              <tr className="text-[#42f5e6] border-b border-[#42f5e6]">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">From</th>
                <th className="p-3 text-left">To</th>
                <th className="p-3 text-left">Distance</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.id} className="text-white border-t border-[#42f5e6]">
                  <td className="p-3">{r.id}</td>
                  <td className="p-3">{r.from}</td>
                  <td className="p-3">{r.to}</td>
                  <td className="p-3">{r.distance}</td>
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
  