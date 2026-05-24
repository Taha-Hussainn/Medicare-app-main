import { Link, useNavigate } from 'react-router-dom'
import { UserCircle2, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { logout } from '../api/auth'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentUser, setCurrentUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
    navigate('/login', { replace: true })
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="MediCare Logo"
                className="h-10 w-10 object-contain rounded-lg"
                style={{ mixBlendMode: 'multiply' }}
              />
              <span className="text-2xl font-bold text-red-600">MediCare</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/doctors" className="nav-link">Find Doctor</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to={
                    currentUser.userType === 'admin' ? '/admin-dashboard' :
                    currentUser.userType === 'doctor' ? '/doctor-dashboard' :
                    '/dashboard'
                  }
                  className="flex items-center text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg"
                >
                  <UserCircle2 className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Sign In</Link>
                <Link to="/signup" className="bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 p-2 hover:bg-gray-100 rounded-lg">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="mobile-link">Home</Link>
            <Link to="/doctors" onClick={() => setIsMenuOpen(false)} className="mobile-link">Find Doctor</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="mobile-link">About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="mobile-link">Contact</Link>

            <div className="pt-4 border-t">
              {currentUser ? (
                <>
                  <Link
                    to={
                      currentUser.userType === 'admin' ? '/admin-dashboard' :
                      currentUser.userType === 'doctor' ? '/doctor-dashboard' :
                      '/dashboard'
                    }
                    onClick={() => setIsMenuOpen(false)}
                    className="mobile-link"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false) }}
                    className="w-full text-left mobile-link"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mobile-link">Sign In</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}
                    className="block bg-red-600 text-white px-4 py-3 rounded-lg text-center">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar