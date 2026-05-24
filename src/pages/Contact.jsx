// src/pages/Contact.jsx
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: ["+92 1800-123-4567", "+92 98765-43210"],
      description: "24/7 Emergency Support"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: ["support@medicare.pk", "help@medicare.pk"],
      description: "Response within 24 hours"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: ["123 Healthcare Street", "Medical City, Pakistan - 110001"],
      description: "Mon-Sat: 9AM-6PM"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get in touch with our team. We're here to help you with any questions or concerns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((info, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <div className="text-red-600">
                {info.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
            <div className="space-y-1 mb-3">
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-700">{detail}</p>
              ))}
            </div>
            <p className="text-gray-500 text-sm">{info.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <MessageSquare className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Issue</option>
                  <option value="feedback">Feedback/Suggestion</option>
                  <option value="emergency">Emergency Support</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent h-40"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 font-semibold text-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-gray-900 mb-2">How do I book an appointment?</h3>
              <p className="text-gray-600">Search for a doctor, select a time slot, and fill in your details to book instantly.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel or reschedule my appointment?</h3>
              <p className="text-gray-600">Yes, you can cancel or reschedule up to 24 hours before your appointment through your dashboard.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Are the doctors verified?</h3>
              <p className="text-gray-600">All doctors on MediCare are verified with proper credentials, licenses, and experience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Is my medical information secure?</h3>
              <p className="text-gray-600">Yes, we use bank-level encryption and are HIPAA compliant to protect your health information.</p>
            </div>
          </div>
          
          {/* Emergency Banner */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="font-bold text-red-700">Emergency Medical Help</h3>
                <p className="text-red-600">For immediate medical emergencies, call:</p>
                <p className="text-2xl font-bold text-red-700 mt-2">1020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact