import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const cards = [
    { label: "Manage Transport", route: "/admin/transport" },
    { label: "Manage Routes", route: "/admin/routes" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">HELLO</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link
            to={card.route}
            key={card.label}
            className="bg-[#0f0f0f] border border-[#42f5e6] rounded-xl p-8 shadow-md hover:scale-105 transition-transform cursor-pointer text-center"
          >
            <p className="text-2xl font-semibold text-[#42f5e6]">
              {card.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}