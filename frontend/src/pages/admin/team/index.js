import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { teamAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminTeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await teamAPI.getAll();
      setMembers(data.data);
    } catch (error) {
      toast.error('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await teamAPI.delete(id);
      fetchMembers();
      toast.success('Team member deleted');
    } catch (error) {
      toast.error('Failed to delete team member');
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      'founder': 'bg-yellow-100 text-yellow-800',
      'co-founder': 'bg-yellow-100 text-yellow-800',
      'director': 'badge-purple',
      'management': 'badge-info',
      'trainer': 'badge-success',
      'support': 'bg-gray-100 text-gray-600'
    };
    return colors[role] || 'badge-info';
  };

  return (
    <AdminLayout title="Team Members Management">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{members.length} team members found</p>
        <Link href="/admin/team/new" className="btn btn-primary">
          <FaPlus /> Add Team Member
        </Link>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Role</th>
                <th>Experience</th>
                <th>Status</th>
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
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No team members found. Add your first team member!
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {member.name?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td>{member.designation}</td>
                    <td>
                      <span className={`badge ${getRoleBadge(member.role)} capitalize`}>
                        {member.role?.replace('-', ' ')}
                      </span>
                    </td>
                    <td>{member.experience || '-'}</td>
                    <td>
                      <span className={`badge ${member.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/team/${member._id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
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
    </AdminLayout>
  );
}
