import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import TeamCard from '@/components/ui/TeamCard';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { teamAPI } from '@/utils/api';

export default function TeamPage() {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filter, setFilter] = useState('all');

  const roles = [
    { value: 'all', label: 'All Members' },
    { value: 'founder', label: 'Founders' },
    { value: 'director', label: 'Directors' },
    { value: 'management', label: 'Management' },
    { value: 'trainer', label: 'Trainers' },
  ];

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data } = await teamAPI.getAll();
      setTeamMembers(data.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = filter === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.role === filter);

  if (loading) {
    return (
      <Layout title="Our Team">
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout title="Our Team" description="Meet the expert team behind RS Softtecs - our founders, trainers, and management team.">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-sm font-semibold rounded-full mb-4">
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-accent-400">Expert Team</span>
            </h1>
            <p className="text-lg text-gray-200">
              Our team of industry experts and passionate educators are dedicated to 
              transforming your career through quality IT education.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-gray-50 sticky top-[72px] z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => setFilter(role.value)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === role.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section">
        <div className="container mx-auto px-4">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600">Try selecting a different filter</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-gray-600 mb-8">
              Are you passionate about teaching and technology? We&apos;re always looking 
              for talented individuals to join our team of educators.
            </p>
            <a href="mailto:careers@rssofttecs.com" className="btn btn-primary">
              Send Your Resume
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
