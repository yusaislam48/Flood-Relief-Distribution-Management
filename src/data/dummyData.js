// Dummy data for the Flood Relief Distribution Management System

// Flood Areas Data
export const floodAreas = [
  {
    id: 'fa_001',
    name: 'Rangpur District Flood Zone',
    district: 'Rangpur',
    divison: 'Rangpur',
    totalVillages: 15,
    totalFamilies: 2840,
    distanceFromCenter: 45, // km
    waterLevel: 'High',
    severity: 'Critical',
    lastUpdated: '2024-01-15T10:30:00Z',
    createdBy: 'admin_001',
    status: 'Active',
    villages: [
      {
        id: 'v_001',
        name: 'Kamarpara',
        familyCount: 120,
        distance: 5, // km from flood area center
        accessibility: 'Boat Only',
        population: 450,
        priority: 'High',
        lastAidReceived: '2024-01-10T08:00:00Z',
        needs: ['Food', 'Medicine', 'Clean Water']
      },
      {
        id: 'v_002',
        name: 'Dhakipara',
        familyCount: 200,
        distance: 12,
        accessibility: 'Boat Only',
        population: 780,
        priority: 'Critical',
        lastAidReceived: '2024-01-08T14:30:00Z',
        needs: ['Food', 'Medicine', 'Clean Water', 'Shelter']
      },
      {
        id: 'v_003',
        name: 'Goalapara',
        familyCount: 85,
        distance: 8,
        accessibility: 'Shallow Boat',
        population: 320,
        priority: 'Medium',
        lastAidReceived: '2024-01-12T11:15:00Z',
        needs: ['Food', 'Clean Water']
      }
    ],
    transportation: [
      {
        id: 't_001',
        type: 'Engine Boat',
        capacity: '500kg',
        operator: 'Karim Uddin',
        phone: '+8801712345678',
        status: 'Available',
        currentLocation: { lat: 25.7439, lng: 89.2752 }
      },
      {
        id: 't_002',
        type: 'Paddle Boat',
        capacity: '200kg',
        operator: 'Abdul Rahman',
        phone: '+8801987654321',
        status: 'Assigned',
        currentLocation: { lat: 25.7500, lng: 89.2800 }
      }
    ],
    coordinates: { lat: 25.7439, lng: 89.2752 }
  },
  {
    id: 'fa_002',
    name: 'Sylhet Haor Area',
    district: 'Sylhet',
    divison: 'Sylhet',
    totalVillages: 8,
    totalFamilies: 1560,
    distanceFromCenter: 25,
    waterLevel: 'Medium',
    severity: 'Moderate',
    lastUpdated: '2024-01-15T09:15:00Z',
    createdBy: 'admin_002',
    status: 'Active',
    villages: [
      {
        id: 'v_004',
        name: 'Hatipara',
        familyCount: 150,
        distance: 3,
        accessibility: 'Engine Boat',
        population: 590,
        priority: 'Medium',
        lastAidReceived: '2024-01-11T16:00:00Z',
        needs: ['Food', 'Medicine']
      }
    ],
    transportation: [
      {
        id: 't_003',
        type: 'Engine Boat',
        capacity: '800kg',
        operator: 'Hassan Ali',
        phone: '+8801555666777',
        status: 'Available',
        currentLocation: { lat: 24.8949, lng: 91.8687 }
      }
    ],
    coordinates: { lat: 24.8949, lng: 91.8687 }
  }
];

// Users Data
export const users = [
  {
    id: 'admin_001',
    username: 'admin',
    password: 'admin123', // In real app, this would be hashed
    role: 'admin',
    name: 'Major Rahman',
    organization: 'Bangladesh Army',
    phone: '+8801700000001',
    email: 'rahman@army.gov.bd',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'org_001',
    username: 'brac_ngo',
    password: 'brac123',
    role: 'organization',
    name: 'BRAC Disaster Response Team',
    organization: 'BRAC',
    organizationType: 'NGO',
    phone: '+8801700000002',
    email: 'disaster@brac.net',
    floodAreaId: 'fa_001',
    registrationDate: '2024-01-10T10:00:00Z',
    verified: true
  },
  {
    id: 'org_002',
    username: 'dhaka_volunteers',
    password: 'volunteer123',
    role: 'organization',
    name: 'Dhaka Youth Volunteers',
    organization: 'Dhaka Youth Foundation',
    organizationType: 'Volunteer Group',
    phone: '+8801700000003',
    email: 'help@dhakayouth.org',
    floodAreaId: 'fa_001',
    registrationDate: '2024-01-12T14:30:00Z',
    verified: true
  }
];

