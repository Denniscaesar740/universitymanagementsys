import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Plus,
} from 'lucide-react';

interface HRPortalProps {
  currentSubView?: string;
}

type HRSubSection = 'staff' | 'leave' | 'payroll' | 'appraisal' | 'recruitment';

interface StaffMember {
  id: string;
  staffNumber: string;
  fullName: string;
  designation: string;
  department: string;
  faculty: string;
  employmentType: 'Full-time' | 'Contract' | 'Sabbatical';
  ssnitNumber: string;
  ghanaCard: string;
  qualification: string;
  status: 'Active' | 'On Leave';
  leaveDaysRemaining: number;
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'STF-101',
    staffNumber: 'UMAT/ACAD/2018/042',
    fullName: 'Prof. Kwame Adjei',
    designation: 'Associate Professor & Dean',
    department: 'Computer Science & Engineering',
    faculty: 'Faculty of Engineering & Technology',
    employmentType: 'Full-time',
    ssnitNumber: 'C0284729104',
    ghanaCard: 'GHA-718291048-2',
    qualification: 'PhD Computer Engineering (KNUST)',
    status: 'Active',
    leaveDaysRemaining: 24,
  },
  {
    id: 'STF-102',
    staffNumber: 'UMAT/ACAD/2020/091',
    fullName: 'Dr. Emmanuel Mensah',
    designation: 'Senior Lecturer & HoD',
    department: 'Computer Science & Engineering',
    faculty: 'Faculty of Engineering & Technology',
    employmentType: 'Full-time',
    ssnitNumber: 'C0394827101',
    ghanaCard: 'GHA-629104829-1',
    qualification: 'PhD Distributed Systems (Manchester)',
    status: 'Active',
    leaveDaysRemaining: 18,
  },
  {
    id: 'STF-103',
    staffNumber: 'UMAT/ACAD/2021/114',
    fullName: 'Dr. Evelyn Arthur',
    designation: 'Senior Lecturer',
    department: 'Computer Science & Engineering',
    faculty: 'Faculty of Engineering & Technology',
    employmentType: 'Full-time',
    ssnitNumber: 'C0482910472',
    ghanaCard: 'GHA-849201948-4',
    qualification: 'PhD Software Engineering (TU Delft)',
    status: 'Active',
    leaveDaysRemaining: 30,
  },
  {
    id: 'STF-104',
    staffNumber: 'UMAT/ACAD/2019/077',
    fullName: 'Dr. Abena Osei',
    designation: 'Senior Lecturer',
    department: 'Mathematical Sciences',
    faculty: 'Faculty of Integrated Management Science',
    employmentType: 'Full-time',
    ssnitNumber: 'C0194820194',
    ghanaCard: 'GHA-920184719-7',
    qualification: 'PhD Applied Mathematics (UG Legon)',
    status: 'Active',
    leaveDaysRemaining: 21,
  },
];

export const HRPortal: React.FC<HRPortalProps> = ({ currentSubView = 'staff' }) => {
  const [activeSection, setActiveSection] = useState<HRSubSection>(
    (currentSubView as HRSubSection) || 'staff'
  );

  React.useEffect(() => {
    const validSections: HRSubSection[] = ['staff', 'leave', 'payroll', 'appraisal', 'recruitment'];
    if (currentSubView && validSections.includes(currentSubView as HRSubSection)) {
      setActiveSection(currentSubView as HRSubSection);
    }
  }, [currentSubView]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember>(INITIAL_STAFF[0]);
  const [leaveFeedback, setLeaveFeedback] = useState<string | null>(null);

  const filteredStaff = INITIAL_STAFF.filter(
    s =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.staffNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveLeave = (applicant: string) => {
    setLeaveFeedback(`Approved 14-day Annual Leave for ${applicant}. Synced with CAGD payroll & department timetable.`);
    setTimeout(() => setLeaveFeedback(null), 5000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner */}
      <div className="portal-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-primary">Module 20, 23, 24, 25, 26 & 27 • Human Resources</span>
          <span className="badge badge-neutral">Directorate of Human Resources</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Human Resources & Academic Staff Directorate</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Master personnel records, Single Spine salary structures (SSSS), SSNIT pension schedules, leave workflows, and academic promotion dossiers.
        </p>

        {/* Quick HR Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '20px' }}>
          <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Academic Staff</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7' }}>184 Lecturers</div>
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Administrative / Technical Staff</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>246 Officers</div>
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active on Sabbatical / Leave</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d97706' }}>12 Faculty</div>
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Monthly Payroll Disbursed</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald)' }}>GHS 3.82M</div>
          </div>
        </div>
      </div>

      {leaveFeedback && (
        <div style={{ padding: '10px 16px', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', borderRadius: '4px', fontSize: '12.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {leaveFeedback}
        </div>
      )}

      {/* SUBVIEW 1: STAFF DIRECTORY */}
      {activeSection === 'staff' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
          <div className="aums-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Master Staff Directory</h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  Senior Members (Academic & Non-Academic) authoritative records.
                </p>
              </div>

              <div style={{ position: 'relative', width: '240px' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="input-control"
                  placeholder="Search staff name or #"
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
                    <th>Staff Name</th>
                    <th>Staff Number</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map(s => {
                    const isSelected = selectedStaff.id === s.id;
                    return (
                      <tr
                        key={s.id}
                        onClick={() => setSelectedStaff(s)}
                        style={{
                          cursor: 'pointer',
                          background: isSelected ? 'var(--primary-glow)' : undefined,
                        }}
                      >
                        <td>
                          <div style={{ fontWeight: 600 }}>{s.fullName}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.qualification}</div>
                        </td>
                        <td className="font-mono" style={{ fontWeight: 600 }}>{s.staffNumber}</td>
                        <td style={{ fontSize: '12px' }}>{s.designation}</td>
                        <td style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{s.department}</td>
                        <td>
                          <span className={`badge ${s.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Staff Dossier */}
          {selectedStaff && (
            <div className="aums-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '2px' }}>{selectedStaff.fullName}</h3>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0284c7' }}>
                  {selectedStaff.designation}
                </div>
                <div className="font-mono" style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {selectedStaff.staffNumber}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', background: 'var(--bg-subtle)', padding: '14px', borderRadius: '6px', fontSize: '12px' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Department:</div>
                  <div style={{ fontWeight: 600 }}>{selectedStaff.department}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Faculty:</div>
                  <div style={{ fontWeight: 600 }}>{selectedStaff.faculty}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>SSNIT Number:</div>
                  <div className="font-mono" style={{ fontWeight: 600 }}>{selectedStaff.ssnitNumber}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Ghana Card (NIA):</div>
                  <div className="font-mono" style={{ fontWeight: 600 }}>{selectedStaff.ghanaCard}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Highest Degree:</div>
                  <div style={{ fontWeight: 600 }}>{selectedStaff.qualification}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Leave Balance:</div>
                  <div style={{ fontWeight: 700, color: 'var(--emerald)' }}>{selectedStaff.leaveDaysRemaining} Working Days</div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Teaching & Research Workload (Active Semester):
                </h4>
                <div style={{ padding: '10px', background: 'var(--bg-subtle)', borderRadius: '4px', fontSize: '12px' }}>
                  <div>• Assigned Modules: CE201 Data Structures (4 CR) & CE203 Digital Electronics (3 CR)</div>
                  <div>• Postgraduate Supervision: 3 MPhil Candidates & 1 PhD Candidate</div>
                  <div>• Scopus Indexed Journal Papers (2025/2026): 4 Published Articles</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW 2: LEAVE MANAGEMENT */}
      {activeSection === 'leave' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Staff Leave Management & Approval Pipeline (Module 27)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Annual, Sabbatical, Maternity, and Study Leave applications with multi-tier approvals (HoD &rarr; Dean &rarr; Registrar).
              </p>
            </div>
            <span className="badge badge-primary">3 Pending Leave Requests</span>
          </div>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Start Date</th>
                  <th>Relief Officer</th>
                  <th>Approval Workflow</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ fontWeight: 600 }}>Dr. Evelyn Arthur</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Senior Lecturer • Computer Eng.</div>
                  </td>
                  <td>Annual Leave</td>
                  <td>14 Working Days</td>
                  <td>15th April 2026</td>
                  <td>Dr. Emmanuel Mensah</td>
                  <td><span className="badge badge-warning">HoD Recommended</span></td>
                  <td>
                    <button onClick={() => handleApproveLeave('Dr. Evelyn Arthur')} className="btn btn-sm btn-primary" style={{ background: '#0284c7', borderColor: '#0284c7' }}>
                      Approve Leave
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ fontWeight: 600 }}>Prof. Kwame Adjei</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Associate Professor & Dean</div>
                  </td>
                  <td>Research Sabbatical</td>
                  <td>1 Academic Year</td>
                  <td>1st September 2026</td>
                  <td>Prof. S. Ndur (Ag. Dean)</td>
                  <td><span className="badge badge-primary">Vice Chancellor Sanctioned</span></td>
                  <td>
                    <button onClick={() => handleApproveLeave('Prof. Kwame Adjei')} className="btn btn-sm btn-outline">
                      View Dossier
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: PAYROLL & SSNIT */}
      {activeSection === 'payroll' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Single Spine Salary Structure (SSSS) & SSNIT Pension (Module 23)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Ghana Controller and Accountant-General Department (CAGD) mechanized payroll validation, Tier 1 & Tier 2 pension schedules.
              </p>
            </div>
            <span className="badge badge-success">March 2026 Payroll Verified</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gross Basic Payroll (SSSS)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>GHS 3,820,400.00</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>430 Teaching & Support Staff</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SSNIT Tier 1 (13.5% Employer)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7' }}>GHS 515,754.00</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Statutory National Pension</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tier 2 Occupational Pension (5%)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald)' }}>GHS 191,020.00</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Ghana Education Service Fund / Trustees</div>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>GRA PAYE Income Tax Withheld</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--rose)' }}>GHS 824,300.00</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Remitted to Ghana Revenue Authority</div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 4: APPRAISAL & PROMOTION */}
      {activeSection === 'appraisal' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Staff Appraisal & Academic Promotion Governance (Module 24 & 25)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Peer assessments, student feedback metrics, external assessors reviews, and appointments & promotions board promotions.
              </p>
            </div>
            <span className="badge badge-primary">2026 Promotion Cycle Active</span>
          </div>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Current Rank</th>
                  <th>Applied Rank</th>
                  <th>Publications Count</th>
                  <th>Student Evaluation</th>
                  <th>External Assessors</th>
                  <th>Board Decision</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Dr. Emmanuel Mensah</td>
                  <td>Senior Lecturer</td>
                  <td style={{ fontWeight: 700, color: '#0284c7' }}>Associate Professor</td>
                  <td>14 Papers (10 Scopus)</td>
                  <td><span className="badge badge-success">4.6 / 5.0 (92%)</span></td>
                  <td><span className="badge badge-success">2 Positive Reports Received</span></td>
                  <td><span className="badge badge-warning">A&P Committee Scheduled</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Dr. Abena Osei</td>
                  <td>Senior Lecturer</td>
                  <td style={{ fontWeight: 700, color: '#0284c7' }}>Associate Professor</td>
                  <td>18 Papers (12 Scopus)</td>
                  <td><span className="badge badge-success">4.8 / 5.0 (96%)</span></td>
                  <td><span className="badge badge-success">2 Positive Reports Received</span></td>
                  <td><span className="badge badge-success">Approved by Council</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 5: RECRUITMENT */}
      {activeSection === 'recruitment' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Academic Vacancies, Recruitment & Onboarding (Module 26)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Search committee shortlisting, interviews scheduling, GTEC staff quota compliance, and digital appointment letters.
              </p>
            </div>
            <button className="btn btn-primary" style={{ background: '#0284c7', borderColor: '#0284c7' }}>
              <Plus size={14} /> <span>Create New Vacancy Notice</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: '6px', background: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="badge badge-primary">Academic Vacancy</span>
                <span style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 700 }}>Open</span>
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '8px 0 4px' }}>Lecturer / Senior Lecturer in Artificial Intelligence</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Department of Computer Science & Engineering • 2 Positions</p>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '8px' }}>Applications Received: <strong>18 Candidates</strong></div>
            </div>

            <div style={{ border: '1px solid var(--border-subtle)', padding: '16px', borderRadius: '6px', background: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="badge badge-primary">Technical Officer</span>
                <span style={{ fontSize: '11px', color: 'var(--emerald)', fontWeight: 700 }}>Open</span>
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '8px 0 4px' }}>Senior Laboratory Technologist (Hardware & Embedded)</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Faculty of Engineering Central Labs • 1 Position</p>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '8px' }}>Applications Received: <strong>11 Candidates</strong></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
