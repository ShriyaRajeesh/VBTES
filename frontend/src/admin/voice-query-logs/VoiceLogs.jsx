// src/admin/voice-query-logs/VoiceLogs.jsx
export default function VoiceLogs() {
    const logs = [
      { id: 1, query: "Train from City A to City B", timestamp: "2025-04-12 10:00 AM" },
      { id: 2, query: "Next bus to City C", timestamp: "2025-04-12 10:15 AM" },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Voice Query Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-[#0f0f0f] border border-[#42f5e6] rounded-xl">
            <thead>
              <tr className="text-[#42f5e6] border-b border-[#42f5e6]">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Query</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="text-white border-t border-[#42f5e6]">
                  <td className="p-3">{log.id}</td>
                  <td className="p-3">{log.query}</td>
                  <td className="p-3">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  