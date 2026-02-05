import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '@/context/AuthContext';
import { 
  FaHome, FaBook, FaStar, FaUsers, FaComments, FaEnvelope,
  FaCog, FaSignOutAlt, FaBars, FaTimes, FaChevronDown
} from 'react-icons/fa';

const AdminLayout = ({ children, title }) => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: FaHome },
    { href: '/admin/courses', label: 'Courses', icon: FaBook },
    { href: '/admin/reviews', label: 'Google Reviews', icon: FaStar },
    { href: '/admin/testimonials', label: 'Testimonials', icon: FaComments },
    { href: '/admin/enquiries', label: 'Enquiries', icon: FaEnvelope },
    { href: '/admin/team', label: 'Team Members', icon: FaUsers },
    { href: '/admin/settings', label: 'Settings', icon: FaCog },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return router.pathname === href;
    }
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} | Admin Panel` : 'Admin Panel'} - RS Softtecs</title>
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Link href="/admin" className="flex flex-col">
              <span className="text-xl font-bold text-white">RS Softtecs</span>
              <span className="text-xs text-gray-400">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="py-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar-link ${isActive(item.href) ? 'active' : ''}`}
              >
                <item.icon className="text-lg" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
          {/* Top Bar */}
          <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hidden lg:block text-gray-600 hover:text-gray-900"
                >
                  <FaBars />
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-gray-600 hover:text-gray-900"
                >
                  {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
                <h1 className="text-xl font-semibold text-gray-900">{title || 'Dashboard'}</h1>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/" target="_blank" className="text-sm text-primary-600 hover:text-primary-700">
                  View Website
                </Link>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden border-t bg-white">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-6 py-3 ${
                      isActive(item.href) ? 'bg-primary-50 text-primary-600' : 'text-gray-600'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default AdminLayout;
