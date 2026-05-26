import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Clock, Calendar, Award, Briefcase, Phone, Mail, Shield, Heart, Brain, Baby, Eye, Bone, User, Ear, Pill, Stethoscope, CheckCircle, AlertCircle } from 'lucide-react'
import ReviewCard from '../components/ReviewCard'
import AddReviewModal from '../components/AddReviewModal'
import { getDoctorById } from '../api/doctors'
import { getReviewsByDoctor } from '../api/reviews'
import { getCurrentUser } from '../api/auth'

const DoctorProfile = () => {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [reviews, setReviews] = useState([])
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getDoctorById(id).then(data => {
      setDoctor(data)
      setLoading(false)
    })
    getReviewsByDoctor(id).then(result => {
      if (result.success) setReviews(result.data)
    })
    getCurrentUser().then(user => setCurrentUser(user))
  }, [id])

  const handleReviewAdded = (newReview) => {
    setReviews(prev => [newReview, ...prev])
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : doctor?.rating || 0

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

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
    </div>
  )

  if (!doctor) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
      <Link to="/doctors" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700">Browse Doctors</Link>
    </div>
  )

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
                  <span className="font-bold">{avgRating}</span>
                  <span className="text-gray-600 ml-1">({reviews.length} reviews)</span>
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
                    <Briefcase className="h-4 w-4 mr-1" />{doctor.experience} years
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{doctor.qualification}</p>
              </div>
              <div className="mt-4 lg:mt-0 lg:text-right">
                <div className="text-3xl font-bold text-gray-900">Rs. {doctor.fee}</div>
                <p className="text-gray-600">Consultation Fee</p>
                <Link to={`/book-appointment/${doctor.id}`}
                  className="mt-4 inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-medium">
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
                  <p>{doctor.available_time}</p>
                </div>
              </div>
              {doctor.contact?.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-3 text-red-500" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p>{doctor.contact.phone}</p>
                  </div>
                </div>
              )}
              {doctor.contact?.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-3 text-red-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm">{doctor.contact.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {['overview', 'availability', 'reviews', 'services'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
                activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              {tab === 'reviews' ? `Reviews (${reviews?.length || 0})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">About {doctor.name}</h2>
            <p className="text-gray-700 mb-6">{doctor.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {doctor.education?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-red-500" />Education
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
              )}
              {doctor.awards?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-red-500" />Awards
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
              )}
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-500" />Available Days
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div key={day} className={`p-4 rounded-lg ${doctor.available_days?.includes(day) ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <span className={doctor.available_days?.includes(day) ? 'font-medium' : 'text-gray-500'}>{day}</span>
                        {doctor.available_days?.includes(day) && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Clinic Information</h3>
                <div className="space-y-4">
                  {doctor.hospital && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">{doctor.hospital}</h4>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />{doctor.location}
                      </p>
                    </div>
                  )}
                  {doctor.clinic && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">{doctor.clinic}</h4>
                      <p className="text-sm text-gray-500">Private Clinic</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            {/* Reviews Summary */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Patient Reviews</h2>
                  <p className="text-gray-600 mt-1">{reviews.length} verified reviews</p>
                </div>
                <div className="mt-4 md:mt-0 text-center">
                  <div className="text-5xl font-bold text-gray-900">{avgRating}</div>
                  <div className="flex items-center justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{reviews.length} reviews</p>
                </div>
              </div>

              {/* Rating Breakdown */}
              {reviews.length > 0 && (
                <div className="space-y-2 mb-6">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = reviews.filter(r => r.rating === star).length
                    const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                    return (
                      <div key={star} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 w-4">{star}</span>
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-500 w-8">{count}</span>
                      </div>
                    )
                  })}
                </div>
              )}

              {currentUser && currentUser.userType === 'patient' && (
                <button onClick={() => setShowReviewModal(true)}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium">
                  Write a Review
                </button>
              )}
              {!currentUser && (
                <Link to="/login" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium">
                  Login to Write a Review
                </Link>
              )}
            </div>

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <Star className="h-12 w-12 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-semibold text-gray-700">No reviews yet</h3>
                <p className="text-gray-500 mt-1">Be the first to review this doctor</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Services & Specializations</h2>
            {doctor.services?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctor.services.map((service, idx) => (
                  <div key={idx} className="p-6 bg-red-50 rounded-xl border border-red-100">
                    <CheckCircle className="h-6 w-6 text-red-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{service}</h3>
                    <p className="text-gray-600 text-sm">Comprehensive diagnosis and treatment available</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No services listed yet.</p>
            )}

            {doctor.insurance?.length > 0 && (
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Insurance Accepted</h3>
                <div className="flex flex-wrap gap-3">
                  {doctor.insurance.map(insurer => (
                    <span key={insurer} className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center text-sm">
                      <Shield className="h-4 w-4 mr-2 text-green-500" />{insurer}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <AddReviewModal
          doctor={doctor}
          currentUser={currentUser}
          onClose={() => setShowReviewModal(false)}
          onReviewAdded={handleReviewAdded}
        />
      )}
    </div>
  )
}

export default DoctorProfile