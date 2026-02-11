import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { teamAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';

export default function EditTeamMemberPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    role: 'trainer',
    bio: '',
    expertise: [''],
    experience: '',
    qualifications: [''],
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: ''
    },
    status: 'active',
    displayOrder: 0
  });

  useEffect(() => {
    if (id) {
      fetchMember();
    }
  }, [id]);

  const fetchMember = async () => {
    try {
      const { data } = await teamAPI.getOne(id);
      const member = data.data;
      setFormData({
        name: member.name || '',
        designation: member.designation || '',
        role: member.role || 'trainer',
        bio: member.bio || '',
        expertise: member.expertise?.length > 0 ? member.expertise : [''],
        experience: member.experience || '',
        qualifications: member.qualifications?.length > 0 ? member.qualifications : [''],
        socialLinks: {
          linkedin: member.socialLinks?.linkedin || '',
          twitter: member.socialLinks?.twitter || '',
          github: member.socialLinks?.github || ''
        },
        status: member.status || 'active',
        displayOrder: member.displayOrder || 0
      });
    } catch (error) {
      toast.error('Failed to fetch team member');
      router.push('/admin/team');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value }
    }));
  };

  const handleArrayChange = (field, idx, value) => {
    const newArr = [...formData[field]];
    newArr[idx] = value;
    setFormData(prev => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, idx) => {
    if (formData[field].length === 1) return;
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedData = {
      ...formData,
      expertise: formData.expertise.filter(e => e.trim()),
      qualifications: formData.qualifications.filter(q => q.trim()),
      displayOrder: Number(formData.displayOrder) || 0
    };

    try {
      await teamAPI.update(id, cleanedData);
      toast.success('Team member updated successfully');
      router.push('/admin/team');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update team member');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout title="Edit Team Member">
        <div className="flex justify-center py-12">
          <div className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Team Member">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft /> Back to Team
      </button>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="e.g., Rahul Salunke"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Designation *</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="e.g., Senior Java Trainer"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., 10+ Years"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Display Order</label>
                    <input
                      type="number"
                      name="displayOrder"
                      value={formData.displayOrder}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="form-textarea"
                    placeholder="Brief biography..."
                  />
                </div>
              </div>
            </div>

            {/* Expertise & Qualifications */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4">Expertise</h2>
                <div className="space-y-2">
                  {formData.expertise.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('expertise', idx, e.target.value)}
                        className="form-input flex-1"
                        placeholder="e.g., React.js"
                      />
                      {formData.expertise.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('expertise', idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('expertise')}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    + Add Expertise
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4">Qualifications</h2>
                <div className="space-y-2">
                  {formData.qualifications.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleArrayChange('qualifications', idx, e.target.value)}
                        className="form-input flex-1"
                        placeholder="e.g., B.Tech in CS"
                      />
                      {formData.qualifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('qualifications', idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('qualifications')}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    + Add Qualification
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Social Links</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleSocialChange}
                    className="form-input"
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleSocialChange}
                    className="form-input"
                    placeholder="Twitter URL"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.socialLinks.github}
                    onChange={handleSocialChange}
                    className="form-input"
                    placeholder="GitHub URL"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="founder">Founder</option>
                    <option value="co-founder">Co-Founder</option>
                    <option value="director">Director</option>
                    <option value="management">Management</option>
                    <option value="trainer">Trainer</option>
                    <option value="support">Support</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Saving...' : <><FaSave /> Update Team Member</>}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
