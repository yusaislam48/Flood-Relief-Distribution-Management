import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Truck, 
  Phone, 
  Mail, 
  Calendar, 
  Filter, 
  Search, 
  Eye, 
  Check, 
  X, 
  Plus, 
  Download, 
  RefreshCw, 
  Navigation, 
  Wifi, 
  Battery, 
  Signal, 
  Camera, 
  FileText, 
  User, 
  Shield, 
  Home, 
  Droplet,
  Activity,
  BarChart3,
  Bell,
  Settings
} from 'lucide-react';
import { reliefRequests, iotDevices, floodAreas, users } from '../data/dummyData';

const RequestManagement = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    requestType: '',
    floodArea: ''
  });
  const [sortBy, setSortBy] = useState('requestDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    iotDevice: '',
    transportation: '',
    localGuide: { name: '', phone: '', area: '' },
    armyPersonnel: { name: '', phone: '', unit: '' },
    assignedVillages: []
  });

  // Load requests from dummy data
  useEffect(() => {
    setRequests(reliefRequests);
  }, []);

  // Filter and sort requests
  const filteredAndSortedRequests = requests
    .filter(request => {
      const matchesSearch = 
        request.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.floodAreaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requestType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (!filters.status || request.status === filters.status) &&
        (!filters.priority || request.priority === filters.priority) &&
        (!filters.requestType || request.requestType === filters.requestType) &&
        (!filters.floodArea || request.floodAreaId === filters.floodArea);
      
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'organizationName':
          aValue = a.organizationName.toLowerCase();
          bValue = b.organizationName.toLowerCase();
          break;
        case 'priority':
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        case 'requestDate':
        default:
          aValue = new Date(a.requestDate);
          bValue = new Date(b.requestDate);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="status-badge bg-success-50 text-success-600 border border-success-200">Approved</span>;
      case 'Pending':
        return <span className="status-badge bg-warning-50 text-warning-600 border border-warning-200">Pending</span>;
      case 'Rejected':
        return <span className="status-badge bg-danger-50 text-danger-600 border border-danger-200">Rejected</span>;
      case 'Completed':
        return <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">Completed</span>;
      default:
        return <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">{status}</span>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return <span className="status-badge bg-danger-50 text-danger-600 border border-danger-200">Critical</span>;
      case 'High':
        return <span className="status-badge bg-warning-50 text-warning-600 border border-warning-200">High</span>;
      case 'Medium':
        return <span className="status-badge bg-primary-50 text-primary-600 border border-primary-200">Medium</span>;
      case 'Low':
        return <span className="status-badge bg-success-50 text-success-600 border border-success-200">Low</span>;
      default:
        return <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">{priority}</span>;
    }
  };

  // Get mission status badge
  const getMissionStatusBadge = (status) => {
    switch (status) {
      case 'In Progress':
        return <span className="status-badge bg-primary-50 text-primary-600 border border-primary-200">In Progress</span>;
      case 'Completed':
        return <span className="status-badge bg-success-50 text-success-600 border border-success-200">Completed</span>;
      case 'Pending Approval':
        return <span className="status-badge bg-warning-50 text-warning-600 border border-warning-200">Pending Approval</span>;
      case 'Cancelled':
        return <span className="status-badge bg-danger-50 text-danger-600 border border-danger-200">Cancelled</span>;
      default:
        return <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">{status}</span>;
    }
  };

  // Handle request approval
  const handleApprove = (requestId) => {
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: 'Approved',
          approvedBy: user.id,
          approvalDate: new Date().toISOString(),
          missionStatus: 'Pending Assignment'
        };
      }
      return request;
    });
    setRequests(updatedRequests);
    setShowApprovalModal(false);
  };

  // Handle request rejection
  const handleReject = (requestId) => {
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: 'Rejected',
          approvedBy: user.id,
          approvalDate: new Date().toISOString(),
          missionStatus: 'Cancelled'
        };
      }
      return request;
    });
    setRequests(updatedRequests);
    setShowApprovalModal(false);
  };

  // Handle resource assignment
  const handleAssignResources = (requestId) => {
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          assignedResources: assignmentData,
          missionStatus: 'In Progress',
          startTime: new Date().toISOString()
        };
      }
      return request;
    });
    setRequests(updatedRequests);
    setShowAssignmentModal(false);
    setAssignmentData({
      iotDevice: '',
      transportation: '',
      localGuide: { name: '', phone: '', area: '' },
      armyPersonnel: { name: '', phone: '', unit: '' },
      assignedVillages: []
    });
  };

  // Handle village selection
  const handleVillageSelection = (villageId) => {
    const updatedVillages = assignmentData.assignedVillages.includes(villageId)
      ? assignmentData.assignedVillages.filter(id => id !== villageId)
      : [...assignmentData.assignedVillages, villageId];
    
    setAssignmentData({
      ...assignmentData,
      assignedVillages: updatedVillages
    });
  };

  // Get available villages for selected flood area
  const getAvailableVillages = (floodAreaId) => {
    const floodArea = floodAreas.find(area => area.id === floodAreaId);
    return floodArea?.villages || [];
  };

  // Get available IoT devices
  const getAvailableIoTDevices = () => {
    return iotDevices.filter(device => device.status === 'Available');
  };

  // Get available transportation for flood area
  const getAvailableTransportation = (floodAreaId) => {
    const floodArea = floodAreas.find(area => area.id === floodAreaId);
    return floodArea?.transportation?.filter(transport => transport.status === 'Available') || [];
  };

  // Calculate statistics
  const getStatistics = () => {
    return {
      totalRequests: requests.length,
      pendingRequests: requests.filter(r => r.status === 'Pending').length,
      approvedRequests: requests.filter(r => r.status === 'Approved').length,
      rejectedRequests: requests.filter(r => r.status === 'Rejected').length,
      inProgressMissions: requests.filter(r => r.missionStatus === 'In Progress').length,
      completedMissions: requests.filter(r => r.missionStatus === 'Completed').length
    };
  };

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Relief Request Management
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Review, approve, and manage relief requests from organizations
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary flex items-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <Clock className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedRequests}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Activity className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgressMissions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search requests by organization, flood area, or request type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            {/* Sort Controls */}
            <div className="flex flex-wrap gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="requestDate">Sort by Date</option>
                <option value="organizationName">Sort by Organization</option>
                <option value="priority">Sort by Priority</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="btn-secondary flex items-center"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="input-field"
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={filters.priority}
                    onChange={(e) => setFilters({...filters, priority: e.target.value})}
                    className="input-field"
                  >
                    <option value="">All Priorities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
                  <select
                    name="requestType"
                    value={filters.requestType}
                    onChange={(e) => setFilters({...filters, requestType: e.target.value})}
                    className="input-field"
                  >
                    <option value="">All Types</option>
                    <option value="Full Relief Package">Full Relief Package</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Medical Aid">Medical Aid</option>
                    <option value="Emergency Response">Emergency Response</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({ status: '', priority: '', requestType: '', floodArea: '' })}
                    className="btn-secondary w-full"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Requests List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredAndSortedRequests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No requests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || Object.values(filters).some(f => f) ? 'Try adjusting your search term or filters' : 'No relief requests have been submitted yet'}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredAndSortedRequests.map((request) => (
                <li key={request.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{request.organizationName}</h3>
                        <div className="flex space-x-2">
                          {getStatusBadge(request.status)}
                          {getPriorityBadge(request.priority)}
                        </div>
                      </div>
                      <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Flood Area:</span> {request.floodAreaName}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Request Type:</span> {request.requestType}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Mission Status:</span> {getMissionStatusBadge(request.missionStatus)}
                        </div>
                      </div>
                      <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Request Date:</span> {new Date(request.requestDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Manpower:</span> {request.details.manpower} people
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowDetailsModal(true);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {request.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowApprovalModal(true);
                            }}
                            className="p-1 rounded-full hover:bg-gray-100 text-green-600"
                            title="Approve/Reject"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      {request.status === 'Approved' && request.missionStatus === 'Pending Assignment' && (
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowAssignmentModal(true);
                          }}
                          className="p-1 rounded-full hover:bg-gray-100 text-purple-600"
                          title="Assign Resources"
                        >
                          <Settings className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Request Details Modal */}
        {showDetailsModal && selectedRequest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
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
                        <div><span className="font-medium">Priority:</span> {getPriorityBadge(selectedRequest.priority)}</div>
                        <div><span className="font-medium">Status:</span> {getStatusBadge(selectedRequest.status)}</div>
                        <div><span className="font-medium">Mission Status:</span> {getMissionStatusBadge(selectedRequest.missionStatus)}</div>
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
                                const village = getAvailableVillages(selectedRequest.floodAreaId).find(v => v.id === villageId);
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

        {/* Approval Modal */}
        {showApprovalModal && selectedRequest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mt-4">Approve Request</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to approve the request from <strong>{selectedRequest.organizationName}</strong> for <strong>{selectedRequest.floodAreaName}</strong>?
                  </p>
                </div>
                <div className="flex justify-center space-x-3 mt-4">
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    className="btn-danger"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="btn-success"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resource Assignment Modal */}
        {showAssignmentModal && selectedRequest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Assign Resources</h3>
                  <button
                    onClick={() => setShowAssignmentModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* IoT Device Assignment */}
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                        <Wifi className="h-4 w-4 mr-2" />
                        IoT Device Assignment
                      </h4>
                      <select
                        value={assignmentData.iotDevice}
                        onChange={(e) => setAssignmentData({...assignmentData, iotDevice: e.target.value})}
                        className="input-field"
                      >
                        <option value="">Select IoT Device</option>
                        {getAvailableIoTDevices().map(device => (
                          <option key={device.id} value={device.id}>
                            {device.serialNumber} - {device.type} (Battery: {device.batteryLevel}%)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                        <Droplet className="h-4 w-4 mr-2" />
                        Transportation Assignment
                      </h4>
                      <select
                        value={assignmentData.transportation}
                        onChange={(e) => setAssignmentData({...assignmentData, transportation: e.target.value})}
                        className="input-field"
                      >
                        <option value="">Select Transportation</option>
                        {getAvailableTransportation(selectedRequest.floodAreaId).map(transport => (
                          <option key={transport.id} value={transport.id}>
                            {transport.type} - {transport.capacity} (Operator: {transport.operator})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        Village Assignment
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {getAvailableVillages(selectedRequest.floodAreaId).map(village => (
                          <label key={village.id} className="flex items-center p-2 bg-white rounded border">
                            <input
                              type="checkbox"
                              checked={assignmentData.assignedVillages.includes(village.id)}
                              onChange={() => handleVillageSelection(village.id)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <div className="ml-3 flex-1">
                              <div className="text-sm font-medium text-gray-900">{village.name}</div>
                              <div className="text-xs text-gray-500">
                                {village.familyCount} families • {village.population} people • Priority: {village.priority}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {assignmentData.assignedVillages.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                          Selected: {assignmentData.assignedVillages.length} village(s)
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personnel Assignment */}
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Local Guide Assignment
                      </h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Guide Name"
                          value={assignmentData.localGuide.name}
                          onChange={(e) => setAssignmentData({
                            ...assignmentData, 
                            localGuide: {...assignmentData.localGuide, name: e.target.value}
                          })}
                          className="input-field"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={assignmentData.localGuide.phone}
                          onChange={(e) => setAssignmentData({
                            ...assignmentData, 
                            localGuide: {...assignmentData.localGuide, phone: e.target.value}
                          })}
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="Area of Expertise"
                          value={assignmentData.localGuide.area}
                          onChange={(e) => setAssignmentData({
                            ...assignmentData, 
                            localGuide: {...assignmentData.localGuide, area: e.target.value}
                          })}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Army Personnel Assignment
                      </h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Personnel Name"
                          value={assignmentData.armyPersonnel.name}
                          onChange={(e) => setAssignmentData({
                            ...assignmentData, 
                            armyPersonnel: {...assignmentData.armyPersonnel, name: e.target.value}
                          })}
                          className="input-field"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={assignmentData.armyPersonnel.phone}
                          onChange={(e) => setAssignmentData({
                            ...assignmentData, 
                            armyPersonnel: {...assignmentData.armyPersonnel, phone: e.target.value}
                          })}
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="Unit/Division"
                          value={assignmentData.armyPersonnel.unit}
                          onChange={(e) => setAssignmentData({
                            ...assignmentData, 
                            armyPersonnel: {...assignmentData.armyPersonnel, unit: e.target.value}
                          })}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAssignmentModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAssignResources(selectedRequest.id)}
                    className="btn-primary"
                  >
                    Assign Resources
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestManagement;
