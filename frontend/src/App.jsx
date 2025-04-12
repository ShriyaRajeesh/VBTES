import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientLayout from './ClientLayout';
import VoiceQuery from './client/voice-query/voice-query';
import Dashboard from './client/DashBoard/dashboard';
import TransportInfo from './client/transport-info/transport-info';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard/AdminDashboard';
import AdminNavbar from './admin/AdminNavBar';
import ManageTransport from "./admin/transport/ManageTransport";
import ManageRoutes from "./admin/routes/ManageRoutes";
import VoiceLogs from "./admin/voice-query-logs/VoiceLogs";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Dashboard />} /> {/* Default route */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="voice-query" element={<VoiceQuery />} />
          <Route path="transport-info" element={<TransportInfo />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="transport" element={<ManageTransport />} />
          <Route path="routes" element={<ManageRoutes />} />
          <Route path="voice-logs" element={<VoiceLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
