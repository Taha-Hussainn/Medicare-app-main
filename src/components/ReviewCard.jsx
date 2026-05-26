import { Star, User, Calendar } from 'lucide-react'

const ReviewCard = ({ review }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-PK', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
            <span className="text-red-600 font-bold text-lg">
              {review.patient_name?.charAt(0)?.toUpperCase() || 'P'}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.patient_name || 'Anonymous'}</h4>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(review.created_at)}
            </div>
          </div>
        </div>
        <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
          <Star className="h-4 w-4 text-amber-400 fill-current mr-1" />
          <span className="font-bold text-amber-600">{review.rating}</span>
        </div>
      </div>

      {/* Star Rating Visual */}
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

      {/* Tags */}
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {review.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-100">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewCard