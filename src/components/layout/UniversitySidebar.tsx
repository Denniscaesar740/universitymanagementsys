import React from 'react';
import { useAums } from '../../context/AumsContext';
import { useLayout } from '../../context/LayoutContext';
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
        title: 'Home',
        items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }],
      },
      {
        title: 'Academics',
        items: [
          { id: 'results', label: 'Statement of results', icon: FileText },
          { id: 'registration', label: 'Course registration', icon: BookOpen },
          { id: 'proof', label: 'Proof of registration', icon: Printer },
          { id: 'timetable', label: 'Lectures & venues', icon: Clock },
          { id: 'elearning', label: 'Virtual learning', icon: Globe },
        ],
      },
      {
        title: 'Campus',
        items: [
          { id: 'finance', label: 'Fees & payment', icon: CreditCard },
          { id: 'hostel', label: 'Hostel allocation', icon: Building2 },
        ],
      },
    ],
  },
  lecturer: {
    groups: [
      {
        title: 'Teaching',
        items: [
          { id: 'marksheet', label: 'Marksheet upload', icon: ClipboardList },
          { id: 'attendance', label: 'Attendance', icon: CheckSquare },
        ],
      },
      {
        title: 'Courses',
        items: [
          { id: 'offerings', label: 'Allocations', icon: BookOpen },
          { id: 'materials', label: 'Materials', icon: FileText },
        ],
      },
    ],
  },
  academic_admin: {
    groups: [
      {
        title: 'Examinations',
        items: [
          { id: 'approvals', label: 'Results desk', icon: FileCheck, badge: '3' },
          { id: 'courses', label: 'Course catalogue', icon: BookOpen },
          { id: 'offerings', label: 'Allocations', icon: Building2 },
        ],
      },
      {
        title: 'Governance',
        items: [
          { id: 'calendar', label: 'Academic calendar', icon: CalendarDays },
          { id: 'timetable', label: 'Timetable', icon: Clock },
        ],
      },
    ],
  },
  admissions: {
    groups: [
      {
        title: 'Desk',
        items: [
          { id: 'applications', label: 'Applications', icon: UserPlus, badge: '3' },
          { id: 'statistics', label: 'Intake stats', icon: BarChart3 },
        ],
      },
      {
        title: 'Processing',
        items: [
          { id: 'review', label: 'Review', icon: FileCheck },
          { id: 'letters', label: 'Letters', icon: Printer },
        ],
      },
    ],
  },
  applicant: {
    groups: [
      {
        title: 'Application',
        items: [
          { id: 'status', label: 'Track status', icon: Search },
          { id: 'letter', label: 'Admission letter', icon: Award },
        ],
      },
    ],
  },
  registry: {
    groups: [
      {
        title: 'Records',
        items: [
          { id: 'biodata', label: 'Master biodata', icon: Users, badge: String(INITIAL_STUDENTS.length) },
          { id: 'degree_audit', label: 'Degree audit', icon: Award },
          { id: 'transcripts', label: 'Transcripts', icon: FileText },
        ],
      },
      {
        title: 'Graduation',
        items: [
          { id: 'graduation', label: 'Clearance', icon: GraduationCap },
          { id: 'certificates', label: 'Certificates', icon: Printer },
        ],
      },
    ],
  },
  finance: {
    groups: [
      {
        title: 'Revenue',
        items: [
          { id: 'invoices', label: 'Invoices', icon: Calculator },
          { id: 'transactions', label: 'Payments', icon: CreditCard },
          { id: 'clearance', label: 'Clearance', icon: ShieldCheck },
        ],
      },
      {
        title: 'Reports',
        items: [
          { id: 'reports', label: 'Revenue', icon: BarChart3 },
          { id: 'scholarships', label: 'Financial aid', icon: Award },
        ],
      },
    ],
  },
  management: {
    groups: [
      {
        title: 'Insights',
        items: [
          { id: 'dashboard', label: 'KPI dashboard', icon: BarChart3 },
          { id: 'enrolment', label: 'Enrolment', icon: Users },
        ],
      },
      {
        title: 'Quality',
        items: [
          { id: 'accreditation', label: 'Accreditation', icon: Award },
          { id: 'strategic', label: 'Strategy', icon: Globe },
        ],
      },
    ],
  },
  sysadmin: {
    groups: [
      {
        title: 'Security',
        items: [
          { id: 'audit', label: 'Audit trail', icon: Activity },
          { id: 'rbac', label: 'Roles & RBAC', icon: Users },
        ],
      },
      {
        title: 'Infrastructure',
        items: [
          { id: 'settings', label: 'Settings', icon: Settings },
          { id: 'backups', label: 'Backups', icon: Database },
          { id: 'integrations', label: 'Integrations', icon: HardDrive },
        ],
      },
    ],
  },
  hr: {
    groups: [
      {
        title: 'People',
        items: [
          { id: 'staff', label: 'Directory', icon: Briefcase },
          { id: 'leave', label: 'Leave', icon: CalendarDays },
          { id: 'payroll', label: 'Payroll', icon: Calculator },
          { id: 'appraisal', label: 'Appraisal', icon: Award },
          { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
        ],
      },
    ],
  },
  module_map: {
    groups: [
      {
        title: 'Architecture',
        items: [
          { id: 'blueprint', label: '40-module map', icon: Layers },
          { id: 'lifecycle', label: 'Student lifecycle', icon: Activity },
        ],
      },
    ],
  },
};

