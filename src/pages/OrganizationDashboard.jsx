import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Plus,
  Activity,
  Map,
  Info,
  Eye,
  X,
  Wifi,
  Battery,
  Signal,
  User,
  Shield,
  Droplet,
  Phone,
  Mail,
  Calendar,
  Navigation,
  Camera,
  Save,
  Send,
  RefreshCw,
  Home,
  Users,
  Truck
} from 'lucide-react';
import { reliefRequests, apiHelpers, floodAreas, iotDevices } from '../data/dummyData';

const OrganizationDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequestData, setNewRequestData] = useState({
    floodAreaId: '',
    requestType: 'Full Relief Package',
    priority: 'Medium',
    manpower: '',
    reliefAmount: '',
    itemTypes: [],
    transportation: 'Need Assignment',
    estimatedDuration: '',
    targetVillages: [],
    specialRequirements: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const orgRequests = reliefRequests.filter(req => req.organizationId === user.id);
  const stats = apiHelpers.dashboardStats?.organization(user.id) || {
    totalRequests: orgRequests.length,
    approvedRequests: orgRequests.filter(r => r.status === 'Approved').length,
    pendingRequests: orgRequests.filter(r => r.status === 'Pending').length,
    completedMissions: orgRequests.filter(r => r.missionStatus === 'Completed').length,
    activeMissions: orgRequests.filter(r => r.missionStatus === 'In Progress').length
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="status-badge status-approved">Approved</span>;
      case 'Pending':
        return <span className="status-badge status-pending">Pending</span>;
      case 'Rejected':
        return <span className="status-badge status-rejected">Rejected</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getMissionBadge = (status) => {
    switch (status) {
      case 'In Progress':
        return <span className="status-badge status-active">In Progress</span>;
      case 'Completed':
        return <span className="status-badge status-completed">Completed</span>;
      case 'Pending Approval':
        return <span className="status-badge status-pending">Pending Approval</span>;
      case 'Pending Assignment':
        return <span className="status-badge status-pending">Pending Assignment</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  // Handle view request details
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  // Handle new request form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequestData({
      ...newRequestData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Handle item types selection
  const handleItemTypeChange = (itemType) => {
    const updatedItemTypes = newRequestData.itemTypes.includes(itemType)
      ? newRequestData.itemTypes.filter(item => item !== itemType)
      : [...newRequestData.itemTypes, itemType];
    
    setNewRequestData({
      ...newRequestData,
      itemTypes: updatedItemTypes
    });
  };

  // Validate new request form
  const validateNewRequest = () => {
    const errors = {};
    
    if (!newRequestData.floodAreaId) errors.floodAreaId = 'Please select a flood area';
    if (!newRequestData.manpower) errors.manpower = 'Manpower is required';
    if (!newRequestData.reliefAmount) errors.reliefAmount = 'Relief amount is required';
    if (newRequestData.itemTypes.length === 0) errors.itemTypes = 'Please select at least one item type';
    if (!newRequestData.estimatedDuration) errors.estimatedDuration = 'Estimated duration is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle new request submission
  const handleSubmitNewRequest = (e) => {
    e.preventDefault();
    
    if (!validateNewRequest()) return;
    
    const newRequest = {
      id: `req_${Date.now()}`,
      organizationId: user.id,
      organizationName: user.name,
      floodAreaId: newRequestData.floodAreaId,
      floodAreaName: floodAreas.find(area => area.id === newRequestData.floodAreaId)?.name || '',
      requestDate: new Date().toISOString(),
      status: 'Pending',
      priority: newRequestData.priority,
      requestType: newRequestData.requestType,
      details: {
        manpower: parseInt(newRequestData.manpower),
        reliefAmount: newRequestData.reliefAmount,
        itemTypes: newRequestData.itemTypes,
        transportation: newRequestData.transportation,
        estimatedDuration: newRequestData.estimatedDuration,
        targetVillages: newRequestData.targetVillages,
        specialRequirements: newRequestData.specialRequirements
      },
      assignedResources: null,
      approvedBy: null,
      approvalDate: null,
      missionStatus: 'Pending Approval',
      startTime: null,
      currentLocation: null,
      distributionPhotos: []
    };
    
    // In a real app, this would be sent to the server
    console.log('New request created:', newRequest);
    
    // Reset form
    setNewRequestData({
      floodAreaId: '',
      requestType: 'Full Relief Package',
      priority: 'Medium',
      manpower: '',
      reliefAmount: '',
      itemTypes: [],
      transportation: 'Need Assignment',
      estimatedDuration: '',
      targetVillages: [],
      specialRequirements: ''
    });
    setFormErrors({});
    setShowNewRequestModal(false);
    
    // Show success message (in a real app, this would be a proper notification)
    alert('Relief request submitted successfully!');
  };

  // Get available flood areas
  const getAvailableFloodAreas = () => {
    return floodAreas.filter(area => area.status === 'Active');
  };

  // Get villages for selected flood area
  const getVillagesForArea = (floodAreaId) => {
    const area = floodAreas.find(area => area.id === floodAreaId);
    return area?.villages || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Organization Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome, {user.name}. Manage your relief operations.
              </p>
            </div>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Relief Request
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="card">
            <div className="flex flex-col items-center">
              <FileText className="h-8 w-8 text-primary-600 mb-2" />
              <h4 className="text-lg font-medium text-gray-900">{stats.totalRequests}</h4>
              <p className="text-sm text-gray-500">Total Requests</p>
            </div>
          </div>
          
          <div className="card">
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-yellow-500 mb-2" />
              <h4 className="text-lg font-medium text-gray-900">{stats.pendingRequests}</h4>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
          
          <div className="card">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <h4 className="text-lg font-medium text-gray-900">{stats.approvedRequests}</h4>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
          
          <div className="card">
            <div className="flex flex-col items-center">
              <Activity className="h-8 w-8 text-blue-500 mb-2" />
              <h4 className="text-lg font-medium text-gray-900">{stats.activeMissions}</h4>
              <p className="text-sm text-gray-500">Active Missions</p>
            </div>
          </div>
          
          <div className="card">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-primary-600 mb-2" />
              <h4 className="text-lg font-medium text-gray-900">{stats.completedMissions}</h4>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'active'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Active Missions
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                History
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">All Relief Requests</h3>
              
              {orgRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests yet</h3>
                  <p className="text-gray-500 mb-4">Create your first relief request to get started</p>
                  <Link to="/requests/new" className="btn-primary inline-flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Flood Area
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mission Status
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orgRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(request.requestDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {request.floodAreaName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.requestType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getStatusBadge(request.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getMissionBadge(request.missionStatus)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <button 
                              onClick={() => handleViewRequest(request)}
                              className="text-primary-600 hover:text-primary-800 font-medium"
                            >
                              <Eye className="h-4 w-4 inline mr-1" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'active' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Active Missions</h3>
              
              {orgRequests.filter(r => r.missionStatus === 'In Progress').length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active missions</h3>
                  <p className="text-gray-500">Your approved requests will appear here</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orgRequests
                    .filter(r => r.missionStatus === 'In Progress')
                    .map(mission => (
                      <div key={mission.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-lg text-gray-900">{mission.floodAreaName}</h4>
                            <p className="text-gray-600">{mission.requestType}</p>
                          </div>
                          {getMissionBadge(mission.missionStatus)}
                        </div>
                        
                        {mission.assignedResources && (
                          <div className="mt-4 space-y-4">
                            <div className="bg-purple-50 p-3 rounded-md">
                              <h5 className="font-medium text-sm text-gray-900 mb-2 flex items-center">
                                <Home className="h-4 w-4 mr-1" />
                                Assigned Villages
                              </h5>
                              <div className="space-y-2">
                                {mission.assignedResources.assignedVillages && mission.assignedResources.assignedVillages.length > 0 ? (
                                  mission.assignedResources.assignedVillages.map(villageId => {
                                    const floodArea = floodAreas.find(area => area.id === mission.floodAreaId);
                                    const village = floodArea?.villages?.find(v => v.id === villageId);
                                    return village ? (
                                      <div key={villageId} className="bg-white p-2 rounded border text-sm">
                                        <div className="font-medium text-gray-900">{village.name}</div>
                                        <div className="text-xs text-gray-500">
                                          {village.familyCount} families • {village.population} people • Priority: {village.priority}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Last Relief: {new Date(village.lastReliefDetails.date).toLocaleDateString()} by {village.lastReliefDetails.organization}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Contact: {village.contactPerson} ({village.contactPhone})
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Needs: {village.needs.join(', ')}
                                        </div>
                                      </div>
                                    ) : null;
                                  })
                                ) : (
                                  <p className="text-sm text-gray-600">No villages assigned</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-3 rounded-md">
                                <h5 className="font-medium text-sm text-gray-900 mb-1 flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  Local Guide
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {mission.assignedResources.localGuide.name} ({mission.assignedResources.localGuide.phone})
                                </p>
                                <p className="text-xs text-gray-500">
                                  Area: {mission.assignedResources.localGuide.area}
                                </p>
                              </div>
                              
                              <div className="bg-gray-50 p-3 rounded-md">
                                <h5 className="font-medium text-sm text-gray-900 mb-1 flex items-center">
                                  <Shield className="h-4 w-4 mr-1" />
                                  Army Personnel
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {mission.assignedResources.armyPersonnel.name} ({mission.assignedResources.armyPersonnel.phone})
                                </p>
                                <p className="text-xs text-gray-500">
                                  Unit: {mission.assignedResources.armyPersonnel.unit}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 flex justify-end space-x-3">
                          <Link to={`/tracking/${mission.id}`} className="btn-primary">
                            <Map className="h-4 w-4 mr-2 inline" />
                            Track Mission
                          </Link>
                          
                          <button className="btn-success">
                            <CheckCircle className="h-4 w-4 mr-2 inline" />
                            Complete
                          </button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Mission History</h3>
              
              {orgRequests.filter(r => r.missionStatus === 'Completed').length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed missions</h3>
                  <p className="text-gray-500">Your completed missions will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orgRequests
                    .filter(r => r.missionStatus === 'Completed')
                    .map(mission => (
                      <div key={mission.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{mission.floodAreaName}</h4>
                            <p className="text-sm text-gray-600">{mission.requestType}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Completed on: {new Date(mission.endTime).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          {getMissionBadge(mission.missionStatus)}
                        </div>
                        
                        {mission.distributionPhotos && mission.distributionPhotos.length > 0 && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Distribution Photos:</h5>
                            <div className="flex space-x-2">
                              {mission.distributionPhotos.map((photo, index) => (
                                <div key={index} className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                                  <img 
                                    src={photo} 
                                    alt={`Distribution ${index + 1}`} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              onClick={() => setShowNewRequestModal(true)}
              className="card hover:bg-gray-50 flex items-center justify-center p-4 w-full"
            >
              <Plus className="h-5 w-5 text-primary-600 mr-2" />
              <span className="font-medium text-gray-900">New Request</span>
            </button>
            
            <Link to="/tracking" className="card hover:bg-gray-50 flex items-center justify-center p-4">
              <Map className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium text-gray-900">View Map</span>
            </Link>
            
            <button className="card hover:bg-gray-50 flex items-center justify-center p-4">
              <Info className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-900">Help & Resources</span>
            </button>
          </div>
        </div>

        {/* Request Details Modal */}
        {showDetailsModal && selectedRequest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Request Information */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Request Information</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Organization:</span> {selectedRequest.organizationName}</div>
                        <div><span className="font-medium">Flood Area:</span> {selectedRequest.floodAreaName}</div>
                        <div><span className="font-medium">Request Type:</span> {selectedRequest.requestType}</div>
                        <div><span className="font-medium">Priority:</span> {getStatusBadge(selectedRequest.priority)}</div>
                        <div><span className="font-medium">Status:</span> {getStatusBadge(selectedRequest.status)}</div>
                        <div><span className="font-medium">Mission Status:</span> {getMissionBadge(selectedRequest.missionStatus)}</div>
                        <div><span className="font-medium">Request Date:</span> {new Date(selectedRequest.requestDate).toLocaleString()}</div>
                        {selectedRequest.approvalDate && (
                          <div><span className="font-medium">Approval Date:</span> {new Date(selectedRequest.approvalDate).toLocaleString()}</div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Request Details</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Manpower:</span> {selectedRequest.details.manpower} people</div>
                        <div><span className="font-medium">Relief Amount:</span> {selectedRequest.details.reliefAmount}</div>
                        <div><span className="font-medium">Transportation:</span> {selectedRequest.details.transportation}</div>
                        <div><span className="font-medium">Duration:</span> {selectedRequest.details.estimatedDuration}</div>
                        <div><span className="font-medium">Target Villages:</span> {selectedRequest.details.targetVillages.length} villages</div>
                        <div><span className="font-medium">Special Requirements:</span> {selectedRequest.details.specialRequirements}</div>
                        <div><span className="font-medium">Item Types:</span> {selectedRequest.details.itemTypes.join(', ')}</div>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Resources */}
                  <div className="space-y-4">
                    {selectedRequest.assignedResources ? (
                      <>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                            <Wifi className="h-4 w-4 mr-2" />
                            IoT Device
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">Device ID:</span> {selectedRequest.assignedResources.iotDevice.id}</div>
                            <div><span className="font-medium">Type:</span> {selectedRequest.assignedResources.iotDevice.type}</div>
                            <div><span className="font-medium">Serial:</span> {selectedRequest.assignedResources.iotDevice.serialNumber}</div>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                            <Droplet className="h-4 w-4 mr-2" />
                            Transportation
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">Transport ID:</span> {selectedRequest.assignedResources.transportationId}</div>
                          </div>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                            <Home className="h-4 w-4 mr-2" />
                            Assigned Villages
                          </h4>
                          <div className="space-y-2 text-sm">
                            {selectedRequest.assignedResources.assignedVillages && selectedRequest.assignedResources.assignedVillages.length > 0 ? (
                              selectedRequest.assignedResources.assignedVillages.map(villageId => {
                                const floodArea = floodAreas.find(area => area.id === selectedRequest.floodAreaId);
                                const village = floodArea?.villages?.find(v => v.id === villageId);
                                return village ? (
                                  <div key={villageId} className="bg-white p-2 rounded border">
                                    <div><span className="font-medium">{village.name}</span></div>
                                    <div className="text-xs text-gray-500">
                                      {village.familyCount} families • {village.population} people • Priority: {village.priority}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Last Relief: {new Date(village.lastReliefDetails.date).toLocaleDateString()} by {village.lastReliefDetails.organization}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Contact: {village.contactPerson} ({village.contactPhone})
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Needs: {village.needs.join(', ')}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Accessibility: {village.accessibility}
                                    </div>
                                  </div>
                                ) : null;
                              })
                            ) : (
                              <div className="text-gray-500">No villages assigned</div>
                            )}
                          </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Local Guide
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">Name:</span> {selectedRequest.assignedResources.localGuide.name}</div>
                            <div><span className="font-medium">Phone:</span> {selectedRequest.assignedResources.localGuide.phone}</div>
                            <div><span className="font-medium">Area:</span> {selectedRequest.assignedResources.localGuide.area}</div>
                          </div>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg">
                          <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Army Personnel
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">Name:</span> {selectedRequest.assignedResources.armyPersonnel.name}</div>
                            <div><span className="font-medium">Phone:</span> {selectedRequest.assignedResources.armyPersonnel.phone}</div>
                            <div><span className="font-medium">Unit:</span> {selectedRequest.assignedResources.armyPersonnel.unit}</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <h4 className="text-md font-medium text-gray-900 mb-2">No Resources Assigned</h4>
                        <p className="text-sm text-gray-600">Resources will be assigned after approval</p>
                      </div>
                    )}

                    {/* Mission Tracking */}
                    {selectedRequest.missionStatus === 'In Progress' && (
                      <div className="bg-primary-50 p-4 rounded-lg">
                        <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                          <Activity className="h-4 w-4 mr-2" />
                          Mission Tracking
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Start Time:</span> {new Date(selectedRequest.startTime).toLocaleString()}</div>
                          {selectedRequest.currentLocation && (
                            <div><span className="font-medium">Current Location:</span> {selectedRequest.currentLocation.lat.toFixed(4)}, {selectedRequest.currentLocation.lng.toFixed(4)}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Request Modal */}
        {showNewRequestModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Create New Relief Request</h3>
                  <button
                    onClick={() => setShowNewRequestModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitNewRequest} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Flood Area *</label>
                      <select
                        name="floodAreaId"
                        value={newRequestData.floodAreaId}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">Select Flood Area</option>
                        {getAvailableFloodAreas().map(area => (
                          <option key={area.id} value={area.id}>
                            {area.name} - {area.district}
                          </option>
                        ))}
                      </select>
                      {formErrors.floodAreaId && <p className="text-red-500 text-xs mt-1">{formErrors.floodAreaId}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                      <select
                        name="requestType"
                        value={newRequestData.requestType}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="Full Relief Package">Full Relief Package</option>
                        <option value="Food Distribution">Food Distribution</option>
                        <option value="Medical Aid">Medical Aid</option>
                        <option value="Emergency Response">Emergency Response</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        name="priority"
                        value={newRequestData.priority}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Manpower *</label>
                      <input
                        type="number"
                        name="manpower"
                        value={newRequestData.manpower}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Number of people"
                        min="1"
                      />
                      {formErrors.manpower && <p className="text-red-500 text-xs mt-1">{formErrors.manpower}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relief Amount *</label>
                      <input
                        type="text"
                        name="reliefAmount"
                        value={newRequestData.reliefAmount}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g., 1000kg, 500 packages"
                      />
                      {formErrors.reliefAmount && <p className="text-red-500 text-xs mt-1">{formErrors.reliefAmount}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transportation</label>
                      <select
                        name="transportation"
                        value={newRequestData.transportation}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="Need Assignment">Need Assignment</option>
                        <option value="Provided by Organization">Provided by Organization</option>
                        <option value="Shared Transport">Shared Transport</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Duration *</label>
                      <input
                        type="text"
                        name="estimatedDuration"
                        value={newRequestData.estimatedDuration}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="e.g., 2 days, 1 week"
                      />
                      {formErrors.estimatedDuration && <p className="text-red-500 text-xs mt-1">{formErrors.estimatedDuration}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Types *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Rice', 'Lentils', 'Water Purification Tablets', 'Basic Medicine', 'Blankets', 'Clothing', 'Hygiene Kits', 'Emergency Food'].map(item => (
                        <label key={item} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newRequestData.itemTypes.includes(item)}
                            onChange={() => handleItemTypeChange(item)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{item}</span>
                        </label>
                      ))}
                    </div>
                    {formErrors.itemTypes && <p className="text-red-500 text-xs mt-1">{formErrors.itemTypes}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                    <textarea
                      name="specialRequirements"
                      value={newRequestData.specialRequirements}
                      onChange={handleInputChange}
                      className="input-field"
                      rows="3"
                      placeholder="Any special requirements or notes..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewRequestModal(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex items-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationDashboard;
