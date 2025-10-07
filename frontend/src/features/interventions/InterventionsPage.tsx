/**
 * Interventions Page - Manage interventions
 */

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoints';
import { Loading } from '@/components/Loading';
import type { ApiResponse, Intervention } from '@/api/types';

export const InterventionsPage: React.FC = () => {
  const { data: interventions, isLoading } = useQuery({
    queryKey: ['interventions'],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<Intervention[]>>(API_ENDPOINTS.INTERVENTIONS);
      return response.data.data;
    },
  });

  if (isLoading) return <Loading message="Loading interventions..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Interventions</h1>
        <p className="mt-1 text-sm text-gray-600">Track faculty interventions with at-risk students</p>
      </div>

      <div className="card">
        <div className="space-y-4">
          {interventions?.map((intervention) => (
            <div key={intervention.intervention_id} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                    {intervention.intervention_type}
                  </span>
                  <p className="mt-2 text-sm text-gray-800">{intervention.notes}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Created: {new Date(intervention.created_on).toLocaleString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  intervention.status === 'completed' ? 'bg-success-100 text-success-800' :
                  intervention.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {intervention.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
