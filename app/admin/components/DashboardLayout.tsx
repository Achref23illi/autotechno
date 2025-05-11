// app/admin/components/DashboardLayout.tsx
'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
//import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
  badge?: number;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!user) {
      router.push('/admin/login');
    }
  }, [user, router]);

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      badge: 5
    },
    {
      name: 'File Management',
      href: '/admin/files',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      badge: 3
    },
    {
      name: 'Token Management',
      href: '/admin/tokens',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      name: 'Functionalities',
      href: '/admin/functionalities',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  if (!user) {
    return null; // Don't render while checking authentication
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for desktop */}
      <motion.div
        className="hidden md:flex md:flex-shrink-0"
        initial={{ width: 0 }}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col transition-all duration-300 ease-in-out`}>
          {/* Sidebar component */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-gradient-to-br from-yellow-600 via-yellow-700 to-amber-800 shadow-xl rounded-r-xl">
            <div className={`flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center'} flex-shrink-0`}>
              {isSidebarOpen ? (
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-white text-2xl font-bold tracking-tight">AUTOTECHNO</span>
                    <span className="bg-yellow-500 text-yellow-900 text-xs px-1.5 py-0.5 ml-2 font-bold rounded-md uppercase">Admin</span>
                  </div>
                  <div className="h-1 w-32 bg-gradient-to-r from-yellow-500 to-transparent rounded-full mt-1"></div>
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-yellow-500 ring-2 ring-yellow-300 shadow-lg flex items-center justify-center">
                  <span className="text-yellow-900 text-lg font-bold">AT</span>
                </div>
              )}
            </div>

            {/* User profile section at top */}
            <div className={`mt-8 ${isSidebarOpen ? 'px-4' : 'px-2 text-center'} pb-4`}>
              <div className={`flex ${isSidebarOpen ? 'items-center' : 'flex-col items-center'} ${isSidebarOpen ? 'space-x-3' : 'space-y-1'}`}>
                <div className={`flex-shrink-0 ${!isSidebarOpen && 'mb-1'}`}>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 ring-2 ring-white/20 shadow-lg flex items-center justify-center text-white text-lg font-semibold">
                    {user.name?.charAt(0) || 'A'}
                  </div>
                </div>
                {isSidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-yellow-200 truncate">{user.email}</p>
                  </div>
                )}
              </div>

              {isSidebarOpen && (
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 py-1 px-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-100 text-xs rounded flex items-center justify-center transition-colors">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>
                  <button className="flex-1 py-1 px-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-100 text-xs rounded flex items-center justify-center transition-colors">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                </div>
              )}
            </div>

            <div className="mt-2 mx-4">
              <div className="border-b border-yellow-500/30"></div>
            </div>

            <nav className="mt-5 flex-1 px-3 space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center ${isSidebarOpen ? 'px-3 py-2.5' : 'px-2 py-3 justify-center'} text-sm font-medium rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'bg-gradient-to-r from-yellow-500/30 to-yellow-500/20 text-white shadow-sm'
                        : 'text-yellow-100 hover:bg-yellow-500/20 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-yellow-400 rounded-r-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <div className={`${isActive ? 'text-yellow-400' : 'text-yellow-300 group-hover:text-yellow-400'} ${isSidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 transition-colors`}>
                      {item.icon}
                    </div>
                    {isSidebarOpen && (
                      <span className="flex-1">{item.name}</span>
                    )}
                    {isSidebarOpen && item.badge && (
                      <span className="bg-yellow-500 text-yellow-900 ml-auto inline-block py-0.5 px-1.5 text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {!isSidebarOpen && item.badge && (
                      <span className="absolute -top-0.5 -right-0.5 bg-yellow-500 text-yellow-900 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full ring-2 ring-yellow-700">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Logout button at bottom */}
            <div className={`mt-auto pt-2 pb-3 px-3`}>
              <div className="border-t border-yellow-500/30 mb-3"></div>
              <button
                onClick={handleLogout}
                className={`w-full group flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} px-3 py-2.5 text-sm font-medium rounded-lg
                text-yellow-100 hover:bg-red-500/20 hover:text-white transition-colors`}
              >
                {isSidebarOpen && <span>Logout</span>}
                <svg className={`h-5 w-5 text-red-400 group-hover:text-red-300 ${!isSidebarOpen && 'mx-auto'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 flex z-40 md:hidden"
            style={{ width: '16rem' }}
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-br from-yellow-600 via-yellow-700 to-amber-800 shadow-2xl">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-white text-2xl font-bold tracking-tight">AUTOTECHNO</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="bg-yellow-500 text-yellow-900 text-xs px-1.5 py-0.5 font-bold rounded-md uppercase">Admin Panel</span>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-yellow-500/50 to-transparent rounded-full ml-2"></div>
                    </div>
                  </div>
                </div>

                {/* User profile section */}
                <div className="mt-6 px-4 pb-4">
                  <div className="flex items-center space-x-3 bg-yellow-600/30 p-3 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 ring-2 ring-white/20 shadow-lg flex items-center justify-center text-white text-lg font-semibold">
                        {user.name?.charAt(0) || 'A'}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{user.name}</p>
                      <p className="text-xs text-yellow-200 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 py-1.5 px-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-100 text-xs rounded-md flex items-center justify-center transition-colors">
                      <svg className="h-3.5 w-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </button>
                    <button className="flex-1 py-1.5 px-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-100 text-xs rounded-md flex items-center justify-center transition-colors">
                      <svg className="h-3.5 w-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </button>
                  </div>
                </div>

                <div className="mt-1 mx-4">
                  <div className="border-b border-yellow-500/30"></div>
                </div>

                <nav className="mt-4 px-2 space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                          isActive
                            ? 'bg-gradient-to-r from-yellow-500/30 to-yellow-500/20 text-white shadow-sm'
                            : 'text-yellow-100 hover:bg-yellow-500/20 hover:text-white'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicatorMobile"
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-yellow-400 rounded-r-full"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <div className={`mr-3 flex-shrink-0 ${isActive ? 'text-yellow-400' : 'text-yellow-300 group-hover:text-yellow-400'}`}>
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="bg-yellow-500 text-yellow-900 ml-auto inline-block py-0.5 px-1.5 text-xs font-bold rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 px-3 py-4">
                <div className="border-t border-yellow-500/30 mb-3"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-yellow-100 bg-red-500/10 hover:bg-red-500/20 hover:text-white rounded-lg transition-colors"
                >
                  <span>Logout</span>
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
          <button
            type="button"
            className="flex items-center justify-center h-16 px-4 border-r border-gray-200 text-gray-500 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 md:hidden transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            type="button"
            className="flex items-center justify-center h-16 px-4 border-r border-gray-200 text-gray-500 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 hidden md:inline-flex transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="sr-only">Toggle sidebar</span>
            {isSidebarOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>

          <div className="flex-1 px-4 flex items-center justify-between">
            <div className="flex-1 flex">
              <div className={`relative w-full max-w-lg transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-yellow-500 rounded-lg' : ''}`}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className={`h-5 w-5 ${isSearchFocused ? 'text-yellow-600' : 'text-gray-400'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search-field"
                    className="block w-full rounded-lg pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-0 focus:border-yellow-500 text-gray-900 placeholder-gray-500 sm:text-sm transition-colors"
                    placeholder="Search files, customers, or orders..."
                    type="search"
                    name="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchTerm && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setSearchTerm('')}
                      aria-label="Clear search"
                    >
                      <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="ml-auto flex items-center">
              {/* Quick actions */}
              <div className="hidden md:flex space-x-3 mr-6">
                <button className="text-sm text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 px-3 py-1.5 rounded-md transition-colors flex items-center">
                  <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New User
                </button>
                <button className="text-sm text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 px-3 py-1.5 rounded-md transition-colors flex items-center">
                  <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload
                </button>
              </div>

              {/* Icon buttons container */}
              <div className="flex items-center space-x-3 mr-4 border-r border-gray-200 pr-4">
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 rounded-lg text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors">
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500 animation-pulse"></span>
                  </button>
                </div>

                {/* Help */}
                <button className="p-2 rounded-lg text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors">
                  <span className="sr-only">Help</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>

                {/* Settings */}
                <button className="p-2 rounded-lg text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors">
                  <span className="sr-only">Settings</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              {/* User profile dropdown */}
              <div className="relative">
                <button className="flex items-center focus:outline-none group">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center text-white text-sm font-semibold ring-2 ring-transparent group-hover:ring-yellow-200 transition-all">
                      {user.name?.charAt(0) || 'A'}
                    </div>
                    <div className="hidden lg:flex lg:flex-col lg:ml-2.5 lg:items-start">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-700 transition-colors">{user.name?.split(' ')[0] || 'Admin'}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Administrator</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animation-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}