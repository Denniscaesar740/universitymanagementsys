import React, { useState } from 'react';
import { useAums } from '../../context/AumsContext';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  BookOpen,
  Building,
  CalendarDays,
  Clock,
} from 'lucide-react';

interface AcademicAdminPortalProps {
  currentSubView?: string;
}

type AdminSubSection = 'approvals' | 'courses' | 'offerings' | 'calendar' | 'timetable';

export const AcademicAdminPortal: React.FC<AcademicAdminPortalProps> = ({ currentSubView = 'approvals' }) => {
  const {
    approvalBatches,
    approveBatchHoD,
    signBatchDean,
    publishBatchRegistry,
    courses,
    offerings,
  } = useAums();

  const [activeSection, setActiveSection] = useState<AdminSubSection>(
    (currentSubView as AdminSubSection) || 'approvals'
  );

  React.useEffect(() => {
    const validSections: AdminSubSection[] = ['approvals', 'courses', 'offerings', 'calendar', 'timetable'];
    if (currentSubView && validSections.includes(currentSubView as AdminSubSection)) {
      setActiveSection(currentSubView as AdminSubSection);
    }
  }, [currentSubView]);

  const [selectedBatchId, setSelectedBatchId] = useState<string>(approvalBatches[0]?.id || '');
  const [moderatorComment, setModeratorComment] = useState<string>('');

  const selectedBatch = approvalBatches.find(b => b.id === selectedBatchId) || approvalBatches[0];

  const TABS: { id: AdminSubSection; label: string; icon: React.ElementType }[] = [
    { id: 'approvals', label: '1. Results Approval Desk (Mod 13)', icon: FileCheck },
    { id: 'courses', label: '2. Master Course Catalogue (Mod 05)', icon: BookOpen },
    { id: 'offerings', label: '3. Teaching Allocations (Mod 06)', icon: Building },
    { id: 'calendar', label: '4. Academic Calendar & Setup (Mod 01)', icon: CalendarDays },
    { id: 'timetable', label: '5. Timetable & Venues (Mod 07 & 14)', icon: Clock },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Official Directorate Header Card */}
      <div
        className="uni-card"
        style={{
          borderLeft: '4px solid var(--uni-green)',
          padding: '16px 20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--uni-green)', letterSpacing: '0.04em' }}>
              DIRECTORATE OF ACADEMIC AFFAIRS • SENATE BOARD OF EXAMINERS
            </div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 4px' }}>
              Academic Governance, Timetabling & Module 13 Results Approval Desk
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Official 4-tier institutional results moderation pipeline: Lecturer &rarr; HoD &rarr; Faculty Dean &rarr; Registrar Gazette.
            </div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Bar */}
      <div className="no-print" style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--uni-green)', paddingBottom: '0px', overflowX: 'auto' }}>
        {TABS.map(t => {
          const isSelected = activeSection === t.id;
          const IconComponent = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSection(t.id)}
              style={{
                padding: '8px 14px',
                background: isSelected ? 'var(--uni-green)' : 'var(--surface-card)',
                color: isSelected ? '#ffffff' : 'var(--text-primary)',
                border: '1px solid var(--surface-border)',
                borderBottom: 'none',
                fontWeight: isSelected ? 700 : 600,
                fontSize: '12px',
                cursor: 'pointer',
                borderTopLeftRadius: '3px',
                borderTopRightRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              <IconComponent size={14} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: MODULE 13 RESULTS APPROVAL DESK */}
      {activeSection === 'approvals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Institutional Results Pipeline Step Box */}
          <div className="uni-card" style={{ padding: '14px 18px', background: 'var(--surface-subtle)' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--uni-green)', marginBottom: '8px' }}>
              UMaT / ALPHA SENATE RESULTS APPROVAL WORKFLOW PROGRESSION
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '12px' }}>
              <div style={{ padding: '6px 12px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                <strong>1. Lecturer Entry</strong>: CA (40%) + Exam (60%)
              </div>
              <ArrowRight size={14} color="#64748b" />
              <div style={{ padding: '6px 12px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                <strong>2. Marksheet Submission</strong>: Timestamped
              </div>
              <ArrowRight size={14} color="#64748b" />
              <div style={{ padding: '6px 12px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                <strong>3. HoD Review</strong>: Bell-curve Moderation
              </div>
              <ArrowRight size={14} color="#64748b" />
              <div style={{ padding: '6px 12px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                <strong>4. Dean Sign-off</strong>: Faculty Board
              </div>
              <ArrowRight size={14} color="#64748b" />
              <div style={{ padding: '6px 12px', background: '#003822', color: '#ffffff', borderRadius: '3px' }}>
                <strong>5. Registry Gazette</strong>: Live to Students
              </div>
            </div>
          </div>

          {/* Batches Table & Approval Control */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
            {/* Left: Queue Table */}
            <div className="uni-card">
              <div className="uni-card-header">
                <h3>Departmental Examination Batches Queue</h3>
                <span className="uni-badge badge-official">Second Semester 2025/2026</span>
              </div>

              <div className="uni-card-body" style={{ padding: 0 }}>
                <table className="uni-data-table">
                  <thead>
                    <tr>
                      <th>Batch Code</th>
                      <th>Course Title</th>
                      <th>Lecturer</th>
                      <th>Pass Rate</th>
                      <th>Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalBatches.map(b => {
                      const isSelected = selectedBatch?.id === b.id;
                      return (
                        <tr
                          key={b.id}
                          onClick={() => setSelectedBatchId(b.id)}
                          style={{
                            cursor: 'pointer',
                            background: isSelected ? 'var(--uni-gold-subtle)' : undefined,
                            fontWeight: isSelected ? 600 : 'normal',
                          }}
                        >
                          <td className="font-mono" style={{ fontWeight: 700, color: 'var(--uni-green)' }}>
                            {b.courseCode}
                          </td>
                          <td>{b.courseTitle}</td>
                          <td style={{ fontSize: '11.5px' }}>{b.lecturerName}</td>
                          <td style={{ fontWeight: 700, color: b.passRate >= 80 ? '#15803d' : '#b45309' }}>
                            {b.passRate}%
                          </td>
                          <td>
                            <span
                              className={`uni-badge ${
                                b.status.includes('Published')
                                  ? 'badge-cleared'
                                  : b.status.includes('Dean')
                                  ? 'badge-official'
                                  : 'badge-pending'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Moderation Action Panel */}
            {selectedBatch && (
              <div className="uni-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="uni-card-header">
                  <h3>Moderation & Approval Action Panel</h3>
                  <span className="uni-badge badge-official">{selectedBatch.id}</span>
                </div>

                <div className="uni-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: 'var(--surface-subtle)', padding: '10px 12px', borderRadius: '3px', border: '1px solid var(--surface-border)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Course & Lecturer</div>
                    <div style={{ fontSize: '14px', fontWeight: 800 }}>
                      {selectedBatch.courseCode} - {selectedBatch.courseTitle}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Submitted by: {selectedBatch.lecturerName} ({selectedBatch.department})
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                    <div style={{ background: 'var(--surface-subtle)', padding: '8px', borderRadius: '3px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Students</div>
                      <div style={{ fontSize: '16px', fontWeight: 800 }}>{selectedBatch.totalStudents}</div>
                    </div>
                    <div style={{ background: 'var(--surface-subtle)', padding: '8px', borderRadius: '3px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Class Avg</div>
                      <div style={{ fontSize: '16px', fontWeight: 800 }}>{selectedBatch.averageScore}%</div>
                    </div>
                    <div style={{ background: 'var(--surface-subtle)', padding: '8px', borderRadius: '3px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Pass Rate</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#15803d' }}>{selectedBatch.passRate}%</div>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '11.5px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Board Moderator Notes / Minutes of Review:
                    </label>
                    <textarea
                      className="uni-input"
                      rows={3}
                      placeholder="Enter moderator comments or bell-curve confirmation remarks..."
                      value={moderatorComment}
                      onChange={e => setModeratorComment(e.target.value)}
                    />
                  </div>

                  {/* Progressive Tier Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                    {selectedBatch.status === 'Lecturer Submitted' && (
                      <button
                        onClick={() => approveBatchHoD(selectedBatch.id, moderatorComment)}
                        className="btn-uni-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <CheckCircle2 size={15} />
                        <span>Sign HoD Approval & Forward to Dean</span>
                      </button>
                    )}

                    {selectedBatch.status === 'HoD Approved' && (
                      <button
                        onClick={() => signBatchDean(selectedBatch.id)}
                        className="btn-uni-primary"
                        style={{ width: '100%', justifyContent: 'center', background: '#7c3aed' }}
                      >
                        <ShieldCheck size={15} />
                        <span>Affix Faculty Dean Signature & Forward to Registry</span>
                      </button>
                    )}

                    {selectedBatch.status === 'Dean Signed' && (
                      <button
                        onClick={() => publishBatchRegistry(selectedBatch.id)}
                        className="btn-uni-gold"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <FileCheck size={15} />
                        <span>Gazette to Live Student Records (Official Registry Release)</span>
                      </button>
                    )}

                    {selectedBatch.status === 'Published to Registry' && (
                      <div style={{ padding: '8px', background: '#dcfce7', color: '#15803d', borderRadius: '3px', textAlign: 'center', fontSize: '12px', fontWeight: 700 }}>
                        ✓ Gazetted & Published live to student statements of results.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: MASTER COURSE CATALOGUE */}
      {activeSection === 'courses' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>Master Institutional Course Catalogue (Module 05)</h3>
            <span className="uni-badge badge-official">GTEC Accredited Modules</span>
          </div>
          <div className="uni-card-body" style={{ padding: 0 }}>
            <table className="uni-data-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th style={{ textAlign: 'center' }}>Credits</th>
                  <th>Department</th>
                  <th>Level</th>
                  <th>Semester</th>
                  <th>Prerequisites</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id}>
                    <td className="font-mono" style={{ fontWeight: 700, color: 'var(--uni-green)' }}>{c.code}</td>
                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                    <td style={{ textAlign: 'center' }}>{c.creditHours}</td>
                    <td>{c.department}</td>
                    <td>Level {c.level}</td>
                    <td>Semester {c.semester}</td>
                    <td style={{ color: '#64748b' }}>
                      {c.prerequisites.length > 0 ? c.prerequisites.join(', ') : 'None'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: COURSE OFFERINGS */}
      {activeSection === 'offerings' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>Semester Course Offerings & Lecturer Allocations (Module 06)</h3>
          </div>
          <div className="uni-card-body" style={{ padding: 0 }}>
            <table className="uni-data-table">
              <thead>
                <tr>
                  <th>Section ID</th>
                  <th>Course</th>
                  <th>Assigned Lecturer</th>
                  <th>Lecture Hall & Hours</th>
                  <th style={{ textAlign: 'center' }}>Enrolled</th>
                  <th style={{ textAlign: 'center' }}>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {offerings.map(o => (
                  <tr key={o.id}>
                    <td className="font-mono" style={{ fontWeight: 700 }}>{o.id}</td>
                    <td style={{ fontWeight: 600 }}>{o.courseCode} - {o.courseTitle}</td>
                    <td>{o.lecturerName}</td>
                    <td>{o.room} ({o.scheduleTime.split(',')[0]})</td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{o.enrolledStudentsCount}</td>
                    <td style={{ textAlign: 'center' }}>{o.maxCapacity}</td>
                    <td><span className="uni-badge badge-official">{o.submissionStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: ACADEMIC CALENDAR & INSTITUTIONAL SETUP (MODULE 01) */}
      {activeSection === 'calendar' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>
              <CalendarDays size={16} color="var(--uni-green)" />
              <span>Institutional Academic Calendar & Semester Windows (Module 01)</span>
            </h3>
            <span className="uni-badge badge-official">Senate Approved Gazetted Schedule</span>
          </div>

          <div className="uni-card-body">
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Master academic year parameters configured by the Academic Affairs Directorate and approved by the University Academic Board.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--surface-subtle)', padding: '16px', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--uni-green)', textTransform: 'uppercase' }}>Current Session</div>
                <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>2025/2026 Academic Year</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Second Semester Active (16-Week Academic Window)</div>
              </div>

              <div style={{ background: 'var(--surface-subtle)', padding: '16px', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>Registration Window</div>
                <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>Open (Closes 27th March)</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Late registration surcharge of GHS 150 applies thereafter</div>
              </div>

              <div style={{ background: 'var(--surface-subtle)', padding: '16px', border: '1px solid var(--surface-border)', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>Grading Policy</div>
                <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>4.00 Grade Scale (GTEC)</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Pass Mark: 50% (D) • 1st Class Threshold: 3.60 CGPA</div>
              </div>
            </div>

            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--uni-green)' }}>
              Semester Key Milestones Timeline:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { date: '19th Jan 2026', event: 'Arrival of Continuing Students & Hall Key Check-in', status: 'Completed' },
                { date: '26th Jan 2026', event: 'Lectures Begin for Second Semester', status: 'Completed' },
                { date: '27th Mar 2026', event: 'Close of Add/Drop and Course Registration Window', status: 'Current Window' },
                { date: '14th - 18th Apr 2026', event: 'Mid-Semester Continuous Assessment Week', status: 'Upcoming' },
                { date: '15th May 2026', event: 'End of Teaching / Revision Week Begins', status: 'Upcoming' },
                { date: '25th May - 12th Jun 2026', event: 'Second Semester Main Examinations', status: 'Upcoming' },
                { date: '29th Jun 2026', event: 'Faculty Board of Examiners Results Moderation', status: 'Upcoming' },
                { date: '15th Jul 2026', event: 'Senate Approval & Congregation Ceremony', status: 'Upcoming' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="font-mono" style={{ fontWeight: 700, color: 'var(--uni-green)', minWidth: '150px', fontSize: '12px' }}>
                      {item.date}
                    </span>
                    <span style={{ fontSize: '12.5px', fontWeight: 600 }}>{item.event}</span>
                  </div>
                  <span className={`uni-badge ${item.status === 'Completed' ? 'badge-cleared' : item.status === 'Current Window' ? 'badge-official' : 'badge-pending'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: TIMETABLE & EXAMINATION MANAGEMENT (MODULE 07 & 14) */}
      {activeSection === 'timetable' && (
        <div className="uni-card">
          <div className="uni-card-header">
            <h3>
              <Clock size={16} color="var(--uni-green)" />
              <span>Central Timetable & Examination Venue Management (Module 07 & 14)</span>
            </h3>
            <span className="uni-badge badge-official">Central Timetabling Directorate</span>
          </div>

          <div className="uni-card-body">
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Real-time lecture hall allocations, conflict detection engine, and examination invigilation roster.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--uni-green)' }}>🏛️ KT Lecture Theatre 1</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Capacity: 250 Seats • Projector & PA System Active</div>
                <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, marginTop: '4px' }}>Currently in use: CE201 (Dr. Mensah)</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--uni-green)' }}>🏛️ Engineering Auditorium B</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Capacity: 400 Seats • Dual Projection Active</div>
                <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, marginTop: '4px' }}>Currently in use: MATH201 (Dr. Osei)</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--uni-green)' }}>🔬 Computer Software Lab 3</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Capacity: 80 Workstations • High-speed LAN</div>
                <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, marginTop: '4px' }}>Currently in use: CE205 Java Practical</div>
              </div>

              <div style={{ padding: '12px', background: 'var(--surface-subtle)', border: '1px solid var(--surface-border)', borderRadius: '3px' }}>
                <div style={{ fontWeight: 700, fontSize: '12.5px', color: 'var(--uni-green)' }}>🏛️ Mining Block Hall A</div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Capacity: 180 Seats • AC Enabled</div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>Available next slot: 14:00 GMT</div>
              </div>
            </div>

            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: 'var(--uni-green)' }}>
              Examination Invigilation Roster (Module 14 Draft):
            </h4>
            <table className="uni-data-table">
              <thead>
                <tr>
                  <th>Date & Session</th>
                  <th>Course Code & Paper</th>
                  <th>Venue</th>
                  <th>Candidates</th>
                  <th>Chief Invigilator</th>
                  <th>Assistant Invigilators</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono">25 May 2026 • 09:00</td>
                  <td style={{ fontWeight: 700 }}>CE201 Data Structures</td>
                  <td>Auditorium B</td>
                  <td>142</td>
                  <td>Prof. K. Adjei</td>
                  <td>Dr. Mensah, Mr. Asante</td>
                </tr>
                <tr>
                  <td className="font-mono">28 May 2026 • 13:30</td>
                  <td style={{ fontWeight: 700 }}>MATH201 Linear Algebra</td>
                  <td>KT-LT1 & KT-LT2</td>
                  <td>280</td>
                  <td>Dr. Abena Osei</td>
                  <td>Dr. Arthur, Mrs. Ansah</td>
                </tr>
                <tr>
                  <td className="font-mono">02 Jun 2026 • 09:00</td>
                  <td style={{ fontWeight: 700 }}>CE205 OOP with Java</td>
                  <td>Software Lab 3</td>
                  <td>98</td>
                  <td>Dr. Evelyn Arthur</td>
                  <td>Mr. Ofori, Miss Baah</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
