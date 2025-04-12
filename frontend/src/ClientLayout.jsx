import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './client/NavBar';
import Footer from './client/Footer';

const ClientLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default ClientLayout;
