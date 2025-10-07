/**
 * Admin Page - CSV import, course management, system settings
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoints';
import { Loading } from '@/components/Loading';
import type { ApiResponse, Course, Faculty } from '@/api/types';

export const AdminPage: React.FC = () => {
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<Course[]>>(API_ENDPOINTS.COURSES);
      return response.data.data;
    },
  });

  const { data: faculty, isLoading: facultyLoading } = useQuery({
    queryKey: ['faculty'],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<Faculty[]>>(API_ENDPOINTS.FACULTY);
      return response.data.data;
    },
  });

  if (coursesLoading || facultyLoading) return <Loading message="Loading admin data..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="mt-1 text-sm text-gray-600">Manage courses, faculty, and import data</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">CSV Import</h2>
        <p className="text-sm text-gray-600 mb-4">
          Upload a CSV file to bulk import student records
        </p>
        <input type="file" accept=".csv" className="input" />
        <button className="btn-primary mt-4">Upload & Import</button>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Courses ({courses?.length || 0})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Code</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Department</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Credits</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses?.map((course) => (
                <tr key={course.course_id}>
                  <td className="px-4 py-3 text-sm">{course.course_code}</td>
                  <td className="px-4 py-3 text-sm">{course.course_name}</td>
                  <td className="px-4 py-3 text-sm">{course.department}</td>
                  <td className="px-4 py-3 text-sm">{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Faculty ({faculty?.length || 0})</h2>
        <div className="space-y-2">
          {faculty?.map((member) => (
            <div key={member.faculty_id} className="p-3 bg-gray-50 rounded border flex justify-between">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-600">{member.email}</p>
              </div>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded h-fit">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
