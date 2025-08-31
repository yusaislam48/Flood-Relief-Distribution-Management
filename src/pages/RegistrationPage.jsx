import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { floodAreas, users } from '../data/dummyData';

const RegistrationPage = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: '',
    organizationType: '',
    phone: '',
    email: '',
    floodAreaId: '',
    capabilities: {
      hasManpower: false,
      manpowerCount: 0,
      hasTransportation: false,
      transportationType: '',
      hasSupplies: false,
      supplyTypes: [],
      hasFunding: false,
      fundingAmount: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const organizationTypes = [
    'NGO',
    'Volunteer Group',
    'Corporate Foundation',
    'Religious Organization',
    'Community Group',
    'International Aid Organization',
    'Government Agency'
  ];

  const supplyTypes = [
    'Food Items',
    'Medical Supplies',
    'Clean Water',
    'Clothing',
    'Shelter Materials',
    'Hygiene Supplies',
    'Emergency Equipment'
  ];

  const transportationTypes = [
    'Boats',
    'Trucks',
    'Ambulances',
    'Helicopters',
    'Other Vehicles'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('capabilities.')) {
      const capabilityName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        capabilities: {
          ...prev.capabilities,
          [capabilityName]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSupplyTypeChange = (supplyType, checked) => {
    setFormData(prev => ({
      ...prev,
      capabilities: {
        ...prev.capabilities,
        supplyTypes: checked 
          ? [...prev.capabilities.supplyTypes, supplyType]
          : prev.capabilities.supplyTypes.filter(type => type !== supplyType)
      }
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (users.some(user => user.username === formData.username)) {
      newErrors.username = 'Username already exists';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization type is required';
    }
    
    if (!formData.organizationType) {
      newErrors.organizationType = 'Organization type is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!formData.floodAreaId) {
      newErrors.floodAreaId = 'Please select a flood area';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    const { capabilities } = formData;
    const hasAnyCapability = capabilities.hasManpower || 
                           capabilities.hasTransportation || 
                           capabilities.hasSupplies || 
                           capabilities.hasFunding;
    
    if (!hasAnyCapability) {
      newErrors.capabilities = 'Please select at least one capability';
    }
    
    if (capabilities.hasManpower && (!capabilities.manpowerCount || capabilities.manpowerCount < 1)) {
      newErrors.manpowerCount = 'Please specify number of volunteers';
    }
    
    if (capabilities.hasTransportation && !capabilities.transportationType) {
      newErrors.transportationType = 'Please select transportation type';
    }
    
    if (capabilities.hasSupplies && capabilities.supplyTypes.length === 0) {
      newErrors.supplyTypes = 'Please select at least one supply type';
    }
    
    if (capabilities.hasFunding && !capabilities.fundingAmount.trim()) {
      newErrors.fundingAmount = 'Please specify funding amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new user object
      const newUser = {
        id: `org_${Date.now()}`,
        username: formData.username,
        password: formData.password,
        role: 'organization',
        name: formData.name,
        organization: formData.organization,
        organizationType: formData.organizationType,
        phone: formData.phone,
        email: formData.email,
        floodAreaId: formData.floodAreaId,
        registrationDate: new Date().toISOString(),
        verified: false, // Will be verified by admin
        capabilities: formData.capabilities
      };
      
      // In real app, this would be sent to API
      users.push(newUser);
      
      setSuccess(true);
      
      // Auto-login after successful registration
      setTimeout(() => {
        onLogin(newUser);
      }, 2000);
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your organization has been registered successfully. Your account is pending verification by the administration.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex justify-center mb-6">
          <Shield className="h-12 w-12 text-primary-600" />
        </div>
        
        <div className="bg-white shadow sm:rounded-lg">
          {/* Header */}
          <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Organization Registration</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Step {step} of 2: {step === 1 ? 'Basic Information' : 'Capabilities & Resources'}
                </p>
              </div>
              <Link 
                to="/login"
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex">
                <div className={`flex-1 h-2 rounded-l-lg ${step >= 1 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 h-2 rounded-r-lg ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`mt-1 input-field ${errors.username ? 'border-red-300' : ''}`}
                      placeholder="Choose a unique username"
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 input-field ${errors.name ? 'border-red-300' : ''}`}
                      placeholder="Your organization name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 input-field ${errors.password ? 'border-red-300' : ''}`}
                      placeholder="At least 6 characters"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 input-field ${errors.confirmPassword ? 'border-red-300' : ''}`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                      Organization/Group Name *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      id="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className={`mt-1 input-field ${errors.organization ? 'border-red-300' : ''}`}
                      placeholder="e.g., BRAC, Dhaka Youth Foundation"
                    />
                    {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization}</p>}
                  </div>

                  <div>
                    <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700">
                      Organization Type *
                    </label>
                    <select
                      name="organizationType"
                      id="organizationType"
                      value={formData.organizationType}
                      onChange={handleChange}
                      className={`mt-1 input-field ${errors.organizationType ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select organization type</option>
                      {organizationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.organizationType && <p className="mt-1 text-sm text-red-600">{errors.organizationType}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`mt-1 input-field ${errors.phone ? 'border-red-300' : ''}`}
                      placeholder="+880 1700 000000"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 input-field ${errors.email ? 'border-red-300' : ''}`}
                      placeholder="contact@organization.org"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="floodAreaId" className="block text-sm font-medium text-gray-700">
                    Target Flood Area *
                  </label>
                  <select
                    name="floodAreaId"
                    id="floodAreaId"
                    value={formData.floodAreaId}
                    onChange={handleChange}
                    className={`mt-1 input-field ${errors.floodAreaId ? 'border-red-300' : ''}`}
                  >
                    <option value="">Select flood area to serve</option>
                    {floodAreas.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.name} ({area.district}) - {area.totalVillages} villages, {area.totalFamilies} families
                      </option>
                    ))}
                  </select>
                  {errors.floodAreaId && <p className="mt-1 text-sm text-red-600">{errors.floodAreaId}</p>}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary"
                  >
                    Next: Capabilities & Resources
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">What can your organization provide?</h3>
                  <p className="text-sm text-gray-600 mb-6">Select all capabilities that apply to your organization.</p>
                </div>

                {errors.capabilities && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <p className="text-sm text-red-600">{errors.capabilities}</p>
                    </div>
                  </div>
                )}

                {/* Manpower */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasManpower"
                      name="capabilities.hasManpower"
                      checked={formData.capabilities.hasManpower}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasManpower" className="ml-3 text-sm font-medium text-gray-900">
                      <Users className="inline h-4 w-4 mr-1" />
                      Manpower & Volunteers
                    </label>
                  </div>
                  {formData.capabilities.hasManpower && (
                    <div className="mt-3 ml-7">
                      <label htmlFor="manpowerCount" className="block text-sm font-medium text-gray-700">
                        Number of volunteers available
                      </label>
                      <input
                        type="number"
                        name="capabilities.manpowerCount"
                        id="manpowerCount"
                        min="1"
                        value={formData.capabilities.manpowerCount}
                        onChange={handleChange}
                        className={`mt-1 w-32 input-field ${errors.manpowerCount ? 'border-red-300' : ''}`}
                        placeholder="0"
                      />
                      {errors.manpowerCount && <p className="mt-1 text-sm text-red-600">{errors.manpowerCount}</p>}
                    </div>
                  )}
                </div>

                {/* Transportation */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasTransportation"
                      name="capabilities.hasTransportation"
                      checked={formData.capabilities.hasTransportation}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasTransportation" className="ml-3 text-sm font-medium text-gray-900">
                      Transportation
                    </label>
                  </div>
                  {formData.capabilities.hasTransportation && (
                    <div className="mt-3 ml-7">
                      <label htmlFor="transportationType" className="block text-sm font-medium text-gray-700">
                        Type of transportation
                      </label>
                      <select
                        name="capabilities.transportationType"
                        id="transportationType"
                        value={formData.capabilities.transportationType}
                        onChange={handleChange}
                        className={`mt-1 input-field ${errors.transportationType ? 'border-red-300' : ''}`}
                      >
                        <option value="">Select transportation type</option>
                        {transportationTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.transportationType && <p className="mt-1 text-sm text-red-600">{errors.transportationType}</p>}
                    </div>
                  )}
                </div>

                {/* Supplies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasSupplies"
                      name="capabilities.hasSupplies"
                      checked={formData.capabilities.hasSupplies}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasSupplies" className="ml-3 text-sm font-medium text-gray-900">
                      Relief Supplies
                    </label>
                  </div>
                  {formData.capabilities.hasSupplies && (
                    <div className="mt-3 ml-7">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Types of supplies you can provide
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {supplyTypes.map(type => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.capabilities.supplyTypes.includes(type)}
                              onChange={(e) => handleSupplyTypeChange(type, e.target.checked)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                      {errors.supplyTypes && <p className="mt-1 text-sm text-red-600">{errors.supplyTypes}</p>}
                    </div>
                  )}
                </div>

                {/* Funding */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasFunding"
                      name="capabilities.hasFunding"
                      checked={formData.capabilities.hasFunding}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasFunding" className="ml-3 text-sm font-medium text-gray-900">
                      Financial Support
                    </label>
                  </div>
                  {formData.capabilities.hasFunding && (
                    <div className="mt-3 ml-7">
                      <label htmlFor="fundingAmount" className="block text-sm font-medium text-gray-700">
                        Amount available for relief operations
                      </label>
                      <input
                        type="text"
                        name="capabilities.fundingAmount"
                        id="fundingAmount"
                        value={formData.capabilities.fundingAmount}
                        onChange={handleChange}
                        className={`mt-1 input-field ${errors.fundingAmount ? 'border-red-300' : ''}`}
                        placeholder="e.g., 50,000 BDT"
                      />
                      {errors.fundingAmount && <p className="mt-1 text-sm text-red-600">{errors.fundingAmount}</p>}
                    </div>
                  )}
                </div>

                {errors.submit && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Registering...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

