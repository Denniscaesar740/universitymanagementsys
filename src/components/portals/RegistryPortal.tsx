import React, { useState } from 'react';
import { useAums } from '../../context/AumsContext';
import type { StudentRecord } from '../../types/models';
import {
  Search,
  Award,
  FileText,
  Printer,
  CheckCircle2,
  QrCode,
} from 'lucide-react';

interface RegistryPortalProps {
  currentSubView?: string;
}

type RegistrySubSection = 'biodata' | 'degree_audit' | 'transcripts' | 'graduation' | 'certificates';

export const RegistryPortal: React.FC<RegistryPortalProps> = ({ currentSubView = 'biodata' }) => {
  const { students } = useAums();
  const [activeSection, setActiveSection] = useState<RegistrySubSection>(
    (currentSubView as RegistrySubSection) || 'biodata'
  );

  React.useEffect(() => {
    const validSections: RegistrySubSection[] = ['biodata', 'degree_audit', 'transcripts', 'graduation', 'certificates'];
    if (currentSubView && validSections.includes(currentSubView as RegistrySubSection)) {
      setActiveSection(currentSubView as RegistrySubSection);
    }
  }, [currentSubView]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(students[0]);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const filteredStudents = students.filter(
    s =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.indexNumber.includes(searchTerm) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.programmeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner */}
      <div className="portal-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-primary">Module 04, 15 & 16 • Registry & Academic Affairs</span>
          <span className="badge badge-success">Authoritative Master Records</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Master Student Biodata, Degree Audit & Certification Directorate</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Authoritative institutional records repository, graduation audit eligibility engine, official transcript certification and convocation clearance.
        </p>
      </div>

      {actionSuccess && (
        <div style={{ padding: '10px 16px', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', borderRadius: '4px', fontSize: '12.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {actionSuccess}
        </div>
      )}

      {/* SUBVIEW 1: BIODATA & MASTER DIRECTORY */}
      {activeSection === 'biodata' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
          {/* Left: Master Student Directory */}
          <div className="aums-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Authoritative Student Ledger</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Master profiles created upon admission offer acceptance.
                </p>
              </div>

              <div style={{ position: 'relative', width: '240px' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="input-control"
                  placeholder="Search name, index #, ID..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '36px' }}
                />
              </div>
            </div>

            <div className="aums-table-container">
              <table className="aums-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Index Number</th>
                    <th>Programme</th>
                    <th>Level</th>
                    <th>CGPA</th>
                    <th>Clearance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(s => {
                    const isSelected = selectedStudent?.id === s.id;
                    return (
                      <tr
                        key={s.id}
                        onClick={() => setSelectedStudent(s)}
                        style={{
                          cursor: 'pointer',
                          background: isSelected ? 'var(--primary-glow)' : undefined,
                        }}
                      >
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                              src={s.photoUrl}
                              alt={s.fullName}
                              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: 600 }}>{s.fullName}</div>
                              <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>
                                {s.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="font-mono" style={{ fontWeight: 600 }}>
                          {s.indexNumber}
                        </td>
                        <td style={{ fontSize: '0.8rem' }}>{s.programmeName.replace('Bachelor of Science in ', 'BSc ')}</td>
                        <td>Level {s.currentLevel}</td>
                        <td className="font-mono" style={{ fontWeight: 700 }}>
                          {s.cgpa.toFixed(2)}
                        </td>
                        <td>
                          <span className={`badge ${s.financialClearance ? 'badge-success' : 'badge-danger'}`}>
                            {s.financialClearance ? 'Cleared' : 'Arrears'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Selected Student Dossier */}
          {selectedStudent && (
            <div className="aums-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={selectedStudent.photoUrl}
                  alt={selectedStudent.fullName}
                  style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', border: '2px solid var(--border-subtle)' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{selectedStudent.fullName}</h3>
                  <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                    Index: {selectedStudent.indexNumber} • ID: {selectedStudent.id}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    App Ref: {selectedStudent.applicationNumber}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', background: 'var(--bg-subtle)', padding: '16px', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Programme & Dept</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedStudent.programmeName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{selectedStudent.department}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Faculty & Campus</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedStudent.faculty}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{selectedStudent.campus}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Level & Cohort</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Level {selectedStudent.currentLevel} • {selectedStudent.studyMode}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Admitted {selectedStudent.admissionYear}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Enrolment Status</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--emerald)' }}>{selectedStudent.status}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{selectedStudent.financialClearance ? 'Finance Cleared' : 'Holds Active'}</div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Next of Kin / Emergency Guardian
                </h4>
                <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: '6px', fontSize: '0.825rem' }}>
                  <div><strong>Name:</strong> {selectedStudent.guardianName}</div>
                  <div><strong>Contact Phone:</strong> {selectedStudent.guardianPhone}</div>
                  <div><strong>Nationality:</strong> {selectedStudent.nationality}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button onClick={() => handleAction(`Official Transcript issued for ${selectedStudent.fullName}`)} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <FileText size={14} />
                  <span>Issue Official Transcript</span>
                </button>
                <button onClick={() => setActiveSection('degree_audit')} className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <Award size={14} />
                  <span>Degree Audit</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW 2: DEGREE AUDIT */}
      {activeSection === 'degree_audit' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Degree Audit & Graduation Eligibility Engine (Module 16)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Audits completed credit hours against Senate curriculum graduation benchmarks (Minimum: 138 Credit Hours).
              </p>
            </div>
            {selectedStudent && (
              <span className="badge badge-primary">Evaluating: {selectedStudent.fullName}</span>
            )}
          </div>

          {selectedStudent && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Credits Earned</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {selectedStudent.totalCreditsCompleted} / 138
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {((selectedStudent.totalCreditsCompleted / 138) * 100).toFixed(0)}% Degree Progress
                  </div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Projected Class</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald)' }}>
                    {selectedStudent.cgpa >= 3.6 ? '1st Class' : selectedStudent.cgpa >= 3.0 ? '2nd Upper' : '2nd Lower'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    CGPA: {selectedStudent.cgpa.toFixed(2)}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Outstanding Core Courses</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#b45309' }}>
                    0 Deficiencies
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    All prerequisites satisfied
                  </div>
                </div>
              </div>

              <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginTop: '12px', color: 'var(--uni-green)' }}>
                Degree Requirements Checklist:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--surface-subtle)', borderRadius: '4px' }}>
                  <span>✓ Level 100 General University Courses (Communication, African Studies, Logic)</span>
                  <span className="badge badge-success">Satisfied (12/12)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--surface-subtle)', borderRadius: '4px' }}>
                  <span>✓ Level 200 Core Computer Engineering Modules</span>
                  <span className="badge badge-success">Enrolled & Active (21/21)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--surface-subtle)', borderRadius: '4px' }}>
                  <span>⏳ Level 300 Industrial Attachment / Internship (Vacation 2026)</span>
                  <span className="badge badge-warning">Pending Cohort Progression</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--surface-subtle)', borderRadius: '4px' }}>
                  <span>⏳ Level 400 Final Year Capstone Project & Dissertation</span>
                  <span className="badge badge-warning">Pending Final Year</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW 3: TRANSCRIPT REQUESTS QUEUE */}
      {activeSection === 'transcripts' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Official Transcript Requests & Electronic Verification (Module 15)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Certified transcript requests submitted by graduates and continuing students for overseas admissions and WES verification.
              </p>
            </div>
            <span className="badge badge-primary">3 Pending Dispatch</span>
          </div>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Student Name</th>
                  <th>Index Number</th>
                  <th>Destination Institution</th>
                  <th>Mode</th>
                  <th>Fee Paid</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono">TRQ-2026-104</td>
                  <td style={{ fontWeight: 600 }}>Kwame Frimpong Appiah</td>
                  <td className="font-mono">022010014</td>
                  <td>World Education Services (WES) Canada</td>
                  <td>Electronic Secure PDF</td>
                  <td><span className="badge badge-success">GHS 250 Paid</span></td>
                  <td>
                    <button onClick={() => handleAction('Signed & Dispatched TRQ-2026-104 to WES Canada')} className="btn btn-sm btn-primary">
                      Sign & Transmit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="font-mono">TRQ-2026-098</td>
                  <td style={{ fontWeight: 600 }}>Evelyn Akosua Mensah</td>
                  <td className="font-mono">021910088</td>
                  <td>Imperial College London (Postgraduate Admissions)</td>
                  <td>Courier (DHL Express)</td>
                  <td><span className="badge badge-success">GHS 480 Paid</span></td>
                  <td>
                    <button onClick={() => handleAction('Printed & Bagged TRQ-2026-098 for DHL Pickup')} className="btn btn-sm btn-primary">
                      Generate Sealed Pack
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 4: GRADUATION CLEARANCE */}
      {activeSection === 'graduation' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Convocation & Graduation Clearance Directorate (Module 16)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                4-Point Institutional Clearance verification: Finance (0 Balance) + Library (No Overdue Books) + Hostel (Keys Returned) + Sports Equipment.
              </p>
            </div>
            <span className="badge badge-success">2026 Congregation Cohort</span>
          </div>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Degree Awarded</th>
                  <th>Finance</th>
                  <th>Library</th>
                  <th>Hall Warden</th>
                  <th>Sports Dept</th>
                  <th>Graduation Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Yaw Ofori Sarkodie (022010045)</td>
                  <td>BSc Mining Engineering</td>
                  <td><span className="badge badge-success">✓ Cleared</span></td>
                  <td><span className="badge badge-success">✓ Cleared</span></td>
                  <td><span className="badge badge-success">✓ Cleared</span></td>
                  <td><span className="badge badge-success">✓ Cleared</span></td>
                  <td><span className="badge badge-primary font-mono">CONVOCATION LISTED</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Akua Mansa Baafi (022010089)</td>
                  <td>BSc Computer Engineering</td>
                  <td><span className="badge badge-danger">✕ GHS 650 Arrears</span></td>
                  <td><span className="badge badge-success">✓ Cleared</span></td>
                  <td><span className="badge badge-success">✓ Cleared</span></td>
                  <td><span className="badge badge-success">✓ Cleared</span></td>
                  <td><span className="badge badge-danger font-mono">HELD (FINANCE)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 5: CERTIFICATE ISSUANCE */}
      {activeSection === 'certificates' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Certificate Issuance & Security Hologram Registry</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Registry control ledger for original degree parchment certificates, tamper-evident security foil, and Registrar seals.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => handleAction('Issued Certificate with QR verification token')}>
              <Printer size={14} />
              <span>Print Degree Parchment</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ border: '2px solid var(--uni-gold)', borderRadius: '6px', padding: '16px', background: 'var(--surface-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Certificate Serial: <strong>CERT-2025-00492</strong></div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--uni-green)', marginTop: '4px' }}>Yaw Ofori Sarkodie</div>
              <div style={{ fontSize: '12.5px', marginTop: '2px' }}>First Class Honours • BSc Mining Engineering</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>Senate Congregation: 15th July 2025</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span className="badge badge-success">Dispatched to Graduate</span>
                <QrCode size={24} color="var(--uni-green)" />
              </div>
            </div>

            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px', background: 'var(--surface-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Certificate Serial: <strong>CERT-2025-00493</strong></div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>Priscilla Adjoa Tawiah</div>
              <div style={{ fontSize: '12.5px', marginTop: '2px' }}>Second Class Upper • BSc Petroleum Refining</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>Senate Congregation: 15th July 2025</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span className="badge badge-primary">Vault Ready (Pending Collection)</span>
                <QrCode size={24} color="var(--text-muted)" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
