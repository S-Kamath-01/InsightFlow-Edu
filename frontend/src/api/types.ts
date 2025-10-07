/**
 * Shared TypeScript type definitions for InsightFlow EDU API
 * Defines all entities, DTOs, and API response shapes
 */

// ============= Core Entities =============

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'faculty' | 'academic_head' | 'it';

export interface Student {
  student_id: number;
  roll_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department: string;
  enrollment_year: number;
  current_semester: number;
  avg_gpa: number;
  avg_attendance: number;
  risk_flag: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  course_id: number;
  course_code: string;
  course_name: string;
  department: string;
  credits: number;
  semester: number;
  created_at: string;
}

export interface Enrollment {
  enrollment_id: number;
  student_id: number;
  course_id: number;
  semester: number;
  grade?: string;
  gpa?: number;
  status: 'enrolled' | 'completed' | 'dropped';
  enrolled_on: string;
  course?: Course;
}

export interface Attendance {
  attendance_id: number;
  student_id: number;
  course_id: number;
  attendance_date: string;
  status: 'present' | 'absent' | 'late';
  marked_by?: number;
  created_at: string;
  course?: Course;
}

export interface Intervention {
  intervention_id: number;
  student_id: number;
  faculty_id: number;
  intervention_type: 'academic' | 'behavioral' | 'attendance' | 'other';
  notes: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_on: string;
  updated_on?: string;
  faculty?: User;
  student?: Student;
}

export interface Feedback {
  feedback_id: number;
  student_id: number;
  course_id: number;
  feedback_text: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  sentiment_score?: number;
  submitted_on: string;
  analyzed_on?: string;
  student?: Student;
  course?: Course;
}

export interface RiskFlag {
  flag_id: number;
  student_id: number;
  reason: string;
  avg_gpa: number;
  avg_attendance: number;
  flagged_on: string;
  resolved: boolean;
  student?: Student;
}

// ============= API Request/Response DTOs =============

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: UserRole;
  user: User;
}

export interface StudentsListParams {
  search?: string;
  page?: number;
  limit?: number;
  semester?: number;
  department?: string;
}

export interface StudentsListResponse {
  data: Student[];
  total: number;
  page: number;
  limit: number;
}

export interface StudentDetailResponse {
  student: Student;
  enrollments: Enrollment[];
  attendance: Attendance[];
  interventions: Intervention[];
  feedbacks: Feedback[];
}

export interface RunRiskRequest {
  gpaThreshold?: number;
  attThreshold?: number;
}

export interface RunRiskResponse {
  status: 'ok';
  flagged: number;
  message: string;
}

export interface CreateInterventionRequest {
  student_id: number;
  faculty_id: number;
  intervention_type: Intervention['intervention_type'];
  notes: string;
}

export interface CreateInterventionResponse {
  intervention_id: number;
  created_on: string;
}

export interface CreateFeedbackRequest {
  student_id: number;
  course_id: number;
  feedback_text: string;
}

export interface CreateFeedbackResponse {
  feedback_id: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentiment_score: number;
}

export interface AnalyzeSentimentRequest {
  text: string;
}

export interface AnalyzeSentimentResponse {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
}

export interface ImportCsvResponse {
  errors: Array<{ row: number; message: string }>;
  inserted: number;
}

// ============= Dashboard & Analytics =============

export interface DashboardStats {
  totalStudents: number;
  flaggedStudents: number;
  avgGpa: number;
  avgAttendance: number;
}

export interface GpaTrend {
  semester: string;
  avgGpa: number;
}

export interface AttendanceTrend {
  month: string;
  avgAttendance: number;
}

export interface RiskSummary {
  reason: string;
  count: number;
}

// ============= Admin & Configuration =============

export interface RiskRulesConfig {
  gpaThreshold: number;
  attendanceThreshold: number;
  autoRunEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface Faculty {
  faculty_id: number;
  name: string;
  email: string;
  department: string;
  role: UserRole;
}
