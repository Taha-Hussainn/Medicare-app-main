// src/pages/About.jsx
import { Shield, Users, Clock, Heart, Award, Globe, CheckCircle, Phone, Mail, MapPin, Calendar, Star, Stethoscope, Building, Target, User, Users as UsersIcon, Brain, Baby, Bone, Eye, Ear, Pill } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified Doctors",
      description: "All doctors undergo rigorous verification process"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Quick Appointments",
      description: "Book appointments in under 2 minutes"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Patient First",
      description: "Designed with patient experience in mind"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support"
    }
  ]

  const team = [
    {
      name: "Dr. Ali  Khalid",
      role: "Medical Director",
      experience: "20+ years",
      icon: <Stethoscope className="h-10 w-10" />
    },
    {
      name: "Abeer Ahmed",
      role: "Operations Head",
      experience: "10+ years",
      icon: <Building className="h-10 w-10" />
    },
    {
      name: "Taha Hussain",
      role: "Tech Lead",
      experience: "8+ years",
      icon: <Target className="h-10 w-10" />
    },
    {
      name: "Muhammad Huzaifa",
      role: "Patient Care",
      experience: "6+ years",
      icon: <User className="h-10 w-10" />
    }
  ]

  const milestones = [
    { year: "2020", title: "Founded", description: "Started with 50 doctors in Karachi" },
    { year: "2021", title: "Expanded", description: "Launched in 5 major cities" },
    { year: "2022", title: "1M Users", description: "Reached 1 million registered users" },
    { year: "2023", title: "Awards", description: "Best Healthcare Startup Award" },
    { year: "2024", title: "Pan Pakistan", description: "Present in 50+ cities across Pakistan" }
  ]

  const specializations = [
    { icon: <Heart className="h-6 w-6" />, name: "Cardiology" },
    { icon: <Brain className="h-6 w-6" />, name: "Neurology" },
    { icon: <Baby className="h-6 w-6" />, name: "Pediatrics" },
    { icon: <Bone className="h-6 w-6" />, name: "Orthopedics" },
    { icon: <Eye className="h-6 w-6" />, name: "Ophthalmology" },
    { icon: <Ear className="h-6 w-6" />, name: "ENT" },
    { icon: <Pill className="h-6 w-6" />, name: "Gastroenterology" },
    { icon: <Shield className="h-6 w-6" />, name: "Dermatology" },
  ]

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
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                About <span className="text-red-600">MediCare</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make quality healthcare accessible and affordable for everyone in Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, MediCare started with a simple vision: to bridge the gap between patients and healthcare providers. We noticed that finding the right doctor and booking appointments was often a time-consuming and stressful process.
            </p>
            <p className="text-gray-600 mb-4">
              Today, we've grown to become one of Pakistan's leading healthcare platforms, serving millions of patients across the country. Our team of healthcare professionals, technologists, and customer service experts work together to deliver exceptional healthcare experiences.
            </p>
            <p className="text-gray-600">
              We believe that everyone deserves access to quality healthcare, and we're committed to making that a reality through technology and innovation.
            </p>
          </div>
          <div className="relative">
            <div className="bg-red-100 rounded-2xl p-8">
              <div className="text-red-600 mb-6 flex justify-center">
                <Building className="h-24 w-24" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">Trusted by 1M+ Patients</div>
                <p className="text-gray-600">Across 50+ cities in Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MediCare?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine technology with healthcare expertise to deliver the best patient experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                  <div className="text-red-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-red-50 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700">
              To make quality healthcare accessible, affordable, and convenient for every Pakistan. We aim to bridge the healthcare gap through technology and innovation.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Make healthcare accessible to everyone</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Reduce healthcare costs through technology</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Improve patient-doctor relationships</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                <Globe className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700">
              To become Pakistan's most trusted healthcare platform, transforming how healthcare is delivered and experienced across the country.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Build Pakistan's largest healthcare network</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Integrate AI for better healthcare outcomes</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Expand to rural and underserved areas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A team of experienced professionals dedicated to transforming healthcare
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <div className="text-red-600">
                  {member.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-red-600 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.experience} experience</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specializations */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Specializations</h2>
            <p className="text-gray-600">Covering a wide range of medical fields</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {specializations.map((spec, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm mb-3 mx-auto">
                  <div className="text-red-600">
                    {spec.icon}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700">{spec.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">From a small startup to Pakistan's leading healthcare platform</p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-red-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} mb-4 md:mb-0`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-red-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    {/* Empty space for alignment */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-red-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We're here to help you with any inquiries
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

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-gray-600">We'll get back to you within 24 hours</p>
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Healthcare Revolution</h2>
          <p className="text-xl opacity-90 mb-8">
            Whether you're a patient looking for quality care or a doctor wanting to reach more patients, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Join as Patient
            </Link>
            <Link
              to="/signup?type=doctor"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition duration-300"
            >
              Join as Doctor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About