import React from 'react';
import { useAums } from '../../context/AumsContext';
import {
  FileText,
  BookOpen,
  CreditCard,
  GraduationCap,
  Users,
  ShieldCheck,
  Building2,
  BarChart3,
  Layers,
  FileCheck,
  Printer,
  UserPlus,
  Calculator,
  ClipboardList,
  Activity,
  Settings,
  Database,
  Megaphone,
  Award,
  LayoutDashboard,
  Briefcase,
  CalendarDays,
  Globe,
  Search,
  CheckSquare,
  Clock,
  HardDrive,
} from 'lucide-react';

import { INITIAL_STUDENTS } from '../../data/initialData';
import type { PortalId } from '../../types/models';

interface SidebarProps {
  currentSubView: string;
  setCurrentSubView: (view: string) => void;
}

// Define navigation structure per portal
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  portal?: PortalId;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const SIDEBAR_CONFIG: Record<string, { groups: NavGroup[] }> = {
  student: {
    groups: [
      {
        title: 'Dashboard',
        items: [
          { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
        ],
      },
      {
        title: 'Academic Services',
        items: [
          { id: 'results', label: 'Statement of Results', icon: FileText },
          { id: 'registration', label: 'Course Registration', icon: BookOpen },
          { id: 'proof', label: 'Proof of Registration', icon: Printer },
          { id: 'timetable', label: 'Lectures & Venues', icon: Clock },
          { id: 'elearning', label: 'Virtual Learning (LMS)', icon: Globe },
        ],
      },
      {
        title: 'Campus Life & Services',
        items: [
          { id: 'finance', label: 'Fees & Payment', icon: CreditCard },
          { id: 'hostel', label: 'Hostel & Hall Allocation', icon: Building2 },
        ],
      },
    ],
  },
  lecturer: {
    groups: [
      {
        title: 'Teaching Portal',
        items: [
          { id: 'marksheet', label: 'Marksheet Upload', icon: ClipboardList },
          { id: 'attendance', label: 'Attendance Register', icon: CheckSquare },
        ],
      },
      {
        title: 'My Courses',
        items: [
          { id: 'offerings', label: 'Teaching Allocations', icon: BookOpen },
          { id: 'materials', label: 'Course Materials', icon: FileText },
        ],
      },
    ],
  },
  academic_admin: {
    groups: [
      {
        title: 'Examination Board',
        items: [
          { id: 'approvals', label: 'Results Approval Desk', icon: FileCheck, badge: '3' },
          { id: 'courses', label: 'Master Course Catalogue', icon: BookOpen },
          { id: 'offerings', label: 'Teaching Allocations', icon: Building2 },
        ],
      },
      {
        title: 'Academic Governance',
        items: [
          { id: 'calendar', label: 'Academic Calendar', icon: CalendarDays },
          { id: 'timetable', label: 'Timetable & Venues', icon: Clock },
        ],
      },
    ],
  },
  admissions: {
    groups: [
      {
        title: 'Admissions Desk',
        items: [
          { id: 'applications', label: 'Application Dossiers', icon: UserPlus, badge: '3' },
          { id: 'statistics', label: 'Intake Statistics', icon: BarChart3 },
        ],
      },
      {
        title: 'Processing',
        items: [
          { id: 'review', label: 'Review & Decision', icon: FileCheck },
          { id: 'letters', label: 'Admission Letters', icon: Printer },
        ],
      },
    ],
  },
  applicant: {
    groups: [
      {
        title: 'Application Status',
        items: [
          { id: 'status', label: 'Track Application', icon: Search },
          { id: 'letter', label: 'Admission Letter', icon: Award },
        ],
      },
    ],
  },
  registry: {
    groups: [
      {
        title: 'Student Records',
        items: [
          { id: 'biodata', label: 'Master Biodata', icon: Users, badge: String(INITIAL_STUDENTS.length) },
          { id: 'degree_audit', label: 'Degree Audit', icon: Award },
          { id: 'transcripts', label: 'Transcript Requests', icon: FileText },
        ],
      },
      {
        title: 'Graduation',
        items: [
          { id: 'graduation', label: 'Graduation Clearance', icon: GraduationCap },
          { id: 'certificates', label: 'Certificate Issuance', icon: Printer },
        ],
      },
    ],
  },
  finance: {
    groups: [
      {
        title: 'Revenue Management',
        items: [
          { id: 'invoices', label: 'Student Invoices', icon: Calculator },
          { id: 'transactions', label: 'Payment Transactions', icon: CreditCard },
          { id: 'clearance', label: 'Clearance Tokens', icon: ShieldCheck },
        ],
      },
      {
        title: 'Fiscal Reporting',
        items: [
          { id: 'reports', label: 'Revenue Reports', icon: BarChart3 },
          { id: 'scholarships', label: 'Financial Aid', icon: Award },
        ],
      },
    ],
  },
  management: {
    groups: [
      {
        title: 'Executive Insights',
        items: [
          { id: 'dashboard', label: 'KPI Dashboard', icon: BarChart3 },
          { id: 'enrolment', label: 'Enrolment Analytics', icon: Users },
        ],
      },
      {
        title: 'Quality Assurance',
        items: [
          { id: 'accreditation', label: 'Accreditation Status', icon: Award },
          { id: 'strategic', label: 'Strategic Metrics', icon: Globe },
        ],
      },
    ],
  },
  sysadmin: {
    groups: [
      {
        title: 'Security & Compliance',
        items: [
          { id: 'audit', label: 'Live Audit Trail', icon: Activity },
          { id: 'rbac', label: 'User Roles & RBAC', icon: Users },
        ],
      },
      {
        title: 'Infrastructure',
        items: [
          { id: 'settings', label: 'System Settings', icon: Settings },
          { id: 'backups', label: 'Backup & Recovery', icon: Database },
          { id: 'integrations', label: 'API & Integrations', icon: HardDrive },
        ],
      },
    ],
  },
  hr: {
    groups: [
      {
        title: 'Staff Management',
        items: [
          { id: 'staff', label: 'Staff Directory', icon: Briefcase },
          { id: 'leave', label: 'Leave Management', icon: CalendarDays },
          { id: 'payroll', label: 'Payroll Overview', icon: Calculator },
        ],
      },
    ],
  },
  module_map: {
    groups: [
      {
        title: 'System Architecture',
        items: [
          { id: 'blueprint', label: '40-Module Blueprint', icon: Layers },
          { id: 'lifecycle', label: 'Student Lifecycle', icon: Activity },
        ],
      },
    ],
  },
};

// Portal identity info for non-student portals
const PORTAL_IDENTITY: Record<string, { title: string; subtitle: string; icon: React.ElementType; color: string }> = {
  lecturer: { title: 'Faculty Teaching Portal', subtitle: 'Dept. of Computer Science & Eng.', icon: GraduationCap, color: '#7c3aed' },
  academic_admin: { title: 'Academic Governance', subtitle: 'Senate Board of Examiners', icon: FileCheck, color: '#003822' },
  admissions: { title: 'Admissions Desk', subtitle: '2026/2027 Intake Processing', icon: UserPlus, color: '#15803d' },
  applicant: { title: 'Applicant Portal', subtitle: 'Undergraduate Admissions', icon: GraduationCap, color: '#0284c7' },
  registry: { title: 'Registry Directorate', subtitle: 'Academic Affairs & Records', icon: Users, color: '#003822' },
  finance: { title: 'Finance Directorate', subtitle: 'Student Accounts & Bursary', icon: Calculator, color: '#d97706' },
  management: { title: 'Executive Management', subtitle: 'VC & University Council', icon: BarChart3, color: '#7c3aed' },
  sysadmin: { title: 'ICT Directorate', subtitle: 'Cyberinfrastructure & Audit', icon: ShieldCheck, color: '#e11d48' },
  hr: { title: 'Human Resources', subtitle: 'Staff Directorate', icon: Briefcase, color: '#0284c7' },
  module_map: { title: 'System Blueprint', subtitle: '40-Module Architecture', icon: Layers, color: '#003822' },
};

export const UniversitySidebar: React.FC<SidebarProps> = ({ currentSubView, setCurrentSubView }) => {
  const { students, activePortal, setActivePortal, notificationCount } = useAums();
  const student = (students && students.length > 0) ? students[0] : INITIAL_STUDENTS[0];
  const config = SIDEBAR_CONFIG[activePortal] || SIDEBAR_CONFIG.student;
  const portalIdentity = PORTAL_IDENTITY[activePortal];

  const handleNavClick = (item: NavItem) => {
    if (item.portal) {
      setActivePortal(item.portal);
    }
    setCurrentSubView(item.id);
  };

  return (
    <aside className="portal-sidebar no-print">
      {/* Student Passport Card (shown only for student portal) */}
      {activePortal === 'student' && (
        <div className="sidebar-student-card">
          <img
            src={student.photoUrl}
            alt={student.fullName}
            className="sidebar-student-photo"
          />
          <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.25 }}>
            {student.fullName.toUpperCase()}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--uni-green)', fontWeight: 700, marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
            INDEX: {student.indexNumber}
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
            REF: {student.id}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {student.programmeName}
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Level {student.currentLevel} • {student.studyMode}
          </div>

          <div style={{ marginTop: '8px', display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className={`uni-badge ${student.financialClearance ? 'badge-cleared' : 'badge-arrears'}`}>
              {student.financialClearance ? '✓ Cleared' : '✕ Arrears'}
            </span>
            <span className="uni-badge badge-official">
              CGPA: {student.cgpa.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Portal Identity Card (shown for non-student portals) */}
      {activePortal !== 'student' && portalIdentity && (
        <div className="sidebar-portal-identity" style={{ background: portalIdentity.color }}>
          <div className="sidebar-portal-icon">
            <portalIdentity.icon size={22} />
          </div>
          <div style={{ fontWeight: 800, fontSize: '13px', lineHeight: 1.25 }}>
            {portalIdentity.title.toUpperCase()}
          </div>
          <div style={{ fontSize: '10.5px', opacity: 0.8, marginTop: '2px' }}>
            {portalIdentity.subtitle}
          </div>
        </div>
      )}

      {/* Dynamic Navigation Groups */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {config.groups.map((group, gIdx) => (
          <div className="sidebar-nav-group" key={gIdx}>
            <div className="sidebar-nav-group-title">{group.title}</div>
            {group.items.map(item => {
              const isActive = currentSubView === item.id;
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                >
                  <IconComponent size={15} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="sidebar-nav-badge">{item.badge}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Cross-Portal Quick Links (always visible at bottom) */}
        <div className="sidebar-nav-group">
          <div className="sidebar-nav-group-title">Quick Links</div>
          {activePortal !== 'module_map' && (
            <div
              onClick={() => { setActivePortal('module_map'); setCurrentSubView('blueprint'); }}
              className="sidebar-nav-item"
            >
              <Layers size={15} />
              <span>40-Module Blueprint</span>
            </div>
          )}
          {activePortal !== 'sysadmin' && (
            <div
              onClick={() => { setActivePortal('sysadmin'); setCurrentSubView('audit'); }}
              className="sidebar-nav-item"
            >
              <ShieldCheck size={15} />
              <span>Audit Trail</span>
            </div>
          )}
          {activePortal !== 'management' && (
            <div
              onClick={() => { setActivePortal('management'); setCurrentSubView('dashboard'); }}
              className="sidebar-nav-item"
            >
              <BarChart3 size={15} />
              <span>Executive Analytics</span>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
          <Megaphone size={10} />
          <span>{notificationCount} Active Notices</span>
        </div>
        <div style={{ marginTop: '4px', color: 'var(--uni-gold)', fontWeight: 700 }}>
          AUMS v2.4.0
        </div>
      </div>
    </aside>
  );
};
