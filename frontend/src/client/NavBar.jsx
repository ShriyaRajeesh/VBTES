import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md border-b border-[#42f5e6]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="dashboard" className="text-2xl font-bold text-[#42f5e6] tracking-wide">
          🚍 VBTES
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="dashboard" className="hover:text-[#42f5e6] transition">Home</Link>
          <Link to="voice-query" className="hover:text-[#42f5e6] transition">Voice Query</Link>
          {/* <Link to="transport-info" className="hover:text-[#42f5e6] transition">Transport</Link> */}
          
          <button
            onClick={handleLogout}
            className="bg-[#42f5e6] text-black px-3 py-1 rounded hover:bg-[#2cdad0] transition text-sm"
          >
            Admin
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-2xl text-[#42f5e6]">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4 text-white">
          <Link to="dashboard" onClick={toggleMenu} className="hover:text-[#42f5e6]">Home</Link>
          <Link to="voice-query" onClick={toggleMenu} className="hover:text-[#42f5e6]">Voice Query</Link>
          {/* <Link to="transport-info" onClick={toggleMenu} className="hover:text-[#42f5e6]">Transport</Link> */}
          <button
            onClick={() => { toggleMenu(); handleLogout(); }}
            className="bg-[#42f5e6] text-black px-3 py-1 rounded hover:bg-[#2cdad0] text-sm w-max"
          >
            Admin
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
