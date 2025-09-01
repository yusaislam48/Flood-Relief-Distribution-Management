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
        lastReliefDetails: {
          date: '2024-01-10T08:00:00Z',
          organization: 'BRAC Disaster Response Team',
          items: ['Rice (50kg)', 'Medicine (20 packets)', 'Water Purification Tablets (100)'],
          amount: '70kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine', 'Clean Water'],
        contactPerson: 'Abdul Karim',
        contactPhone: '+8801711111111',
        coordinates: { lat: 25.7440, lng: 89.2755 }
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
        lastReliefDetails: {
          date: '2024-01-08T14:30:00Z',
          organization: 'Dhaka Youth Volunteers',
          items: ['Rice (80kg)', 'Lentils (30kg)', 'Medicine (15 packets)', 'Blankets (25)'],
          amount: '150kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine', 'Clean Water', 'Shelter'],
        contactPerson: 'Fatema Begum',
        contactPhone: '+8801711111112',
        coordinates: { lat: 25.7450, lng: 89.2760 }
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
        lastReliefDetails: {
          date: '2024-01-12T11:15:00Z',
          organization: 'BRAC Disaster Response Team',
          items: ['Rice (40kg)', 'Water Purification Tablets (50)'],
          amount: '40kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Clean Water'],
        contactPerson: 'Mohammad Ali',
        contactPhone: '+8801711111113',
        coordinates: { lat: 25.7435, lng: 89.2745 }
      },
      {
        id: 'v_004',
        name: 'Chandrapur',
        familyCount: 95,
        distance: 15,
        accessibility: 'Boat Only',
        population: 380,
        priority: 'High',
        lastAidReceived: '2024-01-09T10:00:00Z',
        lastReliefDetails: {
          date: '2024-01-09T10:00:00Z',
          organization: 'Sylhet Relief Foundation',
          items: ['Rice (60kg)', 'Medicine (25 packets)', 'Clothing (30 sets)'],
          amount: '90kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine', 'Clean Water', 'Clothing'],
        contactPerson: 'Rashida Khatun',
        contactPhone: '+8801711111114',
        coordinates: { lat: 25.7460, lng: 89.2770 }
      },
      {
        id: 'v_005',
        name: 'Bishnupur',
        familyCount: 150,
        distance: 18,
        accessibility: 'Engine Boat',
        population: 600,
        priority: 'Medium',
        lastAidReceived: '2024-01-11T14:00:00Z',
        lastReliefDetails: {
          date: '2024-01-11T14:00:00Z',
          organization: 'Kurigram Aid Society',
          items: ['Rice (70kg)', 'Hygiene Kits (40)', 'Water Purification Tablets (80)'],
          amount: '70kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Clean Water', 'Hygiene Kits'],
        contactPerson: 'Nurul Islam',
        contactPhone: '+8801711111115',
        coordinates: { lat: 25.7470, lng: 89.2780 }
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
      },
      {
        id: 't_003',
        type: 'Speed Boat',
        capacity: '300kg',
        operator: 'Hasan Mia',
        phone: '+8801712345679',
        status: 'Available',
        currentLocation: { lat: 25.7445, lng: 89.2758 }
      }
    ],
    coordinates: { lat: 25.7439, lng: 89.2752 }
  },
  {
    id: 'fa_002',
    name: 'Sylhet Haor Area',
    district: 'Sylhet',
    divison: 'Sylhet',
    totalVillages: 12,
    totalFamilies: 2560,
    distanceFromCenter: 25,
    waterLevel: 'Medium',
    severity: 'Moderate',
    lastUpdated: '2024-01-15T09:15:00Z',
    createdBy: 'admin_002',
    status: 'Active',
    villages: [
      {
        id: 'v_006',
        name: 'Hatipara',
        familyCount: 150,
        distance: 3,
        accessibility: 'Engine Boat',
        population: 590,
        priority: 'Medium',
        lastAidReceived: '2024-01-11T16:00:00Z',
        lastReliefDetails: {
          date: '2024-01-11T16:00:00Z',
          organization: 'Bangladesh Red Crescent Society',
          items: ['Rice (90kg)', 'Medicine (30 packets)', 'First Aid Kits (15)'],
          amount: '90kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine'],
        contactPerson: 'Rafiq Miah',
        contactPhone: '+8801711111116',
        coordinates: { lat: 24.8950, lng: 91.8690 }
      },
      {
        id: 'v_007',
        name: 'Boro Haor',
        familyCount: 180,
        distance: 8,
        accessibility: 'Boat Only',
        population: 720,
        priority: 'High',
        lastAidReceived: '2024-01-10T12:00:00Z',
        lastReliefDetails: {
          date: '2024-01-10T12:00:00Z',
          organization: 'Sylhet Relief Foundation',
          items: ['Rice (100kg)', 'Medicine (35 packets)', 'Blankets (40)', 'Tents (10)'],
          amount: '100kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine', 'Clean Water', 'Shelter'],
        contactPerson: 'Amina Khatun',
        contactPhone: '+8801711111117',
        coordinates: { lat: 24.8960, lng: 91.8700 }
      },
      {
        id: 'v_008',
        name: 'Choto Haor',
        familyCount: 120,
        distance: 12,
        accessibility: 'Shallow Boat',
        population: 480,
        priority: 'Medium',
        lastAidReceived: '2024-01-12T09:00:00Z',
        lastReliefDetails: {
          date: '2024-01-12T09:00:00Z',
          organization: 'Netrokona Volunteer Network',
          items: ['Rice (60kg)', 'Water Purification Tablets (60)'],
          amount: '60kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Clean Water'],
        contactPerson: 'Mokbul Hossain',
        contactPhone: '+8801711111118',
        coordinates: { lat: 24.8970, lng: 91.8710 }
      },
      {
        id: 'v_009',
        name: 'Dakshin Haor',
        familyCount: 200,
        distance: 15,
        accessibility: 'Engine Boat',
        population: 800,
        priority: 'Critical',
        lastAidReceived: '2024-01-08T15:00:00Z',
        lastReliefDetails: {
          date: '2024-01-08T15:00:00Z',
          organization: 'UNICEF Bangladesh',
          items: ['Rice (120kg)', 'Medicine (40 packets)', 'Clothing (50 sets)', 'Tents (15)'],
          amount: '120kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine', 'Clean Water', 'Clothing', 'Shelter'],
        contactPerson: 'Sultana Begum',
        contactPhone: '+8801711111119',
        coordinates: { lat: 24.8980, lng: 91.8720 }
      }
    ],
    transportation: [
      {
        id: 't_004',
        type: 'Engine Boat',
        capacity: '800kg',
        operator: 'Hassan Ali',
        phone: '+8801555666777',
        status: 'Available',
        currentLocation: { lat: 24.8949, lng: 91.8687 }
      },
      {
        id: 't_005',
        type: 'Paddle Boat',
        capacity: '250kg',
        operator: 'Karim Uddin',
        phone: '+8801555666778',
        status: 'Available',
        currentLocation: { lat: 24.8955, lng: 91.8695 }
      }
    ],
    coordinates: { lat: 24.8949, lng: 91.8687 }
  },
  {
    id: 'fa_003',
    name: 'Kurigram River Basin',
    district: 'Kurigram',
    divison: 'Rangpur',
    totalVillages: 18,
    totalFamilies: 3200,
    distanceFromCenter: 60,
    waterLevel: 'Very High',
    severity: 'Critical',
    lastUpdated: '2024-01-15T11:00:00Z',
    createdBy: 'admin_001',
    status: 'Active',
    villages: [
      {
        id: 'v_010',
        name: 'Char Rajibpur',
        familyCount: 220,
        distance: 5,
        accessibility: 'Boat Only',
        population: 880,
        priority: 'Critical',
        lastAidReceived: '2024-01-09T08:00:00Z',
        lastReliefDetails: {
          date: '2024-01-09T08:00:00Z',
          organization: 'Kurigram Aid Society',
          items: ['Rice (110kg)', 'Medicine (45 packets)', 'Tents (20)', 'Clothing (60 sets)'],
          amount: '110kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine', 'Clean Water', 'Shelter', 'Clothing'],
        contactPerson: 'Abdul Malek',
        contactPhone: '+8801711111120',
        coordinates: { lat: 25.8000, lng: 89.6500 }
      },
      {
        id: 'v_011',
        name: 'Char Nageshwari',
        familyCount: 180,
        distance: 10,
        accessibility: 'Engine Boat',
        population: 720,
        priority: 'High',
        lastAidReceived: '2024-01-10T10:00:00Z',
        lastReliefDetails: {
          date: '2024-01-10T10:00:00Z',
          organization: 'UNICEF Bangladesh',
          items: ['Rice (90kg)', 'Medicine (35 packets)', 'Water Purification Tablets (70)'],
          amount: '90kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine', 'Clean Water'],
        contactPerson: 'Rashida Begum',
        contactPhone: '+8801711111121',
        coordinates: { lat: 25.8100, lng: 89.6600 }
      },
      {
        id: 'v_012',
        name: 'Char Bhurungamari',
        familyCount: 160,
        distance: 15,
        accessibility: 'Boat Only',
        population: 640,
        priority: 'High',
        lastAidReceived: '2024-01-11T12:00:00Z',
        lastReliefDetails: {
          date: '2024-01-11T12:00:00Z',
          organization: 'Jamalpur Relief Committee',
          items: ['Rice (80kg)', 'Hygiene Kits (50)', 'Water Purification Tablets (60)'],
          amount: '80kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Clean Water', 'Hygiene Kits'],
        contactPerson: 'Mohammad Ali',
        contactPhone: '+8801711111122',
        coordinates: { lat: 25.8200, lng: 89.6700 }
      },
      {
        id: 'v_013',
        name: 'Char Phulbari',
        familyCount: 140,
        distance: 20,
        accessibility: 'Shallow Boat',
        population: 560,
        priority: 'Medium',
        lastAidReceived: '2024-01-12T14:00:00Z',
        lastReliefDetails: {
          date: '2024-01-12T14:00:00Z',
          organization: 'Netrokona Volunteer Network',
          items: ['Rice (70kg)', 'Water Purification Tablets (70)'],
          amount: '70kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Clean Water'],
        contactPerson: 'Fatema Khatun',
        contactPhone: '+8801711111123',
        coordinates: { lat: 25.8300, lng: 89.6800 }
      }
    ],
    transportation: [
      {
        id: 't_006',
        type: 'Engine Boat',
        capacity: '600kg',
        operator: 'Nurul Islam',
        phone: '+8801555666779',
        status: 'Available',
        currentLocation: { lat: 25.8000, lng: 89.6500 }
      },
      {
        id: 't_007',
        type: 'Speed Boat',
        capacity: '400kg',
        operator: 'Abdul Kader',
        phone: '+8801555666780',
        status: 'Available',
        currentLocation: { lat: 25.8100, lng: 89.6600 }
      }
    ],
    coordinates: { lat: 25.8000, lng: 89.6500 }
  },
  {
    id: 'fa_004',
    name: 'Netrokona Haor Region',
    district: 'Netrokona',
    divison: 'Mymensingh',
    totalVillages: 10,
    totalFamilies: 1800,
    distanceFromCenter: 35,
    waterLevel: 'Medium',
    severity: 'Moderate',
    lastUpdated: '2024-01-15T08:45:00Z',
    createdBy: 'admin_002',
    status: 'Active',
    villages: [
      {
        id: 'v_014',
        name: 'Kendua Haor',
        familyCount: 120,
        distance: 4,
        accessibility: 'Engine Boat',
        population: 480,
        priority: 'Medium',
        lastAidReceived: '2024-01-11T11:00:00Z',
        lastReliefDetails: {
          date: '2024-01-11T11:00:00Z',
          organization: 'Netrokona Volunteer Network',
          items: ['Rice (60kg)', 'Medicine (20 packets)', 'First Aid Kits (10)'],
          amount: '60kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine'],
        contactPerson: 'Hasan Mia',
        contactPhone: '+8801711111124',
        coordinates: { lat: 24.9000, lng: 90.8000 }
      },
      {
        id: 'v_015',
        name: 'Durgapur Haor',
        familyCount: 100,
        distance: 8,
        accessibility: 'Boat Only',
        population: 400,
        priority: 'Medium',
        lastAidReceived: '2024-01-12T13:00:00Z',
        lastReliefDetails: {
          date: '2024-01-12T13:00:00Z',
          organization: 'Jamalpur Relief Committee',
          items: ['Rice (50kg)', 'Water Purification Tablets (50)'],
          amount: '50kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Clean Water'],
        contactPerson: 'Amina Begum',
        contactPhone: '+8801711111125',
        coordinates: { lat: 24.9100, lng: 90.8100 }
      },
      {
        id: 'v_016',
        name: 'Khaliajuri Haor',
        familyCount: 80,
        distance: 12,
        accessibility: 'Shallow Boat',
        population: 320,
        priority: 'Low',
        lastAidReceived: '2024-01-13T09:00:00Z',
        lastReliefDetails: {
          date: '2024-01-13T09:00:00Z',
          organization: 'Dhaka Youth Volunteers',
          items: ['Rice (40kg)', 'Emergency Food (20 packets)'],
          amount: '40kg total',
          status: 'Completed'
        },
        needs: ['Food'],
        contactPerson: 'Mokbul Hossain',
        contactPhone: '+8801711111126',
        coordinates: { lat: 24.9200, lng: 90.8200 }
      }
    ],
    transportation: [
      {
        id: 't_008',
        type: 'Engine Boat',
        capacity: '400kg',
        operator: 'Karim Uddin',
        phone: '+8801555666781',
        status: 'Available',
        currentLocation: { lat: 24.9000, lng: 90.8000 }
      }
    ],
    coordinates: { lat: 24.9000, lng: 90.8000 }
  },
  {
    id: 'fa_005',
    name: 'Jamalpur Flood Plains',
    district: 'Jamalpur',
    divison: 'Mymensingh',
    totalVillages: 14,
    totalFamilies: 2400,
    distanceFromCenter: 40,
    waterLevel: 'High',
    severity: 'High',
    lastUpdated: '2024-01-15T09:30:00Z',
    createdBy: 'admin_001',
    status: 'Active',
    villages: [
      {
        id: 'v_017',
        name: 'Dewanganj Char',
        familyCount: 160,
        distance: 6,
        accessibility: 'Boat Only',
        population: 640,
        priority: 'High',
        lastAidReceived: '2024-01-10T07:00:00Z',
        lastReliefDetails: {
          date: '2024-01-10T07:00:00Z',
          organization: 'Jamalpur Relief Committee',
          items: ['Rice (80kg)', 'Medicine (30 packets)', 'Tents (12)', 'Water Purification Tablets (80)'],
          amount: '80kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine', 'Clean Water', 'Shelter'],
        contactPerson: 'Abdul Gafur',
        contactPhone: '+8801711111127',
        coordinates: { lat: 25.1000, lng: 89.8000 }
      },
      {
        id: 'v_018',
        name: 'Islampur Char',
        familyCount: 140,
        distance: 10,
        accessibility: 'Engine Boat',
        population: 560,
        priority: 'Medium',
        lastAidReceived: '2024-01-11T10:00:00Z',
        lastReliefDetails: {
          date: '2024-01-11T10:00:00Z',
          organization: 'BRAC Disaster Response Team',
          items: ['Rice (70kg)', 'Water Purification Tablets (70)'],
          amount: '70kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Clean Water'],
        contactPerson: 'Rashida Khatun',
        contactPhone: '+8801711111128',
        coordinates: { lat: 25.1100, lng: 89.8100 }
      },
      {
        id: 'v_019',
        name: 'Madarganj Char',
        familyCount: 120,
        distance: 14,
        accessibility: 'Boat Only',
        population: 480,
        priority: 'Medium',
        lastAidReceived: '2024-01-12T12:00:00Z',
        lastReliefDetails: {
          date: '2024-01-12T12:00:00Z',
          organization: 'Sylhet Relief Foundation',
          items: ['Rice (60kg)', 'Medicine (25 packets)', 'First Aid Kits (12)'],
          amount: '60kg total',
          status: 'Completed'
        },
        needs: ['Food', 'Medicine'],
        contactPerson: 'Mohammad Ali',
        contactPhone: '+8801711111129',
        coordinates: { lat: 25.1200, lng: 89.8200 }
      }
    ],
    transportation: [
      {
        id: 't_009',
        type: 'Engine Boat',
        capacity: '500kg',
        operator: 'Nurul Islam',
        phone: '+8801555666782',
        status: 'Available',
        currentLocation: { lat: 25.1000, lng: 89.8000 }
      },
      {
        id: 't_010',
        type: 'Paddle Boat',
        capacity: '200kg',
        operator: 'Hasan Mia',
        phone: '+8801555666783',
        status: 'Available',
        currentLocation: { lat: 25.1100, lng: 89.8100 }
      }
    ],
    coordinates: { lat: 25.1000, lng: 89.8000 }
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
    id: 'admin_002',
    username: 'admin2',
    password: 'admin123',
    role: 'admin',
    name: 'Captain Ahmed',
    organization: 'Bangladesh Army',
    phone: '+8801700000002',
    email: 'ahmed@army.gov.bd',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 'org_001',
    username: 'brac_ngo',
    password: 'brac123',
    role: 'organization',
    name: 'BRAC Disaster Response Team',
    organization: 'BRAC',
    organizationType: 'NGO',
    phone: '+8801700000003',
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
    phone: '+8801700000004',
    email: 'help@dhakayouth.org',
    floodAreaId: 'fa_001',
    registrationDate: '2024-01-12T14:30:00Z',
    verified: true
  },
  {
    id: 'org_003',
    username: 'red_crescent',
    password: 'redcrescent123',
    role: 'organization',
    name: 'Bangladesh Red Crescent Society',
    organization: 'BDRCS',
    organizationType: 'International NGO',
    phone: '+8801700000005',
    email: 'emergency@bdrcs.org',
    floodAreaId: 'fa_002',
    registrationDate: '2024-01-08T09:00:00Z',
    verified: true
  },
  {
    id: 'org_004',
    username: 'sylhet_help',
    password: 'sylhet123',
    role: 'organization',
    name: 'Sylhet Relief Foundation',
    organization: 'SRF',
    organizationType: 'Local NGO',
    phone: '+8801700000006',
    email: 'info@sylhetrelief.org',
    floodAreaId: 'fa_002',
    registrationDate: '2024-01-11T11:30:00Z',
    verified: true
  },
  {
    id: 'org_005',
    username: 'kurigram_aid',
    password: 'kurigram123',
    role: 'organization',
    name: 'Kurigram Aid Society',
    organization: 'KAS',
    organizationType: 'Community Organization',
    phone: '+8801700000007',
    email: 'contact@kurigramaid.org',
    floodAreaId: 'fa_003',
    registrationDate: '2024-01-09T15:45:00Z',
    verified: true
  },
  {
    id: 'org_006',
    username: 'netrokona_volunteers',
    password: 'netrokona123',
    role: 'organization',
    name: 'Netrokona Volunteer Network',
    organization: 'NVN',
    organizationType: 'Volunteer Group',
    phone: '+8801700000008',
    email: 'volunteers@netrokonanet.org',
    floodAreaId: 'fa_004',
    registrationDate: '2024-01-13T08:20:00Z',
    verified: true
  },
  {
    id: 'org_007',
    username: 'jamalpur_relief',
    password: 'jamalpur123',
    role: 'organization',
    name: 'Jamalpur Relief Committee',
    organization: 'JRC',
    organizationType: 'Local Committee',
    phone: '+8801700000009',
    email: 'relief@jamalpurcommittee.org',
    floodAreaId: 'fa_005',
    registrationDate: '2024-01-14T12:15:00Z',
    verified: true
  },
  {
    id: 'org_008',
    username: 'unicef_bd',
    password: 'unicef123',
    role: 'organization',
    name: 'UNICEF Bangladesh',
    organization: 'UNICEF',
    organizationType: 'UN Agency',
    phone: '+8801700000010',
    email: 'emergency@unicef.org.bd',
    floodAreaId: 'fa_003',
    registrationDate: '2024-01-07T16:00:00Z',
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
    type: 'GPS Tracker with Mesh Network',
    status: 'Assigned',
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
    type: 'GPS Tracker with Mesh Network',
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
  },
  {
    id: 'iot_003',
    serialNumber: 'BD-IOT-003',
    type: 'Advanced GPS Tracker with Mesh Network',
    status: 'Available',
    assignedTo: null,
    currentLocation: { lat: 25.8000, lng: 89.6500 },
    lastUpdate: '2024-01-15T10:30:00Z',
    batteryLevel: 92,
    signalStrength: 'Excellent',
    meshConnections: ['iot_001', 'iot_005'],
    route: []
  },
  {
    id: 'iot_004',
    serialNumber: 'BD-IOT-004',
    type: 'GPS Tracker with Mesh Network',
    status: 'Available',
    assignedTo: null,
    currentLocation: { lat: 24.9000, lng: 90.8000 },
    lastUpdate: '2024-01-15T09:15:00Z',
    batteryLevel: 85,
    signalStrength: 'Good',
    meshConnections: ['iot_001', 'iot_006'],
    route: []
  },
  {
    id: 'iot_005',
    serialNumber: 'BD-IOT-005',
    type: 'Emergency GPS Tracker with Mesh Network',
    status: 'Available',
    assignedTo: null,
    currentLocation: { lat: 25.1000, lng: 89.8000 },
    lastUpdate: '2024-01-15T08:45:00Z',
    batteryLevel: 95,
    signalStrength: 'Excellent',
    meshConnections: ['iot_003', 'iot_007'],
    route: []
  },
  {
    id: 'iot_006',
    serialNumber: 'BD-IOT-006',
    type: 'GPS Tracker with Mesh Network',
    status: 'Available',
    assignedTo: null,
    currentLocation: { lat: 24.9100, lng: 90.8100 },
    lastUpdate: '2024-01-15T07:30:00Z',
    batteryLevel: 88,
    signalStrength: 'Good',
    meshConnections: ['iot_004', 'iot_008'],
    route: []
  },
  {
    id: 'iot_007',
    serialNumber: 'BD-IOT-007',
    type: 'Advanced GPS Tracker with Mesh Network',
    status: 'Available',
    assignedTo: null,
    currentLocation: { lat: 25.1100, lng: 89.8100 },
    lastUpdate: '2024-01-15T06:20:00Z',
    batteryLevel: 90,
    signalStrength: 'Excellent',
    meshConnections: ['iot_005', 'iot_009'],
    route: []
  },
  {
    id: 'iot_008',
    serialNumber: 'BD-IOT-008',
    type: 'GPS Tracker with Mesh Network',
    status: 'Available',
    assignedTo: null,
    currentLocation: { lat: 24.9200, lng: 90.8200 },
    lastUpdate: '2024-01-15T05:10:00Z',
    batteryLevel: 82,
    signalStrength: 'Good',
    meshConnections: ['iot_006', 'iot_010'],
    route: []
  },
  {
    id: 'iot_009',
    serialNumber: 'BD-IOT-009',
    type: 'Emergency GPS Tracker with Mesh Network',
    status: 'Available',
    assignedTo: null,
    currentLocation: { lat: 25.1200, lng: 89.8200 },
    lastUpdate: '2024-01-15T04:00:00Z',
    batteryLevel: 96,
    signalStrength: 'Excellent',
    meshConnections: ['iot_007'],
    route: []
  },
  {
    id: 'iot_010',
    serialNumber: 'BD-IOT-010',
    type: 'GPS Tracker with Mesh Network',
    status: 'Available',
    assignedTo: null,
    currentLocation: { lat: 25.8100, lng: 89.6600 },
    lastUpdate: '2024-01-15T03:45:00Z',
    batteryLevel: 79,
    signalStrength: 'Good',
    meshConnections: ['iot_008'],
    route: []
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

