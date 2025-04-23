
'use client';

import React from 'react';

const users = [
  {
    id: '38ad57',
    name: 'user 1',
    email: 'user1@user.com',
    role: 'user',
  },
  {
    id: 'a398aa',
    name: 'Kumar Admin',
    email: 'admin1@admin.com',
    role: 'admin',
  },
];

export default function AdminUsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="border-b">
            <th className="px-20">ID</th>
            <th className="p-2">NAME</th>
            <th className="p-2">EMAIL</th>
            <th className="p-2">ROLE</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${user.role === 'admin' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}
                  `}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </td>
              <td className="p-2 space-x-2">
                <button className="px-3 py-1 bg-white border text-sm rounded">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
