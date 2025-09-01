import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Users, 
  Home, 
  Truck, 
  Wifi, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Globe,
  Phone,
  Calendar,
  Package,
  Navigation,
  Eye,
  BarChart3,
  PieChart,
  RefreshCw
} from 'lucide-react';

import { floodAreas, users, reliefRequests, iotDevices } from '../data/dummyData';

const PublicAnalytics = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 24.0, lng: 90.0 });
  const [zoom, setZoom] = useState(7);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Calculate statistics
  const getStatistics = () => {
    console.log('Flood Areas:', floodAreas);
    console.log('Users:', users);
    console.log('Relief Requests:', reliefRequests);
    console.log('IoT Devices:', iotDevices);
    
    const totalFamilies = floodAreas.reduce((sum, area) => 
      sum + (area.villages || []).reduce((vSum, village) => vSum + (village.familyCount || 0), 0), 0
    );
    
    const totalPopulation = floodAreas.reduce((sum, area) => 
      sum + (area.villages || []).reduce((vSum, village) => vSum + (village.population || 0), 0), 0
    );

    const activeRequests = reliefRequests.filter(req => 
      req.status === 'Pending' || req.status === 'Approved'
    ).length;

    const completedMissions = reliefRequests.filter(req => 
      req.missionStatus === 'Completed'
    ).length;

    const activeDevices = iotDevices.filter(device => 
      device.status === 'Active' || device.status === 'Assigned'
    ).length;

    const totalOrganizations = users.filter(user => 
      user.role === 'organization'
    ).length;

    const criticalVillages = floodAreas.reduce((sum, area) => 
      sum + (area.villages || []).filter(village => village.priority === 'Critical').length, 0
    );

    const highPriorityVillages = floodAreas.reduce((sum, area) => 
      sum + (area.villages || []).filter(village => village.priority === 'High').length, 0
    );

    return {
      totalFamilies,
      totalPopulation,
      activeRequests,
      completedMissions,
      activeDevices,
      totalOrganizations,
      criticalVillages,
      highPriorityVillages,
      totalVillages: floodAreas.reduce((sum, area) => sum + (area.villages || []).length, 0),
      totalFloodAreas: floodAreas.length
    };
  };

  const stats = getStatistics();

  // Map interaction handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsMouseDown(true);
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
    setIsMouseDown(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const resetMapView = () => {
    setMapCenter({ lat: 24.0, lng: 90.0 });
    setZoom(7);
    setMapOffset({ x: 0, y: 0 });
  };

  // Get marker colors
  const getVillageMarkerColor = (priority) => {
    switch (priority) {
      case 'Critical': return '#ef4444';
      case 'High': return '#f59e0b';
      case 'Medium': return '#3b82f6';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getDeviceMarkerColor = (status) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Assigned': return '#3b82f6';
      case 'Inactive': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Convert lat/lng to pixel coordinates
  const latLngToPixel = (lat, lng) => {
    const x = (lng - mapCenter.lng) * 100 * zoom + 400 + mapOffset.x;
    const y = (mapCenter.lat - lat) * 100 * zoom + 300 + mapOffset.y;
    return { x, y };
  };

  // Debug: Log data on component mount
  useEffect(() => {
    console.log('Component mounted - Data check:');
    console.log('floodAreas length:', floodAreas?.length);
    console.log('users length:', users?.length);
    console.log('reliefRequests length:', reliefRequests?.length);
    console.log('iotDevices length:', iotDevices?.length);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Flood Relief Analytics
                </h1>
                <p className="text-sm text-gray-500">
                  Public Dashboard - Real-time Relief Operations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <RefreshCw className="h-4 w-4" />
                <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Live Data
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Flood Areas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFloodAreas}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Families</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFamilies.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeRequests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed Missions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedMissions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Critical Villages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.criticalVillages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Home className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Villages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVillages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Wifi className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active IoT Devices</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeDevices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-teal-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Relief Organizations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrganizations}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Live Relief Operations Map</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setZoom(prev => Math.min(10, prev + 0.5))}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <span className="text-lg font-bold">+</span>
                  </button>
                  <span className="text-sm text-gray-500">Zoom: {zoom.toFixed(1)}x</span>
                  <button
                    onClick={() => setZoom(prev => Math.max(1, prev - 0.5))}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <span className="text-lg font-bold">-</span>
                  </button>
                </div>
                <button
                  onClick={resetMapView}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Reset View</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{ cursor: isMouseDown ? 'grabbing' : 'grab' }}
            >
              {/* Map Grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #000 1px, transparent 1px),
                    linear-gradient(to bottom, #000 1px, transparent 1px)
                  `,
                  backgroundSize: `${50 * zoom}px ${50 * zoom}px`,
                  transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${zoom})`
                }}
              />

              {/* Flood Area Markers */}
              {floodAreas && floodAreas.length > 0 && floodAreas.map((area) => {
                if (!area.coordinates || !area.coordinates.lat || !area.coordinates.lng) {
                  return null;
                }
                const pos = latLngToPixel(area.coordinates.lat, area.coordinates.lng);
                return (
                  <div
                    key={area.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      transform: `translate(-50%, -50%) scale(${zoom})`
                    }}
                    onClick={() => setSelectedArea(area)}
                  >
                    <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                      {area.name}
                    </div>
                  </div>
                );
              })}

              {/* Village Markers */}
              {floodAreas && floodAreas.length > 0 && floodAreas.flatMap(area => 
                (area.villages || []).map(village => {
                  if (!village.coordinates || !village.coordinates.lat || !village.coordinates.lng) {
                    return null;
                  }
                  const pos = latLngToPixel(village.coordinates.lat, village.coordinates.lng);
                  return (
                    <div
                      key={village.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{
                        left: pos.x,
                        top: pos.y,
                        transform: `translate(-50%, -50%) scale(${zoom})`
                      }}
                      onClick={() => setSelectedVillage(village)}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: getVillageMarkerColor(village.priority) }}
                      />
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                        {village.name}
                      </div>
                    </div>
                  );
                })
              )}

              {/* IoT Device Markers */}
              {iotDevices && iotDevices.length > 0 && iotDevices.map((device) => {
                if (!device.coordinates || !device.coordinates.lat || !device.coordinates.lng) {
                  return null;
                }
                const pos = latLngToPixel(device.coordinates.lat, device.coordinates.lng);
                return (
                  <div
                    key={device.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      transform: `translate(-50%, -50%) scale(${zoom})`
                    }}
                    onClick={() => setSelectedDevice(device)}
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-white shadow-lg flex items-center justify-center"
                      style={{ backgroundColor: getDeviceMarkerColor(device.status) }}
                    >
                      <Wifi className="h-2 w-2 text-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold text-sm mb-2">Legend</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Critical Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>High Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Medium Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Low Priority</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full flex items-center justify-center">
                    <Wifi className="h-1.5 w-1.5 text-white" />
                  </div>
                  <span>Active IoT Device</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Relief Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Requests */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Active Relief Requests</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {reliefRequests && reliefRequests.length > 0 ? reliefRequests.filter(req => req.status === 'Pending' || req.status === 'Approved').slice(0, 5).map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{request.organizationName}</h3>
                        <p className="text-sm text-gray-500">{request.floodAreaName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Package className="h-4 w-4" />
                        <span>{request.reliefType}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{request.manpower} people</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{request.estimatedDuration} days</span>
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-8">
                    No active requests found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Relief Distribution */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Relief Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {floodAreas && floodAreas.length > 0 ? floodAreas.flatMap(area => 
                  (area.villages || []).filter(village => village.lastReliefDetails).slice(0, 5)
                ).map((village) => (
                  <div key={village.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{village.name}</h3>
                        <p className="text-sm text-gray-500">{village.lastReliefDetails.organization}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(village.lastReliefDetails.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Items:</strong> {village.lastReliefDetails.items.join(', ')}</p>
                      <p><strong>Amount:</strong> {village.lastReliefDetails.amount}</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          village.lastReliefDetails.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {village.lastReliefDetails.status}
                        </span>
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-8">
                    No relief distribution data found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Modals */}
        {selectedArea && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{selectedArea.name}</h3>
                  <button
                    onClick={() => setSelectedArea(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Water Level</p>
                      <p className="text-lg font-semibold">{selectedArea.waterLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Severity</p>
                      <p className="text-lg font-semibold">{selectedArea.severity}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Villages ({(selectedArea.villages || []).length})</p>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {(selectedArea.villages || []).map((village) => (
                        <div key={village.id} className="border rounded p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{village.name}</h4>
                              <p className="text-sm text-gray-500">{village.familyCount} families</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              village.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                              village.priority === 'High' ? 'bg-yellow-100 text-yellow-800' :
                              village.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {village.priority}
                            </span>
                          </div>
                          {village.lastReliefDetails && (
                            <div className="mt-2 text-xs text-gray-500">
                              <p>Last Relief: {new Date(village.lastReliefDetails.date).toLocaleDateString()}</p>
                              <p>By: {village.lastReliefDetails.organization}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedVillage && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{selectedVillage.name}</h3>
                  <button
                    onClick={() => setSelectedVillage(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Families</p>
                      <p className="text-lg font-semibold">{selectedVillage.familyCount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Population</p>
                      <p className="text-lg font-semibold">{selectedVillage.population}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Priority</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedVillage.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        selectedVillage.priority === 'High' ? 'bg-yellow-100 text-yellow-800' :
                        selectedVillage.priority === 'Medium' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {selectedVillage.priority}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Accessibility</p>
                      <p className="text-sm">{selectedVillage.accessibility}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Contact Information</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p><strong>Contact Person:</strong> {selectedVillage.contactPerson}</p>
                      <p><strong>Phone:</strong> {selectedVillage.contactPhone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Current Needs</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedVillage.needs || []).map((need, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedVillage.lastReliefDetails && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Last Relief Received</p>
                      <div className="bg-green-50 p-3 rounded">
                        <p><strong>Date:</strong> {new Date(selectedVillage.lastReliefDetails.date).toLocaleDateString()}</p>
                        <p><strong>Organization:</strong> {selectedVillage.lastReliefDetails.organization}</p>
                        <p><strong>Items:</strong> {selectedVillage.lastReliefDetails.items.join(', ')}</p>
                        <p><strong>Amount:</strong> {selectedVillage.lastReliefDetails.amount}</p>
                        <p><strong>Status:</strong> 
                          <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                            selectedVillage.lastReliefDetails.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {selectedVillage.lastReliefDetails.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDevice && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">IoT Device: {selectedDevice.serialNumber}</h3>
                  <button
                    onClick={() => setSelectedDevice(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="text-lg font-semibold">{selectedDevice.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedDevice.status === 'Active' ? 'bg-green-100 text-green-800' :
                        selectedDevice.status === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedDevice.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Battery Level</p>
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4" />
                        <span>{selectedDevice.batteryLevel}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Signal Strength</p>
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4" />
                        <span>{selectedDevice.signalStrength}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Location</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p><strong>Latitude:</strong> {selectedDevice.coordinates.lat}</p>
                      <p><strong>Longitude:</strong> {selectedDevice.coordinates.lng}</p>
                    </div>
                  </div>
                  
                  {selectedDevice.meshConnections && selectedDevice.meshConnections.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Mesh Network Connections</p>
                      <div className="space-y-1">
                        {selectedDevice.meshConnections.map((connection, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            {connection}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicAnalytics;