/**
 * Application routes configuration
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LoginPage } from '@/features/auth/LoginPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { StudentsListPage } from '@/features/students/StudentsListPage';
import { StudentProfilePage } from '@/features/students/StudentProfilePage';
import { RiskPanelPage } from '@/features/risk/RiskPanelPage';
import { InterventionsPage } from '@/features/interventions/InterventionsPage';
import { FeedbackPage } from '@/features/feedback/FeedbackPage';
import { AdminPage } from '@/features/admin/AdminPage';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

const UnauthorizedPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="card max-w-md text-center">
      <h1 className="text-2xl font-bold text-danger-600 mb-2">Access Denied</h1>
      <p className="text-gray-600">You don't have permission to access this page.</p>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <AppLayout>
              <StudentsListPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <StudentProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/risk"
        element={
          <ProtectedRoute>
            <AppLayout>
              <RiskPanelPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/interventions"
        element={
          <ProtectedRoute>
            <AppLayout>
              <InterventionsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <AppLayout>
              <FeedbackPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['academic_head', 'it']}>
            <AppLayout>
              <AdminPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
