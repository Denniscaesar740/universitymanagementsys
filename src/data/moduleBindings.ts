import type { PortalId } from '../types/models';
import { MODULES_DATA } from './modulesData';

export interface ModuleBinding {
  moduleId: number;
  portal: PortalId;
  view: string;
  label: string;
}

/** Home view for each workspace after login or portal change. */
export const PORTAL_DEFAULT_VIEWS: Record<PortalId, string> = {
  student: 'dashboard',
  lecturer: 'marksheet',
  academic_admin: 'approvals',
  admissions: 'applications',
  applicant: 'status',
  registry: 'biodata',
  finance: 'invoices',
  management: 'dashboard',
  sysadmin: 'audit',
  hr: 'staff',
  module_map: 'blueprint',
};

/**
 * Where each enterprise module actually runs.
 * One module can appear in several workspaces so staff never leave their portal
 * just to finish a cross-directorate task.
 */
export const MODULE_BINDINGS: ModuleBinding[] = [
  { moduleId: 1, portal: 'sysadmin', view: 'settings', label: 'Institution setup' },
  { moduleId: 1, portal: 'academic_admin', view: 'calendar', label: 'Academic setup' },
  { moduleId: 2, portal: 'sysadmin', view: 'rbac', label: 'Access control' },
  { moduleId: 3, portal: 'admissions', view: 'applications', label: 'Admissions' },
  { moduleId: 3, portal: 'applicant', view: 'status', label: 'My application' },
  { moduleId: 3, portal: 'registry', view: 'biodata', label: 'New intake records' },
  { moduleId: 4, portal: 'registry', view: 'biodata', label: 'Master biodata' },
  { moduleId: 4, portal: 'student', view: 'dashboard', label: 'My profile' },
  { moduleId: 5, portal: 'academic_admin', view: 'courses', label: 'Course catalogue' },
  { moduleId: 6, portal: 'academic_admin', view: 'offerings', label: 'Programme structure' },
  { moduleId: 7, portal: 'academic_admin', view: 'timetable', label: 'Timetable' },
  { moduleId: 7, portal: 'student', view: 'timetable', label: 'Lecture timetable' },
  { moduleId: 7, portal: 'lecturer', view: 'offerings', label: 'Teaching timetable' },
  { moduleId: 8, portal: 'academic_admin', view: 'offerings', label: 'Teaching allocations' },
  { moduleId: 8, portal: 'lecturer', view: 'offerings', label: 'My allocations' },
  { moduleId: 9, portal: 'student', view: 'registration', label: 'Course registration' },
  { moduleId: 9, portal: 'academic_admin', view: 'courses', label: 'Registration oversight' },
  { moduleId: 10, portal: 'lecturer', view: 'marksheet', label: 'Faculty workbench' },
  { moduleId: 11, portal: 'lecturer', view: 'attendance', label: 'Attendance' },
  { moduleId: 11, portal: 'academic_admin', view: 'timetable', label: 'Exams & venues' },
  { moduleId: 12, portal: 'lecturer', view: 'marksheet', label: 'Grade entry' },
  { moduleId: 12, portal: 'student', view: 'results', label: 'My results' },
  { moduleId: 13, portal: 'academic_admin', view: 'approvals', label: 'Results approval' },
  { moduleId: 13, portal: 'lecturer', view: 'marksheet', label: 'Submit to HoD' },
  { moduleId: 14, portal: 'academic_admin', view: 'timetable', label: 'Exam dockets' },
  { moduleId: 15, portal: 'registry', view: 'transcripts', label: 'Transcripts' },
  { moduleId: 15, portal: 'student', view: 'results', label: 'Statement of results' },
  { moduleId: 16, portal: 'registry', view: 'degree_audit', label: 'Degree audit' },
  { moduleId: 16, portal: 'student', view: 'dashboard', label: 'Graduation progress' },
  { moduleId: 17, portal: 'finance', view: 'invoices', label: 'Student invoices' },
  { moduleId: 17, portal: 'student', view: 'finance', label: 'Fees & bills' },
  { moduleId: 18, portal: 'finance', view: 'transactions', label: 'Payments' },
  { moduleId: 18, portal: 'student', view: 'finance', label: 'Pay fees' },
  { moduleId: 19, portal: 'finance', view: 'scholarships', label: 'Financial aid' },
  { moduleId: 19, portal: 'student', view: 'finance', label: 'Scholarships' },
  { moduleId: 20, portal: 'hr', view: 'staff', label: 'Staff directory' },
  { moduleId: 20, portal: 'lecturer', view: 'offerings', label: 'Faculty profile' },
  { moduleId: 21, portal: 'lecturer', view: 'materials', label: 'Course materials' },
  { moduleId: 21, portal: 'student', view: 'elearning', label: 'Virtual learning' },
  { moduleId: 22, portal: 'student', view: 'proof', label: 'Proof of registration' },
  { moduleId: 23, portal: 'hr', view: 'payroll', label: 'Payroll' },
  { moduleId: 24, portal: 'hr', view: 'appraisal', label: 'Appraisal' },
  { moduleId: 25, portal: 'hr', view: 'appraisal', label: 'Promotion' },
  { moduleId: 26, portal: 'hr', view: 'recruitment', label: 'Recruitment' },
  { moduleId: 27, portal: 'hr', view: 'leave', label: 'Leave' },
  { moduleId: 29, portal: 'student', view: 'hostel', label: 'Hostel' },
  { moduleId: 31, portal: 'student', view: 'dashboard', label: 'Notices' },
  { moduleId: 31, portal: 'academic_admin', view: 'calendar', label: 'Circulars' },
  { moduleId: 36, portal: 'management', view: 'dashboard', label: 'Executive KPIs' },
  { moduleId: 37, portal: 'management', view: 'enrolment', label: 'Analytics' },
  { moduleId: 13, portal: 'management', view: 'dashboard', label: 'Senate results oversight' },
  { moduleId: 38, portal: 'management', view: 'dashboard', label: 'Governance audit' },
  { moduleId: 38, portal: 'sysadmin', view: 'audit', label: 'Audit trail' },
  { moduleId: 39, portal: 'sysadmin', view: 'backups', label: 'Backups' },
  { moduleId: 40, portal: 'sysadmin', view: 'integrations', label: 'Integrations' },
  { moduleId: 4, portal: 'admissions', view: 'applications', label: 'Applicant biodata' },
  { moduleId: 14, portal: 'admissions', view: 'review', label: 'Entrance screening' },
  { moduleId: 17, portal: 'applicant', view: 'status', label: 'Application voucher' },
  { moduleId: 18, portal: 'applicant', view: 'status', label: 'Payment gateway' },
  { moduleId: 9, portal: 'registry', view: 'biodata', label: 'Enrolment validation' },
  { moduleId: 22, portal: 'registry', view: 'degree_audit', label: 'Proof certification' },
  { moduleId: 4, portal: 'finance', view: 'invoices', label: 'Student accounts' },
  { moduleId: 38, portal: 'finance', view: 'transactions', label: 'Transaction audit' },
  { moduleId: 1, portal: 'module_map', view: 'blueprint', label: 'Enterprise blueprint' },
  { moduleId: 40, portal: 'module_map', view: 'lifecycle', label: 'Integration mesh' },
];

export function bindingsForPortal(portal: PortalId): ModuleBinding[] {
  const seen = new Set<number>();
  return MODULE_BINDINGS.filter((b) => {
    if (b.portal !== portal || seen.has(b.moduleId)) return false;
    seen.add(b.moduleId);
    return true;
  });
}

export function primaryBinding(moduleId: number): ModuleBinding | undefined {
  return MODULE_BINDINGS.find((b) => b.moduleId === moduleId);
}

export function moduleById(moduleId: number) {
  return MODULES_DATA.find((m) => m.id === moduleId);
}

export const DEMO_PASSWORD = 'UMaT@2026';
