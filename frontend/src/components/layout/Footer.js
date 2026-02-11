import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaExternalLinkAlt } from 'react-icons/fa';

const Footer = () => {
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

          {/* Office Addresses */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Office Addresses</h4>
            <div className="space-y-6">
              {/* Head Office */}
              <div>
                <h5 className="text-accent-400 font-semibold text-sm mb-2">Head Office - Deccan, Pune</h5>
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="text-accent-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Office No 2, 4th Floor, Bhosale Shinde Arcade, JM Road, Near Deccan Bus Stop, Pune.
                    </p>
                    <a
                      href="https://maps.app.goo.gl/KeCcYoEwFwvMUAE66"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 text-xs mt-1 transition-colors"
                    >
                      View on Google Maps <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                    <div className="mt-2 space-y-1">
                      <a href="tel:+919172101012" className="block text-gray-400 hover:text-accent-400 text-sm transition-colors">
                        <FaPhone className="inline mr-2 text-accent-400 text-xs" />+91 9172 101 012
                      </a>
                      <a href="tel:+919172201101" className="block text-gray-400 hover:text-accent-400 text-sm transition-colors">
                        <FaPhone className="inline mr-2 text-accent-400 text-xs" />+91 9172 201 101
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Office */}
              <div>
                <h5 className="text-accent-400 font-semibold text-sm mb-2">Branch - Karvenagar, Pune</h5>
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="text-accent-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Office No 29/B Wing, 4th Floor, Yashashree Park, Warje Malwadi Rd, Near Karve Nagar PMT Bus Stop, Karve Nagar, Pune.
                    </p>
                    <a
                      href="https://maps.app.goo.gl/LwTiZu5c2Ac9mWkB6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 text-xs mt-1 transition-colors"
                    >
                      View on Google Maps <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                    <div className="mt-2 space-y-1">
                      <a href="tel:+919172011021" className="block text-gray-400 hover:text-accent-400 text-sm transition-colors">
                        <FaPhone className="inline mr-2 text-accent-400 text-xs" />+91 9172 011 021
                      </a>
                      <a href="tel:+919172110012" className="block text-gray-400 hover:text-accent-400 text-sm transition-colors">
                        <FaPhone className="inline mr-2 text-accent-400 text-xs" />+91 9172 110 012
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
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
