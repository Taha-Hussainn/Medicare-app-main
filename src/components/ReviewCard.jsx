// components/ReviewCard.jsx
import { Star, User, Calendar, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'

const ReviewCard = ({ review, isOwner = false, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedReview, setEditedReview] = useState(review)

  const handleSave = () => {
    onEdit(editedReview)
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{review.patientName}</h3>
            <p className="text-sm text-gray-600">{review.patientCondition}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <div className="flex items-center text-gray-500 text-sm mt-2">
            <Calendar className="h-3 w-3 mr-1" />
            {review.date}
          </div>
        </div>
      </div>

      {isEditing ? (
        <div>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={editedReview.comment}
            onChange={(e) => setEditedReview({...editedReview, comment: e.target.value})}
            rows="3"
          />
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm text-gray-600">Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setEditedReview({...editedReview, rating: star})}
                  className="text-xl"
                >
                  {star <= editedReview.rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-700 mb-4">{review.comment}</p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {review.tags?.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            {isOwner && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ReviewCard