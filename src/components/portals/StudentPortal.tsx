import React, { useState } from 'react';
import { useAums } from '../../context/AumsContext';
import {
  FileText,
  Printer,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  CreditCard,
  Smartphone,
  ShieldCheck,
  LayoutDashboard,
  Clock,
  BookOpen,
  Building2,
  Calendar,
  Award,
  Check,
  Upload,
  Megaphone,
} from 'lucide-react';

interface StudentPortalProps {
  currentSubView?: string;
}

type SubTabId = 'dashboard' | 'results' | 'registration' | 'proof' | 'timetable' | 'elearning' | 'hostel' | 'finance';

export const StudentPortal: React.FC<StudentPortalProps> = ({ currentSubView = 'dashboard' }) => {
  const {
    students,
    courses,
    registrations,
    invoices,
    notices,
    registerCourseForStudent,
    dropCourseRegistration,
    processPayment,
  } = useAums();

  const [activeTab, setActiveTab] = useState<SubTabId>(
    (currentSubView as SubTabId) || 'dashboard'
  );

  React.useEffect(() => {
    const validTabs: SubTabId[] = ['dashboard', 'results', 'registration', 'proof', 'timetable', 'elearning', 'hostel', 'finance'];
    if (currentSubView && validTabs.includes(currentSubView as SubTabId)) {
      setActiveTab(currentSubView as SubTabId);
    }
  }, [currentSubView]);

  const [selectedCourseToRegister, setSelectedCourseToRegister] = useState<string>('');
  const [regFeedback, setRegFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Pay modal state
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [payAmount, setPayAmount] = useState<number>(4850);
  const [payChannel, setPayChannel] = useState<'MTN Mobile Money' | 'Telecel Cash' | 'Visa/Mastercard'>('MTN Mobile Money');

  // Assignment upload feedback state
  const [uploadedAssignment, setUploadedAssignment] = useState<string | null>(null);

  // Maintenance request state
  const [maintenanceIssue, setMaintenanceIssue] = useState<string>('');
  const [maintenanceSuccess, setMaintenanceSuccess] = useState<boolean>(false);

  const student = (students && students.length > 0) ? students[0] : {
    id: 'STU-2024-0192',
    indexNumber: '022410041',
    applicationNumber: 'APP-2024-1049',
    fullName: 'Kofi Mensah Boateng',
    email: 'k.mensah@st.alpha.edu.gh',
    phone: '+233 24 123 4567',
    gender: 'Male' as const,
    dateOfBirth: '2004-05-14',
    nationality: 'Ghanaian',
    programmeId: 'PRG-BENG-CE',
    programmeName: 'BSc Computer Engineering',
    department: 'Computer Science & Engineering',
    faculty: 'Faculty of Engineering & Technology',
    admissionYear: 2024,
    currentLevel: 200 as const,
    studyMode: 'Regular' as const,
    campus: 'Main Tarkwa Campus',
    status: 'Active' as const,
    financialClearance: true,
    totalCreditsCompleted: 36,
    cgpa: 3.78,
    guardianName: 'Nana Yaw Boateng',
    guardianPhone: '+233 20 888 9900',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  };

  const studentInvoices = invoices.filter(inv => inv.studentId === student.id);
  const studentRegistrations = registrations.filter(r => r.studentId === student.id);
  const currentSemesterCredits = studentRegistrations.reduce((acc, curr) => acc + curr.creditHours, 0);

  const handleRegisterCourse = () => {
    if (!selectedCourseToRegister) return;
    const res = registerCourseForStudent(student.id, selectedCourseToRegister);
    if (res.success) {
      setRegFeedback({ type: 'success', message: res.message });
      setSelectedCourseToRegister('');
    } else {
      setRegFeedback({ type: 'error', message: res.message });
    }
    setTimeout(() => setRegFeedback(null), 5000);
  };

  const handleMakePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentInvoices.length === 0) return;
    processPayment(studentInvoices[0].id, payAmount, payChannel);
    setShowPayModal(false);
  };

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maintenanceIssue.trim()) return;
    setMaintenanceSuccess(true);
    setMaintenanceIssue('');
    setTimeout(() => setMaintenanceSuccess(false), 5000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="uni-card no-print" style={{ padding: '16px 18px', background: 'linear-gradient(135deg, var(--uni-gold-subtle), var(--bg-card))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div className="eyebrow">Office of the Registrar · Semester II</div>
            <div style={{ fontSize: '15px', fontWeight: 600, marginTop: '4px' }}>
              Complete AFUF payment and departmental validation before examination dockets open.
            </div>
          </div>
          <button onClick={() => window.print()} className="btn-uni-primary">
            <Printer size={14} />
            <span>Print record</span>
          </button>
        </div>
      </div>

      {/* VIEW 0: STUDENT OVERVIEW DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Student Hero Banner */}
          <div
            className="uni-card"
            style={{
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <img
                  src={student.photoUrl}
                  alt={student.fullName}
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    border: '3px solid var(--uni-gold)',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span className="uni-badge badge-official">
                      {student.indexNumber}
                    </span>
                    <span className="uni-badge badge-cleared">
                      Level {student.currentLevel} • {student.studyMode}
                    </span>
                    <span className="uni-badge badge-pending">
                      {student.campus}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 4px' }}>
                    {student.fullName}
                  </h2>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {student.programmeName} • {student.faculty}
                  </div>
                </div>
              </div>

              {/* Status Badge Group */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Academic Standing
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#15803d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} />
                  <span>Good Standing (First Class Division)</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Clearance Ref: <strong>CLR-2026-9921</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Official Academic KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="uni-card" style={{ padding: '16px', borderTop: '3px solid var(--uni-green)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>CUMULATIVE CGPA</span>
                <Award size={16} color="var(--uni-green)" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--uni-green)', fontFamily: 'var(--font-mono)' }}>
                {student.cgpa.toFixed(2)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Classification: <strong>First Class Honours</strong>
              </div>
            </div>

            <div className="uni-card" style={{ padding: '16px', borderTop: '3px solid var(--uni-gold)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>CURRENT REGISTERED CREDITS</span>
                <BookOpen size={16} color="#b45309" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#b45309', fontFamily: 'var(--font-mono)' }}>
                {currentSemesterCredits} / 21
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Max 21 Credit Hours Permitted
              </div>
            </div>

            <div className="uni-card" style={{ padding: '16px', borderTop: '3px solid #0284c7' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>PASSED CREDITS TO DATE</span>
                <CheckCircle2 size={16} color="#0284c7" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284c7', fontFamily: 'var(--font-mono)' }}>
                {student.totalCreditsCompleted}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Out of 138 Graduation Target
              </div>
            </div>

            <div className="uni-card" style={{ padding: '16px', borderTop: '3px solid #16a34a' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>FINANCIAL CLEARANCE</span>
                <ShieldCheck size={16} color="#16a34a" />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>
                100% Cleared
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Docket Issued for Semester II
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="uni-card" style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--uni-green)', marginBottom: '12px' }}>
              Frequent Student Services
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button onClick={() => setActiveTab('results')} className="btn-uni-primary">
                <FileText size={14} />
                <span>Download Results Slip</span>
              </button>
              <button onClick={() => setActiveTab('registration')} className="btn-uni-secondary">
                <Plus size={14} />
                <span>Register Courses</span>
              </button>
              <button onClick={() => setActiveTab('proof')} className="btn-uni-secondary">
                <Printer size={14} />
                <span>Proof of Registration</span>
              </button>
              <button onClick={() => setActiveTab('timetable')} className="btn-uni-secondary">
                <Clock size={14} />
                <span>Lecture Timetable</span>
              </button>
              <button onClick={() => setActiveTab('hostel')} className="btn-uni-secondary">
                <Building2 size={14} />
                <span>Hostel Allocation</span>
              </button>
              <button onClick={() => setActiveTab('finance')} className="btn-uni-gold">
                <CreditCard size={14} />
                <span>Student Accounts & MoMo</span>
              </button>
            </div>
          </div>

          {/* Two-Column Grid: Registered Courses & Academic Calendar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '20px' }}>
            {/* Left: Registered Courses Snapshot */}
            <div className="uni-card">
              <div className="uni-card-header">
                <h3>
                  <BookOpen size={15} color="var(--uni-green)" />
                  <span>Current Registered Courses (2025/2026 Semester 2)</span>
                </h3>
                <span className="uni-badge badge-official">{studentRegistrations.length} Enrolled</span>
              </div>
              <div className="uni-card-body" style={{ padding: 0 }}>
                <table className="uni-data-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Title</th>
                      <th style={{ textAlign: 'center' }}>Credits</th>
                      <th>Lecturer</th>
                      <th>Docket Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentRegistrations.map(r => (
                      <tr key={r.id}>
                        <td className="font-mono" style={{ fontWeight: 700, color: 'var(--uni-green)' }}>
                          {r.courseCode}
                        </td>
                        <td>{r.courseTitle}</td>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{r.creditHours}</td>
                        <td style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Faculty of Eng.</td>
                        <td>
                          <span className="uni-badge badge-cleared" style={{ fontSize: '10px' }}>
                            <Check size={10} /> Qualified (92%)
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Academic Milestones & Notices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="uni-card">
                <div className="uni-card-header">
                  <h3>
                    <Calendar size={15} color="var(--uni-gold)" />
                    <span>Academic Milestones</span>
                  </h3>
                </div>
                <div className="uni-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ borderLeft: '3px solid var(--uni-green)', paddingLeft: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>Course Registration Deadline</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Friday 27th March 2026 • 23:59 GMT</div>
                  </div>
                  <div style={{ borderLeft: '3px solid #b45309', paddingLeft: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>Mid-Semester Test Week</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>14th - 18th April 2026</div>
                  </div>
                  <div style={{ borderLeft: '3px solid #0284c7', paddingLeft: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>Supplementary Exam Registration</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>2nd - 6th May 2026</div>
                  </div>
                  <div style={{ borderLeft: '3px solid #dc2626', paddingLeft: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>End of Semester Examinations</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>25th May - 12th June 2026</div>
                  </div>
                </div>
              </div>

              {/* Campus Bulletins */}
              <div className="uni-card">
                <div className="uni-card-header">
                  <h3>
                    <Megaphone size={15} color="var(--uni-green)" />
                    <span>Official Circulars</span>
                  </h3>
                </div>
                <div className="uni-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                  {notices.slice(0, 2).map(n => (
                    <div key={n.id} style={{ padding: '8px', background: 'var(--surface-subtle)', borderRadius: '3px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--uni-green)' }}>{n.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {n.content.substring(0, 90)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1: AUTHENTIC GHANAIAN STATEMENT OF RESULTS (UMaT / UG FORMAT) */}
      {activeTab === 'results' && (
        <div className="official-transcript-sheet">
          {/* Official Letterhead */}
          <div className="transcript-header-center">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '8px' }}>
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#003822" stroke="#d4af37" strokeWidth="4"/>
                <path d="M50 16 L76 34 L76 68 L50 84 L24 68 L24 34 Z" fill="#ffffff" stroke="#d4af37" strokeWidth="2.5"/>
                <path d="M50 25 L50 75 M32 45 L68 45" stroke="#003822" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="10" fill="#d4af37"/>
              </svg>
            </div>
            <h2>UNIVERSITY OF MINES AND TECHNOLOGY (UMaT), TARKWA</h2>
            <div className="office-subtitle">
              P.O. BOX 237, TARKWA, WESTERN REGION, GHANA • TEL: +233 3123 20324
            </div>
            <div className="office-subtitle" style={{ color: '#003822', fontWeight: 800 }}>
              DIRECTORATE OF ACADEMIC AFFAIRS • OFFICE OF THE REGISTRAR
            </div>
            <div className="doc-title">
              PROVISIONAL STATEMENT OF EXAMINATION RESULTS
            </div>
          </div>

          {/* Student Authoritative Metadata Box */}
          <div className="student-meta-grid">
            <div className="meta-row">
              <span className="meta-label">STUDENT NAME:</span>
              <span className="meta-val">{student.fullName.toUpperCase()}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">INDEX NUMBER:</span>
              <span className="meta-val font-mono">{student.indexNumber}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">STUDENT ID (REF):</span>
              <span className="meta-val font-mono">{student.id}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">PROGRAMME:</span>
              <span className="meta-val">{student.programmeName}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">FACULTY / SCHOOL:</span>
              <span className="meta-val">{student.faculty}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">DEPARTMENT:</span>
              <span className="meta-val">{student.department}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">CURRENT LEVEL:</span>
              <span className="meta-val">LEVEL {student.currentLevel} • {student.studyMode.toUpperCase()}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">DATE OF ADMISSION:</span>
              <span className="meta-val">SEPTEMBER {student.admissionYear}</span>
            </div>
          </div>

          {/* Semester 1 Historic Results */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ background: '#003822', color: '#ffffff', padding: '6px 12px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.04em' }}>
              ACADEMIC YEAR: 2024/2025 • FIRST SEMESTER (LEVEL 100)
            </div>
            <table className="transcript-results-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th style={{ textAlign: 'center' }}>Credit Hours</th>
                  <th style={{ textAlign: 'center' }}>Total Score</th>
                  <th style={{ textAlign: 'center' }}>Grade</th>
                  <th style={{ textAlign: 'center' }}>Grade Point</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono">MATH101</td>
                  <td>Calculus with Analytic Geometry</td>
                  <td style={{ textAlign: 'center' }}>4</td>
                  <td style={{ textAlign: 'center' }}>82</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>A</td>
                  <td style={{ textAlign: 'center' }}>16.0</td>
                </tr>
                <tr>
                  <td className="font-mono">CE101</td>
                  <td>Introduction to Computing & Logic</td>
                  <td style={{ textAlign: 'center' }}>3</td>
                  <td style={{ textAlign: 'center' }}>88</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>A</td>
                  <td style={{ textAlign: 'center' }}>12.0</td>
                </tr>
                <tr>
                  <td className="font-mono">PHYS101</td>
                  <td>General Physics I (Mechanics & Heat)</td>
                  <td style={{ textAlign: 'center' }}>3</td>
                  <td style={{ textAlign: 'center' }}>76</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>B+</td>
                  <td style={{ textAlign: 'center' }}>10.5</td>
                </tr>
                <tr>
                  <td className="font-mono">ENG101</td>
                  <td>Communication Skills I</td>
                  <td style={{ textAlign: 'center' }}>2</td>
                  <td style={{ textAlign: 'center' }}>74</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>B</td>
                  <td style={{ textAlign: 'center' }}>6.0</td>
                </tr>
              </tbody>
            </table>
            <div className="semester-summary-bar">
              <span>Semester Credits Registered: <strong>12</strong></span>
              <span>Semester Credits Passed: <strong>12</strong></span>
              <span>Semester GPA: <strong>3.71</strong></span>
              <span>Cumulative CGPA: <strong>3.71</strong></span>
            </div>
          </div>

          {/* Current Semester Active Results */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ background: '#003822', color: '#ffffff', padding: '6px 12px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.04em' }}>
              ACADEMIC YEAR: 2025/2026 • SECOND SEMESTER (LEVEL 200 - CURRENT)
            </div>
            <table className="transcript-results-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th style={{ textAlign: 'center' }}>Credit Hours</th>
                  <th style={{ textAlign: 'center' }}>CA (40%)</th>
                  <th style={{ textAlign: 'center' }}>Exam (60%)</th>
                  <th style={{ textAlign: 'center' }}>Total</th>
                  <th style={{ textAlign: 'center' }}>Grade</th>
                  <th style={{ textAlign: 'center' }}>Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {studentRegistrations.map(r => (
                  <tr key={r.id}>
                    <td className="font-mono" style={{ fontWeight: 700 }}>{r.courseCode}</td>
                    <td>{r.courseTitle}</td>
                    <td style={{ textAlign: 'center' }}>{r.creditHours}</td>
                    <td style={{ textAlign: 'center' }}>{r.published ? r.caScore : '—'}</td>
                    <td style={{ textAlign: 'center' }}>{r.published ? r.examScore : '—'}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{r.published ? r.totalScore : 'Pending Moderation'}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: r.grade === 'A' ? '#15803d' : '#0f172a' }}>
                      {r.published ? r.grade : '—'}
                    </td>
                    <td style={{ textAlign: 'center' }}>{r.published ? (r.gradePoint * r.creditHours).toFixed(1) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="semester-summary-bar">
              <span>Registered Credits: <strong>{currentSemesterCredits}</strong></span>
              <span>Academic Status: <strong>NORMAL / GOOD STANDING</strong></span>
              <span>Cumulative CGPA: <strong style={{ color: '#003822', fontSize: '13px' }}>{student.cgpa.toFixed(2)}</strong></span>
            </div>
          </div>

          {/* Official Ghana Grading System Standard Scale */}
          <div style={{ marginTop: '20px', border: '1px solid #cbd5e1', padding: '10px 14px', background: '#f8fafc', fontSize: '10.5px' }}>
            <div style={{ fontWeight: 800, color: '#003822', marginBottom: '4px', textTransform: 'uppercase' }}>
              Official Ghanaian University Grading Scale & Class Designations (Senate Approved)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', color: '#475569' }}>
              <div>80 - 100%: <strong>A (4.00)</strong> Excellent</div>
              <div>75 - 79%: <strong>B+ (3.50)</strong> Very Good</div>
              <div>70 - 74%: <strong>B (3.00)</strong> Good</div>
              <div>65 - 69%: <strong>C+ (2.50)</strong> Above Average</div>
              <div>60 - 64%: <strong>C (2.00)</strong> Average</div>
              <div>55 - 59%: <strong>D+ (1.50)</strong> Pass</div>
              <div>50 - 54%: <strong>D (1.00)</strong> Bare Pass</div>
              <div>Below 50%: <strong>F (0.00)</strong> Fail</div>
            </div>
            <div style={{ marginTop: '6px', borderTop: '1px dashed #cbd5e1', paddingTop: '4px', display: 'flex', gap: '16px', color: '#0f172a', fontWeight: 700 }}>
              <span>First Class: 3.60 - 4.00</span>
              <span>Second Class Upper: 3.00 - 3.59</span>
              <span>Second Class Lower: 2.00 - 2.99</span>
              <span>Third Class: 1.50 - 1.99</span>
              <span>Pass: 1.00 - 1.49</span>
            </div>
          </div>

          {/* Official Signatures & QR Verification */}
          <div className="transcript-footer-signatures">
            <div className="qr-box">
              <QrCode size={56} color="#003822" />
              <div style={{ fontSize: '9px', color: '#475569', marginTop: '4px', textAlign: 'center' }}>
                Scan to Verify with UMaT Registry Cloud
              </div>
            </div>

            <div className="signature-slot">
              <div className="stamp-seal">
                REGISTRAR (ACADEMIC AFFAIRS)
                <br />
                <span style={{ fontSize: '7px' }}>OFFICIALLY GAZETTED</span>
              </div>
              <div style={{ borderTop: '1px solid #000', paddingTop: '4px', width: '180px', margin: '0 auto', fontSize: '11px', fontWeight: 700 }}>
                REGISTRAR
              </div>
            </div>
          </div>

          <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
            <button onClick={() => window.print()} className="btn-uni-primary">
              <Printer size={14} />
              <span>Print Official Statement of Results</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: COURSE REGISTRATION & ADD/DROP WORKBENCH */}
      {activeTab === 'registration' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>
              <Plus size={16} color="var(--uni-green)" />
              <span>Semester Course Registration (Module 09 - Add / Drop Workbench)</span>
            </h3>
            <span className="uni-badge badge-official">
              Academic Window: Active (Closes 27th March)
            </span>
          </div>

          <div className="uni-card-body">
            {regFeedback && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '3px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: regFeedback.type === 'success' ? '#dcfce7' : '#fee2e2',
                  color: regFeedback.type === 'success' ? '#15803d' : '#b91c1c',
                  border: `1px solid ${regFeedback.type === 'success' ? '#86efac' : '#fca5a5'}`,
                  fontSize: '12.5px',
                  fontWeight: 600,
                }}
              >
                {regFeedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{regFeedback.message}</span>
              </div>
            )}

            {/* Credit Limits Meter */}
            <div style={{ background: '#f8fafc', padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px', fontWeight: 700 }}>
                <span>Semester Credit Load Meter:</span>
                <span>{currentSemesterCredits} of 21 Max Credit Hours</span>
              </div>
              <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (currentSemesterCredits / 21) * 100)}%`,
                    background: currentSemesterCredits > 21 ? '#dc2626' : 'var(--uni-green)',
                  }}
                />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                Minimum required: 15 Credits • Maximum allowable per Senate regulations: 21 Credits.
              </div>
            </div>

            {/* Registered Courses Table */}
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--uni-green)' }}>
              Currently Enrolled Courses for 2025/2026 Semester II:
            </h4>
            <table className="uni-data-table" style={{ marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th style={{ textAlign: 'center' }}>Credit Hours</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentRegistrations.map(r => (
                  <tr key={r.id}>
                    <td className="font-mono" style={{ fontWeight: 700 }}>{r.courseCode}</td>
                    <td>{r.courseTitle}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{r.creditHours}</td>
                    <td>{student.department}</td>
                    <td>
                      <span className="uni-badge badge-cleared">Approved by Advisor</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => dropCourseRegistration(r.id)}
                        title="Drop Course"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#dc2626',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add Course From Catalogue */}
            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--uni-green)' }}>
                Add Available Departmental Elective or Core Course:
              </h4>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  className="uni-input"
                  style={{ maxWidth: '420px', flex: 1 }}
                  value={selectedCourseToRegister}
                  onChange={e => setSelectedCourseToRegister(e.target.value)}
                >
                  <option value="">— Select an available course to enroll —</option>
                  {courses
                    .filter(c => !studentRegistrations.some(r => r.courseCode === c.code))
                    .map(c => (
                      <option key={c.id} value={c.code}>
                        {c.code} — {c.title} ({c.creditHours} Credits)
                      </option>
                    ))}
                </select>

                <button onClick={handleRegisterCourse} className="btn-uni-primary">
                  <Plus size={14} />
                  <span>Enroll in Course</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: PROOF OF REGISTRATION OFFICIAL SLIP */}
      {activeTab === 'proof' && (
        <div className="official-transcript-sheet">
          <div className="transcript-header-center">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#003822" stroke="#d4af37" strokeWidth="4"/>
              <path d="M50 16 L76 34 L76 68 L50 84 L24 68 L24 34 Z" fill="#ffffff" stroke="#d4af37" strokeWidth="2.5"/>
            </svg>
            <h2>UNIVERSITY OF MINES AND TECHNOLOGY (UMaT), TARKWA</h2>
            <div className="office-subtitle">DIRECTORATE OF ACADEMIC AFFAIRS</div>
            <div className="doc-title" style={{ fontSize: '13px' }}>
              OFFICIAL PROOF OF COURSE REGISTRATION SLIP (2025/2026 SEMESTER II)
            </div>
          </div>

          <div className="student-meta-grid" style={{ marginBottom: '16px' }}>
            <div className="meta-row">
              <span className="meta-label">NAME:</span>
              <span className="meta-val">{student.fullName}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">INDEX NUMBER:</span>
              <span className="meta-val font-mono">{student.indexNumber}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">STUDENT ID:</span>
              <span className="meta-val font-mono">{student.id}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">LEVEL / MODE:</span>
              <span className="meta-val">LEVEL {student.currentLevel} • REGULAR</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">PROGRAMME:</span>
              <span className="meta-val">{student.programmeName}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">FINANCIAL STATUS:</span>
              <span className="meta-val" style={{ color: '#15803d' }}>CLEARED (100% PAID)</span>
            </div>
          </div>

          <table className="uni-data-table" style={{ marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Course Title</th>
                <th style={{ textAlign: 'center' }}>Credits</th>
                <th>Lecturer</th>
                <th>Lecture Venue</th>
              </tr>
            </thead>
            <tbody>
              {studentRegistrations.map(r => (
                <tr key={r.id}>
                  <td className="font-mono" style={{ fontWeight: 700 }}>{r.courseCode}</td>
                  <td>{r.courseTitle}</td>
                  <td style={{ textAlign: 'center' }}>{r.creditHours}</td>
                  <td>Dr. Evelyn Arthur / Faculty</td>
                  <td>Engineering Block Hall A</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '16px' }}>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <div style={{ height: '35px' }}></div>
              <div style={{ borderTop: '1px solid #000', fontSize: '11px', fontWeight: 700 }}>STUDENT'S SIGNATURE</div>
            </div>
            <div style={{ textAlign: 'center', width: '200px' }}>
              <div style={{ height: '35px' }}></div>
              <div style={{ borderTop: '1px solid #000', fontSize: '11px', fontWeight: 700 }}>ACADEMIC ADVISOR / HOD</div>
            </div>
          </div>

          <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button onClick={() => window.print()} className="btn-uni-primary">
              <Printer size={14} />
              <span>Print Registration Slip</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 5: WEEKLY TIMETABLE & LECTURE VENUES (MODULE 07 & 11) */}
      {activeTab === 'timetable' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>
              <Clock size={16} color="var(--uni-green)" />
              <span>Weekly Lecture Timetable & Examination Venues (Module 07 & 11)</span>
            </h3>
            <span className="uni-badge badge-official">Academic Timetable: Week 08 Active</span>
          </div>

          <div className="uni-card-body">
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Official schedule of lectures, laboratory practicals, and tutorial sessions allocated by the Central Timetabling Directorate.
            </p>

            {/* Weekly Timetable Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              {/* Monday */}
              <div style={{ border: '1px solid var(--surface-border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--uni-green)', color: '#ffffff', padding: '8px 12px', fontWeight: 700, fontSize: '12px' }}>
                  MONDAY
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ background: '#f8fafc', padding: '8px', borderLeft: '3px solid #0284c7', borderRadius: '2px' }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a' }}>CE201 • 08:00 - 10:00</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>Data Structures & Algorithms</div>
                    <div style={{ fontSize: '10.5px', color: '#15803d', fontWeight: 600 }}>Venue: KT-LT1 (Dr. Mensah)</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '8px', borderLeft: '3px solid #d97706', borderRadius: '2px' }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a' }}>CE203 • 14:00 - 16:00</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>Digital Electronics Logic</div>
                    <div style={{ fontSize: '10.5px', color: '#15803d', fontWeight: 600 }}>Venue: Eng Lab 2 (Prof. Adjei)</div>
                  </div>
                </div>
              </div>

              {/* Tuesday */}
              <div style={{ border: '1px solid var(--surface-border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--uni-green)', color: '#ffffff', padding: '8px 12px', fontWeight: 700, fontSize: '12px' }}>
                  TUESDAY
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ background: '#f8fafc', padding: '8px', borderLeft: '3px solid #7c3aed', borderRadius: '2px' }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a' }}>CE205 • 10:00 - 13:00</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>OOP with Java (Practical)</div>
                    <div style={{ fontSize: '10.5px', color: '#15803d', fontWeight: 600 }}>Venue: Software Lab 3 (Dr. Arthur)</div>
                  </div>
                </div>
              </div>

              {/* Wednesday */}
              <div style={{ border: '1px solid var(--surface-border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--uni-green)', color: '#ffffff', padding: '8px 12px', fontWeight: 700, fontSize: '12px' }}>
                  WEDNESDAY
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ background: '#f8fafc', padding: '8px', borderLeft: '3px solid #059669', borderRadius: '2px' }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a' }}>MATH201 • 08:00 - 10:00</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>Linear Algebra & Differential Eq</div>
                    <div style={{ fontSize: '10.5px', color: '#15803d', fontWeight: 600 }}>Venue: Auditorium B (Dr. Osei)</div>
                  </div>
                </div>
              </div>

              {/* Thursday */}
              <div style={{ border: '1px solid var(--surface-border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--uni-green)', color: '#ffffff', padding: '8px 12px', fontWeight: 700, fontSize: '12px' }}>
                  THURSDAY
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ background: '#f8fafc', padding: '8px', borderLeft: '3px solid #ea580c', borderRadius: '2px' }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a' }}>CE207 • 10:00 - 12:00</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>Computer Org & Architecture</div>
                    <div style={{ fontSize: '10.5px', color: '#15803d', fontWeight: 600 }}>Venue: KT-LT2 (Dr. Asante)</div>
                  </div>
                </div>
              </div>

              {/* Friday */}
              <div style={{ border: '1px solid var(--surface-border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--uni-green)', color: '#ffffff', padding: '8px 12px', fontWeight: 700, fontSize: '12px' }}>
                  FRIDAY
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ background: '#f8fafc', padding: '8px', borderLeft: '3px solid #4b5563', borderRadius: '2px' }}>
                    <div style={{ fontWeight: 700, fontSize: '12px', color: '#0f172a' }}>ENG201 • 14:00 - 16:00</div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>Technical Report Writing</div>
                    <div style={{ fontSize: '10.5px', color: '#15803d', fontWeight: 600 }}>Venue: E-104 (Mrs. Ansah)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance & Exam Qualification Status */}
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--uni-green)' }}>
              Lecture Attendance & Examination Docket Eligibility (Module 11)
            </h4>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#475569', marginBottom: '10px' }}>
                Senate Regulation: A student must obtain at least <strong>75% lecture attendance</strong> in a course to qualify for the end of semester examination.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div style={{ background: '#ffffff', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>CE201 Data Structures</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Attended: 14 / 15 Lectures (93.3%)</div>
                  <span className="uni-badge badge-cleared" style={{ marginTop: '4px' }}>✓ Exam Eligible</span>
                </div>
                <div style={{ background: '#ffffff', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>CE203 Digital Electronics</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Attended: 13 / 15 Lectures (86.7%)</div>
                  <span className="uni-badge badge-cleared" style={{ marginTop: '4px' }}>✓ Exam Eligible</span>
                </div>
                <div style={{ background: '#ffffff', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>MATH201 Linear Algebra</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Attended: 15 / 15 Lectures (100%)</div>
                  <span className="uni-badge badge-cleared" style={{ marginTop: '4px' }}>✓ Exam Eligible</span>
                </div>
                <div style={{ background: '#ffffff', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>CE205 Java Practical</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Attended: 13 / 14 Labs (92.8%)</div>
                  <span className="uni-badge badge-cleared" style={{ marginTop: '4px' }}>✓ Exam Eligible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: E-LEARNING & VIRTUAL LMS (MODULE 21) */}
      {activeTab === 'elearning' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>
              <BookOpen size={16} color="var(--uni-green)" />
              <span>Virtual Learning Management System (LMS & E-Resources - Module 21)</span>
            </h3>
            <span className="uni-badge badge-official">UMaT Moodle / Google Classroom Synchronized</span>
          </div>

          <div className="uni-card-body">
            {uploadedAssignment && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '3px',
                  marginBottom: '16px',
                  background: '#dcfce7',
                  color: '#15803d',
                  border: '1px solid #86efac',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={16} />
                <span>Successfully submitted assignment file: "{uploadedAssignment}" to Faculty portal.</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {/* Course Materials Card 1 */}
              <div style={{ border: '1px solid var(--surface-border)', borderRadius: '4px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="uni-badge badge-official">CE201</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Dr. Mensah</span>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Data Structures & Algorithms</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Course pack: Trees, Graphs, AVL Trees, Heap Sort, Dynamic Programming.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--surface-subtle)', borderRadius: '3px' }}>
                    <span>📄 Lecture 08: Balanced Binary Search Trees.pdf</span>
                    <button style={{ color: 'var(--uni-green)', fontWeight: 700, border: 'none', background: 'transparent', cursor: 'pointer' }}>Download</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--surface-subtle)', borderRadius: '3px' }}>
                    <span>📄 Lab 04: Graph Traversal Implementation.zip</span>
                    <button style={{ color: 'var(--uni-green)', fontWeight: 700, border: 'none', background: 'transparent', cursor: 'pointer' }}>Download</button>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedAssignment('CE201_Lab4_Boateng_022410041.cpp')}
                  className="btn-uni-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Upload size={14} />
                  <span>Submit Lab 4 Assignment (Due Friday)</span>
                </button>
              </div>

              {/* Course Materials Card 2 */}
              <div style={{ border: '1px solid var(--surface-border)', borderRadius: '4px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="uni-badge badge-official">CE205</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Dr. Arthur</span>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Object-Oriented Programming (Java)</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Spring Framework, Multi-threading, Design Patterns, JDBC Database connectivity.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--surface-subtle)', borderRadius: '3px' }}>
                    <span>📄 Module 05: Concurrency and Thread Safety.pdf</span>
                    <button style={{ color: 'var(--uni-green)', fontWeight: 700, border: 'none', background: 'transparent', cursor: 'pointer' }}>Download</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--surface-subtle)', borderRadius: '3px' }}>
                    <span>🔗 GitHub Classroom Repository Link</span>
                    <button style={{ color: 'var(--uni-green)', fontWeight: 700, border: 'none', background: 'transparent', cursor: 'pointer' }}>Open Repo</button>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedAssignment('CE205_Project_Midterm_Boateng.zip')}
                  className="btn-uni-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Upload size={14} />
                  <span>Submit Midterm Project Code</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: HOSTEL & HALL OF RESIDENCE ALLOCATION (MODULE 22) */}
      {activeTab === 'hostel' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>
              <Building2 size={16} color="var(--uni-green)" />
              <span>Student Hostel & Hall of Residence Allocation (Module 22)</span>
            </h3>
            <span className="uni-badge badge-cleared">Academic Session 2025/2026 Room Allocated</span>
          </div>

          <div className="uni-card-body">
            {maintenanceSuccess && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '3px',
                  marginBottom: '16px',
                  background: '#dcfce7',
                  color: '#15803d',
                  border: '1px solid #86efac',
                  fontSize: '12.5px',
                  fontWeight: 600,
                }}
              >
                Maintenance request logged! Ticket #MAINT-2026-442 dispatched to Hall Porter's Lodge.
              </div>
            )}

            {/* Hall Allocation Summary Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Hall of Residence</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--uni-green)', marginTop: '2px' }}>
                  Chamber of Mines Hall
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                  Traditional Hall of Excellence • Block C
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Room & Bed Allocation</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  Room C-214 (Bed B)
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                  Key Tag: <strong>CM-C214-B</strong> • Quad Occupancy
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Hall Dues & Porter Clearance</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#15803d', marginTop: '2px' }}>
                  Cleared (Paid GHS 1,400)
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                  Receipt: <strong>#HALL-2026-0812</strong>
                </div>
              </div>
            </div>

            {/* Roommate Directory */}
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--uni-green)' }}>
              Room C-214 Occupants:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <div style={{ padding: '10px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px' }}>1. Kofi Mensah Boateng (You)</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>BSc Computer Engineering • Level 200</div>
                <div style={{ fontSize: '10.5px', color: 'var(--uni-green)', fontWeight: 600 }}>Bed B • Active</div>
              </div>
              <div style={{ padding: '10px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px' }}>2. Kwabena Acheampong</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>BSc Electrical Engineering • Level 200</div>
                <div style={{ fontSize: '10.5px', color: 'var(--uni-green)', fontWeight: 600 }}>Bed A • Active</div>
              </div>
              <div style={{ padding: '10px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px' }}>3. Samuel Oteng</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>BSc Mining Engineering • Level 200</div>
                <div style={{ fontSize: '10.5px', color: 'var(--uni-green)', fontWeight: 600 }}>Bed C • Active</div>
              </div>
              <div style={{ padding: '10px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '3px' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px' }}>4. Joseph Quaye</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>BSc Geomatic Engineering • Level 200</div>
                <div style={{ fontSize: '10.5px', color: 'var(--uni-green)', fontWeight: 600 }}>Bed D • Active</div>
              </div>
            </div>

            {/* Room Maintenance Request Form */}
            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--uni-green)' }}>
                Report Room Maintenance Issue (Carpentry, Electrical, Plumbing):
              </h4>
              <form onSubmit={handleMaintenanceSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="uni-input"
                  style={{ flex: 1, minWidth: '260px' }}
                  placeholder="Describe maintenance fault (e.g. leaking faucet, ceiling fan regulator, socket issue)..."
                  value={maintenanceIssue}
                  onChange={e => setMaintenanceIssue(e.target.value)}
                />
                <button type="submit" className="btn-uni-primary">
                  <span>Log Porter Request</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: STUDENT FEES & ACCOUNTS STATEMENT */}
      {activeTab === 'finance' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>
              <CreditCard size={16} color="var(--uni-green)" />
              <span>Student Account Ledger & Fees Statement (Module 17 & 18)</span>
            </h3>
            {studentInvoices.length > 0 && studentInvoices[0].balance > 0 && (
              <button onClick={() => setShowPayModal(true)} className="btn-uni-gold">
                <Smartphone size={14} />
                <span>Pay Outstanding Fees (MoMo / Card)</span>
              </button>
            )}
          </div>

          <div className="uni-card-body">
            {/* Itemized Bill Table */}
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--uni-green)' }}>
              2025/2026 Academic Year Semester II Bill Breakdown
            </h4>

            <table className="uni-data-table" style={{ marginBottom: '16px' }}>
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Fee Description</th>
                  <th style={{ textAlign: 'right' }}>Amount (GHS)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono">AFUF-2026</td>
                  <td>Academic Facility User Fee (AFUF)</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>2,150.00</td>
                </tr>
                <tr>
                  <td className="font-mono">EXAM-02</td>
                  <td>End of Semester Examination Fee</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>450.00</td>
                </tr>
                <tr>
                  <td className="font-mono">LAB-CE2</td>
                  <td>Computer Engineering Practical & Lab User Fee</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>850.00</td>
                </tr>
                <tr>
                  <td className="font-mono">MED-01</td>
                  <td>Student Health & Medical Care Fund</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>300.00</td>
                </tr>
                <tr>
                  <td className="font-mono">LIB-01</td>
                  <td>Library & Electronic Journals Subscription</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>200.00</td>
                </tr>
                <tr>
                  <td className="font-mono">SRC-JCR</td>
                  <td>Students' Representative Council (SRC) & Hall Dues</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>250.00</td>
                </tr>
                <tr style={{ background: 'var(--uni-gold-subtle)' }}>
                  <td colSpan={2} style={{ fontWeight: 800 }}>TOTAL ACADEMIC FEES PAYABLE</td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--uni-green)' }}>
                    GHS 4,850.00
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Invoices Status Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ background: '#f8fafc', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '3px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Total Billed:</div>
                <div style={{ fontSize: '16px', fontWeight: 800 }}>GHS 4,850.00</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '3px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Amount Paid:</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#15803d' }}>
                  GHS {studentInvoices[0]?.amountPaid.toFixed(2) || '4,850.00'}
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '3px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Outstanding Balance:</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: studentInvoices[0]?.balance > 0 ? '#b91c1c' : '#15803d' }}>
                  GHS {studentInvoices[0]?.balance.toFixed(2) || '0.00'}
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '3px' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Registration Clearance:</div>
                <div style={{ marginTop: '4px' }}>
                  <span className={`uni-badge ${student.financialClearance ? 'badge-cleared' : 'badge-arrears'}`}>
                    {student.financialClearance ? 'Cleared for Examination' : 'Fees Arrears Hold'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MoMo Payment Modal */}
      {showPayModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => setShowPayModal(false)}
        >
          <div
            className="uni-card"
            style={{ width: '100%', maxWidth: '440px', padding: '20px' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '15px', color: 'var(--uni-green)', marginBottom: '8px' }}>
              Online Tuition Payment Gateway (GhIPSS / MoMo)
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Payments update your university ledger immediately and issue an automated clearance token.
            </p>

            <form onSubmit={handleMakePayment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  Select Mobile Money / Card Provider:
                </label>
                <select
                  className="uni-input"
                  value={payChannel}
                  onChange={e => setPayChannel(e.target.value as any)}
                >
                  <option value="MTN Mobile Money">MTN Mobile Money (*170# Pay Merchant)</option>
                  <option value="Telecel Cash">Telecel Cash (*110# Web Merchant)</option>
                  <option value="Visa/Mastercard">Visa / Mastercard (Direct Ghana Interbank)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  Amount to Settle (GHS):
                </label>
                <input
                  type="number"
                  className="uni-input"
                  value={payAmount}
                  onChange={e => setPayAmount(Number(e.target.value))}
                  min={100}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowPayModal(false)} className="btn-uni-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-uni-gold">
                  <ShieldCheck size={14} />
                  <span>Authorize Payment GHS {payAmount.toFixed(2)}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
