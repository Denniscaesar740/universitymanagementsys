import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  PortalId,
  UserPersona,
  StudentRecord,
  Course,
  CourseOffering,
  StudentRegistration,
  ApprovalBatch,
  ApplicantRecord,
  Invoice,
  PaymentTransaction,
  AuditLogItem,
  CampusNotice,
} from '../types/models';
import {
  INITIAL_PERSONAS,
  INITIAL_STUDENTS,
  INITIAL_COURSES,
  INITIAL_OFFERINGS,
  INITIAL_REGISTRATIONS,
  INITIAL_APPROVAL_BATCHES,
  INITIAL_APPLICANTS,
  INITIAL_INVOICES,
  INITIAL_TRANSACTIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTICES,
} from '../data/initialData';
import { DEMO_PASSWORD, MODULE_BINDINGS, PORTAL_DEFAULT_VIEWS, primaryBinding } from '../data/moduleBindings';

// Grading helper
export function computeGradeAndPoint(score: number): { grade: string; gradePoint: number } {
  if (score >= 80) return { grade: 'A', gradePoint: 4.0 };
  if (score >= 75) return { grade: 'B+', gradePoint: 3.5 };
  if (score >= 70) return { grade: 'B', gradePoint: 3.0 };
  if (score >= 65) return { grade: 'C+', gradePoint: 2.5 };
  if (score >= 60) return { grade: 'C', gradePoint: 2.0 };
  if (score >= 55) return { grade: 'D+', gradePoint: 1.5 };
  if (score >= 50) return { grade: 'D', gradePoint: 1.0 };
  return { grade: 'F', gradePoint: 0.0 };
}

interface AumsContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  canSwitchWorkspaces: boolean;
  activePortal: PortalId;
  setActivePortal: (portal: PortalId) => void;
  workspaceView: string;
  setWorkspaceView: (view: string) => void;
  openModule: (moduleId: number, preferredPortal?: PortalId) => void;
  openWorkspace: (portal: PortalId, view: string) => void;
  currentPersona: UserPersona;
  personas: UserPersona[];
  switchPersona: (personaId: string) => void;
  students: StudentRecord[];
  courses: Course[];
  offerings: CourseOffering[];
  registrations: StudentRegistration[];
  approvalBatches: ApprovalBatch[];
  applicants: ApplicantRecord[];
  invoices: Invoice[];
  transactions: PaymentTransaction[];
  auditLogs: AuditLogItem[];
  notices: CampusNotice[];
  notificationCount: number;

  // Actions
  enrolApplicant: (applicantId: string) => StudentRecord | null;
  registerCourseForStudent: (studentId: string, courseCode: string) => { success: boolean; message: string };
  dropCourseRegistration: (registrationId: string) => void;
  updateStudentMarks: (registrationId: string, caScore: number, examScore: number) => void;
  submitLecturerBatch: (offeringId: string) => void;
  approveBatchHoD: (batchId: string, notes?: string) => void;
  signBatchDean: (batchId: string) => void;
  publishBatchRegistry: (batchId: string) => void;
  processPayment: (invoiceId: string, amount: number, channel: PaymentTransaction['channel']) => void;
  addNotice: (title: string, category: CampusNotice['category'], audience: CampusNotice['audience'], content: string) => void;
  logAuditEvent: (action: string, module: string, entityType: string, entityId: string, details: string) => void;
}

const AumsContext = createContext<AumsContextType | undefined>(undefined);

const SWITCH_ROLES = new Set([
  'System Administrator',
  'Vice Chancellor / Management',
  'Registrar',
]);

