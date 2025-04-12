// src/admin/AdminNavBar.jsx
export default function AdminNavbar() {
    return (
      <header className="w-full bg-[#0f0f0f] border-b border-[#42f5e6] p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#42f5e6]">VBTES</h1>
        <div className="flex items-center gap-4">
          <span className="text-white">Hello, Admin</span>
          <button className="bg-[#42f5e6] text-black px-4 py-1 rounded hover:opacity-90">
            Logout
          </button>
        </div>
      </header>
    );
  }
  