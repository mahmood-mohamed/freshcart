

// Start Rating Component
export default function StarRating({ rating }) {
    const percentage = (rating / 5) * 100;

  return (
    <div className="relative text-[22px] inline-block">
        <div className="text-gray-300">★★★★★</div>
        <div className="absolute top-0 left-0 overflow-hidden text-yellow-400"
             style={{ width: `${percentage}%` }}>
        ★★★★★
        </div>
    </div>  
  )
}
