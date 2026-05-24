import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Star, Users, X, Phone } from 'lucide-react'
import DoctorCard from '../components/DoctorCard'
import { getAllDoctors } from '../api/doctors'

// Client-side filter function
const filterDoctors = (doctors, filters) => {
  return doctors.filter(doctor => {
    if (filters.name && !doctor.name.toLowerCase().includes(filters.name.toLowerCase())) return false
    if (filters.specialization && doctor.specialization !== filters.specialization) return false
    if (filters.location) {
      const doctorCity = doctor.location.split(',')[0].trim()
      if (doctorCity.toLowerCase() !== filters.location.toLowerCase()) return false
    }
    if (filters.hospital && !doctor.hospital.toLowerCase().includes(filters.hospital.toLowerCase())) return false
    if (filters.minExperience && doctor.experience < filters.minExperience) return false
    if (filters.maxFee && doctor.fee > filters.maxFee) return false
    return true
  })
}

// Client-side sort function
const sortDoctors = (doctors, sortBy) => {
  const sorted = [...doctors]
  switch (sortBy) {
    case 'rating': return sorted.sort((a, b) => b.rating - a.rating)
    case 'experience': return sorted.sort((a, b) => b.experience - a.experience)
    case 'fee_low': return sorted.sort((a, b) => a.fee - b.fee)
    case 'fee_high': return sorted.sort((a, b) => b.fee - a.fee)
    case 'name': return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default: return sorted
  }
}

const DoctorsList = () => {
  const [allDoctors, setAllDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    name: '',
    specialization: '',
    location: '',
    hospital: '',
    minExperience: '',
    maxFee: ''
  })
  const [sortBy, setSortBy] = useState('rating')
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Fetch from MongoDB on mount
  useEffect(() => {
    getAllDoctors()
      .then(data => {
        setAllDoctors(data)
        setFilteredDoctors(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch doctors:', err)
        setLoading(false)
      })
  }, [])

  // Derive specializations and cities from fetched data
  const specializations = ['All Specializations', ...new Set(allDoctors.map(d => d.specialization))]
  const cities = ['All Cities', ...new Set(allDoctors.map(d => d.location.split(',')[0].trim()))]

  useEffect(() => {
    if (allDoctors.length === 0) return
    let result = filterDoctors(allDoctors, filters)
    result = sortDoctors(result, sortBy)
    setFilteredDoctors(result)
  }, [filters, sortBy, allDoctors])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'All Specializations' || value === 'All Cities' ? '' : value
    }))
  }

  const clearFilters = () => {
    setFilters({ name: '', specialization: '', location: '', hospital: '', minExperience: '', maxFee: '' })
  }

  const hasActiveFilters = () => Object.values(filters).some(value => value !== '')

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading doctors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor in Pakistan</h1>
        <p className="text-gray-600">Book appointments with trusted healthcare professionals across Pakistan</p>
      </div>

      {/* Main Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search doctor name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </div>

          <select
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.specialization || 'All Specializations'}
            onChange={(e) => handleFilterChange('specialization', e.target.value)}
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={filters.location || 'All Cities'}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Sort by: Highest Rating</option>
            <option value="experience">Sort by: Experience</option>
            <option value="fee_low">Sort by: Fee Low to High</option>
            <option value="fee_high">Sort by: Fee High to Low</option>
            <option value="name">Sort by: Name A-Z</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-700 hover:text-red-600"
          >
            <Filter className="h-5 w-5 mr-2" />
            {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
          </button>

          {hasActiveFilters() && (
            <button onClick={clearFilters} className="flex items-center text-red-600 hover:text-red-700">
              <X className="h-5 w-5 mr-2" />
              Clear Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic Name</label>
                <input
                  type="text"
                  placeholder="Enter hospital name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={filters.hospital}
                  onChange={(e) => handleFilterChange('hospital', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Experience</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={filters.minExperience}
                  onChange={(e) => handleFilterChange('minExperience', e.target.value)}
                >
                  <option value="">Any experience</option>
                  <option value="5">5+ years</option>
                  <option value="10">10+ years</option>
                  <option value="15">15+ years</option>
                  <option value="20">20+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Fee</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={filters.maxFee}
                  onChange={(e) => handleFilterChange('maxFee', e.target.value)}
                >
                  <option value="">Any fee</option>
                  <option value="1000">Under Rs. 1000</option>
                  <option value="2000">Under Rs. 2000</option>
                  <option value="3000">Under Rs. 3000</option>
                  <option value="5000">Under Rs. 5000</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null
              let displayValue = value
              if (key === 'minExperience') displayValue = `${value}+ years`
              if (key === 'maxFee') displayValue = `Under Rs. ${value}`
              return (
                <span key={key} className="px-3 py-1 bg-white border border-red-200 text-red-700 rounded-full text-sm flex items-center">
                  {key}: {displayValue}
                  <button onClick={() => handleFilterChange(key, '')} className="ml-2 text-red-500 hover:text-red-700">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <p className="text-gray-700">
            Found <span className="font-bold text-red-600">{filteredDoctors.length}</span> doctors
            {hasActiveFilters() && ' matching your criteria'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-2" />
            <span>{allDoctors.length} doctors across Pakistan</span>
          </div>
          <a href="tel:1122" className="flex items-center text-red-600 hover:text-red-700">
            <Phone className="h-5 w-5 mr-2" />
            <span>Emergency: 1122</span>
          </a>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="space-y-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {/* No Results */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-16">
          <div className="text-red-600 mb-6">
            <Users className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">No doctors found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Try adjusting your search filters or browse through all our doctors</p>
          <button
            onClick={clearFilters}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300 font-medium"
          >
            View All Doctors
          </button>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">12+</div>
            <p className="text-gray-600">Medical Specialties</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
            <p className="text-gray-600">Cities Across Pakistan</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
            <p className="text-gray-600">Support Available</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">4.7</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorsList