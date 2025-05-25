const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="fixed top-0 w-full bg-gray-900 border-b border-gray-800 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r cursor-pointer from-purple-600 to-blue-500 flex items-center justify-center text-white font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-10 h-10 text-purple-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 cursor-pointer ">MockSprint</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <span className="text-gray-400 px-3 py-2 text-sm font-medium cursor-pointer">
                Please login
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

