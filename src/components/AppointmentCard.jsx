import { Calendar, Clock, User, MapPin } from 'lucide-react'

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{appointment.doctorName}</h3>
          <p className="text-red-600">{appointment.specialization}</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              {appointment.date}
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              {appointment.time}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
          appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {appointment.status}
        </span>
      </div>
    </div>
  )
}

export default AppointmentCard