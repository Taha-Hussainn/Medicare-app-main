import { useState, useEffect } from 'react'
import { Users, Stethoscope, Calendar, DollarSign, LogOut, Shield, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getAllDoctors, deleteDoctor } from '../api/doctors'
import { getAllAppointments, updateAppointmentStatus } from '../api/appointments'
import { useAuth } from '../context/AuthContext'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('doctors')
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getAllDoctors().then(data => setDoctors(data || []))
    getAllAppointments().then(result => {
      if (result.success) setAppointments(result.data)
      setLoading(false)
    })
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleStatusChange = async (id, status) => {
    const result = await updateAppointmentStatus(id, status)
    if (result.success) setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Remove this doctor from the platform?')) return
    const result = await deleteDoctor(id)
    if (result.success) {
      setDoctors(prev => prev.filter(d => d.id !== id))
    } else {
      alert('Failed to delete: ' + result.error)
    }
  }

  const stats = {
    totalDoctors: doctors.length,
    totalAppointments: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    totalRevenue: appointments
      .filter(a => a.status === 'confirmed')
      .reduce((sum, a) => sum + (a.fee || 0), 0)
  }

  const statusColor = (status) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-800'
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800'
    if (status === 'cancelled') return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage MediCare platform</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg">
            <Shield className="h-5 w-5 mr-2" />Administrator
          </div>
          <button onClick={handleLogout}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-red-600">
            <LogOut className="h-4 w-4 mr-2" />Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold">{stats.totalDoctors}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Stethoscope className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold">{stats.totalAppointments}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue (Confirmed)</p>
              <p className="text-2xl font-bold">Rs. {stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold">Admin</h3>
                <p className="text-gray-600 text-sm">Administrator</p>
              </div>
            </div>
            <nav className="space-y-2">
              {[
                { key: 'doctors', label: 'Manage Doctors', icon: <Stethoscope className="h-5 w-5 mr-3" /> },
                { key: 'appointments', label: 'All Appointments', icon: <Calendar className="h-5 w-5 mr-3" /> },
              ].map(item => (
                <button key={item.key} onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition ${activeTab === item.key ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'}`}>
                  {item.icon}{item.label}
                </button>
              ))}
              <button onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition text-red-600">
                <LogOut className="h-5 w-5 mr-3" />Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'doctors' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold">Doctors ({doctors.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experience</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {doctors.map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.hospital}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-red-600 font-medium">{doctor.specialization}</span>
                        </td>
                        <td className="px-6 py-4">{doctor.experience} years</td>
                        <td className="px-6 py-4">Rs. {doctor.fee}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteDoctor(doctor.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 flex items-center">
                            <Trash2 className="h-3 w-3 mr-1" />Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-bold">All Appointments ({appointments.length})</h2>
              </div>
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto"></div>
                </div>
              ) : appointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No appointments yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium">{apt.patient_name}</div>
                            <div className="text-sm text-gray-500">{apt.patient_email}</div>
                          </td>
                          <td className="px-6 py-4">{apt.doctor_name}</td>
                          <td className="px-6 py-4">
                            <div>{apt.date}</div>
                            <div className="text-sm text-gray-500">{apt.time}</div>
                          </td>
                          <td className="px-6 py-4">Rs. {apt.fee}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColor(apt.status)}`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              {apt.status === 'pending' && (
                                <button onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                  className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                                  Confirm
                                </button>
                              )}
                              {apt.status !== 'cancelled' && (
                                <button onClick={() => handleStatusChange(apt.id, 'cancelled')}
                                  className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard