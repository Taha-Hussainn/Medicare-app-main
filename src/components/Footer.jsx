// components/Footer.jsx
import { Link } from 'react-router-dom'
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Shield, Clock } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'Find Doctors', path: '/doctors' },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ]

  const specializations = [
    'Cardiologist',
    'Dentist',
    'Neurologist',
    'Pediatrician',
    'Dermatologist',
    'Orthopedic',
    'Gynecologist',
    'ENT Specialist',
  ]

  const cities = [
      'Karachi',
      'Lahore', 
      'Islamabad',
      'Rawalpindi',
      'Faisalabad',
      'Multan',
      'Hyderabad',
      'Peshawar',
      'Quetta'
  ]

  const contactInfo = [
    { icon: <Phone className="h-5 w-5" />, text: '+92 1800-123-4567' },
    { icon: <Mail className="h-5 w-5" />, text: 'support@Nucura.pk' },
    { icon: <MapPin className="h-5 w-5" />, text: '123 Healthcare Street, Medical City, Pakistan' },
    { icon: <Clock className="h-5 w-5" />, text: '24/7 Emergency Support' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Nucura</span>
            </div>
            <p className="text-gray-400 mb-6">
              Pakistan's leading healthcare platform connecting patients with trusted doctors for better health outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition flex items-center"
                  >
                    <span className="h-1 w-1 bg-red-600 rounded-full mr-3"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Specializations</h3>
            <div className="grid grid-cols-2 gap-2">
              {specializations.map((spec, index) => (
                <Link
                  key={index}
                  to={`/doctors?specialization=${spec.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition text-sm py-1"
                >
                  {spec}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-red-500 mr-3 mt-1">
                    {info.icon}
                  </div>
                  <span className="text-gray-400">{info.text}</span>
                </div>
              ))}
            </div>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-medium mb-3">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="bg-red-600 px-4 py-2 rounded-r-lg hover:bg-red-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-green-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-400">100% Secure</p>
                  <p className="text-xs text-gray-500">HIPAA Compliant</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-2xl mr-2">⭐</div>
                <div>
                  <p className="text-sm text-gray-400">4.8/5 Rating</p>
                  <p className="text-xs text-gray-500">From 10K+ Reviews</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {cities.map((city, index) => (
                <span key={index} className="text-gray-400 text-sm hover:text-white transition cursor-pointer">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Nucura. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition">
                Terms of Service
              </Link>
              <div className="text-gray-400 text-sm">
                Made with <Heart className="inline h-4 w-4 text-red-500" /> for better healthcare
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer