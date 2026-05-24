import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Clock, Calendar, Award, Briefcase, Phone, Mail, Globe, Users, Shield, Heart, Brain, Baby, Eye, Bone, User, Ear, Pill, Stethoscope, CheckCircle, AlertCircle } from 'lucide-react'
import ReviewCard from '../components/ReviewCard'
import { getDoctorById } from '../api/doctors'

const DoctorProfile = () => {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    getDoctorById(id)
      .then(data => {
        setDoctor(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch doctor:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading doctor profile...</p>
        </div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
        <p className="text-gray-600 mb-8">The doctor you're looking for doesn't exist or has been removed.</p>
        <Link to="/doctors" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300 font-medium">
          Browse Doctors
        </Link>
      </div>
    )
  }

  const getSpecializationIcon = (spec) => {
    const iconMap = {
      'Cardiologist': <Heart className="h-8 w-8" />,
      'Dentist': <Stethoscope className="h-8 w-8" />,
      'Neurologist': <Brain className="h-8 w-8" />,
      'Pediatrician': <Baby className="h-8 w-8" />,
      'Dermatologist': <Shield className="h-8 w-8" />,
      'Orthopedic': <Bone className="h-8 w-8" />,
      'Gynecologist': <User className="h-8 w-8" />,
      'ENT Specialist': <Ear className="h-8 w-8" />,
      'Psychiatrist': <Brain className="h-8 w-8" />,
      'Ophthalmologist': <Eye className="h-8 w-8" />,
      'Gastroenterologist': <Pill className="h-8 w-8" />,
      'General Physician': <Stethoscope className="h-8 w-8" />
    }
    return iconMap[spec] || <Stethoscope className="h-8 w-8" />
  }

  const getServiceIcon = (service) => {
    if (service.includes('Heart')) return <Heart className="h-6 w-6" />
    if (service.includes('Brain') || service.includes('Neurology')) return <Brain className="h-6 w-6" />
    if (service.includes('Child') || service.includes('Pediatric')) return <Baby className="h-6 w-6" />
    if (service.includes('Skin') || service.includes('Dermatology')) return <Shield className="h-6 w-6" />
    if (service.includes('Bone') || service.includes('Joint')) return <Bone className="h-6 w-6" />
    if (service.includes('Ear') || service.includes('Throat')) return <Ear className="h-6 w-6" />
    if (service.includes('Eye') || service.includes('Vision')) return <Eye className="h-6 w-6" />
    return <CheckCircle className="h-6 w-6" />
  }

  const reviews = [
    {
      id: 1,
      patientName: 'Amit Sharma',
      patientCondition: 'Heart Patient',
      rating: 5,
      date: '2024-12-01',
      comment: 'Excellent doctor! Explained everything clearly and showed great care. Highly recommended.',
      tags: ['Knowledgeable', 'Patient', 'Professional']
    },
    {
      id: 2,
      patientName: 'Priya Patel',
      patientCondition: 'Hypertension',
      rating: 4,
      date: '2024-11-28',
      comment: 'Very thorough examination. Treatment has been effective and follow-up was excellent.',
      tags: ['Thorough', 'Effective', 'Caring']
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Doctor Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
              <div className="text-red-600">{getSpecializationIcon(doctor.specialization)}</div>
            </div>
            <div className="mt-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="text-gray-600 ml-1">({doctor.totalReviews})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-red-600 font-semibold text-lg">{doctor.specialization}</span>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {doctor.experience} years
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{doctor.qualification}</p>
              </div>

              <div className="mt-4 lg:mt-0 lg:text-right">
                <div className="text-3xl font-bold text-gray-900">Rs. {doctor.fee}</div>
                <p className="text-gray-600">Consultation Fee</p>
                <Link
                  to={`/book-appointment/${doctor._id}`}
                  className="mt-4 inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition duration-300 font-medium"
                >
                  Book Appointment
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3 text-red-500" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>{doctor.location}</p>
                  <p className="text-sm">{doctor.hospital}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-3 text-red-500" />
                <div>
                  <p className="font-medium">Available Time</p>
                  <p>{doctor.availableTime}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-3 text-red-500" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p>{doctor.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-3 text-red-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm">{doctor.contact.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'availability', 'reviews', 'services'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab === 'reviews' ? `Reviews (${doctor.totalReviews})` : tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">About Dr. {doctor.name.split(' ').slice(-1)[0]}</h2>
            <p className="text-gray-700 mb-6">{doctor.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-red-500" />
                  Education & Qualifications
                </h3>
                <ul className="space-y-3">
                  {doctor.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-red-500" />
                  Awards & Recognition
                </h3>
                <ul className="space-y-3">
                  {doctor.awards.map((award, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-500" />
                  Available Days
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className={`p-4 rounded-lg ${doctor.availableDays.includes(day) ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <span className={doctor.availableDays.includes(day) ? 'font-medium' : 'text-gray-500'}>{day}</span>
                        {doctor.availableDays.includes(day) && (
                          <span className="text-green-600 text-sm font-medium flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Available
                          </span>
                        )}
                      </div>
                      {doctor.availableDays.includes(day) && (
                        <p className="text-sm text-gray-600 mt-1">{doctor.availableTime}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Clinic Information</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{doctor.hospital}</h4>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />{doctor.location}
                    </p>
                    <p className="text-sm text-gray-500">Main Hospital</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{doctor.clinic}</h4>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />{doctor.location}
                    </p>
                    <p className="text-sm text-gray-500">Private Clinic</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                    Emergency Contact
                  </h4>
                  <p className="text-red-600 font-medium flex items-center">
                    <Phone className="h-5 w-5 mr-2" />{doctor.contact.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Patient Reviews</h2>
                  <p className="text-gray-600">What patients say about Dr. {doctor.name.split(' ').slice(-1)[0]}</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">{doctor.rating}</div>
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{doctor.totalReviews} reviews</p>
                </div>
              </div>
              <button className="w-full md:w-auto bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 font-medium">
                Write a Review
              </button>
            </div>
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Services & Specializations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctor.services.map((service, idx) => (
                <div key={idx} className="p-6 bg-red-50 rounded-xl border border-red-100">
                  <div className="text-red-600 mb-4">{getServiceIcon(service)}</div>
                  <h3 className="font-semibold text-lg mb-2">{service}</h3>
                  <p className="text-gray-600 text-sm">Comprehensive diagnosis and treatment available</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Insurance Accepted</h3>
              <div className="flex flex-wrap gap-3">
                {doctor.insurance.map((insurer) => (
                  <span key={insurer} className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    {insurer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorProfile