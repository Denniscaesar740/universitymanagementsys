import React, { useState } from 'react';
import { useAums } from '../../context/AumsContext';
import {
  CheckCircle2,
  Send,
  AlertTriangle,
  ClipboardList,
  CheckSquare,
  BookOpen,
  FileText,
  Upload,
  Users,
  Clock,
  MapPin,
} from 'lucide-react';

interface LecturerPortalProps {
  currentSubView?: string;
}

type LecturerSubTab = 'marksheet' | 'attendance' | 'offerings' | 'materials';

export const LecturerPortal: React.FC<LecturerPortalProps> = ({ currentSubView = 'marksheet' }) => {
  const {
    currentPersona,
    offerings,
    registrations,
    updateStudentMarks,
    submitLecturerBatch,
  } = useAums();

  const [activeTab, setActiveTab] = useState<LecturerSubTab>(
    (currentSubView as LecturerSubTab) || 'marksheet'
  );

  React.useEffect(() => {
    const validTabs: LecturerSubTab[] = ['marksheet', 'attendance', 'offerings', 'materials'];
    if (currentSubView && validTabs.includes(currentSubView as LecturerSubTab)) {
      setActiveTab(currentSubView as LecturerSubTab);
    }
  }, [currentSubView]);

  const [selectedOfferingId, setSelectedOfferingId] = useState<string>(offerings[0]?.id || '');
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [submittedToast, setSubmittedToast] = useState<boolean>(false);

  // Attendance state
  const [attendanceDate, setAttendanceDate] = useState<string>('2026-03-23');
  const [attendanceSheet, setAttendanceSheet] = useState<Record<string, boolean>>({
    'STU-2024-0192': true,
    'STU-2024-0012': true,
    'STU-2024-0089': false,
    'STU-2024-0145': true,
  });
  const [attendanceSaved, setAttendanceSaved] = useState<boolean>(false);

  // Offerings for current lecturer (or all if persona is admin/demo)
  const lecturerOfferings = offerings.filter(
    o => o.lecturerId === currentPersona.id || currentPersona.role.includes('Admin') || currentPersona.role.includes('HoD')
  );

  const activeOffering = offerings.find(o => o.id === selectedOfferingId) || offerings[0];
  const offeringRegistrations = registrations.filter(r => r.courseCode === activeOffering?.courseCode);

  const handleScoreChange = (regId: string, ca: number, exam: number) => {
    updateStudentMarks(regId, ca, exam);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSubmitBatch = () => {
    if (!activeOffering) return;
    submitLecturerBatch(activeOffering.id);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 5000);
  };

  const toggleAttendance = (studentId: string) => {
    setAttendanceSheet(prev => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const saveAttendanceRegister = () => {
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 4000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div className="portal-hero">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-purple">Module 08, 10, 11, 12 & 21 • Faculty Teaching Suite</span>
              <span className="badge badge-neutral font-mono">Academic Session: 2025/2026 Sem 2</span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Faculty Teaching, Attendance & Examination Marks Portal</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Assigned course allocations, continuous assessment & exam marksheets, 75% attendance threshold monitoring, and HoD results submission.
            </p>
          </div>

          {/* Quick Offering Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Select Teaching Section:
            </label>
            <select
              className="input-control"
              style={{ minWidth: '260px' }}
              value={selectedOfferingId}
              onChange={e => setSelectedOfferingId(e.target.value)}
            >
              {lecturerOfferings.map(off => (
                <option key={off.id} value={off.id}>
                  {off.courseCode} - {off.courseTitle} ({off.scheduleTime.split(',')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {saveToast && (
        <div style={{ padding: '10px 16px', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', borderRadius: '4px', fontSize: '12.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> Marks updated and cached in local registry memory.
        </div>
      )}
      {submittedToast && (
        <div style={{ padding: '10px 16px', background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', borderRadius: '4px', fontSize: '12.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Send size={16} /> Batch successfully submitted to Head of Department (HoD) for moderation review.
        </div>
      )}

      {/* SUBVIEW 1: MARKSHEET & GRADE ENTRY */}
      {activeTab === 'marksheet' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Course Section Bar & Status */}
          {activeOffering && (
            <div
              className="aums-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '20px 24px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700 }}>
                  Course Code & Venue
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {activeOffering.courseCode} • {activeOffering.courseTitle}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Lecturer: <strong>{activeOffering.lecturerName}</strong> | Room: {activeOffering.room} | Credits: {activeOffering.creditHours}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Approval Status</div>
                  <span
                    className={`badge ${
                      activeOffering.submissionStatus === 'Published to Students'
                        ? 'badge-success'
                        : activeOffering.submissionStatus.includes('Approved') || activeOffering.submissionStatus.includes('Signed')
                        ? 'badge-primary'
                        : activeOffering.submissionStatus === 'Submitted to HoD'
                        ? 'badge-warning'
                        : 'badge-neutral'
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    {activeOffering.submissionStatus}
                  </span>
                </div>

                {activeOffering.submissionStatus === 'Draft' && (
                  <button
                    onClick={handleSubmitBatch}
                    className="btn btn-primary"
                    style={{ gap: '8px', padding: '10px 18px', background: 'var(--purple)', borderColor: 'var(--purple)' }}
                  >
                    <Send size={15} />
                    <span>Submit to HoD</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Marksheet Table */}
          <div className="aums-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Official Assessment Marksheet</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Continuous Assessment (CA - 40%) + Final Examination (60%) = Total Score (100%). Grades compute automatically per Ghana Senate policy.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Total Enrolled Candidates: <strong>{offeringRegistrations.length}</strong>
                </div>
              </div>
            </div>

            <div className="aums-table-container">
              <table className="aums-table">
                <thead>
                  <tr>
                    <th>Student ID / Ref</th>
                    <th>CA Score (Max 40)</th>
                    <th>Exam Score (Max 60)</th>
                    <th>Total (100%)</th>
                    <th>Letter Grade</th>
                    <th>Grade Point</th>
                    <th>Academic Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {offeringRegistrations.map(reg => (
                    <tr key={reg.id}>
                      <td>
                        <div className="font-mono" style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                          {reg.studentId}
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="input-control font-mono"
                          style={{ width: '90px', padding: '6px 10px', fontWeight: 600 }}
                          min={0}
                          max={40}
                          value={reg.caScore}
                          disabled={activeOffering?.submissionStatus !== 'Draft'}
                          onChange={e => handleScoreChange(reg.id, Number(e.target.value), reg.examScore)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="input-control font-mono"
                          style={{ width: '90px', padding: '6px 10px', fontWeight: 600 }}
                          min={0}
                          max={60}
                          value={reg.examScore}
                          disabled={activeOffering?.submissionStatus !== 'Draft'}
                          onChange={e => handleScoreChange(reg.id, reg.caScore, Number(e.target.value))}
                        />
                      </td>
                      <td style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                        {reg.totalScore} %
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            reg.grade === 'A'
                              ? 'badge-success'
                              : reg.grade === 'B+' || reg.grade === 'B'
                              ? 'badge-primary'
                              : reg.grade === 'F'
                              ? 'badge-danger'
                              : 'badge-warning'
                          }`}
                          style={{ fontWeight: 800 }}
                        >
                          {reg.grade}
                        </span>
                      </td>
                      <td className="font-mono" style={{ fontWeight: 700 }}>
                        {reg.gradePoint.toFixed(1)}
                      </td>
                      <td>
                        {reg.totalScore >= 50 ? (
                          <span className="badge badge-success" style={{ gap: '4px' }}>
                            <CheckCircle2 size={12} /> Passed
                          </span>
                        ) : (
                          <span className="badge badge-danger" style={{ gap: '4px' }}>
                            <AlertTriangle size={12} /> Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: LECTURE ATTENDANCE REGISTER */}
      {activeTab === 'attendance' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Lecture Attendance Register (Module 11)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Track student attendance in real-time. Students with less than 75% attendance are automatically flagged as disqualified from End-of-Semester Examinations.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600 }}>Lecture Date:</label>
              <input
                type="date"
                className="input-control"
                value={attendanceDate}
                onChange={e => setAttendanceDate(e.target.value)}
              />
              <button onClick={saveAttendanceRegister} className="btn btn-primary" style={{ background: 'var(--purple)', borderColor: 'var(--purple)' }}>
                <CheckSquare size={14} />
                <span>Save Register</span>
              </button>
            </div>
          </div>

          {attendanceSaved && (
            <div style={{ padding: '10px 14px', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', borderRadius: '4px', marginBottom: '16px', fontSize: '12.5px', fontWeight: 600 }}>
              Attendance register for {attendanceDate} saved successfully! Synced to Dean of Students & Registry eligibility dockets.
            </div>
          )}

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Roll #</th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Total Lectures Attended</th>
                  <th>Attendance %</th>
                  <th>Docket Qualification</th>
                  <th style={{ textAlign: 'center' }}>Mark Present Today</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { roll: 1, id: 'STU-2024-0192', name: 'Kofi Mensah Boateng', attended: 14, total: 15 },
                  { roll: 2, id: 'STU-2024-0012', name: 'Ama Serwaa Darko', attended: 15, total: 15 },
                  { roll: 3, id: 'STU-2024-0089', name: 'Kwesi Appiah', attended: 9, total: 15 },
                  { roll: 4, id: 'STU-2024-0145', name: 'Abena Frimpong', attended: 13, total: 15 },
                ].map(s => {
                  const pct = ((s.attended / s.total) * 100).toFixed(1);
                  const isPresent = attendanceSheet[s.id] ?? true;
                  const isQualified = Number(pct) >= 75;

                  return (
                    <tr key={s.id}>
                      <td className="font-mono">{s.roll}</td>
                      <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>{s.id}</td>
                      <td style={{ fontWeight: 600 }}>{s.name}</td>
                      <td>{s.attended} / {s.total} Lectures</td>
                      <td style={{ fontWeight: 700, color: isQualified ? '#15803d' : '#dc2626' }}>{pct}%</td>
                      <td>
                        <span className={`badge ${isQualified ? 'badge-success' : 'badge-danger'}`}>
                          {isQualified ? 'Eligible for Docket' : 'Barred (<75%)'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={isPresent}
                          onChange={() => toggleAttendance(s.id)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--purple)' }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: TEACHING ALLOCATIONS */}
      {activeTab === 'offerings' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Teaching Allocations & Curriculum Modules (Module 08 & 10)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Official course workload assigned by Head of Department for Second Semester 2025/2026.
              </p>
            </div>
            <span className="badge badge-purple">Total Workload: 9 Credit Hours</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {lecturerOfferings.map(off => (
              <div key={off.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px', background: 'var(--bg-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-primary font-mono">{off.courseCode}</span>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--purple)' }}>{off.creditHours} Credit Hours</span>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '6px' }}>{off.courseTitle}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} /> <span>{off.scheduleTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} /> <span>Venue: {off.room}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={13} /> <span>Enrolled: {off.enrolledStudentsCount} / {off.maxCapacity} Seats</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => { setSelectedOfferingId(off.id); setActiveTab('marksheet'); }}
                    className="btn btn-sm btn-primary"
                    style={{ flex: 1, justifyContent: 'center', background: 'var(--purple)', borderColor: 'var(--purple)' }}
                  >
                    Open Marksheet
                  </button>
                  <button
                    onClick={() => { setSelectedOfferingId(off.id); setActiveTab('attendance'); }}
                    className="btn btn-sm btn-outline"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Attendance
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 4: COURSE MATERIALS & E-LEARNING (MODULE 21) */}
      {activeTab === 'materials' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Course Materials & Assignment Workbench (Module 21)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Upload lecture slides, tutorial sheets, and grading rubrics visible to enrolled students in their portal.
              </p>
            </div>
            <button className="btn btn-primary" style={{ background: 'var(--purple)', borderColor: 'var(--purple)' }}>
              <Upload size={14} />
              <span>Upload New Material</span>
            </button>
          </div>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Document Title</th>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Student Downloads</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono" style={{ fontWeight: 700 }}>CE201</td>
                  <td style={{ fontWeight: 600 }}>Lecture 01-04: Asymptotic Notations & Trees.pdf</td>
                  <td>Lecture Slides</td>
                  <td>2026-02-14</td>
                  <td>48 Downloads</td>
                  <td><button className="btn btn-sm btn-outline">Manage</button></td>
                </tr>
                <tr>
                  <td className="font-mono" style={{ fontWeight: 700 }}>CE201</td>
                  <td style={{ fontWeight: 600 }}>Assignment 02: Graph Search & Dijkstra Algorithm.pdf</td>
                  <td>Assignment</td>
                  <td>2026-03-02</td>
                  <td>46 Submissions</td>
                  <td><button className="btn btn-sm btn-outline">Grade (46)</button></td>
                </tr>
                <tr>
                  <td className="font-mono" style={{ fontWeight: 700 }}>CE205</td>
                  <td style={{ fontWeight: 600 }}>Lab Practical Manual: Multi-threading in Java.pdf</td>
                  <td>Lab Sheet</td>
                  <td>2026-03-10</td>
                  <td>52 Downloads</td>
                  <td><button className="btn btn-sm btn-outline">Manage</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
