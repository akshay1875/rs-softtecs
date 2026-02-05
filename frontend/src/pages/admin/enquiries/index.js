import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { enquiriesAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaCheck, FaTrash, FaEye, FaPhone, FaEnvelope, FaFilter } from 'react-icons/fa';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, [filter]);

  const fetchEnquiries = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const { data } = await enquiriesAPI.getAll(params);
      setEnquiries(data.data);
    } catch (error) {
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkContacted = async (id) => {
    try {
      await enquiriesAPI.markContacted(id);
      fetchEnquiries();
      toast.success('Marked as contacted');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await enquiriesAPI.delete(id);
      fetchEnquiries();
      toast.success('Enquiry deleted');
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
    } catch (error) {
      toast.error('Failed to delete enquiry');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await enquiriesAPI.update(id, { status });
      fetchEnquiries();
      toast.success('Status updated');
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Enquiries' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'follow-up', label: 'Follow Up' },
    { value: 'enrolled', label: 'Enrolled' },
    { value: 'closed', label: 'Closed' },
  ];

  const getStatusBadge = (status) => {
    const colors = {
      'new': 'badge-error',
      'contacted': 'badge-info',
      'follow-up': 'badge-warning',
      'enrolled': 'badge-success',
      'closed': 'bg-gray-100 text-gray-600'
    };
    return colors[status] || 'badge-info';
  };

  return (
    <AdminLayout title="Enquiries Management">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Filter */}
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <p className="text-gray-600">{enquiries.length} enquiries found</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enquiries List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        <div className="spinner mx-auto" />
                      </td>
                    </tr>
                  ) : enquiries.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No enquiries found
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((enquiry) => (
                      <tr 
                        key={enquiry._id}
                        className={`cursor-pointer ${selectedEnquiry?._id === enquiry._id ? 'bg-primary-50' : ''}`}
                        onClick={() => setSelectedEnquiry(enquiry)}
                      >
                        <td className="font-medium">{enquiry.name}</td>
                        <td>
                          <div className="text-sm">
                            <p>{enquiry.phone}</p>
                            <p className="text-gray-500">{enquiry.email}</p>
                          </div>
                        </td>
                        <td>{enquiry.courseInterested || '-'}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(enquiry.status)}`}>
                            {enquiry.status}
                          </span>
                        </td>
                        <td className="text-sm text-gray-500">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1">
                            {enquiry.status === 'new' && (
                              <button
                                onClick={() => handleMarkContacted(enquiry._id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded"
                                title="Mark as Contacted"
                              >
                                <FaCheck />
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleDelete(enquiry._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedEnquiry ? (
            <div className="card p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Enquiry Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedEnquiry.name}</p>
                </div>

                <div className="flex gap-4">
                  <a 
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex-1 btn btn-secondary btn-sm"
                  >
                    <FaPhone /> Call
                  </a>
                  <a 
                    href={`mailto:${selectedEnquiry.email}`}
                    className="flex-1 btn btn-secondary btn-sm"
                  >
                    <FaEnvelope /> Email
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedEnquiry.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedEnquiry.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Course Interested</p>
                  <p>{selectedEnquiry.courseInterested || 'Not specified'}</p>
                </div>

                {selectedEnquiry.message && (
                  <div>
                    <p className="text-sm text-gray-500">Message</p>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedEnquiry.message}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleUpdateStatus(selectedEnquiry._id, e.target.value)}
                    className="form-select mt-1"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow-up">Follow Up</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Submitted On</p>
                  <p>{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                </div>

                {selectedEnquiry.contactedAt && (
                  <div>
                    <p className="text-sm text-gray-500">Contacted On</p>
                    <p>{new Date(selectedEnquiry.contactedAt).toLocaleString()}</p>
                    {selectedEnquiry.contactedBy && (
                      <p className="text-xs text-gray-400">
                        by {selectedEnquiry.contactedBy.name}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center text-gray-500">
              <FaEye className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>Select an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
