import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  FileText, 
  Map, 
  User, 
  LogOut, 
  Menu, 
  X,
  Shield,
  Users,
  BarChart3
} from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const adminNavItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/flood-areas', icon: MapPin, label: 'Flood Areas' },
    { path: '/requests', icon: FileText, label: 'Requests' },
    { path: '/tracking', icon: Map, label: 'Live Tracking' },
  ];

  const orgNavItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/tracking', icon: Map, label: 'Live Tracking' },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : orgNavItems;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                Flood Relief Management
              </span>
              <span className="ml-2 text-lg font-bold text-gray-900 sm:hidden">
                FRM
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/analytics"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/analytics')
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Public Analytics
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center mr-4">
                <div className="flex items-center">
                  {user?.role === 'admin' ? (
                    <Shield className="h-5 w-5 text-primary-600 mr-2" />
                  ) : (
                    <Users className="h-5 w-5 text-secondary-600 mr-2" />
                  )}
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {/* User Info */}
            <div className="flex items-center px-3 py-2 border-b border-gray-200 mb-2">
              {user?.role === 'admin' ? (
                <Shield className="h-5 w-5 text-primary-600 mr-2" />
              ) : (
                <Users className="h-5 w-5 text-secondary-600 mr-2" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role} - {user?.organization}</p>
              </div>
            </div>

            {/* Public Analytics Link */}
            <Link
              to="/analytics"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/analytics')
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-5 w-5 mr-3" />
              Public Analytics
            </Link>

            {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

