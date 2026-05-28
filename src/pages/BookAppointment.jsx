import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Calendar, Clock, User, Mail, Phone, AlertCircle, Check } from 'lucide-react'
import { getDoctorById } from '../api/doctors'
import { createAppointment } from '../api/appointments'
import { getCurrentUser } from '../api/auth'
import { getOrCreateChat } from '../api/chat'

const BookAppointment = () => {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [formData, setFormData] = useState({
    patientName: '', patientEmail: '', patientPhone: '',
    date: '', timeSlot: '', symptoms: '', notes: ''
  })

  useEffect(() => {
    getDoctorById(doctorId).then(data => {
      setDoctor(data)
      setLoading(false)
    })
    getCurrentUser().then(user => {
      if (user) {
        setCurrentUser(user)
        setFormData(prev => ({
          ...prev,
          patientName: user.name || '',
          patientEmail: user.email || '',
          patientPhone: user.phone || ''
        }))
      }
    })
  }, [doctorId])

  const handleSubmit = async () => {
    if (!currentUser) {
      alert('Please login to book an appointment')
      navigate('/login')
      return
    }
    setSubmitting(true)
    const result = await createAppointment({
      patientId: currentUser.id,
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      patientPhone: formData.patientPhone,
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: formData.date,
      time: formData.timeSlot,
      symptoms: formData.symptoms,
      notes: formData.notes,
      fee: doctor.fee,
      status: 'pending'
    })

    if (result.success) {
      // Auto-create chat between patient and doctor
      await getOrCreateChat(
        currentUser.id,
        doctor.id,
        currentUser.name,
        doctor.name
      )
      setStep(4)
    } else {
      alert('Failed to book appointment: ' + result.error)
    }
    setSubmitting(false)
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
      <Link to="/doctors" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700">Find Another Doctor</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Appointment</h1>

      {/* Doctor Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{doctor.name}</h2>
            <p className="text-red-600">{doctor.specialization}</p>
            <p className="text-gray-600 text-sm">{doctor.hospital}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">Rs. {doctor.fee}</p>
            <p className="text-gray-600 text-sm">Consultation Fee</p>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step > s ? 'bg-green-500 text-white' : step === s ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step > s ? <Check className="h-5 w-5" /> : s}
            </div>
            {s < 3 && <div className={`w-24 h-1 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Patient Information</h2>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input type="text" placeholder="Full Name" required
                className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input type="email" placeholder="Email Address" required
                className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                value={formData.patientEmail}
                onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })} />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input type="text" placeholder="Phone Number" required
                className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                value={formData.patientPhone}
                onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })} />
            </div>
            <textarea placeholder="Describe your symptoms..."
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 h-32"
              value={formData.symptoms}
              onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })} />
          </div>
          <button onClick={() => setStep(2)}
            disabled={!formData.patientName || !formData.patientEmail || !formData.patientPhone}
            className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium disabled:opacity-50">
            Next — Select Date & Time
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-3">
                {doctor.slots?.map((slot) => (
                  <button key={slot} onClick={() => setFormData({ ...formData, timeSlot: slot })}
                    className={`py-3 rounded-lg border font-medium transition ${
                      formData.timeSlot === slot ? 'bg-red-600 text-white border-red-600' : 'border-gray-300 hover:border-red-400'
                    }`}>
                    <Clock className="h-4 w-4 inline mr-1" />{slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Back</button>
            <button onClick={() => setStep(3)} disabled={!formData.date || !formData.timeSlot}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium disabled:opacity-50">
              Next — Review
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Review & Confirm</h2>
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-semibold mb-3">Appointment Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500">Doctor:</span> <span className="font-medium">{doctor.name}</span></div>
              <div><span className="text-gray-500">Specialization:</span> <span className="font-medium">{doctor.specialization}</span></div>
              <div><span className="text-gray-500">Date:</span> <span className="font-medium">{formData.date}</span></div>
              <div><span className="text-gray-500">Time:</span> <span className="font-medium">{formData.timeSlot}</span></div>
              <div><span className="text-gray-500">Patient:</span> <span className="font-medium">{formData.patientName}</span></div>
              <div><span className="text-gray-500">Fee:</span> <span className="font-medium text-red-600">Rs. {doctor.fee}</span></div>
            </div>
          </div>
          {formData.symptoms && (
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Symptoms</h3>
              <p className="text-gray-700 text-sm">{formData.symptoms}</p>
            </div>
          )}
          <div className="flex space-x-4 mt-6">
            <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">Back</button>
            <button onClick={handleSubmit} disabled={submitting}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium disabled:opacity-50">
              {submitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
          <p className="text-gray-600 mb-2">Your appointment with {doctor.name} on {formData.date} at {formData.timeSlot} is confirmed.</p>
          <p className="text-gray-500 text-sm mb-6">A chat has been created — you can message your doctor from your dashboard.</p>
          <div className="flex space-x-4 justify-center">
            <Link to="/dashboard" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700">View My Dashboard</Link>
            <Link to="/doctors" className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50">Find More Doctors</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookAppointment