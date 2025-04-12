// Navbar.jsx

// Navigation bar for branding and page title
export default function Navbar() {
  return (
    <nav className="bg-white  text-gray-800 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
        {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <svg 
              className="w-7 h-7 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-xl font-bold">HiddenPixels</span>
          </div>
          {/* App subtitle */}
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline text-sm">Secure Message Encoding</span>
            <span className="text-blue-600">•</span>
            <span className="text-sm font-medium">Steganography Tool</span>
            
          </div>
        </div>
      </div>
    </nav>
  );
}
