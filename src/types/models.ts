// AUMS Core Domain Models & Types

export type PortalId = 
  | 'module_map'
  | 'applicant'
  | 'student'
  | 'lecturer'
  | 'academic_admin'
  | 'admissions'
  | 'registry'
  | 'finance'
  | 'hr'
  | 'management'
  | 'sysadmin';

export type UserRole = 
  | 'System Administrator'
  | 'Vice Chancellor / Management'
  | 'Registrar'
  | 'Registry Officer'
  | 'Dean of Faculty'
  | 'Head of Department (HoD)'
  | 'Lecturer'
  | 'Admissions Officer'
  | 'Finance Officer / Bursar'
  | 'Student'
  | 'Applicant'
  | 'HR Officer'
  | 'Librarian'
  | 'Hostel Warden'
  | 'Security Officer'
  | 'Timetable Officer'
  | 'Exam Officer'
  | 'Academic Board'
  | 'Academic Affairs'
  | 'Academic Advisor'
  | 'Dean of Students'
  | 'Disciplinary Committee'
  | 'Supervisor'
  | 'Dean of Graduate Studies'
  | 'Alumni Relations'
  | 'Internal Auditor';

export interface UserPersona {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  portal: PortalId;
  department?: string;
  studentId?: string;
  avatarUrl?: string;
}

// Pillar Definition
export interface Pillar {
  id: string;
  name: string;
  code: string;
  description: string;
  iconName: string;
  moduleCount: number;
}

// 40 Modules Definition
export interface AumsModule {
  id: number;
  name: string;
  pillarId: string;
  pillarName: string;
  shortDesc: string;
  description: string;
  roles: UserRole[];
  submodules: string[];
  keyInputs: string[];
  keyOutputs: string[];
  dependsOn: number[]; // Module IDs
  feedsInto: number[]; // Module IDs
  phase: 1 | 2 | 3 | 4;
  status: 'Production Core' | 'Implemented' | 'Active Pipeline';
}

// Unified Student Identity
export interface StudentRecord {
  id: string; // STU-2026-001
  indexNumber: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  nationality: string;
  programmeId: string;
  programmeName: string;
  department: string;
  faculty: string;
  admissionYear: number;
  currentLevel: 100 | 200 | 300 | 400;
  studyMode: 'Regular' | 'Evening' | 'Weekend';
  campus: string;
  status: 'Active' | 'Probation' | 'Deferred' | 'Graduated' | 'Withdrawn';
  financialClearance: boolean;
  totalCreditsCompleted: number;
  cgpa: number;
  guardianName: string;
  guardianPhone: string;
  photoUrl: string;
}

// Course in Catalog
export interface Course {
  id: string;
  code: string; // e.g. CS201
  title: string;
  creditHours: number;
  department: string;
  level: number;
  semester: 1 | 2;
  description: string;
  prerequisites: string[]; // Course codes
  isElective: boolean;
}

// Course Offering in active semester
export interface CourseOffering {
  id: string;
  courseCode: string;
  courseTitle: string;
  creditHours: number;
  semester: string; // e.g. "2025/2026 - Semester 2"
  lecturerId: string;
  lecturerName: string;
  room: string;
  scheduleTime: string;
  enrolledStudentsCount: number;
  maxCapacity: number;
  submissionStatus: 'Draft' | 'Submitted to HoD' | 'HoD Approved' | 'Dean Signed' | 'Published to Students';
}

// Student Course Registration
export interface StudentRegistration {
  id: string;
  studentId: string;
  offeringId: string;
  courseCode: string;
  courseTitle: string;
  creditHours: number;
  academicYear: string;
  semester: string;
  status: 'Approved' | 'Pending Approval' | 'Dropped';
  caScore: number; // Continuous Assessment (max 40)
  examScore: number; // Final Exam (max 60)
  totalScore: number; // Computed (max 100)
  grade: string; // A, B+, B, C+, C, D+, D, F
  gradePoint: number; // 4.0, 3.5, etc.
  published: boolean;
}

// Results Approval Workflow
export interface ApprovalBatch {
  id: string;
  offeringId: string;
  courseCode: string;
  courseTitle: string;
  lecturerName: string;
  department: string;
  academicSession: string;
  totalStudents: number;
  averageScore: number;
  passRate: number;
  status: 'Lecturer Submitted' | 'HoD Approved' | 'Dean Signed' | 'Published to Registry';
  submittedAt: string;
  hodApprovedAt?: string;
  deanApprovedAt?: string;
  publishedAt?: string;
  moderatorNotes?: string;
}

// Applicant in Admissions
export interface ApplicantRecord {
  id: string;
  applicationNumber: string; // APP-2026-4921
  fullName: string;
  email: string;
  phone: string;
  programmeFirstChoice: string;
  programmeSecondChoice: string;
  qualifications: { exam: string; aggregateScore: number; year: number };
  applicationFeePaid: boolean;
  status: 'Submitted' | 'Under Review' | 'Admitted' | 'Rejected' | 'Enrolled';
  submittedDate: string;
  admissionLetterGenerated: boolean;
}

// Finance Ledger
export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  description: string;
  semester: string;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  status: 'Paid' | 'Partial' | 'Overdue';
  dueDate: string;
  clearanceEligible: boolean;
}

export interface PaymentTransaction {
  id: string;
  invoiceId: string;
  studentId: string;
  studentName: string;
  amount: number;
  channel: 'MTN Mobile Money' | 'Telecel Cash' | 'Visa/Mastercard' | 'Bank Direct';
  reference: string;
  date: string;
  status: 'Verified' | 'Pending';
}

// Audit Trail Record
export interface AuditLogItem {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  module: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress: string;
}

// System Notice
export interface CampusNotice {
  id: string;
  title: string;
  category: 'Urgent' | 'Academic' | 'Financial' | 'General';
  audience: 'All' | 'Students' | 'Lecturers' | 'Staff';
  author: string;
  date: string;
  content: string;
}
