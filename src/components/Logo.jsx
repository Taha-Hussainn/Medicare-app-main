// components/Logo.jsx
const Logo = ({ size = "medium" }) => {
  const sizes = {
    small: "h-8 w-8",
    medium: "h-10 w-10",
    large: "h-12 w-12"
  }

  return (
    <div className={`${sizes[size]} relative`}>
      {/* Main logo container */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-xl transform rotate-45"></div>
      
      {/* Plus symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-1/3 w-1 bg-white rounded-full transform -rotate-45"></div>
        <div className="absolute h-1 w-1/3 bg-white rounded-full transform -rotate-45"></div>
      </div>
      
      {/* Heart outline effect */}
      <div className="absolute inset-0 border-2 border-white/30 rounded-xl transform rotate-45"></div>
      
      {/* Pulse effect */}
      <div className="absolute -top-1 -right-1 h-3 w-3">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-0 bg-green-500 rounded-full"></div>
      </div>
    </div>
  )
}

export default Logo