import React from 'react';

const Notifications = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>

      <ul className="space-y-3">
        <li>📢 New course added</li>
        <li>🎯 Your test result is out</li>
        <li>🔥 Limited time offer available</li>
      </ul>
    </div>
  );
};

export default Notifications;
