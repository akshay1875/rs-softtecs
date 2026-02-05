import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { testimonialsAPI } from '@/utils/api';
import { FaGraduationCap, FaBriefcase, FaRupeeSign } from 'react-icons/fa';

export default function TestimonialsPage() {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await testimonialsAPI.getAll();
      setTestimonials(data.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get featured testimonials
  const featuredTestimonials = testimonials.filter(t => t.isFeatured);
  const otherTestimonials = testimonials.filter(t => !t.isFeatured);

  if (loading) {
    return (
      <Layout title="Success Stories">
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout title="Success Stories" description="Read success stories of our students who transformed their careers with RS Softtecs.">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-sm font-semibold rounded-full mb-4">
              Success Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Student <span className="text-accent-400">Success Stories</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Read inspiring stories from our students who transformed their careers 
              and landed their dream jobs after training with us.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <FaGraduationCap className="text-3xl text-accent-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm text-gray-300">Students Placed</div>
              </div>
              <div className="text-center">
                <FaBriefcase className="text-3xl text-accent-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-gray-300">Companies</div>
              </div>
              <div className="text-center">
                <FaRupeeSign className="text-3xl text-accent-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">8 LPA</div>
                <div className="text-sm text-gray-300">Highest Package</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Success Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <TestimonialCard 
                  key={testimonial._id} 
                  testimonial={testimonial}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials */}
      <section className="section">
        <div className="container mx-auto px-4">
          {featuredTestimonials.length > 0 && (
            <h2 className="text-2xl font-bold mb-8 text-center">More Success Stories</h2>
          )}
          
          {testimonials.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-600">Success stories coming soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(featuredTestimonials.length > 0 ? otherTestimonials : testimonials).map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Be Our Next Success Story!</h2>
          <p className="text-xl text-white/90 mb-8">
            Join RS Softtecs and start your journey to a successful IT career
          </p>
          <a href="/contact" className="btn btn-white btn-lg">
            Start Your Journey
          </a>
        </div>
      </section>
    </Layout>
  );
}
