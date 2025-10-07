/**
 * Centralized API endpoint paths for InsightFlow EDU
 */

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',

  // Students
  STUDENTS: '/students',
  STUDENT_DETAIL: (id: number) => `/students/${id}`,

  // Courses
  COURSES: '/courses',
  COURSE_DETAIL: (id: number) => `/courses/${id}`,

  // Risk Management
  RISK_FLAGS: '/risk-flags',
  RUN_RISK: '/run-risk',
  RISK_RULES: '/risk-rules',

  // Interventions
  INTERVENTIONS: '/interventions',
  INTERVENTION_DETAIL: (id: number) => `/interventions/${id}`,

  // Feedback & Sentiment
  FEEDBACK: '/feedback',
  ANALYZE_SENTIMENT: '/analyze',

  // Admin
  IMPORT_CSV: '/import/csv',
  EXPORT_CSV: '/export/csv',
  FACULTY: '/faculty',

  // Dashboard & Analytics
  DASHBOARD_STATS: '/dashboard/stats',
  GPA_TRENDS: '/dashboard/gpa-trends',
  ATTENDANCE_TRENDS: '/dashboard/attendance-trends',
  RISK_SUMMARY: '/dashboard/risk-summary',
} as const;
