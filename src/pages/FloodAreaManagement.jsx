import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Users,
  Home,
  Droplet,
  Check,
  X,
  Filter,
  Download,
  Upload,
  Map,
  BarChart3,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Calendar,
  Clock,
  Phone,
  Mail,
  Navigation,
  Activity,
  Battery,
  Signal,
  Wifi,
  WifiOff
} from 'lucide-react';
import { floodAreas } from '../data/dummyData';

const FloodAreaManagement = ({ user }) => {
  const [areas, setAreas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVillageModal, setShowVillageModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [expandedAreaId, setExpandedAreaId] = useState(null);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    severity: '',
    waterLevel: '',
    status: '',
    district: '',
    dateRange: ''
  });
  const [viewMode, setViewMode] = useState('list'); // list, grid, map
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    divison: '',
    totalVillages: '',
    totalFamilies: '',
    distanceFromCenter: '',
    waterLevel: 'Medium',
    severity: 'Moderate',
    status: 'Active',
    coordinates: { lat: '', lng: '' },
    description: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: ''
  });
  const [villageFormData, setVillageFormData] = useState({
    name: '',
    familyCount: '',
    distance: '',
    accessibility: 'Boat Only',
    population: '',
    priority: 'Medium',
    needs: []
  });
  const [transportFormData, setTransportFormData] = useState({
    type: '',
    capacity: '',
    operator: '',
    phone: '',
    status: 'Available',
    currentLocation: { lat: '', lng: '' }
  });
  const [formErrors, setFormErrors] = useState({});
  const [villageFormErrors, setVillageFormErrors] = useState({});
  const [transportFormErrors, setTransportFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Load flood areas from dummy data
  useEffect(() => {
    setAreas(floodAreas);
  }, []);

  // Filter and sort areas
  const filteredAndSortedAreas = areas
    .filter(area => {
      const matchesSearch = area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.divison.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (!filters.severity || area.severity === filters.severity) &&
        (!filters.waterLevel || area.waterLevel === filters.waterLevel) &&
        (!filters.status || area.status === filters.status) &&
        (!filters.district || area.district === filters.district);
      
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'severity':
          const severityOrder = { 'Critical': 4, 'High': 3, 'Moderate': 2, 'Low': 1 };
          aValue = severityOrder[a.severity] || 0;
          bValue = severityOrder[b.severity] || 0;
          break;
        case 'totalFamilies':
          aValue = a.totalFamilies;
          bValue = b.totalFamilies;
          break;
        case 'lastUpdated':
        default:
          aValue = new Date(a.lastUpdated);
          bValue = new Date(b.lastUpdated);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Toggle expanded view for an area
  const toggleExpand = (areaId) => {
    if (expandedAreaId === areaId) {
      setExpandedAreaId(null);
    } else {
      setExpandedAreaId(areaId);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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

  // Handle coordinate input changes
  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      coordinates: {
        ...formData.coordinates,
        [name]: value
      }
    });
  };

  // Handle village form input changes
  const handleVillageInputChange = (e) => {
    const { name, value } = e.target;
    setVillageFormData({
      ...villageFormData,
      [name]: value
    });
    
    if (villageFormErrors[name]) {
      setVillageFormErrors({
        ...villageFormErrors,
        [name]: ''
      });
    }
  };

  // Handle transport form input changes
  const handleTransportInputChange = (e) => {
    const { name, value } = e.target;
    setTransportFormData({
      ...transportFormData,
      [name]: value
    });
    
    if (transportFormErrors[name]) {
      setTransportFormErrors({
        ...transportFormErrors,
        [name]: ''
      });
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      severity: '',
      waterLevel: '',
      status: '',
      district: '',
      dateRange: ''
    });
  };

  // Handle area selection for bulk operations
  const handleAreaSelection = (areaId, isSelected) => {
    if (isSelected) {
      setSelectedAreas([...selectedAreas, areaId]);
    } else {
      setSelectedAreas(selectedAreas.filter(id => id !== areaId));
    }
  };

  // Select all areas
  const selectAllAreas = () => {
    setSelectedAreas(filteredAndSortedAreas.map(area => area.id));
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedAreas([]);
  };

  // Bulk delete selected areas
  const bulkDeleteAreas = () => {
    const updatedAreas = areas.filter(area => !selectedAreas.includes(area.id));
    setAreas(updatedAreas);
    setSelectedAreas([]);
    setShowBulkActions(false);
  };

  // Bulk status update
  const bulkUpdateStatus = (newStatus) => {
    const updatedAreas = areas.map(area => {
      if (selectedAreas.includes(area.id)) {
        return {
          ...area,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        };
      }
      return area;
    });
    setAreas(updatedAreas);
    setSelectedAreas([]);
    setShowBulkActions(false);
  };

  // Export data to CSV
  const exportToCSV = () => {
    const csvData = filteredAndSortedAreas.map(area => ({
      Name: area.name,
      District: area.district,
      Division: area.divison,
      'Total Villages': area.totalVillages,
      'Total Families': area.totalFamilies,
      'Water Level': area.waterLevel,
      Severity: area.severity,
      Status: area.status,
      'Last Updated': new Date(area.lastUpdated).toLocaleDateString()
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flood-areas-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.district.trim()) errors.district = 'District is required';
    if (!formData.divison.trim()) errors.divison = 'Division is required';
    
    if (!formData.totalVillages) {
      errors.totalVillages = 'Number of villages is required';
    } else if (isNaN(formData.totalVillages) || parseInt(formData.totalVillages) <= 0) {
      errors.totalVillages = 'Must be a positive number';
    }
    
    if (!formData.totalFamilies) {
      errors.totalFamilies = 'Number of families is required';
    } else if (isNaN(formData.totalFamilies) || parseInt(formData.totalFamilies) <= 0) {
      errors.totalFamilies = 'Must be a positive number';
    }
    
    if (!formData.distanceFromCenter) {
      errors.distanceFromCenter = 'Distance is required';
    } else if (isNaN(formData.distanceFromCenter) || parseFloat(formData.distanceFromCenter) <= 0) {
      errors.distanceFromCenter = 'Must be a positive number';
    }

    if (formData.coordinates.lat && (isNaN(formData.coordinates.lat) || parseFloat(formData.coordinates.lat) < -90 || parseFloat(formData.coordinates.lat) > 90)) {
      errors.lat = 'Latitude must be between -90 and 90';
    }

    if (formData.coordinates.lng && (isNaN(formData.coordinates.lng) || parseFloat(formData.coordinates.lng) < -180 || parseFloat(formData.coordinates.lng) > 180)) {
      errors.lng = 'Longitude must be between -180 and 180';
    }

    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }

    if (formData.contactPhone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.contactPhone)) {
      errors.contactPhone = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate village form
  const validateVillageForm = () => {
    const errors = {};
    
    if (!villageFormData.name.trim()) errors.name = 'Village name is required';
    if (!villageFormData.familyCount) {
      errors.familyCount = 'Family count is required';
    } else if (isNaN(villageFormData.familyCount) || parseInt(villageFormData.familyCount) <= 0) {
      errors.familyCount = 'Must be a positive number';
    }
    if (!villageFormData.population) {
      errors.population = 'Population is required';
    } else if (isNaN(villageFormData.population) || parseInt(villageFormData.population) <= 0) {
      errors.population = 'Must be a positive number';
    }
    if (!villageFormData.distance) {
      errors.distance = 'Distance is required';
    } else if (isNaN(villageFormData.distance) || parseFloat(villageFormData.distance) <= 0) {
      errors.distance = 'Must be a positive number';
    }
    
    setVillageFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate transport form
  const validateTransportForm = () => {
    const errors = {};
    
    if (!transportFormData.type.trim()) errors.type = 'Transport type is required';
    if (!transportFormData.capacity.trim()) errors.capacity = 'Capacity is required';
    if (!transportFormData.operator.trim()) errors.operator = 'Operator name is required';
    if (!transportFormData.phone.trim()) errors.phone = 'Phone number is required';
    
    setTransportFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle add area form submission
  const handleAddArea = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const newArea = {
      id: `fa_${Date.now()}`,
      ...formData,
      totalVillages: parseInt(formData.totalVillages),
      totalFamilies: parseInt(formData.totalFamilies),
      distanceFromCenter: parseFloat(formData.distanceFromCenter),
      coordinates: {
        lat: formData.coordinates.lat ? parseFloat(formData.coordinates.lat) : 23.8103,
        lng: formData.coordinates.lng ? parseFloat(formData.coordinates.lng) : 90.4125
      },
      lastUpdated: new Date().toISOString(),
      createdBy: user.id,
      villages: [],
      transportation: []
    };
    
    setAreas([...areas, newArea]);
    setShowAddModal(false);
    resetFormData();
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: '',
      district: '',
      divison: '',
      totalVillages: '',
      totalFamilies: '',
      distanceFromCenter: '',
      waterLevel: 'Medium',
      severity: 'Moderate',
      status: 'Active',
      coordinates: { lat: '', lng: '' },
      description: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: ''
    });
    setFormErrors({});
  };

  // Add village to selected area
  const handleAddVillage = (e) => {
    e.preventDefault();
    
    if (!validateVillageForm()) return;
    
    const newVillage = {
      id: `v_${Date.now()}`,
      ...villageFormData,
      familyCount: parseInt(villageFormData.familyCount),
      population: parseInt(villageFormData.population),
      distance: parseFloat(villageFormData.distance),
      lastAidReceived: null,
      needs: villageFormData.needs
    };
    
    const updatedAreas = areas.map(area => {
      if (area.id === selectedArea.id) {
        return {
          ...area,
          villages: [...(area.villages || []), newVillage],
          totalVillages: (area.villages || []).length + 1,
          totalFamilies: area.totalFamilies + newVillage.familyCount,
          lastUpdated: new Date().toISOString()
        };
      }
      return area;
    });
    
    setAreas(updatedAreas);
    setShowVillageModal(false);
    setVillageFormData({
      name: '',
      familyCount: '',
      distance: '',
      accessibility: 'Boat Only',
      population: '',
      priority: 'Medium',
      needs: []
    });
    setVillageFormErrors({});
  };

  // Add transport to selected area
  const handleAddTransport = (e) => {
    e.preventDefault();
    
    if (!validateTransportForm()) return;
    
    const newTransport = {
      id: `t_${Date.now()}`,
      ...transportFormData,
      currentLocation: {
        lat: transportFormData.currentLocation.lat ? parseFloat(transportFormData.currentLocation.lat) : selectedArea.coordinates.lat,
        lng: transportFormData.currentLocation.lng ? parseFloat(transportFormData.currentLocation.lng) : selectedArea.coordinates.lng
      }
    };
    
    const updatedAreas = areas.map(area => {
      if (area.id === selectedArea.id) {
        return {
          ...area,
          transportation: [...(area.transportation || []), newTransport],
          lastUpdated: new Date().toISOString()
        };
      }
      return area;
    });
    
    setAreas(updatedAreas);
    setShowTransportModal(false);
    setTransportFormData({
      type: '',
      capacity: '',
      operator: '',
      phone: '',
      status: 'Available',
      currentLocation: { lat: '', lng: '' }
    });
    setTransportFormErrors({});
  };

  // Handle edit area
  const handleEditClick = (area) => {
    setSelectedArea(area);
    setFormData({
      name: area.name,
      district: area.district,
      divison: area.divison,
      totalVillages: area.totalVillages.toString(),
      totalFamilies: area.totalFamilies.toString(),
      distanceFromCenter: area.distanceFromCenter.toString(),
      waterLevel: area.waterLevel,
      severity: area.severity,
      status: area.status,
      coordinates: {
        lat: area.coordinates?.lat?.toString() || '',
        lng: area.coordinates?.lng?.toString() || ''
      },
      description: area.description || '',
      contactPerson: area.contactPerson || '',
      contactPhone: area.contactPhone || '',
      contactEmail: area.contactEmail || ''
    });
    setShowEditModal(true);
  };

  // Handle update area
  const handleUpdateArea = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const updatedAreas = areas.map(area => {
      if (area.id === selectedArea.id) {
        return {
          ...area,
          ...formData,
          totalVillages: parseInt(formData.totalVillages),
          totalFamilies: parseInt(formData.totalFamilies),
          distanceFromCenter: parseFloat(formData.distanceFromCenter),
          coordinates: {
            lat: formData.coordinates.lat ? parseFloat(formData.coordinates.lat) : area.coordinates?.lat || 23.8103,
            lng: formData.coordinates.lng ? parseFloat(formData.coordinates.lng) : area.coordinates?.lng || 90.4125
          },
          lastUpdated: new Date().toISOString()
        };
      }
      return area;
    });
    
    setAreas(updatedAreas);
    setShowEditModal(false);
    setSelectedArea(null);
  };

  // Calculate statistics
  const getStatistics = () => {
    const totalAreas = areas.length;
    const activeAreas = areas.filter(area => area.status === 'Active').length;
    const criticalAreas = areas.filter(area => area.severity === 'Critical').length;
    const highSeverityAreas = areas.filter(area => area.severity === 'High').length;
    const totalFamilies = areas.reduce((sum, area) => sum + area.totalFamilies, 0);
    const totalVillages = areas.reduce((sum, area) => sum + area.totalVillages, 0);
    const highWaterLevel = areas.filter(area => area.waterLevel === 'High').length;
    
    const severityDistribution = {
      Critical: areas.filter(area => area.severity === 'Critical').length,
      High: areas.filter(area => area.severity === 'High').length,
      Moderate: areas.filter(area => area.severity === 'Moderate').length,
      Low: areas.filter(area => area.severity === 'Low').length
    };

    const waterLevelDistribution = {
      High: areas.filter(area => area.waterLevel === 'High').length,
      Medium: areas.filter(area => area.waterLevel === 'Medium').length,
      Low: areas.filter(area => area.waterLevel === 'Low').length
    };

    const districtDistribution = areas.reduce((acc, area) => {
      acc[area.district] = (acc[area.district] || 0) + 1;
      return acc;
    }, {});

    return {
      totalAreas,
      activeAreas,
      criticalAreas,
      highSeverityAreas,
      totalFamilies,
      totalVillages,
      highWaterLevel,
      severityDistribution,
      waterLevelDistribution,
      districtDistribution
    };
  };

  // Handle delete area
  const handleDeleteClick = (area) => {
    setSelectedArea(area);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedAreas = areas.filter(area => area.id !== selectedArea.id);
    setAreas(updatedAreas);
    setShowDeleteModal(false);
    setSelectedArea(null);
  };

  // Get severity badge color
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical':
        return <span className="status-badge bg-danger-50 text-danger-600 border border-danger-200">Critical</span>;
      case 'High':
        return <span className="status-badge bg-warning-50 text-warning-600 border border-warning-200">High</span>;
      case 'Moderate':
        return <span className="status-badge bg-primary-50 text-primary-600 border border-primary-200">Moderate</span>;
      case 'Low':
        return <span className="status-badge bg-success-50 text-success-600 border border-success-200">Low</span>;
      default:
        return <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">{severity}</span>;
    }
  };

  // Get water level badge color
  const getWaterLevelBadge = (level) => {
    switch (level) {
      case 'High':
        return <span className="status-badge bg-danger-50 text-danger-600 border border-danger-200">High</span>;
      case 'Medium':
        return <span className="status-badge bg-warning-50 text-warning-600 border border-warning-200">Medium</span>;
      case 'Low':
        return <span className="status-badge bg-success-50 text-success-600 border border-success-200">Low</span>;
      default:
        return <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">{level}</span>;
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="status-badge bg-success-50 text-success-600 border border-success-200">Active</span>;
      case 'Inactive':
        return <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">Inactive</span>;
      default:
        return <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">{status}</span>;
    }
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
                Flood Area Management
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage flood affected areas and their details
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowStatsModal(true)}
                className="btn-secondary flex items-center"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistics
              </button>
              <button
                onClick={() => setShowMapModal(true)}
                className="btn-secondary flex items-center"
              >
                <Map className="h-4 w-4 mr-2" />
                Map View
              </button>
              <button
                onClick={exportToCSV}
                className="btn-secondary flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Flood Area
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Areas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAreas}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-success-100 rounded-lg">
                <Check className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Areas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeAreas}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-danger-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-danger-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical Areas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.criticalAreas}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-warning-100 rounded-lg">
                <Users className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Families</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFamilies.toLocaleString()}</p>
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
                placeholder="Search flood areas by name, district, division, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="lastUpdated">Sort by Last Updated</option>
                <option value="name">Sort by Name</option>
                <option value="severity">Sort by Severity</option>
                <option value="totalFamilies">Sort by Families</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="btn-secondary flex items-center"
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    name="severity"
                    value={filters.severity}
                    onChange={handleFilterChange}
                    className="input-field"
                  >
                    <option value="">All Severities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water Level</label>
                  <select
                    name="waterLevel"
                    value={filters.waterLevel}
                    onChange={handleFilterChange}
                    className="input-field"
                  >
                    <option value="">All Levels</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="input-field"
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <select
                    name="district"
                    value={filters.district}
                    onChange={handleFilterChange}
                    className="input-field"
                  >
                    <option value="">All Districts</option>
                    {Array.from(new Set(areas.map(area => area.district))).map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="btn-secondary w-full"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedAreas.length > 0 && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-blue-800">
                  {selectedAreas.length} area{selectedAreas.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => bulkUpdateStatus('Active')}
                  className="btn-success text-sm"
                >
                  Mark Active
                </button>
                <button
                  onClick={() => bulkUpdateStatus('Inactive')}
                  className="btn-secondary text-sm"
                >
                  Mark Inactive
                </button>
                <button
                  onClick={bulkDeleteAreas}
                  className="btn-danger text-sm"
                >
                  Delete Selected
                </button>
                <button
                  onClick={clearAllSelections}
                  className="btn-secondary text-sm"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Flood Areas List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredAndSortedAreas.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No flood areas found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || Object.values(filters).some(f => f) ? 'Try adjusting your search term or filters' : 'Get started by adding a new flood area'}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Flood Area
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Select All Header */}
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAreas.length === filteredAndSortedAreas.length && filteredAndSortedAreas.length > 0}
                    onChange={(e) => e.target.checked ? selectAllAreas() : clearAllSelections()}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Select all ({filteredAndSortedAreas.length} areas)
                  </span>
                </div>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {filteredAndSortedAreas.map((area) => (
                <li key={area.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes(area.id)}
                        onChange={(e) => handleAreaSelection(area.id, e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{area.name}</h3>
                          <div className="flex space-x-2">
                            {getSeverityBadge(area.severity)}
                            {getStatusBadge(area.status)}
                          </div>
                        </div>
                        <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">District:</span> {area.district}, {area.divison}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Villages:</span> {area.totalVillages}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Families:</span> {area.totalFamilies.toLocaleString()}
                          </div>
                        </div>
                        <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Water Level:</span> {getWaterLevelBadge(area.waterLevel)}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Last Updated:</span> {new Date(area.lastUpdated).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        {area.description && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Description:</span> {area.description}
                          </div>
                        )}
                        {area.contactPerson && (
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-500">
                            <div>
                              <span className="font-medium">Contact:</span> {area.contactPerson}
                            </div>
                            {area.contactPhone && (
                              <div>
                                <span className="font-medium">Phone:</span> {area.contactPhone}
                              </div>
                            )}
                            {area.contactEmail && (
                              <div>
                                <span className="font-medium">Email:</span> {area.contactEmail}
                              </div>
                            )}
                          </div>
                        )}
                        {area.coordinates && (
                          <div className="mt-2 text-sm text-gray-500">
                            <span className="font-medium">Coordinates:</span> {area.coordinates.lat.toFixed(4)}, {area.coordinates.lng.toFixed(4)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleExpand(area.id)}
                        className="p-1 rounded-full hover:bg-gray-100"
                        aria-label="Toggle details"
                      >
                        {expandedAreaId === area.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedArea(area);
                          setShowVillageModal(true);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 text-green-600"
                        aria-label="Manage villages"
                        title="Manage Villages"
                      >
                        <Home className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedArea(area);
                          setShowTransportModal(true);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                        aria-label="Manage transportation"
                        title="Manage Transportation"
                      >
                        <Droplet className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEditClick(area)}
                        className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                        aria-label="Edit area"
                        title="Edit Area"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(area)}
                        className="p-1 rounded-full hover:bg-gray-100 text-red-600"
                        aria-label="Delete area"
                        title="Delete Area"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded details */}
                  {expandedAreaId === area.id && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Villages section */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                            <Home className="h-4 w-4 mr-1 text-gray-500" />
                            Villages ({area.villages?.length || 0})
                          </h4>
                          
                          {area.villages && area.villages.length > 0 ? (
                            <div className="space-y-3">
                              {area.villages.slice(0, 3).map(village => (
                                <div key={village.id} className="bg-gray-50 rounded p-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">{village.name}</span>
                                    <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
                                      {village.priority}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    <span>{village.familyCount} families</span> • 
                                    <span className="ml-1">{village.population} people</span>
                                  </div>
                                </div>
                              ))}
                              
                              {area.villages.length > 3 && (
                                <div className="text-center text-sm text-primary-600 mt-2">
                                  + {area.villages.length - 3} more villages
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-4 text-sm text-gray-500">
                              No villages added yet
                            </div>
                          )}
                        </div>
                        
                        {/* Transportation section */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                            <Droplet className="h-4 w-4 mr-1 text-blue-500" />
                            Water Transportation ({area.transportation?.length || 0})
                          </h4>
                          
                          {area.transportation && area.transportation.length > 0 ? (
                            <div className="space-y-3">
                              {area.transportation.map(transport => (
                                <div key={transport.id} className="bg-gray-50 rounded p-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">{transport.type}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                      transport.status === 'Available' 
                                        ? 'bg-green-50 text-green-700' 
                                        : 'bg-yellow-50 text-yellow-700'
                                    }`}>
                                      {transport.status}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    <span>Capacity: {transport.capacity}</span> • 
                                    <span className="ml-1">Operator: {transport.operator}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 text-sm text-gray-500">
                              No transportation resources added yet
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button 
                          onClick={() => {
                            setSelectedArea(area);
                            setShowVillageModal(true);
                          }}
                          className="btn-secondary text-sm"
                        >
                          Manage Villages
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedArea(area);
                            setShowTransportModal(true);
                          }}
                          className="btn-secondary text-sm ml-3"
                        >
                          Manage Transportation
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            </>
          )}
        </div>

        {/* Enhanced Add/Edit Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {showAddModal ? 'Add New Flood Area' : 'Edit Flood Area'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetFormData();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={showAddModal ? handleAddArea : handleUpdateArea} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter flood area name"
                      />
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter district name"
                      />
                      {formErrors.district && <p className="text-red-500 text-xs mt-1">{formErrors.district}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Division *</label>
                      <input
                        type="text"
                        name="divison"
                        value={formData.divison}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter division name"
                      />
                      {formErrors.divison && <p className="text-red-500 text-xs mt-1">{formErrors.divison}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Villages *</label>
                      <input
                        type="number"
                        name="totalVillages"
                        value={formData.totalVillages}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Number of villages"
                        min="0"
                      />
                      {formErrors.totalVillages && <p className="text-red-500 text-xs mt-1">{formErrors.totalVillages}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Families *</label>
                      <input
                        type="number"
                        name="totalFamilies"
                        value={formData.totalFamilies}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Number of families"
                        min="0"
                      />
                      {formErrors.totalFamilies && <p className="text-red-500 text-xs mt-1">{formErrors.totalFamilies}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Distance from Center (km) *</label>
                      <input
                        type="number"
                        name="distanceFromCenter"
                        value={formData.distanceFromCenter}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Distance in kilometers"
                        step="0.1"
                        min="0"
                      />
                      {formErrors.distanceFromCenter && <p className="text-red-500 text-xs mt-1">{formErrors.distanceFromCenter}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Water Level</label>
                      <select
                        name="waterLevel"
                        value={formData.waterLevel}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                      <select
                        name="severity"
                        value={formData.severity}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Contact person name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Phone number"
                      />
                      {formErrors.contactPhone && <p className="text-red-500 text-xs mt-1">{formErrors.contactPhone}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Email address"
                      />
                      {formErrors.contactEmail && <p className="text-red-500 text-xs mt-1">{formErrors.contactEmail}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                      <input
                        type="number"
                        name="lat"
                        value={formData.coordinates.lat}
                        onChange={handleCoordinateChange}
                        className="input-field"
                        placeholder="Latitude"
                        step="0.0001"
                        min="-90"
                        max="90"
                      />
                      {formErrors.lat && <p className="text-red-500 text-xs mt-1">{formErrors.lat}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                      <input
                        type="number"
                        name="lng"
                        value={formData.coordinates.lng}
                        onChange={handleCoordinateChange}
                        className="input-field"
                        placeholder="Longitude"
                        step="0.0001"
                        min="-180"
                        max="180"
                      />
                      {formErrors.lng && <p className="text-red-500 text-xs mt-1">{formErrors.lng}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="input-field"
                      rows="3"
                      placeholder="Additional description or notes"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                        resetFormData();
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      {showAddModal ? 'Add Area' : 'Update Area'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Village Management Modal */}
        {showVillageModal && selectedArea && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Manage Villages - {selectedArea.name}
                  </h3>
                  <button
                    onClick={() => setShowVillageModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Add Village Form */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Add New Village</h4>
                    <form onSubmit={handleAddVillage} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Village Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={villageFormData.name}
                          onChange={handleVillageInputChange}
                          className="input-field"
                          placeholder="Enter village name"
                        />
                        {villageFormErrors.name && <p className="text-red-500 text-xs mt-1">{villageFormErrors.name}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Family Count *</label>
                          <input
                            type="number"
                            name="familyCount"
                            value={villageFormData.familyCount}
                            onChange={handleVillageInputChange}
                            className="input-field"
                            placeholder="Families"
                            min="0"
                          />
                          {villageFormErrors.familyCount && <p className="text-red-500 text-xs mt-1">{villageFormErrors.familyCount}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Population *</label>
                          <input
                            type="number"
                            name="population"
                            value={villageFormData.population}
                            onChange={handleVillageInputChange}
                            className="input-field"
                            placeholder="Population"
                            min="0"
                          />
                          {villageFormErrors.population && <p className="text-red-500 text-xs mt-1">{villageFormErrors.population}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km) *</label>
                          <input
                            type="number"
                            name="distance"
                            value={villageFormData.distance}
                            onChange={handleVillageInputChange}
                            className="input-field"
                            placeholder="Distance"
                            step="0.1"
                            min="0"
                          />
                          {villageFormErrors.distance && <p className="text-red-500 text-xs mt-1">{villageFormErrors.distance}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            name="priority"
                            value={villageFormData.priority}
                            onChange={handleVillageInputChange}
                            className="input-field"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility</label>
                        <select
                          name="accessibility"
                          value={villageFormData.accessibility}
                          onChange={handleVillageInputChange}
                          className="input-field"
                        >
                          <option value="Road Access">Road Access</option>
                          <option value="Shallow Boat">Shallow Boat</option>
                          <option value="Boat Only">Boat Only</option>
                          <option value="Helicopter Only">Helicopter Only</option>
                        </select>
                      </div>
                      
                      <button type="submit" className="btn-primary w-full">
                        Add Village
                      </button>
                    </form>
                  </div>
                  
                  {/* Villages List */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                      Villages ({selectedArea.villages?.length || 0})
                    </h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {selectedArea.villages && selectedArea.villages.length > 0 ? (
                        selectedArea.villages.map(village => (
                          <div key={village.id} className="bg-gray-50 rounded p-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{village.name}</h5>
                                <div className="text-sm text-gray-500 mt-1">
                                  <div>Families: {village.familyCount} • Population: {village.population}</div>
                                  <div>Distance: {village.distance}km • {village.accessibility}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  village.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                  village.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                  village.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {village.priority}
                                </span>
                                <button className="text-red-600 hover:text-red-800">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No villages added yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transportation Management Modal */}
        {showTransportModal && selectedArea && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Manage Transportation - {selectedArea.name}
                  </h3>
                  <button
                    onClick={() => setShowTransportModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Add Transport Form */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Add New Transportation</h4>
                    <form onSubmit={handleAddTransport} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transport Type *</label>
                        <select
                          name="type"
                          value={transportFormData.type}
                          onChange={handleTransportInputChange}
                          className="input-field"
                        >
                          <option value="">Select transport type</option>
                          <option value="Engine Boat">Engine Boat</option>
                          <option value="Paddle Boat">Paddle Boat</option>
                          <option value="Speed Boat">Speed Boat</option>
                          <option value="Helicopter">Helicopter</option>
                          <option value="Truck">Truck</option>
                          <option value="Motorcycle">Motorcycle</option>
                        </select>
                        {transportFormErrors.type && <p className="text-red-500 text-xs mt-1">{transportFormErrors.type}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
                        <input
                          type="text"
                          name="capacity"
                          value={transportFormData.capacity}
                          onChange={handleTransportInputChange}
                          className="input-field"
                          placeholder="e.g., 500kg, 10 people"
                        />
                        {transportFormErrors.capacity && <p className="text-red-500 text-xs mt-1">{transportFormErrors.capacity}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Operator Name *</label>
                        <input
                          type="text"
                          name="operator"
                          value={transportFormData.operator}
                          onChange={handleTransportInputChange}
                          className="input-field"
                          placeholder="Operator name"
                        />
                        {transportFormErrors.operator && <p className="text-red-500 text-xs mt-1">{transportFormErrors.operator}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={transportFormData.phone}
                          onChange={handleTransportInputChange}
                          className="input-field"
                          placeholder="Phone number"
                        />
                        {transportFormErrors.phone && <p className="text-red-500 text-xs mt-1">{transportFormErrors.phone}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={transportFormData.status}
                          onChange={handleTransportInputChange}
                          className="input-field"
                        >
                          <option value="Available">Available</option>
                          <option value="Assigned">Assigned</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Out of Service">Out of Service</option>
                        </select>
                      </div>
                      
                      <button type="submit" className="btn-primary w-full">
                        Add Transportation
                      </button>
                    </form>
                  </div>
                  
                  {/* Transportation List */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                      Transportation ({selectedArea.transportation?.length || 0})
                    </h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {selectedArea.transportation && selectedArea.transportation.length > 0 ? (
                        selectedArea.transportation.map(transport => (
                          <div key={transport.id} className="bg-gray-50 rounded p-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{transport.type}</h5>
                                <div className="text-sm text-gray-500 mt-1">
                                  <div>Capacity: {transport.capacity}</div>
                                  <div>Operator: {transport.operator}</div>
                                  <div>Phone: {transport.phone}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  transport.status === 'Available' ? 'bg-green-100 text-green-700' :
                                  transport.status === 'Assigned' ? 'bg-blue-100 text-blue-700' :
                                  transport.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {transport.status}
                                </span>
                                <button className="text-red-600 hover:text-red-800">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No transportation resources added yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Modal */}
        {showStatsModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Flood Area Statistics</h3>
                  <button
                    onClick={() => setShowStatsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-8 w-8 text-primary-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-primary-600">Total Areas</p>
                        <p className="text-2xl font-bold text-primary-900">{stats.totalAreas}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-success-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Check className="h-8 w-8 text-success-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-success-600">Active Areas</p>
                        <p className="text-2xl font-bold text-success-900">{stats.activeAreas}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-danger-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-8 w-8 text-danger-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-danger-600">Critical Areas</p>
                        <p className="text-2xl font-bold text-danger-900">{stats.criticalAreas}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-warning-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-warning-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-warning-600">Total Families</p>
                        <p className="text-2xl font-bold text-warning-900">{stats.totalFamilies.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Home className="h-8 w-8 text-blue-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-600">Total Villages</p>
                        <p className="text-2xl font-bold text-blue-900">{stats.totalVillages}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Droplet className="h-8 w-8 text-purple-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-purple-600">High Water Level</p>
                        <p className="text-2xl font-bold text-purple-900">{stats.highWaterLevel}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Severity Distribution</h4>
                    <div className="space-y-2">
                      {Object.entries(stats.severityDistribution).map(([severity, count]) => (
                        <div key={severity} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{severity}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  severity === 'Critical' ? 'bg-red-500' :
                                  severity === 'High' ? 'bg-orange-500' :
                                  severity === 'Moderate' ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${(count / stats.totalAreas) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Water Level Distribution</h4>
                    <div className="space-y-2">
                      {Object.entries(stats.waterLevelDistribution).map(([level, count]) => (
                        <div key={level} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{level}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  level === 'High' ? 'bg-red-500' :
                                  level === 'Medium' ? 'bg-yellow-500' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${(count / stats.totalAreas) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedArea && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Flood Area</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete "{selectedArea.name}"? This action cannot be undone.
                  </p>
                </div>
                <div className="flex justify-center space-x-3 mt-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="btn-danger"
                  >
                    Delete
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

export default FloodAreaManagement;