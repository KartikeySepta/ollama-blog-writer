import { useState, useRef, useEffect } from "react";
import { Outlet, Link,useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { useUser } from "./context/UserContext";

const Layout = () => {
  const { user, setUser } = useUser();
  const [openMenu, setOpenMenu] = useState(null); // "main" or "profile" or null
  const navigate = useNavigate();

  const profileMenuRef = useRef();
  const mainMenuRef = useRef();

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setOpenMenu(prev => (prev === "profile" ? null : "profile"));
  };

  // Toggle main menu
  const toggleMainMenu = () => {
    setOpenMenu(prev => (prev === "main" ? null : "main"));
  };

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target) &&
        mainMenuRef.current &&
        !mainMenuRef.current.contains(e.target)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12 px-4">
          
          {/* Left: Menu icon & logo */}
          <div className="flex items-center gap-3">
            {/* Menu toggle */}
            <div className="relative md:hidden" ref={mainMenuRef}>
              <button
                onClick={toggleMainMenu}
                className="flex items-center gap-1 text-base font-bold italic font-fancy focus:outline-none"
              >
                <i className="bx bx-menu text-2xl"></i>
              </button>
              {openMenu === "main" && (
                <div className="absolute left-0 top-10 bg-white border border-gray-200 rounded shadow-md w-40 z-50">
                  <button onClick={() => {
                          navigate("/");
                          setOpenMenu(null);
                        }} className="block px-4 py-2 hover:bg-gray-100">Home</button>
                  <button onClick={() => {
                          navigate("/about");
                          setOpenMenu(null);
                        }} className="block px-4 py-2 hover:bg-gray-100">About</button>
                  <button onClick={() => {
                          navigate("/founder");
                          setOpenMenu(null);
                        }} className="block px-4 py-2 hover:bg-gray-100">Founder</button>
                  <button onClick={() => {
                          navigate("/bug-report");
                          setOpenMenu(null);
                        }} className="block px-4 py-2 hover:bg-gray-100">Report Bug</button>
                  <button onClick={() => {
                          navigate("/help-faq");
                          setOpenMenu(null);
                        }} className="block px-4 py-2 hover:bg-gray-100">Help / FAQ</button>
                </div>
              )}
            </div>
            {/* Logo & About */}
            <Link to="/" className="font-bold text-lg">Sārathi</Link>
            <Link to="/about" className="text-0.5xl md:text-1.5xl lg:text-2.5xl font-bold font-fancy">
              About
            </Link>
          </div>

          {/* Right: Login or profile */}
          <div className="flex items-center gap-4 text-sm">
            
            {/* Profile toggle (always show, changes text) */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-1 font-bold italic"
              >
                <i className="bx bx-user text-xl"></i>
                {user ? user.initials : "Guest"}
              </button>
              {openMenu === "profile" && (
                <div className="absolute right-0 top-10 bg-white border rounded shadow-md w-40 z-50">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/log-in");
                          setOpenMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          navigate("/sign-up");
                          setOpenMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Sign Up
                      </button>

                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-300 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-xs md:text-1.5xs lg:text-2.5xs text-gray-500">
            <div className="flex items-center flex-wrap gap-2.5 md:gap-4">
              <span>© 2025 Sārathi</span>
              <Link to="/help-faq" className="block hover:text-blue-600">help</Link>
              <a href="#" className="block hover:text-blue-600">privacy</a>
              <a href="#" className="block hover:text-blue-600">terms</a>
              <a href="#" className="hover:text-blue-600">advertise</a>
            </div>
            <div className="text-0.5xs md:text-2xs lg:text-3xs text-gray-400">
              powered by OLLAMA • Reddit API • RSS feeds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
