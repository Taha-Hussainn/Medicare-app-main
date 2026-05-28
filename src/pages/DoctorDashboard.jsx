import { useState, useEffect } from 'react'
import { Calendar, Settings, LogOut, CheckCircle, XCircle, Filter, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getAppointmentsByDoctor, updateAppointmentStatus } from '../api/appointments'
import { getCurrentUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase/client'
import { getChatsByDoctor } from '../api/chat'
import ChatWindow from '../components/ChatWindow'

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments')
  const [appointments, setAppointments] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [profileData, setProfileData] = useState({
    name: '', specialization: '', experience: '', fee: '',
    phone: '', hospital: '', clinic: '', location: '',
    description: '', available_time: '', slots: ''
  })
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser().then(user => {
      if (!user) { navigate('/login'); return }
      setCurrentUser(user)
      supabase.from('doctors').select('*').eq('id', user.id).single()
        .then(({ data }) => {
          if (data) {
            setProfileData({
              name: data.name || '',
              specialization: data.specialization || '',
              experience: data.experience || '',
              fee: data.fee || '',
              phone: data.contact?.phone || '',
              hospital: data.hospital || '',
              clinic: data.clinic || '',
              location: data.location || '',
              description: data.description || '',
              available_time: data.available_time || '',
              slots: data.slots?.join(', ') || ''
            })
          }
        })
      getAppointmentsByDoctor(user.id).then(result => {
        if (result.success) setAppointments(result.data)
        setLoading(false)
      })
      getChatsByDoctor(user.id).then(result => {
        if (result.success) setChats(result.data)
      })
    })
  }, [])

  const handleSaveProfile = async () => {
    setSaving(true)
    const slotsArray = profileData.slots
      ? profileData.slots.split(',').map(s => s.trim()).filter(Boolean)
      : []

    await supabase.from('doctors').update({
      name: profileData.name,
      specialization: profileData.specialization,
      experience: parseInt(profileData.experience) || 0,
      fee: parseInt(profileData.fee) || 0,
      hospital: profileData.hospital,
      clinic: profileData.clinic,
      location: profileData.location,
      description: profileData.description,
      available_time: profileData.available_time,
      slots: slotsArray,
      contact: { phone: profileData.phone, email: currentUser.email, website: '' }
    }).eq('id', currentUser.id)

    await supabase.from('users').update({
      name: profileData.name,
      specialization: profileData.specialization,
      phone: profileData.phone
    }).eq('id', currentUser.id)

    setSaving(false)
    alert('Profile updated successfully!')
  }

  const handleApprove = async (id) => {
    const result = await updateAppointmentStatus(id, 'confirmed')
    if (result.success) setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'confirmed' } : a))
  }

  const handleReject = async (id) => {
    const result = await updateAppointmentStatus(id, 'cancelled')
    if (result.success) setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a))
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const filteredAppointments = filter === 'all' ? appointments : appointments.filter(a => a.status === filter)
  const today = new Date().toISOString().split('T')[0]
  const stats = {
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter(a => a.date === today).length,
    pendingApprovals: appointments.filter(a => a.status === 'pending').length,
    totalEarnings: appointments.filter(a => a.status === 'confirmed').reduce((sum, a) => sum + (a.fee || 0), 0)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name || 'Doctor'}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-red-600 mt-4 md:mt-0">
          <LogOut className="h-4 w-4 mr-2" />Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Appointments', value: stats.totalAppointments },
          { label: "Today's Appointments", value: stats.todayAppointments },
          { label: 'Pending Approvals', value: stats.pendingApprovals },
          { label: 'Total Earnings', value: `Rs. ${stats.totalEarnings.toLocaleString()}` }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-2xl">👨‍⚕️</div>
              <div>
                <h3 className="font-bold">{currentUser?.name || 'Doctor'}</h3>
                <p className="text-red-600 text-sm">{currentUser?.specialization || 'Doctor'}</p>
              </div>
            </div>
            <nav className="space-y-2">
              {[
                { key: 'appointments', label: 'Appointments', icon: <Calendar className="h-5 w-5 mr-3" /> },
                { key: 'chats', label: 'Patient Chats', icon: <MessageCircle className="h-5 w-5 mr-3" /> },
                { key: 'profile', label: 'Complete Profile', icon: <Settings className="h-5 w-5 mr-3" /> }
              ].map(item => (
                <button key={item.key} onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === item.key ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                  {item.icon}{item.label}
                  {item.key === 'chats' && chats.length > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chats.length}
                    </span>
                  )}
                </button>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition text-red-600">
                <LogOut className="h-5 w-5 mr-3" />Logout
              </button>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Appointments ({filteredAppointments.length})</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                    value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto"></div>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No appointments found.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{appointment.patient_name}</h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>📧 {appointment.patient_email}</span>
                            {appointment.patient_phone && <span>📞 {appointment.patient_phone}</span>}
                          </div>
                          {appointment.symptoms && (
                            <p className="text-gray-700 mt-2 text-sm"><span className="font-medium">Symptoms:</span> {appointment.symptoms}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{appointment.time}</div>
                          <div className="text-gray-600 text-sm">{appointment.date}</div>
                          <div className="text-red-600 font-medium text-sm mt-1">Rs. {appointment.fee}</div>
                          <div className="mt-2">
                            {appointment.status === 'pending' ? (
                              <div className="flex space-x-2">
                                <button onClick={() => handleApprove(appointment.id)}
                                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1" />Approve
                                </button>
                                <button onClick={() => handleReject(appointment.id)}
                                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center">
                                  <XCircle className="h-4 w-4 mr-1" />Reject
                                </button>
                              </div>
                            ) : (
                              <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>{appointment.status}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'chats' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold">Patient Chats ({chats.length})</h2>
              </div>
              {chats.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No patient chats yet.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {chats.map(chat => (
                    <div key={chat.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold text-lg">
                            {chat.patient_name?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{chat.patient_name}</p>
                          <p className="text-sm text-gray-500">Tap to open chat</p>
                        </div>
                      </div>
                      <button onClick={() => setActiveChat(chat)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2" />Open Chat
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-2">Complete Your Profile</h2>
              <p className="text-gray-600 text-sm mb-6">Fill in your details so patients can find and book you.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input type="text" value={profileData.specialization}
                    onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                  <input type="number" value={profileData.experience}
                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (Rs.)</label>
                  <input type="number" value={profileData.fee}
                    onChange={(e) => setProfileData({ ...profileData, fee: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
                  <input type="text" value={profileData.hospital}
                    onChange={(e) => setProfileData({ ...profileData, hospital: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clinic</label>
                  <input type="text" value={profileData.clinic}
                    onChange={(e) => setProfileData({ ...profileData, clinic: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Time</label>
                  <input type="text" value={profileData.available_time}
                    onChange={(e) => setProfileData({ ...profileData, available_time: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Slots (comma separated)</label>
                  <input type="text" placeholder="09:00 AM, 10:30 AM, 12:00 PM"
                    value={profileData.slots}
                    onChange={(e) => setProfileData({ ...profileData, slots: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={profileData.description}
                  onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 h-24" />
              </div>
              <button onClick={handleSaveProfile} disabled={saving}
                className="mt-6 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 font-medium disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          )}
        </div>
      </div>

      {activeChat && (
        <ChatWindow
          chat={activeChat}
          currentUser={currentUser}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  )
}

export default DoctorDashboard