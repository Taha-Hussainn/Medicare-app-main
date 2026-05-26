import { useState } from 'react'
import { Star, X } from 'lucide-react'
import { addReview, checkExistingReview } from '../api/reviews'

const TAGS = ['Knowledgeable', 'Professional', 'Caring', 'Punctual', 'Thorough', 'Patient', 'Effective', 'Friendly']

const AddReviewModal = ({ doctor, currentUser, onClose, onReviewAdded }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = async () => {
    if (rating === 0) { setError('Please select a rating'); return }
    if (!comment.trim()) { setError('Please write a comment'); return }
    if (!currentUser) { setError('Please login to submit a review'); return }

    setSubmitting(true)
    setError('')

    const alreadyReviewed = await checkExistingReview(doctor.id, currentUser.id)
    if (alreadyReviewed) {
      setError('You have already reviewed this doctor.')
      setSubmitting(false)
      return
    }

    const result = await addReview({
      doctorId: doctor.id,
      patientId: currentUser.id,
      patientName: currentUser.name,
      rating,
      comment,
      tags: selectedTags
    })

    if (result.success) {
      onReviewAdded(result.data)
      onClose()
    } else {
      setError(result.error)
    }
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Write a Review</h2>
            <p className="text-gray-600 text-sm mt-1">Share your experience with {doctor.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">Dr</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{doctor.name}</p>
              <p className="text-red-600 text-sm">{doctor.specialization}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110">
                  <Star className={`h-10 w-10 ${
                    star <= (hoverRating || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200'
                  }`} />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-gray-600 font-medium">
                  {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Experience</label>
            <textarea
              placeholder="Describe your experience with this doctor..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent h-32 resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className="text-gray-400 text-xs mt-1">{comment.length}/500 characters</p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Tags (Optional)</label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    selectedTags.includes(tag)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={submitting}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium transition disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddReviewModal