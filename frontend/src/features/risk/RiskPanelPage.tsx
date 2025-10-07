/**
 * Risk Panel Page - Display risk flags and run risk detection
 */

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoints';
import { Loading } from '@/components/Loading';
import { useAuth } from '@/features/auth/AuthProvider';
import type { ApiResponse, RiskFlag, RunRiskResponse, RiskRulesConfig } from '@/api/types';

export const RiskPanelPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const [gpaThreshold, setGpaThreshold] = useState(2.5);
  const [attThreshold, setAttThreshold] = useState(75);

  const { data: riskFlags, isLoading } = useQuery({
    queryKey: ['risk-flags'],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<RiskFlag[]>>(API_ENDPOINTS.RISK_FLAGS);
      return response.data.data;
    },
  });

  const runRiskMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosClient.post<ApiResponse<RunRiskResponse>>(
        API_ENDPOINTS.RUN_RISK,
        { gpaThreshold, attThreshold }
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['risk-flags'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      alert('Risk detection completed successfully!');
    },
  });

  if (isLoading) return <Loading message="Loading risk data..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Risk Panel</h1>
        <p className="mt-1 text-sm text-gray-600">Identify at-risk students and configure thresholds</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Run Risk Detection</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label">GPA Threshold</label>
            <input
              type="number"
              step="0.1"
              value={gpaThreshold}
              onChange={(e) => setGpaThreshold(parseFloat(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="label">Attendance Threshold (%)</label>
            <input
              type="number"
              value={attThreshold}
              onChange={(e) => setAttThreshold(parseInt(e.target.value))}
              className="input"
            />
          </div>
        </div>
        <button
          onClick={() => runRiskMutation.mutate()}
          disabled={runRiskMutation.isPending}
          className="btn-primary"
        >
          {runRiskMutation.isPending ? 'Running...' : 'Run Risk Detection'}
        </button>
      </div>

      {role === 'academic_head' && <AdminRulesSection />}

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Flagged Students ({riskFlags?.length || 0})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flagged On</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {riskFlags?.map((flag) => (
                <tr key={flag.flag_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {flag.student?.first_name} {flag.student?.last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{flag.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{flag.avg_gpa.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{flag.avg_attendance.toFixed(1)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(flag.flagged_on).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminRulesSection: React.FC = () => {
  const { data: rules } = useQuery({
    queryKey: ['risk-rules'],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<RiskRulesConfig>>(API_ENDPOINTS.RISK_RULES);
      return response.data.data;
    },
  });

  return (
    <div className="card bg-purple-50">
      <h2 className="text-lg font-semibold mb-4">Admin: Risk Rules Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">GPA Threshold: <strong>{rules?.gpaThreshold}</strong></p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Attendance Threshold: <strong>{rules?.attendanceThreshold}%</strong></p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">Auto-run: {rules?.autoRunEnabled ? 'Enabled' : 'Disabled'}</p>
    </div>
  );
};
