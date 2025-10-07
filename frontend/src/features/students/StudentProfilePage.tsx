/**
 * Student Profile Page - Detailed view with interventions and feedback
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoints';
import { Loading } from '@/components/Loading';
import type { ApiResponse, StudentDetailResponse } from '@/api/types';

export const StudentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<StudentDetailResponse>>(
        API_ENDPOINTS.STUDENT_DETAIL(parseInt(id!))
      );
      return response.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loading message="Loading student profile..." />;
  if (!data) return <div>Student not found</div>;

  const { student, interventions, feedbacks } = data;

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-bold">
          {student.first_name} {student.last_name}
        </h1>
        <p className="text-gray-600">{student.roll_number} | {student.department}</p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">GPA</p>
            <p className="text-xl font-bold">{student.avg_gpa.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Attendance</p>
            <p className="text-xl font-bold">{student.avg_attendance.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className={`text-xl font-bold ${student.risk_flag ? 'text-danger-600' : 'text-success-600'}`}>
              {student.risk_flag ? 'At Risk' : 'Good'}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Interventions ({interventions.length})</h2>
        {interventions.length === 0 ? (
          <p className="text-gray-500">No interventions recorded</p>
        ) : (
          <div className="space-y-3">
            {interventions.map((intervention) => (
              <div key={intervention.intervention_id} className="p-4 bg-gray-50 rounded border">
                <p className="font-medium">{intervention.intervention_type}</p>
                <p className="text-sm text-gray-600 mt-1">{intervention.notes}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(intervention.created_on).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Feedback ({feedbacks.length})</h2>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback submitted</p>
        ) : (
          <div className="space-y-3">
            {feedbacks.map((feedback) => (
              <div key={feedback.feedback_id} className="p-4 bg-gray-50 rounded border">
                <p className="text-sm text-gray-800">{feedback.feedback_text}</p>
                {feedback.sentiment && (
                  <span className={`mt-2 inline-block px-2 py-1 text-xs rounded ${
                    feedback.sentiment === 'positive' ? 'bg-success-100 text-success-800' :
                    feedback.sentiment === 'negative' ? 'bg-danger-100 text-danger-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {feedback.sentiment}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
