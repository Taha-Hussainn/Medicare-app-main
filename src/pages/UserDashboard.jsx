import { useState, useEffect } from 'react'
import { Calendar, Clock, User, LogOut, Plus, Trash2, MessageCircle, FileText, Upload, File, Download } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getAppointmentsByUser, updateAppointmentStatus, deleteAppointment } from '../api/appointments'
import { getCurrentUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { getChatsByPatient } from '../api/chat'
import ChatWindow from '../components/ChatWindow'
import { getPrescriptionsByPatient } from '../api/prescriptions'
import PrescriptionCard from '../components/PrescriptionCard'
import { uploadMedicalRecord, getMedicalRecordsByPatient, deleteMedicalRecord } from '../api/medicalRecords'

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments')
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [prescriptions, setPrescriptions] = useState([])
  const [records, setRecords] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadForm, setUploadForm] = useState({ category: 'Lab Report', description: '' })
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser().then(user => {
      if (!user) { navigate('/login'); return }
      setCurrentUser(user)
      getAppointmentsByUser(user.id).then(result => {
        if (result.success) setAppointments(result.data)
        setLoading(false)
      })
      getChatsByPatient(user.id).then(result => {
        if (result.success) setChats(result.data)
      })
      getPrescriptionsByPatient(user.id).then(result => {
        if (result.success) setPrescriptions(result.data)
      })
      getMedicalRecordsByPatient(user.id).then(result => {
        if (result.success) setRecords(result.data)
      })
    })
  }, [])

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    const result = await updateAppointmentStatus(id, 'cancelled')
    if (result.success) {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a))
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return
    const result = await deleteAppointment(id)
    if (result.success) setAppointments(prev => prev.filter(a => a.id !== id))
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const result = await uploadMedicalRecord(
      currentUser.id,
      currentUser.name,
      file,
      uploadForm.category,
      uploadForm.description
    )
    if (result.success) {
      setRecords(prev => [result.data, ...prev])
      alert('File uploaded successfully!')
    } else {
      alert('Upload failed: ' + result.error)
    }
    setUploading(false)
  }

  const handleDeleteRecord = async (id, fileUrl) => {
    if (!window.confirm('Delete this record?')) return
    const result = await deleteMedicalRecord(id, fileUrl)
    if (result.success) setRecords(prev => prev.filter(r => r.id !== id))
  }

  const statusColor = (status) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-800'
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800'
    if (status === 'cancelled') return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <Link to="/doctors" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium flex items-center">
          <Plus className="h-5 w-5 mr-2" />New Appointment
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{currentUser?.name || 'Loading...'}</h3>
                <p className="text-gray-600 text-sm">{currentUser?.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'appointments' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                <Calendar className="h-5 w-5 mr-3" />My Appointments
              </button>
              <button onClick={() => setActiveTab('chats')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'chats' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                <MessageCircle className="h-5 w-5 mr-3" />My Chats
                {chats.length > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chats.length}
                  </span>
                )}
              </button>
              <button onClick={() => setActiveTab('prescriptions')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'prescriptions' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                <FileText className="h-5 w-5 mr-3" />Prescriptions
                {prescriptions.length > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {prescriptions.length}
                  </span>
                )}
              </button>
              <button onClick={() => setActiveTab('records')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'records' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                <Upload className="h-5 w-5 mr-3" />Medical Records
                {records.length > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {records.length}
                  </span>
                )}
              </button>
              <button onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                <User className="h-5 w-5 mr-3" />Profile
              </button>
              <button onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition text-red-600">
                <LogOut className="h-5 w-5 mr-3" />Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold">My Appointments ({appointments.length})</h2>
              </div>
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto"></div>
                </div>
              ) : appointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No appointments yet.</p>
                  <Link to="/doctors" className="text-red-600 font-medium hover:underline mt-2 inline-block">
                    Book your first appointment
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{appointment.doctor_name}</h3>
                          <div className="flex items-center space-x-6 mt-2">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />{appointment.date}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />{appointment.time}
                            </div>
                          </div>
                          {appointment.symptoms && (
                            <p className="text-gray-600 text-sm mt-2">Symptoms: {appointment.symptoms}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <p className="text-2xl font-bold mt-2">Rs. {appointment.fee}</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3 mt-4">
                        {appointment.status === 'pending' && (
                          <button onClick={() => handleCancel(appointment.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                            Cancel
                          </button>
                        )}
                        <button onClick={() => handleDelete(appointment.id)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center">
                          <Trash2 className="h-4 w-4 mr-1" />Delete
                        </button>
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
                <h2 className="text-xl font-bold">My Chats ({chats.length})</h2>
              </div>
              {chats.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No chats yet.</p>
                  <p className="text-sm mt-1">Book an appointment to start chatting with a doctor.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {chats.map(chat => (
                    <div key={chat.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-bold">Dr</span>
                        </div>
                        <div>
                          <p className="font-semibold">{chat.doctor_name}</p>
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

          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg px-6 py-4">
                <h2 className="text-xl font-bold">My Prescriptions ({prescriptions.length})</h2>
              </div>
              {prescriptions.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No prescriptions yet.</p>
                  <p className="text-sm mt-1">Your doctor will add prescriptions after your appointment.</p>
                </div>
              ) : (
                prescriptions.map(prescription => (
                  <PrescriptionCard key={prescription.id} prescription={prescription} />
                ))
              )}
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-4">
              {/* Upload Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Medical Records</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500"
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}>
                      <option>Lab Report</option>
                      <option>X-Ray</option>
                      <option>MRI Scan</option>
                      <option>CT Scan</option>
                      <option>Ultrasound</option>
                      <option>Prescription</option>
                      <option>Discharge Summary</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                    <input type="text" placeholder="e.g. Blood test results"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })} />
                  </div>
                </div>
                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition ${uploading ? 'border-gray-200 bg-gray-50' : 'border-red-300 bg-red-50 hover:bg-red-100'}`}>
                  <div className="flex flex-col items-center">
                    <Upload className={`h-8 w-8 mb-2 ${uploading ? 'text-gray-400' : 'text-red-500'}`} />
                    <p className="text-sm font-medium text-gray-700">
                      {uploading ? 'Uploading...' : 'Click to upload file'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleUpload} disabled={uploading} />
                </label>
              </div>

              {/* Records List */}
              {records.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
                  <File className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No medical records yet.</p>
                  <p className="text-sm mt-1">Upload your lab reports, scans and other documents.</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="font-bold">Uploaded Records ({records.length})</h3>
                  </div>
                  <div className="divide-y">
                    {records.map(record => (
                      <div key={record.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                            <File className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{record.file_name}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{record.category}</span>
                              <span className="text-xs text-gray-400">{record.file_size}</span>
                            </div>
                            {record.description && <p className="text-xs text-gray-500 mt-1">{record.description}</p>}
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(record.created_at).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <a href={record.file_url} target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                            <Download className="h-4 w-4" />
                          </a>
                          <button onClick={() => handleDeleteRecord(record.id, record.file_url)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" defaultValue={currentUser?.name}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" defaultValue={currentUser?.email} disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" defaultValue={currentUser?.phone}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500" />
                </div>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeChat && (
        <ChatWindow chat={activeChat} currentUser={currentUser} onClose={() => setActiveChat(null)} />
      )}
    </div>
  )
}

export default UserDashboard