// Relief Requests Data
export const reliefRequests = [
  {
    id: 'req_001',
    organizationId: 'org_001',
    organizationName: 'BRAC Disaster Response Team',
    floodAreaId: 'fa_001',
    floodAreaName: 'Rangpur District Flood Zone',
    requestDate: '2024-01-13T08:00:00Z',
    status: 'Approved',
    priority: 'High',
    requestType: 'Full Relief Package',
    details: {
      manpower: 8,
      reliefAmount: '1000kg',
      itemTypes: ['Rice', 'Lentils', 'Water Purification Tablets', 'Basic Medicine'],
      transportation: 'Provided by Organization',
      estimatedDuration: '2 days',
      targetVillages: ['v_001', 'v_002'],
      specialRequirements: 'Medical personnel needed for emergency cases'
    },
    assignedResources: {
      transportationId: 't_001',
      assignedVillages: ['v_001', 'v_002'],
      localGuide: {
        name: 'Mohammad Hasan',
        phone: '+8801600000001',
        area: 'Kamarpara-Dhakipara'
      },
      armyPersonnel: {
        name: 'Corporal Ahmed',
        phone: '+8801500000001',
        unit: '15th Infantry'
      },
      iotDevice: {
        id: 'iot_001',
        type: 'GPS Tracker with Mesh Network',
        serialNumber: 'BD-IOT-001'
      }
    },
    approvedBy: 'admin_001',
    approvalDate: '2024-01-13T12:00:00Z',
    missionStatus: 'In Progress',
    startTime: '2024-01-14T06:00:00Z',
    currentLocation: { lat: 25.7450, lng: 89.2760 },
    distributionPhotos: []
  },
  {
    id: 'req_002',
    organizationId: 'org_002',
    organizationName: 'Dhaka Youth Volunteers',
    floodAreaId: 'fa_001',
    floodAreaName: 'Rangpur District Flood Zone',
    requestDate: '2024-01-14T10:30:00Z',
    status: 'Pending',
    priority: 'Medium',
    requestType: 'Food Distribution',
    details: {
      manpower: 5,
      reliefAmount: '500kg',
      itemTypes: ['Rice', 'Sugar', 'Salt'],
      transportation: 'Need Assignment',
      estimatedDuration: '1 day',
      targetVillages: ['v_003'],
      specialRequirements: 'None'
    },
    assignedResources: null,
    approvedBy: null,
    approvalDate: null,
    missionStatus: 'Pending Approval',
    startTime: null,
    currentLocation: null,
    distributionPhotos: []
  },
  {
    id: 'req_003',
    organizationId: 'org_001',
    organizationName: 'BRAC Disaster Response Team',
    floodAreaId: 'fa_002',
    floodAreaName: 'Sylhet Haor Area',
    requestDate: '2024-01-12T15:00:00Z',
    status: 'Completed',
    priority: 'Medium',
    requestType: 'Medical Aid',
    details: {
      manpower: 3,
      reliefAmount: 'Medical Supplies',
      itemTypes: ['First Aid Kits', 'Antibiotics', 'ORS'],
      transportation: 'Provided by Organization',
      estimatedDuration: '1 day',
      targetVillages: ['v_004'],
      specialRequirements: 'Qualified medical personnel'
    },
    assignedResources: {
      transportationId: 't_003',
      assignedVillages: ['v_004'],
      localGuide: {
        name: 'Rafiq Miah',
        phone: '+8801600000002',
        area: 'Hatipara'
      },
      armyPersonnel: {
        name: 'Sergeant Khan',
        phone: '+8801500000002',
        unit: '8th Infantry'
      },
      iotDevice: {
        id: 'iot_002',
        type: 'GPS Tracker with Mesh Network',
        serialNumber: 'BD-IOT-002'
      }
    },
    approvedBy: 'admin_001',
    approvalDate: '2024-01-12T18:00:00Z',
    missionStatus: 'Completed',
    startTime: '2024-01-13T07:00:00Z',
    endTime: '2024-01-13T18:00:00Z',
    currentLocation: { lat: 24.8949, lng: 91.8687 },
    distributionPhotos: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg'
    ]
  }
];

