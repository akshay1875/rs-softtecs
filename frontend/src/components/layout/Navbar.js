import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/services', label: 'Services' },
    { href: '/team', label: 'Our Team' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/testimonials', label: 'Success Stories' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-primary-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent-400 transition-colors">
              <FaPhone className="text-accent-400" />
              <span>+91-9876543210</span>
            </a>
            <a href="mailto:info@rssofttecs.com" className="flex items-center gap-2 hover:text-accent-400 transition-colors">
              <FaEnvelope className="text-accent-400" />
              <span>info@rssofttecs.com</span>
            </a>
          </div>
          <div>
            <span className="text-gray-300">Since 2011 | Pune&apos;s #1 IT Training Institute</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-custom shadow-md py-2'
            : 'bg-white py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-bold font-display text-primary-700">
                RS Softtecs
              </span>
              <span className="text-xs text-gray-500 -mt-1">IT Training & Placement</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm ${isActive(link.href) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="/contact" className="btn btn-primary btn-sm">
                Enquire Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="btn btn-primary mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
