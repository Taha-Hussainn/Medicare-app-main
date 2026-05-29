import { useState } from 'react'
import { X, Plus, Trash2, FileText } from 'lucide-react'
import { createPrescription } from '../api/prescriptions'

const PrescriptionModal = ({ appointment, currentUser, onClose, onCreated }) => {
  const [diagnosis, setDiagnosis] = useState('')
  const [instructions, setInstructions] = useState('')
  const [followUpDate, setFollowUpDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: '', duration: '' }
  ])

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }])
  }

  const removeMedicine = (idx) => {
    setMedicines(medicines.filter((_, i) => i !== idx))
  }

  const updateMedicine = (idx, field, value) => {
    setMedicines(medicines.map((m, i) => i === idx ? { ...m, [field]: value } : m))
  }

  const handleSubmit = async () => {
    if (!diagnosis.trim()) { alert('Please enter a diagnosis'); return }
    const validMedicines = medicines.filter(m => m.name.trim())
    if (validMedicines.length === 0) { alert('Please add at least one medicine'); return }

    setSubmitting(true)
    const result = await createPrescription({
      appointmentId: appointment.id,
      patientId: appointment.patient_id,
      doctorId: currentUser.id,
      patientName: appointment.patient_name,
      doctorName: currentUser.name,
      diagnosis,
      medicines: validMedicines,
      instructions,
      followUpDate
    })

    if (result.success) {
      onCreated(result.data)
      onClose()
    } else {
      alert('Failed to create prescription: ' + result.error)
    }
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-red-600 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Write Prescription</h2>
              <p className="text-red-100 text-sm">Patient: {appointment.patient_name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Diagnosis */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Diagnosis *</label>
            <textarea
              placeholder="Enter diagnosis..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 h-24 resize-none"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          {/* Medicines */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">Medicines *</label>
              <button onClick={addMedicine}
                className="flex items-center text-sm text-red-600 hover:text-red-700 font-medium">
                <Plus className="h-4 w-4 mr-1" />Add Medicine
              </button>
            </div>
            <div className="space-y-3">
              {medicines.map((med, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Medicine Name</label>
                      <input type="text" placeholder="e.g. Paracetamol"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                        value={med.name}
                        onChange={(e) => updateMedicine(idx, 'name', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Dosage</label>
                      <input type="text" placeholder="e.g. 500mg"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                        value={med.dosage}
                        onChange={(e) => updateMedicine(idx, 'dosage', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Frequency</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                        value={med.frequency}
                        onChange={(e) => updateMedicine(idx, 'frequency', e.target.value)}>
                        <option value="">Select frequency</option>
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">Three times daily</option>
                        <option value="Four times daily">Four times daily</option>
                        <option value="As needed">As needed</option>
                        <option value="Before meals">Before meals</option>
                        <option value="After meals">After meals</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Duration</label>
                      <input type="text" placeholder="e.g. 7 days"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                        value={med.duration}
                        onChange={(e) => updateMedicine(idx, 'duration', e.target.value)} />
                    </div>
                  </div>
                  {medicines.length > 1 && (
                    <button onClick={() => removeMedicine(idx)}
                      className="flex items-center text-red-500 hover:text-red-700 text-sm">
                      <Trash2 className="h-3 w-3 mr-1" />Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
            <textarea
              placeholder="Any special instructions for the patient..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 h-20 resize-none"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          {/* Follow Up */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Follow-up Date (Optional)</label>
            <input type="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={submitting}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium disabled:opacity-50">
              {submitting ? 'Creating...' : 'Create Prescription'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionModal