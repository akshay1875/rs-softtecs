import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { coursesAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    shortDescription: '',
    category: 'programming',
    level: 'beginner',
    icon: 'fas fa-laptop-code',
    status: 'active',
    isFeatured: false,
    syllabus: [{ title: '', topics: [''] }],
    features: [''],
    prerequisites: ['']
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSyllabusChange = (moduleIdx, field, value) => {
    const newSyllabus = [...formData.syllabus];
    newSyllabus[moduleIdx][field] = value;
    setFormData(prev => ({ ...prev, syllabus: newSyllabus }));
  };

  const handleTopicChange = (moduleIdx, topicIdx, value) => {
    const newSyllabus = [...formData.syllabus];
    newSyllabus[moduleIdx].topics[topicIdx] = value;
    setFormData(prev => ({ ...prev, syllabus: newSyllabus }));
  };

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      syllabus: [...prev.syllabus, { title: '', topics: [''] }]
    }));
  };

  const removeModule = (idx) => {
    if (formData.syllabus.length === 1) return;
    setFormData(prev => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== idx)
    }));
  };

  const addTopic = (moduleIdx) => {
    const newSyllabus = [...formData.syllabus];
    newSyllabus[moduleIdx].topics.push('');
    setFormData(prev => ({ ...prev, syllabus: newSyllabus }));
  };

  const removeTopic = (moduleIdx, topicIdx) => {
    if (formData.syllabus[moduleIdx].topics.length === 1) return;
    const newSyllabus = [...formData.syllabus];
    newSyllabus[moduleIdx].topics = newSyllabus[moduleIdx].topics.filter((_, i) => i !== topicIdx);
    setFormData(prev => ({ ...prev, syllabus: newSyllabus }));
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

    // Clean up empty values
    const cleanedData = {
      ...formData,
      syllabus: formData.syllabus.map(m => ({
        title: m.title,
        topics: m.topics.filter(t => t.trim())
      })).filter(m => m.title.trim()),
      features: formData.features.filter(f => f.trim()),
      prerequisites: formData.prerequisites.filter(p => p.trim())
    };

    try {
      await coursesAPI.create(cleanedData);
      toast.success('Course created successfully');
      router.push('/admin/courses');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add New Course">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft /> Back to Courses
      </button>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Course Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g., Full Stack Java Development"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="e.g., 4 Months"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Icon (Font Awesome)</label>
                    <input
                      type="text"
                      name="icon"
                      value={formData.icon}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., fab fa-java"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Short Description</label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="form-input"
                    maxLength={200}
                    placeholder="Brief description (max 200 chars)"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Full Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-textarea"
                    placeholder="Detailed course description..."
                  />
                </div>
              </div>
            </div>

            {/* Syllabus */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Course Syllabus</h2>
                <button type="button" onClick={addModule} className="btn btn-secondary btn-sm">
                  <FaPlus /> Add Module
                </button>
              </div>
              <div className="space-y-6">
                {formData.syllabus.map((module, moduleIdx) => (
                  <div key={moduleIdx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => handleSyllabusChange(moduleIdx, 'title', e.target.value)}
                          className="form-input"
                          placeholder={`Module ${moduleIdx + 1} Title`}
                        />
                      </div>
                      {formData.syllabus.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeModule(moduleIdx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {module.topics.map((topic, topicIdx) => (
                        <div key={topicIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) => handleTopicChange(moduleIdx, topicIdx, e.target.value)}
                            className="form-input flex-1"
                            placeholder="Topic"
                          />
                          {module.topics.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTopic(moduleIdx, topicIdx)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addTopic(moduleIdx)}
                        className="text-sm text-primary-600 hover:underline"
                      >
                        + Add Topic
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features & Prerequisites */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4">Course Features</h2>
                <div className="space-y-2">
                  {formData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleArrayChange('features', idx, e.target.value)}
                        className="form-input flex-1"
                        placeholder="Feature"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('features', idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('features')}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4">Prerequisites</h2>
                <div className="space-y-2">
                  {formData.prerequisites.map((prereq, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={prereq}
                        onChange={(e) => handleArrayChange('prerequisites', idx, e.target.value)}
                        className="form-input flex-1"
                        placeholder="Prerequisite"
                      />
                      {formData.prerequisites.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('prerequisites', idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('prerequisites')}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    + Add Prerequisite
                  </button>
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
                  <label className="form-label">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="programming">Programming</option>
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="cloud">Cloud & DevOps</option>
                    <option value="database">Database</option>
                    <option value="testing">Testing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Level</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
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
                    <option value="coming-soon">Coming Soon</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="isFeatured" className="text-sm">Featured Course</label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Saving...' : <><FaSave /> Save Course</>}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
