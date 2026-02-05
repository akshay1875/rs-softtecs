import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/ui/CourseCard';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { coursesAPI } from '@/utils/api';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function CoursesPage() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'cloud', label: 'Cloud & DevOps' },
    { value: 'database', label: 'Database' },
    { value: 'testing', label: 'Testing' },
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, categoryFilter, levelFilter]);

  const fetchCourses = async () => {
    try {
      const { data } = await coursesAPI.getAll();
      setCourses(data.data);
      setFilteredCourses(data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }

    // Level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(course => course.level === levelFilter);
    }

    setFilteredCourses(filtered);
  };

  if (loading) {
    return (
      <Layout title="Our Courses">
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout title="Our Courses" description="Explore our industry-ready IT courses in Java, Python, MERN Stack, Data Science, AWS, and more.">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-sm font-semibold rounded-full mb-4">
              25+ Industry-Ready Courses
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-accent-400">Courses</span>
            </h1>
            <p className="text-lg text-gray-200">
              Master the latest technologies with our comprehensive courses designed 
              by industry experts. Get job-ready with hands-on training and placement support.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-50 sticky top-[72px] z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="form-select min-w-[180px]"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="form-select min-w-[150px]"
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section">
        <div className="container mx-auto px-4">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-8">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Not sure which course to choose?</h2>
            <p className="text-gray-600 mb-8">
              Book a free counseling session with our career experts. We&apos;ll help you 
              find the perfect course based on your background, interests, and career goals.
            </p>
            <a href="/contact" className="btn btn-primary btn-lg">
              Get Free Counseling
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
