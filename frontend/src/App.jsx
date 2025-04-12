import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientLayout from './ClientLayout';
import VoiceQuery from './client/voice-query/voice-query';
import Dashboard from './client/DashBoard/dashboard';
import TransportInfo from './client/transport-info/transport-info';

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
      </Routes>
    </Router>
  );
}

export default App;
