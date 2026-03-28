import StarRating from '../StarRating/StarRating'

export default function ReviewsSection({ review }) {
  const name = review?.user?.name || 'Unknown User';
  const initials = name.substring(0, 2).toUpperCase();
  const date = review?.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className='flex flex-col justify-between h-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 mx-3 my-4 relative overflow-hidden group'>
      {/* Decorative Quote Mark */}
      <div className="absolute top-4 right-4 text-green-50 opacity-50 group-hover:text-green-100 group-hover:scale-110 transition-all duration-300 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-16 h-16">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <div className='mb-2 relative z-10'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center flex-wrap gap-4'>
            <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center text-white shadow-md'>
              <span className='font-bold text-lg tracking-wider'>{initials}</span>
            </div>
            <div className='flex flex-col'>
              <h4 className='font-bold text-gray-800 capitalize leading-tight'>{name}</h4>
              <p className='text-xs text-gray-500 mt-0.5 leading-tight italic'>{date}</p>
            </div>
          </div>
        </div>

        <div className='mb-2 flex items-center gap-2'>
           <StarRating rating={review.rating} />
           <span className='text-sm font-bold text-yellow-800 ms-1'>({review.rating.toFixed(1)})</span>
        </div>

        <p className='text-gray-700 leading-relaxed '>
          "{review.review}"
        </p>
      </div>
    </div>
  )
}
