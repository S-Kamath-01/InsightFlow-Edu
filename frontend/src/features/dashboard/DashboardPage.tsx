/**
 * Dashboard page - main landing after login
 * Shows KPIs, charts, and risk summary
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/api/axiosClient';
import { API_ENDPOINTS } from '@/api/endpoints';
import { Loading } from '@/components/Loading';
import { GpaChart } from './GpaChart';
import { AttendanceChart } from './AttendanceChart';
import { RiskSummaryWidget } from './RiskSummaryWidget';
import type { ApiResponse, DashboardStats, GpaTrend, AttendanceTrend, RiskSummary } from '@/api/types';
import { AcademicCapIcon, UserGroupIcon, ExclamationTriangleIcon, ChartBarIcon } from '@heroicons/react/24/outline';

/**
 * Main dashboard component with KPI cards, filters, and visualization widgets
 */
export const DashboardPage: React.FC = () => {
  const [semester, setSemester] = useState<number | undefined>();
  const [department, setDepartment] = useState<string>('');

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats', semester, department],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<DashboardStats>>(
        API_ENDPOINTS.DASHBOARD_STATS
      );
      return response.data.data;
    },
  });

  // Fetch GPA trends
  const { data: gpaTrends, isLoading: gpaLoading } = useQuery({
    queryKey: ['gpa-trends', semester, department],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<GpaTrend[]>>(
        API_ENDPOINTS.GPA_TRENDS
      );
      return response.data.data;
    },
  });

  // Fetch attendance trends
  const { data: attendanceTrends, isLoading: attendanceLoading } = useQuery({
    queryKey: ['attendance-trends', semester, department],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<AttendanceTrend[]>>(
        API_ENDPOINTS.ATTENDANCE_TRENDS
      );
      return response.data.data;
    },
  });

  // Fetch risk summary
  const { data: riskSummary, isLoading: riskLoading } = useQuery({
    queryKey: ['risk-summary'],
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<RiskSummary[]>>(
        API_ENDPOINTS.RISK_SUMMARY
      );
      return response.data.data;
    },
  });

  if (statsLoading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Student performance analytics and risk detection overview
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="semester" className="label">
              Semester
            </label>
            <select
              id="semester"
              value={semester || ''}
              onChange={(e) => setSemester(e.target.value ? parseInt(e.target.value) : undefined)}
              className="input w-32"
            >
              <option value="">All</option>
              <option value="1">Sem 1</option>
              <option value="2">Sem 2</option>
              <option value="3">Sem 3</option>
              <option value="4">Sem 4</option>
              <option value="5">Sem 5</option>
              <option value="6">Sem 6</option>
            </select>
          </div>

          <div>
            <label htmlFor="department" className="label">
              Department
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="input w-48"
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Students"
          value={stats?.totalStudents || 0}
          icon={UserGroupIcon}
          color="blue"
        />
        <KPICard
          title="Flagged Students"
          value={stats?.flaggedStudents || 0}
          icon={ExclamationTriangleIcon}
          color="red"
        />
        <KPICard
          title="Average GPA"
          value={(stats?.avgGpa || 0).toFixed(2)}
          icon={AcademicCapIcon}
          color="green"
        />
        <KPICard
          title="Avg Attendance"
          value={`${(stats?.avgAttendance || 0).toFixed(1)}%`}
          icon={ChartBarIcon}
          color="purple"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">GPA Trend</h3>
          {gpaLoading ? (
            <Loading message="Loading chart..." />
          ) : (
            <GpaChart data={gpaTrends || []} />
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Attendance Trend</h3>
          {attendanceLoading ? (
            <Loading message="Loading chart..." />
          ) : (
            <AttendanceChart data={attendanceTrends || []} />
          )}
        </div>
      </div>

      {/* Risk Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Risk Summary by Reason</h3>
        {riskLoading ? (
          <Loading message="Loading risk data..." />
        ) : (
          <RiskSummaryWidget data={riskSummary || []} />
        )}
      </div>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'red' | 'green' | 'purple';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};
