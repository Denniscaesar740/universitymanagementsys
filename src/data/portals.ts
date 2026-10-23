import type { PortalId } from '../types/models';

export interface PortalCatalogItem {
  id: PortalId;
  label: string;
  short: string;
  badge: string;
  hint: string;
}

export const PORTAL_CATALOG: PortalCatalogItem[] = [
  { id: 'student', label: 'Student Academic Portal', short: 'Student', badge: 'Self-service', hint: 'Dashboard, results, registration, fees' },
  { id: 'lecturer', label: 'Faculty Teaching Portal', short: 'Faculty', badge: 'Marks & attendance', hint: 'Marksheets, attendance, course materials' },
  { id: 'academic_admin', label: 'Academic Administration', short: 'Academic', badge: 'Results board', hint: 'Approvals, catalogue, timetable' },
  { id: 'registry', label: 'Registry & Records', short: 'Registry', badge: 'Master biodata', hint: 'Student records, transcripts, graduation' },
  { id: 'finance', label: 'Finance & Bursary', short: 'Finance', badge: 'Tuition', hint: 'Invoices, payments, clearance' },
  { id: 'admissions', label: 'Admissions Desk', short: 'Admissions', badge: 'Intake', hint: 'Applications, decisions, enrolment' },
  { id: 'applicant', label: 'Applicant Self-Service', short: 'Applicant', badge: 'Prospects', hint: 'Track application and offer letter' },
  { id: 'hr', label: 'Human Resources', short: 'HR', badge: 'Staff', hint: 'Directory, leave, payroll' },
  { id: 'management', label: 'Executive Management', short: 'Council', badge: 'Analytics', hint: 'KPIs, enrolment, quality assurance' },
  { id: 'sysadmin', label: 'ICT Directorate', short: 'ICT', badge: 'Security', hint: 'Audit trail, RBAC, backups' },
  { id: 'module_map', label: 'Architecture Blueprint', short: 'Blueprint', badge: '40 modules', hint: 'Institutional module map' },
];

export const PORTAL_TITLES: Record<PortalId, { title: string; kicker: string }> = {
  student: { title: 'Student workspace', kicker: 'Academic self-service' },
  lecturer: { title: 'Faculty workspace', kicker: 'Teaching & assessment' },
  academic_admin: { title: 'Academic governance', kicker: 'Senate & examinations' },
  registry: { title: 'Registry directorate', kicker: 'Records & certification' },
  finance: { title: 'Finance directorate', kicker: 'Student accounts' },
  admissions: { title: 'Admissions desk', kicker: '2026/2027 intake' },
  applicant: { title: 'Applicant portal', kicker: 'Undergraduate admissions' },
  hr: { title: 'Human resources', kicker: 'Staff directorate' },
  management: { title: 'Executive analytics', kicker: 'Council & VC office' },
  sysadmin: { title: 'ICT directorate', kicker: 'Security & infrastructure' },
  module_map: { title: 'System blueprint', kicker: '40-module architecture' },
};