// IoT Devices Data
export const iotDevices = [
  {
    id: 'iot_001',
    serialNumber: 'BD-IOT-001',
    status: 'Active',
    assignedTo: 'req_001',
    currentLocation: { lat: 25.7450, lng: 89.2760 },
    lastUpdate: '2024-01-15T11:45:00Z',
    batteryLevel: 78,
    signalStrength: 'Good',
    meshConnections: ['iot_003', 'iot_004'],
    route: [
      { lat: 25.7439, lng: 89.2752, timestamp: '2024-01-14T06:00:00Z' },
      { lat: 25.7445, lng: 89.2755, timestamp: '2024-01-14T06:15:00Z' },
      { lat: 25.7450, lng: 89.2760, timestamp: '2024-01-14T06:30:00Z' }
    ]
  },
  {
    id: 'iot_002',
    serialNumber: 'BD-IOT-002',
    status: 'Inactive',
    assignedTo: 'req_003',
    currentLocation: { lat: 24.8949, lng: 91.8687 },
    lastUpdate: '2024-01-13T18:00:00Z',
    batteryLevel: 45,
    signalStrength: 'Fair',
    meshConnections: [],
    route: [
      { lat: 24.8949, lng: 91.8687, timestamp: '2024-01-13T07:00:00Z' },
      { lat: 24.8955, lng: 91.8690, timestamp: '2024-01-13T08:00:00Z' },
      { lat: 24.8949, lng: 91.8687, timestamp: '2024-01-13T18:00:00Z' }
    ]
  }
];

// Statistics Data
export const dashboardStats = {
  admin: {
    totalFloodAreas: floodAreas.length,
    activeRequests: reliefRequests.filter(r => r.status === 'Approved' && r.missionStatus === 'In Progress').length,
    completedMissions: reliefRequests.filter(r => r.missionStatus === 'Completed').length,
    pendingApprovals: reliefRequests.filter(r => r.status === 'Pending').length,
    totalOrganizations: users.filter(u => u.role === 'organization').length,
    activeDevices: iotDevices.filter(d => d.status === 'Active').length,
    totalFamiliesAffected: floodAreas.reduce((sum, area) => sum + area.totalFamilies, 0),
    totalVillages: floodAreas.reduce((sum, area) => sum + area.totalVillages, 0)
  },
  organization: (orgId) => {
    const orgRequests = reliefRequests.filter(r => r.organizationId === orgId);
    return {
      totalRequests: orgRequests.length,
      approvedRequests: orgRequests.filter(r => r.status === 'Approved').length,
      pendingRequests: orgRequests.filter(r => r.status === 'Pending').length,
      completedMissions: orgRequests.filter(r => r.missionStatus === 'Completed').length,
      activeMissions: orgRequests.filter(r => r.missionStatus === 'In Progress').length
    };
  }
};

// Helper functions to simulate API calls
export const apiHelpers = {
  // User authentication
  authenticateUser: (username, password) => {
    return users.find(user => user.username === username && user.password === password);
  },
  
  // Get user by ID
  getUserById: (id) => {
    return users.find(user => user.id === id);
  },
  
  // Get flood areas
  getFloodAreas: () => {
    return floodAreas;
  },
  
  // Get requests for organization
  getRequestsForOrganization: (orgId) => {
    return reliefRequests.filter(request => request.organizationId === orgId);
  },
  
  // Get all requests (admin)
  getAllRequests: () => {
    return reliefRequests;
  },
  
  // Get IoT devices
  getIotDevices: () => {
    return iotDevices;
  },
  
  // Create new request
  createRequest: (requestData) => {
    const newRequest = {
      id: `req_${Date.now()}`,
      ...requestData,
      requestDate: new Date().toISOString(),
      status: 'Pending',
      missionStatus: 'Pending Approval',
      assignedResources: null,
      approvedBy: null,
      approvalDate: null,
      startTime: null,
      currentLocation: null,
      distributionPhotos: []
    };
    reliefRequests.push(newRequest);
    return newRequest;
  }
};

