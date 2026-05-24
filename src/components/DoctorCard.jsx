// components/DoctorCard.jsx
import { Star, MapPin, Clock, Calendar, Phone, Heart, Brain, Baby, Shield, Bone, User, Ear, Eye, Pill, Stethoscope } from 'lucide-react'
import { Link } from 'react-router-dom'

const DoctorCard = ({ doctor }) => {
  // Get icon for specialization
  const getSpecializationIcon = () => {
    switch(doctor.specialization) {
      case 'Cardiologist': return <Heart className="h-8 w-8" />;
      case 'Neurologist': return <Brain className="h-8 w-8" />;
      case 'Pediatrician': return <Baby className="h-8 w-8" />;
      case 'Dermatologist': return <Shield className="h-8 w-8" />;
      case 'Orthopedic': return <Bone className="h-8 w-8" />;
      case 'Gynecologist': return <User className="h-8 w-8" />;
      case 'ENT Specialist': return <Ear className="h-8 w-8" />;
      case 'Ophthalmologist': return <Eye className="h-8 w-8" />;
      case 'Gastroenterologist': return <Pill className="h-8 w-8" />;
      case 'Psychiatrist': return <Brain className="h-8 w-8" />;
      default: return <Stethoscope className="h-8 w-8" />;
    }
  }

  const formatAvailableDays = (days) => {
    if (days.length <= 3) return days.join(', ');
    return `${days.slice(0, 2).join(', ')} +${days.length - 2} more`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Doctor Icon */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center">
              <div className="text-red-600">
                {getSpecializationIcon()}
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                  {doctor.emergency && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                      24/7 Emergency
                    </span>
                  )}
                </div>
                <p className="text-red-600 font-semibold mb-1">{doctor.specialization}</p>
                <p className="text-gray-600 text-sm mb-2">{doctor.qualification}</p>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      <span className="font-semibold">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm ml-1">({doctor.total_reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {doctor.experience} years exp
                  </div>
                </div>
              </div>
              
              <div className="lg:text-right mt-2 lg:mt-0">
                <div className="text-3xl font-bold text-gray-900">Rs. {doctor.fee}</div>
                <p className="text-gray-600 text-sm">Consultation Fee</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-start text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">{doctor.hospital}</p>
                  <p className="text-sm">{doctor.location}</p>
                </div>
              </div>
              <div className="flex items-start text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Available Days</p>
                  <p className="text-sm">{formatAvailableDays(doctor.available_days)}</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 line-clamp-2">{doctor.description}</p>
            
            {/* Services Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {doctor.services.slice(0, 3).map((service, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {service}
                </span>
              ))}
              {doctor.services.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{doctor.services.length - 3} more
                </span>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t">
              <div className="mb-3 sm:mb-0">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium">{doctor.contact.phone}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Link
                  to={`/doctor/${doctor.id}`}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition duration-300 font-medium"
                >
                  View Profile
                </Link>
                <Link
                  to={`/book-appointment/${doctor.id}`}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-medium"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard