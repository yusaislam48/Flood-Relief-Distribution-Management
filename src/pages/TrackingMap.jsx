import React from 'react';

const TrackingMap = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Live Tracking Map</h1>
        <p className="text-gray-600">Track active relief missions and IoT devices.</p>
        
        <div className="bg-white rounded-lg shadow mt-6 p-6">
          <p>Map visualization will be implemented here using Leaflet.</p>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
