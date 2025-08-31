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
  Eye
} from 'lucide-react';
import { reliefRequests, apiHelpers } from '../data/dummyData';

const OrganizationDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
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
      default:
        return <span className="status-badge">{status}</span>;
    }
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
            <Link to="/requests/new" className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Relief Request
            </Link>
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
                            <button className="text-primary-600 hover:text-primary-800 font-medium">
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
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <h5 className="font-medium text-sm text-gray-900 mb-1">Assigned Villages</h5>
                              <p className="text-sm text-gray-600">
                                {mission.assignedResources.assignedVillages.join(', ')}
                              </p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-md">
                              <h5 className="font-medium text-sm text-gray-900 mb-1">Local Guide</h5>
                              <p className="text-sm text-gray-600">
                                {mission.assignedResources.localGuide.name} ({mission.assignedResources.localGuide.phone})
                              </p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-md">
                              <h5 className="font-medium text-sm text-gray-900 mb-1">Army Personnel</h5>
                              <p className="text-sm text-gray-600">
                                {mission.assignedResources.armyPersonnel.name} ({mission.assignedResources.armyPersonnel.unit})
                              </p>
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
            <Link to="/requests/new" className="card hover:bg-gray-50 flex items-center justify-center p-4">
              <Plus className="h-5 w-5 text-primary-600 mr-2" />
              <span className="font-medium text-gray-900">New Request</span>
            </Link>
            
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
      </div>
    </div>
  );
};

export default OrganizationDashboard;
