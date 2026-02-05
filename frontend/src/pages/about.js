import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { settingsAPI } from '@/utils/api';
import { 
  FaCheckCircle, FaBullseye, FaEye, FaGraduationCap, 
  FaUsers, FaBuilding, FaAward, FaQuoteLeft 
} from 'react-icons/fa';

export default function AboutPage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await settingsAPI.get();
      setSettings(data.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = settings?.stats || {
    studentsPlaced: 5000,
    yearsExperience: 13,
    coursesOffered: 25,
    hiringPartners: 200
  };

  if (loading) {
    return (
      <Layout title="About Us">
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout title="About Us" description="Learn about RS Softtecs - Pune's leading IT Training & Placement Institute since 2011.">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-sm font-semibold rounded-full mb-4">
              Established 2011
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-accent-400">RS Softtecs</span>
            </h1>
            <p className="text-lg text-gray-200">
              Transforming careers through quality IT education and industry-oriented training since 2011.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pune&apos;s #1 IT Training & Placement Institute
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {settings?.aboutUs?.fullDescription || 
                  `Established in 2011, RS Softtecs Pvt Ltd has been at the forefront of IT education 
                  in Pune. We specialize in providing industry-oriented training that bridges the gap 
                  between academic knowledge and practical skills required in the IT industry.`
                }
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our comprehensive courses, experienced faculty, and strong placement support have 
                helped thousands of students launch successful careers in technology. We believe 
                that quality education should be accessible to everyone, and we are committed to 
                transforming lives through skill development.
              </p>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'ISO Certified Institute',
                  'Industry-Expert Faculty',
                  'Live Project Training',
                  '100% Placement Assistance',
                  'Affordable Fee Structure',
                  'Flexible Batch Timings'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: FaGraduationCap, value: `${stats.studentsPlaced}+`, label: 'Students Placed', color: 'from-primary-500 to-primary-700' },
                { icon: FaBuilding, value: `${stats.hiringPartners}+`, label: 'Hiring Partners', color: 'from-accent-400 to-accent-600' },
                { icon: FaAward, value: `${stats.coursesOffered}+`, label: 'Courses Offered', color: 'from-green-500 to-emerald-600' },
                { icon: FaUsers, value: `${stats.yearsExperience}+`, label: 'Years Experience', color: 'from-blue-500 to-blue-700' },
              ].map((stat, idx) => (
                <div key={idx} className={`card p-6 bg-gradient-to-br ${stat.color} text-white text-center`}>
                  <stat.icon className="text-4xl mx-auto mb-3 opacity-80" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 border-l-4 border-primary-600">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <FaBullseye className="text-2xl text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                {settings?.aboutUs?.mission || 
                  `To empower aspiring IT professionals with quality education, practical skills, 
                  and career guidance that transforms their lives and contributes to the technology 
                  industry. We strive to make quality IT education accessible and affordable to all.`
                }
              </p>
            </div>

            <div className="card p-8 border-l-4 border-accent-500">
              <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center mb-6">
                <FaEye className="text-2xl text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                {settings?.aboutUs?.vision || 
                  `To be the most trusted IT training institute in India, known for producing 
                  job-ready professionals who excel in their careers. We aim to be the bridge 
                  between education and employment in the technology sector.`
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12 bg-gradient-to-br from-primary-50 to-white border-primary-100">
              <FaQuoteLeft className="text-4xl text-primary-200 mb-6" />
              <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
                {settings?.aboutUs?.founderMessage || 
                  `"At RS Softtecs, we believe that quality education should be accessible to everyone. 
                  Our commitment to excellence, industry-relevant curriculum, and personalized attention 
                  sets us apart. We don't just teach technology; we shape careers and transform lives. 
                  Every student who walks through our doors is a future IT professional, and we take 
                  that responsibility seriously."`
                }
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  RS
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Rajendra Shinde</h4>
                  <p className="text-gray-600">Founder & CEO, RS Softtecs Pvt Ltd</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Us <span className="text-accent-400">Different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Industry-Expert Trainers',
                description: 'Learn from professionals with 10+ years of real-world experience in top IT companies.'
              },
              {
                title: 'Hands-on Learning',
                description: 'Work on live projects and build a portfolio that impresses employers.'
              },
              {
                title: 'Small Batch Size',
                description: 'Personalized attention with batch size of 15-20 students for better learning.'
              },
              {
                title: '100% Placement Support',
                description: 'Dedicated placement cell with 200+ hiring partners across India.'
              },
              {
                title: 'Affordable Fees',
                description: 'Quality education at competitive prices with easy EMI options available.'
              },
              {
                title: 'Flexible Timings',
                description: 'Morning, evening, and weekend batches to suit your schedule.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-accent-400">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your IT Career Journey Today</h2>
          <p className="text-xl text-white/90 mb-8">
            Join RS Softtecs and become part of our success story
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-white btn-lg">
              Book Free Counseling
            </Link>
            <Link href="/courses" className="btn bg-white/20 text-white hover:bg-white/30 btn-lg">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
