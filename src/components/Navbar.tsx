import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/templates", label: "TEMPLATES" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full border-b fixed top-0 bg-white/80 backdrop-blur-sm z-50"
      >
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full relative">
             {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/public\Occupation-business-portfolio-icon-Graphics-35104847-1-removebg-preview.png" // Update this with your image path
                  alt="Portfolio Express Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold hidden sm:inline-block">
                Portfolio Express
              </span>
            </Link>

            {/* Centered Navigation */}
            <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="relative px-2 py-1 text-sm font-medium"
                      onMouseEnter={() => setHoveredLink(link.path)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className="relative z-10">{link.label}</span>
                      
                      {/* Hover Effect */}
                      {hoveredLink === link.path && (
                        <motion.div
                          layoutId="hoverBackground"
                          className="absolute inset-0 bg-primary/10 rounded-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                      
                      {/* Active Indicator */}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

           {/* Right Section */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/templates"
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors block"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Spacer div to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