const PORTAL_IDENTITY: Record<string, { title: string; subtitle: string; icon: React.ElementType }> = {
  lecturer: { title: 'Faculty portal', subtitle: 'Computer Science & Eng.', icon: GraduationCap },
  academic_admin: { title: 'Academic governance', subtitle: 'Board of Examiners', icon: FileCheck },
  admissions: { title: 'Admissions desk', subtitle: '2026/2027 intake', icon: UserPlus },
  applicant: { title: 'Applicant portal', subtitle: 'Undergraduate', icon: GraduationCap },
  registry: { title: 'Registry', subtitle: 'Academic affairs', icon: Users },
  finance: { title: 'Finance', subtitle: 'Bursary', icon: Calculator },
  management: { title: 'Executive office', subtitle: 'VC & Council', icon: BarChart3 },
  sysadmin: { title: 'ICT directorate', subtitle: 'Security & audit', icon: ShieldCheck },
  hr: { title: 'Human resources', subtitle: 'Staff directorate', icon: Briefcase },
  module_map: { title: 'Blueprint', subtitle: '40-module map', icon: Layers },
};

export const UniversitySidebar: React.FC<SidebarProps> = ({ currentSubView, setCurrentSubView }) => {
  const { students, activePortal, notificationCount, openWorkspace } = useAums();
  const { sidebarCollapsed } = useLayout();
  const student = students && students.length > 0 ? students[0] : INITIAL_STUDENTS[0];
  const config = SIDEBAR_CONFIG[activePortal] || SIDEBAR_CONFIG.student;
  const portalIdentity = PORTAL_IDENTITY[activePortal];

  const handleNavClick = (item: NavItem) => {
    if (item.portal) {
      openWorkspace(item.portal, item.id);
    } else {
      setCurrentSubView(item.id);
    }
  };

  return (
    <aside className={`portal-sidebar no-print ${sidebarCollapsed ? 'is-collapsed' : ''}`}>
      {activePortal === 'student' && (
        <div className="sidebar-student-card">
          <img src={student.photoUrl} alt={student.fullName} className="sidebar-student-photo" />
          <div className="sidebar-identity-copy">
            <div className="sidebar-name">{student.fullName}</div>
            <div className="sidebar-index">{student.indexNumber}</div>
            <div className="sidebar-meta">
              {student.programmeName}
              <br />
              Level {student.currentLevel} · {student.studyMode}
            </div>
            <div className="sidebar-pills">
              <span className={`uni-badge ${student.financialClearance ? 'badge-cleared' : 'badge-arrears'}`}>
                {student.financialClearance ? 'Cleared' : 'Arrears'}
              </span>
              <span className="uni-badge badge-official">CGPA {student.cgpa.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {activePortal !== 'student' && portalIdentity && (
        <div className="sidebar-portal-identity">
          <div className="sidebar-portal-icon">
            <portalIdentity.icon size={20} />
          </div>
          <div className="sidebar-identity-copy">
            <div className="sidebar-name">{portalIdentity.title}</div>
            <div className="sidebar-meta">{portalIdentity.subtitle}</div>
          </div>
        </div>
      )}

      <div className="sidebar-scroll">
        {config.groups.map((group, gIdx) => (
          <div className="sidebar-nav-group" key={gIdx}>
            <div className="sidebar-nav-group-title">{group.title}</div>
            {group.items.map((item) => {
              const isActive = currentSubView === item.id;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  title={item.label}
                >
                  <IconComponent size={16} />
                  <span>{item.label}</span>
                  {item.badge && <span className="sidebar-nav-badge">{item.badge}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <span>{notificationCount} notices</span>
        <span>AIMS 3.0</span>
      </div>
    </aside>
  );
};
