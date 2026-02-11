import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaExternalLinkAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        {/* Top Row: Company Info + Quick Links + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="RS Softtecs Solutions Pvt. Ltd."
                width={160}
                height={91}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Pune&apos;s #1 IT Training & Placement Institute since 2011. We transform careers through quality education and industry-relevant training.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/12FpWXUrb5S/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/rssofttecs?igsh=MWphMTJ3dHhpbGYxYw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/rs-softtecs/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://youtube.com/@rssofttecs?si=yVSXa3cakXQNeHaj" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
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

          {/* Head Office */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Head Office</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-accent-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  Office No 2, 4th Floor, Bhosale Shinde Arcade, JM Road, Near Deccan Bus Stop, Pune.
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/KeCcYoEwFwvMUAE66"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-400 hover:text-accent-300 text-xs transition-colors"
              >
                <FaExternalLinkAlt className="text-[10px]" /> View on Google Maps
              </a>
              <div className="space-y-2">
                <a href="tel:+919172101012" className="flex items-center gap-2 text-gray-400 hover:text-accent-400 text-sm transition-colors">
                  <FaPhone className="text-accent-400 text-xs flex-shrink-0" />
                  +91 9172 101 012
                </a>
                <a href="tel:+919172201101" className="flex items-center gap-2 text-gray-400 hover:text-accent-400 text-sm transition-colors">
                  <FaPhone className="text-accent-400 text-xs flex-shrink-0" />
                  +91 9172 201 101
                </a>
              </div>
            </div>
          </div>

          {/* Branch Office */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Branch Office</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-accent-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  Office No 29/B Wing, 4th Floor, Yashashree Park, Warje Malwadi Rd, Near Karve Nagar PMT Bus Stop, Karve Nagar, Pune.
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/LwTiZu5c2Ac9mWkB6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-400 hover:text-accent-300 text-xs transition-colors"
              >
                <FaExternalLinkAlt className="text-[10px]" /> View on Google Maps
              </a>
              <div className="space-y-2">
                <a href="tel:+919172011021" className="flex items-center gap-2 text-gray-400 hover:text-accent-400 text-sm transition-colors">
                  <FaPhone className="text-accent-400 text-xs flex-shrink-0" />
                  +91 9172 011 021
                </a>
                <a href="tel:+919172110012" className="flex items-center gap-2 text-gray-400 hover:text-accent-400 text-sm transition-colors">
                  <FaPhone className="text-accent-400 text-xs flex-shrink-0" />
                  +91 9172 110 012
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Email & Working Hours Row */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <a href="mailto:info@rssofttecs.com" className="flex items-center gap-3 text-gray-400 hover:text-accent-400 transition-colors">
            <FaEnvelope className="text-accent-400" />
            <span>info@rssofttecs.com</span>
          </a>
          <p className="text-sm text-gray-400">
            <strong className="text-white">Working Hours:</strong> Mon - Sat: 9 AM - 8 PM | Sunday: 10 AM - 2 PM
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} RS Softtecs Solutions Pvt. Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/919172011021"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:-translate-y-1 hover:shadow-xl transition-all z-40"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </footer>
  );
};

export default Footer;
