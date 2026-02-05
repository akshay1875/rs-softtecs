import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { coursesAPI } from '@/utils/api';
import { 
  FaClock, FaChartLine, FaCheckCircle, FaArrowLeft, 
  FaGraduationCap, FaLaptopCode, FaCertificate, FaUsers 
} from 'react-icons/fa';

export default function CourseDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  const fetchCourse = async () => {
    try {
      const { data } = await coursesAPI.getOne(slug);
      setCourse(data.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout title="Course Not Found">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
            <p className="text-gray-600 mb-6">The course you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/courses" className="btn btn-primary">
              <FaArrowLeft /> Back to Courses
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={course.name} description={course.shortDescription || course.description}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link href="/courses" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6">
            <FaArrowLeft /> Back to Courses
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="badge bg-white/20 text-white capitalize">{course.category?.replace('-', ' ')}</span>
                <span className="badge bg-accent-500 text-white capitalize">{course.level}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.name}</h1>
              <p className="text-lg text-gray-200 mb-6">{course.shortDescription || course.description}</p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <FaClock className="text-accent-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-accent-400" />
                  <span>{course.studentsEnrolled || 100}+ Enrolled</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn btn-accent btn-lg">
                  Enroll Now
                </Link>
                <Link href="/contact" className="btn btn-white btn-lg">
                  Download Syllabus
                </Link>
              </div>
            </div>

            {/* Course Card */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${course.icon || 'fas fa-laptop-code'} text-3xl text-white`} />
                  </div>
                  <h3 className="text-2xl font-bold">{course.name}</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Level</span>
                    <span className="font-semibold capitalize">{course.level}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold capitalize">{course.category?.replace('-', ' ')}</span>
                  </div>
                </div>

                <Link href="/contact" className="btn btn-primary w-full">
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description }} />
              </div>

              {/* Syllabus */}
              {course.syllabus && course.syllabus.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
                  <div className="space-y-4">
                    {course.syllabus.map((module, idx) => (
                      <div key={idx} className="card p-6">
                        <h3 className="text-lg font-semibold text-primary-700 mb-3">
                          Module {idx + 1}: {module.title}
                        </h3>
                        <ul className="space-y-2">
                          {module.topics?.map((topic, topicIdx) => (
                            <li key={topicIdx} className="flex items-center gap-2 text-gray-600">
                              <FaCheckCircle className="text-green-500 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <FaCheckCircle className="text-primary-500 flex-shrink-0" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Features */}
              {course.features && course.features.length > 0 && (
                <div className="card p-6 mb-6">
                  <h3 className="text-lg font-bold mb-4">What You Get</h3>
                  <ul className="space-y-3">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaCheckCircle className="text-green-500 text-sm" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why This Course */}
              <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <h3 className="text-lg font-bold text-primary-800 mb-4">Why Choose This Course?</h3>
                <div className="space-y-4">
                  {[
                    { icon: FaGraduationCap, text: 'Industry-Expert Trainers' },
                    { icon: FaLaptopCode, text: 'Hands-on Project Work' },
                    { icon: FaCertificate, text: 'Certificate on Completion' },
                    { icon: FaUsers, text: '100% Placement Support' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <item.icon className="text-primary-600" />
                      <span className="text-primary-800">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Master {course.name}?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful students. Start your journey today!
          </p>
          <Link href="/contact" className="btn btn-white btn-lg">
            Enroll Now - Limited Seats
          </Link>
        </div>
      </section>
    </Layout>
  );
}