export const AumsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personas] = useState<UserPersona[]>(INITIAL_PERSONAS);
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(() => {
    const saved = localStorage.getItem('aums_session');
    return INITIAL_PERSONAS.find((p) => p.id === saved) || INITIAL_PERSONAS[1] || INITIAL_PERSONAS[0];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('aums_session')));
  const [activePortal, setActivePortalState] = useState<PortalId>(
    () => currentPersona.portal
  );
  const [workspaceView, setWorkspaceView] = useState<string>(
    () => PORTAL_DEFAULT_VIEWS[currentPersona.portal]
  );

  const canSwitchWorkspaces = SWITCH_ROLES.has(currentPersona.role);

  const setActivePortal = (portal: PortalId) => {
    setActivePortalState(portal);
    setWorkspaceView(PORTAL_DEFAULT_VIEWS[portal]);
  };

  const openWorkspace = (portal: PortalId, view: string) => {
    setActivePortalState(portal);
    setWorkspaceView(view);
  };

  const openModule = (moduleId: number, preferredPortal?: PortalId) => {
    const binding =
      (preferredPortal && MODULE_BINDINGS.find((b) => b.moduleId === moduleId && b.portal === preferredPortal)) ||
      MODULE_BINDINGS.find((b) => b.moduleId === moduleId && b.portal === activePortal) ||
      primaryBinding(moduleId);
    if (!binding) return;
    setActivePortalState(binding.portal);
    setWorkspaceView(binding.view);
  };

  const login = (email: string, password: string) => {
    if (password !== DEMO_PASSWORD) {
      return { success: false, message: 'Passphrase not recognised. Use the campus demo passphrase.' };
    }
    const found = personas.find((p) => p.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, message: 'No AIMS account is provisioned for that email.' };
    }
    setCurrentPersona(found);
    setActivePortalState(found.portal);
    setWorkspaceView(PORTAL_DEFAULT_VIEWS[found.portal]);
    setIsAuthenticated(true);
    localStorage.setItem('aums_session', found.id);
    return { success: true, message: `Signed in as ${found.name}` };
  };

  const logout = () => {
    localStorage.removeItem('aums_session');
    setIsAuthenticated(false);
  };

  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aums_students');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [offerings, setOfferings] = useState<CourseOffering[]>(INITIAL_OFFERINGS);
  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('aums_registrations');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  const [approvalBatches, setApprovalBatches] = useState<ApprovalBatch[]>(() => {
    try {
      const saved = localStorage.getItem('aums_batches');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_APPROVAL_BATCHES;
    } catch {
      return INITIAL_APPROVAL_BATCHES;
    }
  });

  const [applicants, setApplicants] = useState<ApplicantRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aums_applicants');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_APPLICANTS;
    } catch {
      return INITIAL_APPLICANTS;
    }
  });

  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [notices, setNotices] = useState<CampusNotice[]>(INITIAL_NOTICES);
  const [notificationCount, setNotificationCount] = useState<number>(3);

  // Sync state
  useEffect(() => {
    localStorage.setItem('aums_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('aums_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('aums_batches', JSON.stringify(approvalBatches));
  }, [approvalBatches]);

  useEffect(() => {
    localStorage.setItem('aums_applicants', JSON.stringify(applicants));
  }, [applicants]);

  const logAuditEvent = (action: string, module: string, entityType: string, entityId: string, details: string) => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditLogItem = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp,
      userId: currentPersona.id,
      userName: currentPersona.name,
      userRole: currentPersona.role,
      module,
      action,
      entityType,
      entityId,
      details,
      ipAddress: '10.0.12.84',
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const switchPersona = (personaId: string) => {
    const found = personas.find(p => p.id === personaId);
    if (found) {
      setCurrentPersona(found);
      setActivePortalState(found.portal);
      setWorkspaceView(PORTAL_DEFAULT_VIEWS[found.portal]);
      localStorage.setItem('aums_session', found.id);
      logAuditEvent('PERSONA_SWITCH', '02. User Auth & RBAC', 'UserPersona', found.id, `Switched active session to ${found.name} (${found.role}).`);
    }
  };

  // Enrol applicant -> creates unified Student profile and invoice
  const enrolApplicant = (applicantId: string): StudentRecord | null => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (!applicant) return null;

    const newIndexNum = `0226${Math.floor(10000 + Math.random() * 90000)}`;
    const newStudentId = `STU-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newStudent: StudentRecord = {
      id: newStudentId,
      indexNumber: newIndexNum,
      applicationNumber: applicant.applicationNumber,
      fullName: applicant.fullName,
      email: `${applicant.fullName.toLowerCase().replace(/\s+/g, '.')}@st.alpha.edu.gh`,
      phone: applicant.phone,
      gender: applicant.fullName.toLowerCase().includes('adwoa') || applicant.fullName.toLowerCase().includes('farida') ? 'Female' : 'Male',
      dateOfBirth: '2006-03-21',
      nationality: 'Ghanaian',
      programmeId: 'PRG-BENG-CE',
      programmeName: applicant.programmeFirstChoice,
      department: 'Computer Science & Engineering',
      faculty: 'Faculty of Engineering & Technology',
      admissionYear: 2026,
      currentLevel: 100,
      studyMode: 'Regular',
      campus: 'Main Tarkwa Campus',
      status: 'Active',
      financialClearance: false,
      totalCreditsCompleted: 0,
      cgpa: 0.0,
      guardianName: 'Guardian of ' + applicant.fullName,
      guardianPhone: '+233 24 000 1122',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    };

    setStudents(prev => [newStudent, ...prev]);
    setApplicants(prev =>
      prev.map(a => (a.id === applicantId ? { ...a, status: 'Enrolled' } : a))
    );

    // Generate tuition invoice
    const newInvoice: Invoice = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      studentId: newStudent.id,
      studentName: newStudent.fullName,
      description: '2026/2027 Academic Year - Semester 1 Freshmen Academic & Facilities Tuition',
      semester: 'Semester 1, 2026/2027',
      totalAmount: 5120.0,
      amountPaid: 0.0,
      balance: 5120.0,
      status: 'Overdue',
      dueDate: '2026-11-30',
      clearanceEligible: false,
    };
    setInvoices(prev => [newInvoice, ...prev]);

    logAuditEvent(
      'CANDIDATE_ENROL_PROMOTED',
      '03. Admissions -> 04. Student Biodata',
      'StudentRecord',
      newStudent.id,
      `Promoted candidate ${applicant.fullName} (${applicant.applicationNumber}) into authoritative Student Record (${newStudent.id}, Index: ${newIndexNum}).`
    );

    return newStudent;
  };

  // Register Course for Student
  const registerCourseForStudent = (studentId: string, courseCode: string): { success: boolean; message: string } => {
    const student = students.find(s => s.id === studentId);
    if (!student) return { success: false, message: 'Student profile not found.' };

    if (!student.financialClearance) {
      return { success: false, message: 'Financial clearance required. Please clear outstanding semester fees with the Finance Directorate.' };
    }

    const course = courses.find(c => c.code === courseCode);
    if (!course) return { success: false, message: 'Course not found in master catalogue.' };

    const alreadyReg = registrations.some(r => r.studentId === studentId && r.courseCode === courseCode);
    if (alreadyReg) return { success: false, message: 'Course already registered for this semester.' };

    const matchingOffering = offerings.find(o => o.courseCode === courseCode);

    const newReg: StudentRegistration = {
      id: `REG-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId,
      offeringId: matchingOffering ? matchingOffering.id : 'OFF-GEN',
      courseCode: course.code,
      courseTitle: course.title,
      creditHours: course.creditHours,
      academicYear: '2025/2026',
      semester: 'Semester 2',
      status: 'Approved',
      caScore: 0,
      examScore: 0,
      totalScore: 0,
      grade: '-',
      gradePoint: 0.0,
      published: false,
    };

    setRegistrations(prev => [...prev, newReg]);

    if (matchingOffering) {
      setOfferings(prev =>
        prev.map(o =>
          o.id === matchingOffering.id
            ? { ...o, enrolledStudentsCount: o.enrolledStudentsCount + 1 }
            : o
        )
      );
    }

    logAuditEvent(
      'COURSE_REGISTRATION_ADD',
      '09. Student Course Registration',
      'StudentRegistration',
      newReg.id,
      `Student ${student.fullName} (${student.id}) registered ${course.code} - ${course.title} (${course.creditHours} Credits).`
    );

    return { success: true, message: `Successfully registered for ${course.code}!` };
  };

  // Drop Course
  const dropCourseRegistration = (registrationId: string) => {
    const reg = registrations.find(r => r.id === registrationId);
    if (!reg) return;

    setRegistrations(prev => prev.filter(r => r.id !== registrationId));
    logAuditEvent(
      'COURSE_REGISTRATION_DROP',
      '09. Student Course Registration',
      'StudentRegistration',
      registrationId,
      `Dropped registration for ${reg.courseCode} by student ${reg.studentId}.`
    );
  };

  // Update marks for student
  const updateStudentMarks = (registrationId: string, caScore: number, examScore: number) => {
    const safeCa = Math.min(40, Math.max(0, caScore));
    const safeExam = Math.min(60, Math.max(0, examScore));
    const total = safeCa + safeExam;
    const { grade, gradePoint } = computeGradeAndPoint(total);

    setRegistrations(prev =>
      prev.map(r =>
        r.id === registrationId
          ? {
              ...r,
              caScore: safeCa,
              examScore: safeExam,
              totalScore: total,
              grade,
              gradePoint,
            }
          : r
      )
    );

    logAuditEvent(
      'MARKS_ENTRY_UPDATE',
      '12. Results, Grades & GPA',
      'StudentRegistration',
      registrationId,
      `Recorded marks (CA: ${safeCa}/40, Exam: ${safeExam}/60, Total: ${total}, Grade: ${grade}).`
    );
  };

  // Multi-tier workflow: Lecturer submits batch to HoD
  const submitLecturerBatch = (offeringId: string) => {
    const offering = offerings.find(o => o.id === offeringId);
    if (!offering) return;

    setOfferings(prev =>
      prev.map(o => (o.id === offeringId ? { ...o, submissionStatus: 'Submitted to HoD' } : o))
    );

    // Check if batch exists
    const existing = approvalBatches.find(b => b.offeringId === offeringId);
    if (existing) {
      setApprovalBatches(prev =>
        prev.map(b =>
          b.id === existing.id
            ? {
                ...b,
                status: 'Lecturer Submitted',
                submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
              }
            : b
        )
      );
    } else {
      const newBatch: ApprovalBatch = {
        id: `BAT-2026-${offering.courseCode}`,
        offeringId: offering.id,
        courseCode: offering.courseCode,
        courseTitle: offering.courseTitle,
        lecturerName: offering.lecturerName,
        department: 'Computer Science & Engineering',
        academicSession: offering.semester,
        totalStudents: offering.enrolledStudentsCount,
        averageScore: 78.5,
        passRate: 94.0,
        status: 'Lecturer Submitted',
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        moderatorNotes: 'Lecturer batch submitted for HoD departmental moderation.',
      };
      setApprovalBatches(prev => [newBatch, ...prev]);
    }

    logAuditEvent(
      'RESULTS_BATCH_SUBMIT_HOD',
      '13. Results Approval Workflow',
      'ApprovalBatch',
      offeringId,
      `Lecturer ${offering.lecturerName} formally submitted marksheet for ${offering.courseCode} to Head of Department.`
    );
  };

  // HoD endorses batch
  const approveBatchHoD = (batchId: string, notes?: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setApprovalBatches(prev =>
      prev.map(b =>
        b.id === batchId
          ? {
              ...b,
              status: 'HoD Approved',
              hodApprovedAt: now,
              moderatorNotes: notes || b.moderatorNotes,
            }
          : b
      )
    );

    const batch = approvalBatches.find(b => b.id === batchId);
    if (batch) {
      setOfferings(prev =>
        prev.map(o => (o.id === batch.offeringId ? { ...o, submissionStatus: 'HoD Approved' } : o))
      );
    }

    logAuditEvent(
      'RESULTS_HOD_ENDORSEMENT',
      '13. Results Approval Workflow',
      'ApprovalBatch',
      batchId,
      `HoD Ing. Dr. Alex Baah endorsed result batch for ${batch?.courseCode}. Forwarded to Faculty Dean.`
    );
  };

  // Dean signs batch
  const signBatchDean = (batchId: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setApprovalBatches(prev =>
      prev.map(b =>
        b.id === batchId
          ? {
              ...b,
              status: 'Dean Signed',
              deanApprovedAt: now,
            }
          : b
      )
    );

    const batch = approvalBatches.find(b => b.id === batchId);
    if (batch) {
      setOfferings(prev =>
        prev.map(o => (o.id === batch.offeringId ? { ...o, submissionStatus: 'Dean Signed' } : o))
      );
    }

    logAuditEvent(
      'RESULTS_DEAN_SIGN_OFF',
      '13. Results Approval Workflow',
      'ApprovalBatch',
      batchId,
      `Faculty Dean Prof. Kwabena Asante signed result batch for ${batch?.courseCode}. Dispatched to Registry.`
    );
  };

  // Registry publishes batch to students
  const publishBatchRegistry = (batchId: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setApprovalBatches(prev =>
      prev.map(b =>
        b.id === batchId
          ? {
              ...b,
              status: 'Published to Registry',
              publishedAt: now,
            }
          : b
      )
    );

    const batch = approvalBatches.find(b => b.id === batchId);
    if (batch) {
      setOfferings(prev =>
        prev.map(o => (o.id === batch.offeringId ? { ...o, submissionStatus: 'Published to Students' } : o))
      );

      // Mark all student registrations for this course as published
      setRegistrations(prev =>
        prev.map(r => (r.courseCode === batch.courseCode ? { ...r, published: true } : r))
      );
    }

    logAuditEvent(
      'RESULTS_GAZETTE_PUBLISHED',
      '13. Results Approval Workflow',
      'ApprovalBatch',
      batchId,
      `Registrar Mrs. Gertrude Osei-Tutu officially gazetted and published grades for ${batch?.courseCode}. Visible on Student Portal.`
    );
  };

  // Process payment
  const processPayment = (invoiceId: string, amount: number, channel: PaymentTransaction['channel']) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const newTxn: PaymentTransaction = {
      id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      invoiceId,
      studentId: invoice.studentId,
      studentName: invoice.studentName,
      amount,
      channel,
      reference: `PAY-GH-${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Verified',
    };

    setTransactions(prev => [newTxn, ...prev]);

    const updatedPaid = invoice.amountPaid + amount;
    const newBal = Math.max(0, invoice.totalAmount - updatedPaid);
    const newStatus: Invoice['status'] = newBal === 0 ? 'Paid' : 'Partial';
    const isCleared = newBal === 0;

    setInvoices(prev =>
      prev.map(inv =>
        inv.id === invoiceId
          ? {
              ...inv,
              amountPaid: updatedPaid,
              balance: newBal,
              status: newStatus,
              clearanceEligible: isCleared,
            }
          : inv
      )
    );

    if (isCleared) {
      setStudents(prev =>
        prev.map(s => (s.id === invoice.studentId ? { ...s, financialClearance: true } : s))
      );
    }

    logAuditEvent(
      'PAYMENT_TRANSACTION_RECONCILED',
      '18. Online Payment -> 17. Student Finance',
      'PaymentTransaction',
      newTxn.id,
      `Received payment of GHS ${amount.toFixed(2)} via ${channel} for ${invoice.studentName} (${invoice.studentId}). Balance: GHS ${newBal.toFixed(2)}. Financial clearance: ${isCleared ? 'GRANTED' : 'PENDING'}.`
    );
  };

  const addNotice = (title: string, category: CampusNotice['category'], audience: CampusNotice['audience'], content: string) => {
    const newNotice: CampusNotice = {
      id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      audience,
      author: currentPersona.name,
      date: 'Today',
      content,
    };
    setNotices(prev => [newNotice, ...prev]);
    setNotificationCount(c => c + 1);
    logAuditEvent('NOTICE_PUBLISHED', '31. Announcements & Noticeboard', 'CampusNotice', newNotice.id, `Published notice "${title}" to ${audience}.`);
  };

  return (
    <AumsContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        canSwitchWorkspaces,
        activePortal,
        setActivePortal,
        workspaceView,
        setWorkspaceView,
        openModule,
        openWorkspace,
        currentPersona,
        personas,
        switchPersona,
        students,
        courses,
        offerings,
        registrations,
        approvalBatches,
        applicants,
        invoices,
        transactions,
        auditLogs,
        notices,
        notificationCount,
        enrolApplicant,
        registerCourseForStudent,
        dropCourseRegistration,
        updateStudentMarks,
        submitLecturerBatch,
        approveBatchHoD,
        signBatchDean,
        publishBatchRegistry,
        processPayment,
        addNotice,
        logAuditEvent,
      }}
    >
      {children}
    </AumsContext.Provider>
  );
};

export const useAums = () => {
  const context = useContext(AumsContext);
  if (!context) {
    throw new Error('useAums must be used within an AumsProvider');
  }
  return context;
};
