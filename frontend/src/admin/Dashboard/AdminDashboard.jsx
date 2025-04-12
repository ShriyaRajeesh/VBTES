// src/admin/Dashboard/AdminDashboard.jsx
export default function AdminDashboard() {
    const cards = [
      { label: "Total Transports", value: 120 },
      { label: "Voice Queries", value: 350 },
      { label: "Delayed Transports", value: 14 },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-[#0f0f0f] border border-[#42f5e6] rounded-xl p-6 shadow-md"
            >
              <p className="text-[#42f5e6] text-lg">{card.label}</p>
              <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  