# Flood Relief Distribution Management System

A web-based application designed specifically for Bangladesh to coordinate flood relief distribution efforts during natural disasters.

## Overview

During floods in Bangladesh, numerous organizations (government, army, police, NGOs, volunteer groups) distribute relief. However, the distribution often becomes uncoordinated, leading to some areas receiving excess supplies while others are left underserved. This system aims to streamline and coordinate the entire relief distribution process.

## Features

### For Government/Army (Admin)
- Create and manage flood areas with details about affected villages
- Track water transportation resources (boats, etc.)
- Review and approve relief requests from organizations
- Assign transportation and local guides to relief missions
- Monitor real-time distribution through IoT device tracking
- View comprehensive dashboard with statistics and mission status

### For Organizations/NGOs
- Register to provide relief in specific flood areas
- Submit detailed relief requests (supplies, manpower, transportation needs)
- Track assigned resources and mission status
- Coordinate with local guides and army personnel
- Upload distribution verification photos
- View mission history and impact

### Technical Features
- Interactive maps for tracking relief distribution
- Mesh network support for IoT devices to maintain connectivity
- Real-time location tracking
- Mobile-responsive design for field use
- Role-based access control

## Technology Stack

- **Frontend**: React with Vite, Tailwind CSS
- **State Management**: React Context API and localStorage (for demo)
- **Mapping**: Leaflet for interactive maps
- **Icons**: Lucide React
- **Routing**: React Router

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/flood-relief-distribution-management.git
cd flood-relief-distribution-management
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Demo Credentials

### Admin (Government/Army)
- Username: admin
- Password: admin123

### NGO
- Username: brac_ngo
- Password: brac123

### Volunteer Group
- Username: dhaka_volunteers
- Password: volunteer123

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── data/            # Dummy data for demonstration
├── hooks/           # Custom React hooks
├── pages/           # Page components
└── utils/           # Utility functions
```

## Future Enhancements

- Backend integration with Node.js/Express and MongoDB
- Real IoT device integration
- SMS notifications for areas with limited internet
- Weather API integration for flood forecasting
- Mobile app for field teams
- Offline functionality for areas with poor connectivity

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.