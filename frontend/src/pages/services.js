import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { 
  FaChalkboardTeacher, FaBriefcase, FaBuilding, FaUserTie,
  FaLaptopCode, FaFileAlt, FaHandshake, FaCertificate,
  FaCheckCircle, FaArrowRight
} from 'react-icons/fa';

export default function ServicesPage() {
  const services = [
    {
      icon: FaChalkboardTeacher,
      title: 'IT Training',
      description: 'Comprehensive IT training programs covering the latest technologies demanded by the industry.',
      features: [
        'Expert-led classroom training',
        'Hands-on practical sessions',
        'Real-world project experience',
        'Updated curriculum',
        'Small batch sizes',
        'Doubt-clearing sessions'
      ],
      color: 'from-primary-500 to-primary-700'
    },
    {
      icon: FaBriefcase,
      title: 'Placement Assistance',
      description: '100% placement support with dedicated placement cell and industry connections.',
      features: [
        '200+ hiring partners',
        'Resume building support',
        'Mock interviews',
        'Aptitude training',
        'Soft skills development',
        'Direct campus placements'
      ],
      color: 'from-accent-400 to-accent-600'
    },
    {
      icon: FaBuilding,
      title: 'Corporate Training',
      description: 'Customized training programs for corporates to upskill their workforce.',
      features: [
        'Customized curriculum',
        'On-site / Online training',
        'Flexible scheduling',
        'Industry best practices',
        'Progress tracking',
        'Certification programs'
      ],
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: FaUserTie,
      title: 'One-to-One Mentorship',
      description: 'Personalized mentoring sessions for focused learning and career guidance.',
      features: [
        'Personal career counseling',
        'Customized learning path',
        'Flexible timings',
        'Dedicated mentor',
        'Regular progress reviews',
        'Interview preparation'
      ],
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const additionalServices = [
    { icon: FaLaptopCode, title: 'Internship Programs', description: 'Gain practical experience with our industry internship programs.' },
    { icon: FaFileAlt, title: 'Resume Building', description: 'Professional resume writing and optimization services.' },
    { icon: FaHandshake, title: 'Industry Connect', description: 'Direct interaction with industry professionals and hiring managers.' },
    { icon: FaCertificate, title: 'Certification Prep', description: 'Preparation for industry-recognized certifications.' },
  ];

  return (
    <Layout title="Our Services" description="Explore our IT training, placement assistance, corporate training, and mentorship services.">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-sm font-semibold rounded-full mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive <span className="text-accent-400">Services</span> for Your Success
            </h1>
            <p className="text-lg text-gray-200">
              From training to placement, we offer end-to-end services to help you build a successful IT career.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="card overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    <service.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className="inline-flex items-center gap-2 text-primary-600 font-semibold mt-6 group-hover:gap-3 transition-all">
                    Learn More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <span className="section-tag">Additional Services</span>
            <h2 className="section-title">More Ways We Help You Succeed</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, idx) => (
              <div key={idx} className="card card-hover p-6 text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <span className="section-tag">Our Process</span>
            <h2 className="section-title">Your Journey to Success</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Counseling', description: 'Free career counseling to identify the right course for you' },
              { step: '02', title: 'Training', description: 'Industry-oriented training with hands-on project experience' },
              { step: '03', title: 'Preparation', description: 'Interview preparation, resume building, and soft skills training' },
              { step: '04', title: 'Placement', description: 'Job placement support with our 200+ hiring partners' },
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="text-6xl font-bold text-primary-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-primary-200">
                    <FaArrowRight className="text-2xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8">
            Get in touch with us for a free career counseling session
          </p>
          <Link href="/contact" className="btn btn-accent btn-lg">
            Book Free Counseling
          </Link>
        </div>
      </section>
    </Layout>
  );
}
