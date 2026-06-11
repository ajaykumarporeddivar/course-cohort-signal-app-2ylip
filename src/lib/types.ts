export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: 'Program Director' | 'Course Operations Manager' | 'Admin'; // Added Admin for flexibility
  plan: 'Pro' | 'Starter';
  avatar: string;
  joinedAt: string; // ISO date string
}

export interface Cohort {
  id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  name: string;
  courseName: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: 'active' | 'upcoming' | 'completed' | 'paused';
  enrollmentCount: number;
  averageProgress: number; // Percentage 0-100
  riskScore: 'low' | 'medium' | 'high'; // Overall risk for the cohort
}

export interface Lesson {
  id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  cohortId: string; // Foreign key to Cohort
  title: string;
  orderIndex: number;
  contentType: 'video' | 'text' | 'quiz' | 'assignment';
  avgCompletionTimeMinutes: number;
  completionRate: number; // Percentage 0-100
  struggleScore: 'low' | 'medium' | 'high'; // Indicates difficulty or common sticking points
}

export interface Learner {
  id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  name: string;
  email: string;
  cohortId: string; // Foreign key to Cohort
  currentLessonId: string; // Foreign key to Lesson
  progressStatus: 'not-started' | 'in-progress' | 'completed' | 'stalled' | 'at-risk';
  engagementScore: number; // 0-100, calculated from activity
  lastActivityAt: string; // ISO date string
  riskFlag: 'none' | 'low-engagement' | 'stalled-progress' | 'missed-deadline' | 'refund-risk';
  notes: string; // Internal notes for program directors
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string; // Name of the user performing or affected by the action
  avatar: string; // Initials or image URL for the user
  time: string; // Relative time: "2 minutes ago", "Yesterday"
  type: 'create' | 'update' | 'delete' | 'flag' | 'intervention'; // Type of action
  entityId?: string; // Optional: ID of the related entity (learner, cohort, lesson)
  entityType?: 'learner' | 'cohort' | 'lesson'; // Optional: Type of the related entity
}

export type ApiResponse<T> = { ok: boolean; data?: T; error?: string };
export type SortDir = 'asc' | 'desc';