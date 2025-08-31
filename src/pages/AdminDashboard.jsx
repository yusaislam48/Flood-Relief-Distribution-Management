import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Eye,
  Plus
} from 'lucide-react';
import { dashboardStats, floodAreas, reliefRequests, iotDevices } from '../data/dummyData';

const AdminDashboard = ({ user }) => {
  const [timeRange, setTimeRange] = useState('today');
  const stats = dashboardStats.admin;

  const recentRequests = reliefRequests
    .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
    .slice(0, 5);

  const activeDevices = iotDevices.filter(device => device.status === 'Active');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Rejected':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'High':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-green-600 bg-green-50 border-green-200';
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
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {user.name}. Monitor and manage flood relief operations.
              </p>
            </div>
            <div className="flex space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field text-sm"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <Link
                to="/flood-areas"
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Flood Area
              </Link>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Flood Areas
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalFloodAreas}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      2 new
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Registered Organizations
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalOrganizations}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      5 verified
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-warning-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Requests
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.pendingApprovals}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Needs review
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Missions
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.activeRequests}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      In progress
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Flood Areas Overview */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Flood Areas Status</h3>
              <Link 
                to="/flood-areas"
                className="text-sm text-primary-600 hover:text-primary-500 flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {floodAreas.slice(0, 3).map(area => (
                <div key={area.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{area.name}</h4>
                      <span className={`status-badge ${getSeverityColor(area.severity)}`}>
                        {area.severity}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <span>{area.totalVillages} villages</span> • 
                      <span className="ml-1">{area.totalFamilies} families</span> • 
                      <span className="ml-1">Water Level: {area.waterLevel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Requests */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Recent Relief Requests</h3>
              <Link 
                to="/requests"
                className="text-sm text-primary-600 hover:text-primary-500 flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentRequests.map(request => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {request.organizationName}
                      </h4>
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span className="ml-1 text-sm text-gray-600">{request.status}</span>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {request.requestType} • {request.floodAreaName}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {new Date(request.requestDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Tracking Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active IoT Devices */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Active IoT Devices</h3>
              <Link 
                to="/tracking"
                className="text-sm text-primary-600 hover:text-primary-500 flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Live Map
              </Link>
            </div>
            
            <div className="space-y-3">
              {activeDevices.map(device => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {device.serialNumber}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        {device.status}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      Battery: {device.batteryLevel}% • Signal: {device.signalStrength}
                    </div>
                  </div>
                </div>
              ))}
              
              {activeDevices.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No active devices</p>
                </div>
              )}
            </div>
          </div>

          {/* Mission Progress */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Mission Progress</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed Today</span>
                  <span className="font-medium">{stats.completedMissions}</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-medium">{stats.activeRequests}</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-medium">{stats.pendingApprovals}</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Impact Summary</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{stats.totalFamiliesAffected.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Families Affected</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">{stats.totalVillages}</div>
                <div className="text-sm text-gray-600">Villages in Flood Zones</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completedMissions}</div>
                <div className="text-sm text-gray-600">Relief Missions Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/flood-areas"
              className="flex items-center p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              <MapPin className="h-5 w-5 text-primary-600 mr-3" />
              <span className="text-sm font-medium text-primary-700">Manage Flood Areas</span>
            </Link>
            
            <Link
              to="/requests"
              className="flex items-center p-3 bg-warning-50 rounded-lg hover:bg-warning-100 transition-colors"
            >
              <FileText className="h-5 w-5 text-warning-600 mr-3" />
              <span className="text-sm font-medium text-warning-700">Review Requests</span>
            </Link>
            
            <Link
              to="/tracking"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Activity className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm font-medium text-green-700">Live Tracking</span>
            </Link>
            
            <button className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Users className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">Manage Users</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

