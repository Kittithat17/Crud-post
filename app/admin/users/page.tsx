'use client';

import { useState, useEffect } from 'react';
import { toast } from "sonner";
interface User {
  id: string;
  clerk_id: string;
  email: string;
  role: string;
}

const URL = "https://webdatabase-ib7z.onrender.com";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({});
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error,] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

 
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/getUsers`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
      
      // Initialize selectedRoles with current roles
      const initialRoles: Record<string, string> = {};
      data.forEach((user: User) => {
        initialRoles[user.clerk_id] = user.role;
      });
      setSelectedRoles(initialRoles);
    } catch  {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (clerk_id: string, role: string) => {
    setSelectedRoles(prev => ({
      ...prev,
      [clerk_id]: role
    }));
  };

  const startEditing = (userId: string) => {
    setEditingUserId(userId);
  };

  const saveRole = async (user: User) => {
    setSaving(true);
    setSuccessMessage(null);
    
    try {
      const response = await fetch(`${URL}/updateUserRole`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerk_id: user.clerk_id,
          role: selectedRoles[user.clerk_id]
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update role for ${user.email}`);
      }
      
      // Update local user data
      setUsers(users.map(u => 
        u.clerk_id === user.clerk_id ? {...u, role: selectedRoles[user.clerk_id]} : u
      ));
      
      setSuccessMessage(`Role updated successfully for ${user.email}`);
      
      // Clear editing state
      setEditingUserId(null);
    } catch {
      toast.error("Failed");
    } finally {
      setSaving(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  if (loading) {
    return <div className="p-4">Loading users...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="border-b">
            <th className="px-20">ID</th>
            <th className="p-2">EMAIL</th>
            <th className="p-2">ROLE</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                {editingUserId === user.clerk_id ? (
                  <div className="relative">
                    <select
                      value={selectedRoles[user.clerk_id] || user.role}
                      onChange={(e) => handleRoleChange(user.clerk_id, e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${user.role === 'admin' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}
                    `}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                )}
              </td>
              <td className="p-2 space-x-2">
                {editingUserId === user.clerk_id ? (
                  <button 
                    onClick={() => saveRole(user)} 
                    disabled={saving}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                ) : (
                  <button 
                    onClick={() => startEditing(user.clerk_id)} 
                    className="px-3 py-1 bg-white border text-sm rounded"
                  >
                    Edit
                  </button>
                )}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}