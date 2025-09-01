import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Wifi, 
  Battery, 
  Signal, 
  Home, 
  Users, 
  Phone, 
  Calendar,
  Package,
  Navigation,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const LiveMap = ({ selectedFloodArea, floodAreas, iotDevices }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 25.7439, lng: 89.2752 });
  const [zoom, setZoom] = useState(7);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showVillageDetails, setShowVillageDetails] = useState(false);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);

  // Update map center when flood area changes
  useEffect(() => {
    if (selectedFloodArea) {
      const area = floodAreas.find(area => area.id === selectedFloodArea);
      if (area) {
        setMapCenter(area.coordinates);
        setMapOffset({ x: 0, y: 0 });
        setZoom(8);
      }
    }
  }, [selectedFloodArea, floodAreas]);

  // Get villages for selected flood area
  const getVillagesForArea = () => {
    if (!selectedFloodArea) return [];
    const area = floodAreas.find(area => area.id === selectedFloodArea);
    return area?.villages || [];
  };

  // Get IoT devices for selected flood area
  const getIoTDevicesForArea = () => {
    if (!selectedFloodArea) return [];
    const area = floodAreas.find(area => area.id === selectedFloodArea);
    if (!area) return [];
    
    // Filter devices that are in or near this flood area
    return iotDevices.filter(device => {
      const deviceLat = device.currentLocation.lat;
      const deviceLng = device.currentLocation.lng;
      const areaLat = area.coordinates.lat;
      const areaLng = area.coordinates.lng;
      
      // Simple distance calculation (in a real app, use proper distance calculation)
      const distance = Math.sqrt(
        Math.pow(deviceLat - areaLat, 2) + Math.pow(deviceLng - areaLng, 2)
      );
      
      return distance < 0.1; // Within reasonable distance
    });
  };

  // Map interaction handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setMapOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.5 : 0.5;
    setZoom(Math.max(3, Math.min(12, zoom + delta)));
  };

  const handleZoomIn = () => {
    setZoom(Math.min(12, zoom + 0.5));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(3, zoom - 0.5));
  };

  const resetMapView = () => {
    setMapOffset({ x: 0, y: 0 });
    setZoom(8);
  };

  // Get device status color
  const getDeviceStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#10B981'; // green
      case 'Assigned': return '#3B82F6'; // blue
      case 'Inactive': return '#EF4444'; // red
      default: return '#6B7280'; // gray
    }
  };

  // Get village priority color
  const getVillagePriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return '#EF4444'; // red
      case 'High': return '#F59E0B'; // yellow
      case 'Medium': return '#3B82F6'; // blue
      case 'Low': return '#10B981'; // green
      default: return '#6B7280'; // gray
    }
  };

  // Get signal strength icon
  const getSignalIcon = (strength) => {
    switch (strength) {
      case 'Excellent': return <Signal className="h-3 w-3 text-green-500" />;
      case 'Good': return <Signal className="h-3 w-3 text-blue-500" />;
      case 'Fair': return <Signal className="h-3 w-3 text-yellow-500" />;
      case 'Poor': return <Signal className="h-3 w-3 text-red-500" />;
      default: return <Signal className="h-3 w-3 text-gray-500" />;
    }
  };

  const villages = getVillagesForArea();
  const devices = getIoTDevicesForArea();

  if (!selectedFloodArea) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Flood Area</h3>
          <p className="text-gray-500">Choose a flood area to view the live map with villages and IoT devices</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg relative overflow-hidden">
      {/* Map Container */}
      <div
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ userSelect: 'none' }}
      >
        {/* Map Background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"
          style={{
            transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${zoom / 7})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* IoT Devices */}
        {devices.map((device) => (
          <div
            key={device.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${50 + (device.currentLocation.lng - mapCenter.lng) * 1000}px`,
              top: `${50 + (device.currentLocation.lat - mapCenter.lat) * 1000}px`,
              transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${zoom / 7}) translate(-50%, -50%)`
            }}
            onClick={() => {
              setSelectedDevice(device);
              setShowDeviceDetails(true);
            }}
          >
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: getDeviceStatusColor(device.status) }}
            >
              <Wifi className="h-3 w-3 text-white" />
            </div>
            
            {/* Device Info Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {device.serialNumber}
            </div>
          </div>
        ))}

        {/* Villages */}
        {villages.map((village) => (
          <div
            key={village.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${50 + (village.coordinates.lng - mapCenter.lng) * 1000}px`,
              top: `${50 + (village.coordinates.lat - mapCenter.lat) * 1000}px`,
              transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${zoom / 7}) translate(-50%, -50%)`
            }}
            onClick={() => {
              setSelectedVillage(village);
              setShowVillageDetails(true);
            }}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: getVillagePriorityColor(village.priority) }}
            >
              <Home className="h-4 w-4 text-white" />
            </div>
            
            {/* Village Info Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {village.name}
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={resetMapView}
            className="w-8 h-8 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Zoom Level Display */}
        <div className="absolute bottom-4 left-4 bg-white rounded shadow-lg px-3 py-1 text-sm">
          Zoom: {zoom.toFixed(1)}x
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white rounded shadow-lg p-3 text-xs">
          <div className="space-y-2">
            <div className="font-medium text-gray-900 mb-2">Legend</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Critical Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low Priority</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Wifi className="h-3 w-3 text-green-500" />
              <span>Active IoT Device</span>
            </div>
          </div>
        </div>
      </div>

      {/* Village Details Modal */}
      {showVillageDetails && selectedVillage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Village Details</h3>
                <button
                  onClick={() => setShowVillageDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    {selectedVillage.name}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Families:</span> {selectedVillage.familyCount}</div>
                    <div><span className="font-medium">Population:</span> {selectedVillage.population}</div>
                    <div><span className="font-medium">Priority:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        selectedVillage.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        selectedVillage.priority === 'High' ? 'bg-yellow-100 text-yellow-800' :
                        selectedVillage.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedVillage.priority}
                      </span>
                    </div>
                    <div><span className="font-medium">Accessibility:</span> {selectedVillage.accessibility}</div>
                    <div><span className="font-medium">Distance:</span> {selectedVillage.distance} km</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Contact Person:</span> {selectedVillage.contactPerson}</div>
                    <div><span className="font-medium">Phone:</span> {selectedVillage.contactPhone}</div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Last Relief Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Date:</span> {new Date(selectedVillage.lastReliefDetails.date).toLocaleDateString()}</div>
                    <div><span className="font-medium">Organization:</span> {selectedVillage.lastReliefDetails.organization}</div>
                    <div><span className="font-medium">Amount:</span> {selectedVillage.lastReliefDetails.amount}</div>
                    <div><span className="font-medium">Items:</span></div>
                    <ul className="list-disc list-inside ml-2 text-xs">
                      {selectedVillage.lastReliefDetails.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <div><span className="font-medium">Status:</span> 
                      <span className="ml-1 px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        {selectedVillage.lastReliefDetails.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Current Needs
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedVillage.needs.map((need, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs">
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowVillageDetails(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Device Details Modal */}
      {showDeviceDetails && selectedDevice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">IoT Device Details</h3>
                <button
                  onClick={() => setShowDeviceDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Wifi className="h-4 w-4 mr-2" />
                    Device Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Serial Number:</span> {selectedDevice.serialNumber}</div>
                    <div><span className="font-medium">Type:</span> {selectedDevice.type}</div>
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        selectedDevice.status === 'Active' ? 'bg-green-100 text-green-800' :
                        selectedDevice.status === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedDevice.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <Navigation className="h-4 w-4 mr-2" />
                    Location & Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Current Location:</span> {selectedDevice.currentLocation.lat.toFixed(4)}, {selectedDevice.currentLocation.lng.toFixed(4)}</div>
                    <div><span className="font-medium">Last Update:</span> {new Date(selectedDevice.lastUpdate).toLocaleString()}</div>
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4" />
                      <span><span className="font-medium">Battery:</span> {selectedDevice.batteryLevel}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSignalIcon(selectedDevice.signalStrength)}
                      <span><span className="font-medium">Signal:</span> {selectedDevice.signalStrength}</span>
                    </div>
                  </div>
                </div>

                {selectedDevice.meshConnections.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                      <Wifi className="h-4 w-4 mr-2" />
                      Mesh Network
                    </h4>
                    <div className="text-sm">
                      <div><span className="font-medium">Connected Devices:</span> {selectedDevice.meshConnections.length}</div>
                      <div className="mt-1 text-xs text-gray-600">
                        {selectedDevice.meshConnections.join(', ')}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDeviceDetails(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMap;
