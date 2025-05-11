// app/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  // Navigation items
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'ECU', href: '/ecu' },
    { name: 'AIRBAG', href: '/airbag' },
    { name: 'DASHBOARD', href: '/dashboard' },
    { name: 'SOFTWARE', href: '/software' },
    { name: 'TOKENS', href: '/tokens' },
    { name: 'OTHER', href: '/other' },
  ];

  // Check if current path matches this nav item
  const isActive = (path: string) => {
    return pathname === path;
  };

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 bg-black border-b border-gray-800 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4">
        {/* Logo and Brand Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center py-4">
            <Link href="/" className="flex items-center">
              <span className="text-white text-3xl font-bold mr-2">AUTOTECHNO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-5 mx-1 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Auth Buttons - Desktop */}
            <div className="ml-4 flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/dashboard" 
                    className="text-gray-300 hover:text-white text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <div className="h-4 border-l border-gray-600"></div>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Button 
                  href="/auth/login" 
                  variant="primary" 
                  size="sm"
                >
                  Login / Sign Up
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {user && (
              <Link 
                href="/dashboard" 
                className="mr-4 text-gray-300 hover:text-white text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium ${
                  isActive(item.href)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Button - Mobile */}
            {!user ? (
              <Link
                href="/auth/login"
                className="block px-4 py-3 mt-2 text-sm font-medium bg-yellow-600 text-white hover:bg-yellow-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;