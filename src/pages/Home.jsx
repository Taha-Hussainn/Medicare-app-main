// pages/Home.jsx
import { Heart, Brain, Baby, Shield, Users, Star, Award, Calendar, CheckCircle, ArrowRight, Stethoscope, Eye, Bone, User, Ear, Pill } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const specializations = [
    { name: 'Cardiologist', icon: <Heart className="h-8 w-8" />, count: 8 },
    { name: 'Neurologist', icon: <Brain className="h-8 w-8" />, count: 4 },
    { name: 'Pediatrician', icon: <Baby className="h-8 w-8" />, count: 9 },
    { name: 'Dentist', icon: <Stethoscope className="h-8 w-8" />, count: 12 },
    { name: 'Dermatologist', icon: <Shield className="h-8 w-8" />, count: 7 },
    { name: 'Orthopedic', icon: <Bone className="h-8 w-8" />, count: 6 },
    { name: 'Gynecologist', icon: <User className="h-8 w-8" />, count: 11 },
    { name: 'ENT Specialist', icon: <Ear className="h-8 w-8" />, count: 5 },
    { name: 'Psychiatrist', icon: <Brain className="h-8 w-8" />, count: 3 },
    { name: 'Ophthalmologist', icon: <Eye className="h-8 w-8" />, count: 4 },
    { name: 'Gastroenterologist', icon: <Pill className="h-8 w-8" />, count: 4 },
    { name: 'General Physician', icon: <Stethoscope className="h-8 w-8" />, count: 15 },
  ]

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified Doctors",
      description: "All doctors are verified with proper credentials and experience"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Easy Booking",
      description: "Simple 3-step booking process in under 2 minutes"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your queries"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Care",
      description: "Access to top-rated specialists and hospitals"
    }
  ]

  const testimonials = [
    {
      name: "Mahad Hasan",
      role: "Patient",
      content: "Found the perfect cardiologist through Nucura. The booking was seamless and the doctor was excellent!",
      rating: 5
    },
    {
      name: "Ayesha Khan",
      role: "Patient",
      content: "Emergency appointment booking saved my mother's life. The response time was incredible!",
      rating: 5
    },
    {
      name: "Dr. Ahmed Raza",
      role: "Cardiologist",
      content: "Great platform to connect with patients. The management system makes my practice more efficient.",
      rating: 4
    }
  ]

  const stats = [
    { value: "85+", label: "Verified Doctors" },
    { value: "1000+", label: "Happy Patients" },
    { value: "5+", label: "Cities Across Pakistan" },
    { value: "4.8", label: "Average Rating" }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section with Background Image */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10">
            <Heart className="h-24 w-24 text-white" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Stethoscope className="h-24 w-24 text-white" />
          </div>
          <div className="absolute top-1/4 right-1/4">
            <Shield className="h-16 w-16 text-white" />
          </div>
          <div className="absolute bottom-1/4 left-1/4">
            <Users className="h-16 w-16 text-white" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Health Journey
              <br />
              <span className="text-red-100">Starts Here</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with Pakistan's top doctors. Experience healthcare that's accessible, 
              reliable, and tailored to your needs.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/doctors"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg inline-flex items-center justify-center"
              >
                <Stethoscope className="h-5 w-5 mr-2" />
                Find a Doctor
              </Link>
              <Link
                to="/signup"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition duration-300 text-lg inline-flex items-center justify-center"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Now Free
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                <span>Verified Doctors</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{stat.value}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specializations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Find by Medical Specialization</h2>
            <p className="text-gray-600 mt-2">Choose from our expert doctors across various specialties</p>
          </div>
          <Link
            to="/doctors"
            className="text-red-600 font-semibold hover:text-red-700 flex items-center"
          >
            View All Specializations
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {specializations.map((spec) => (
            <Link
              key={spec.name}
              to={`/doctors?specialization=${spec.name.toLowerCase()}`}
              className="group bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mb-3 sm:mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors mx-auto">
                <div className="text-red-600 group-hover:text-white">
                  {spec.icon}
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 group-hover:text-red-600">{spec.name}</h3>
              <p className="text-gray-500 text-xs sm:text-sm">{spec.count} Doctors</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Nucura Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to get the healthcare you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="h-10 w-10 text-red-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Your Doctor</h3>
              <p className="text-gray-600">
                Browse through our verified specialists. View profiles, qualifications, and patient reviews.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-10 w-10 text-red-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Appointment</h3>
              <p className="text-gray-600">
                Select your preferred date and time. Get instant confirmation and appointment reminders.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="h-10 w-10 text-red-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Consult & Recover</h3>
              <p className="text-gray-600">
                Visit clinic or consult online. Get prescriptions and follow-up care recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Nucura?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing healthcare with technology and compassion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mb-4 sm:mb-6">
                <div className="text-red-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Patients & Doctors</h2>
            <p className="text-gray-600">Real stories from our healthcare community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 italic text-sm sm:text-base">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Nucura */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              About <span className="text-red-600">Nucura</span>
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Nucura is Pakistan's premier digital healthcare platform, bridging the gap between 
              patients and top medical professionals. Our mission is to make quality healthcare 
              accessible, affordable, and convenient for every Pakistani.
            </p>
            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Rigorous Doctor Verification</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Every doctor undergoes thorough background checks and credential verification</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Secure Platform</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Bank-level encryption and HIPAA compliance protect your health data</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Comprehensive Care</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">From consultation to follow-up, we're with you throughout your health journey</p>
                </div>
              </div>
            </div>
            
            <Link
              to="/about"
              className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 text-sm sm:text-base"
            >
              Learn more about Nucura
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="bg-red-50 rounded-2xl p-4 sm:p-8">
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
                  <div className="text-2xl sm:text-3xl text-red-600 font-bold mb-1 sm:mb-2">100%</div>
                  <p className="text-gray-700 text-xs sm:text-sm">Doctor Verification</p>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
                  <div className="text-2xl sm:text-3xl text-red-600 font-bold mb-1 sm:mb-2">24/7</div>
                  <p className="text-gray-700 text-xs sm:text-sm">Support Available</p>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
                  <div className="text-2xl sm:text-3xl text-red-600 font-bold mb-1 sm:mb-2">10+</div>
                  <p className="text-gray-700 text-xs sm:text-sm">Medical Fields</p>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
                  <div className="text-2xl sm:text-3xl text-red-600 font-bold mb-1 sm:mb-2">Instant</div>
                  <p className="text-gray-700 text-xs sm:text-sm">Confirmation</p>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-xl border border-red-200">
                <div className="flex items-center">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2 sm:mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Award-Winning Platform</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Recognized as Best Healthcare Startup 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Begin Your Health Journey Today</h2>
          <p className="text-lg sm:text-xl opacity-90 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Join over 1 million patients who trust Nucura for their healthcare. 
            Experience the future of medical care with just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/signup"
              className="bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base sm:text-lg inline-flex items-center justify-center"
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Create Free Account
            </Link>
            <Link
              to="/doctors"
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition duration-300 text-base sm:text-lg inline-flex items-center justify-center"
            >
              <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Browse Doctors
            </Link>
          </div>
          
          <p className="mt-6 sm:mt-8 text-red-100 text-sm sm:text-base">
            No hidden fees • Free registration • 100% secure platform
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home