import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold font-display text-white">RS Softtecs</span>
              <span className="block text-sm text-gray-400">Pvt Ltd</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Pune&apos;s #1 IT Training & Placement Institute since 2011. We transform careers through quality education and industry-relevant training.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/courses', label: 'Our Courses' },
                { href: '/services', label: 'Services' },
                { href: '/testimonials', label: 'Success Stories' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-accent-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              {[
                'Full Stack Java',
                'Python Development',
                'MERN Stack',
                'Data Science & ML',
                'AWS Cloud',
                'Software Testing',
              ].map((course) => (
                <li key={course}>
                  <Link href="/courses" className="text-gray-400 hover:text-accent-400 transition-colors">
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-accent-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Office No. 123, IT Park Road,<br />
                  Hinjewadi, Pune - 411057
                </span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-accent-400 transition-colors">
                  <FaPhone className="text-accent-400" />
                  <span>+91-9876543210</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@rssofttecs.com" className="flex items-center gap-3 text-gray-400 hover:text-accent-400 transition-colors">
                  <FaEnvelope className="text-accent-400" />
                  <span>info@rssofttecs.com</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Working Hours:</strong><br />
                Mon - Sat: 9 AM - 8 PM<br />
                Sunday: 10 AM - 2 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} RS Softtecs Pvt Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg shadow-lg flex items-center justify-center hover:-translate-y-1 transition-transform z-40"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
