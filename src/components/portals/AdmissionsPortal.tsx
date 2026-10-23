import React, { useState } from 'react';
import { useAums } from '../../context/AumsContext';
import {
  CheckCircle2,
  UserPlus,
} from 'lucide-react';

export const AdmissionsPortal: React.FC = () => {
  const { applicants, enrolApplicant, setActivePortal } = useAums();
  const [enrolledNotice, setEnrolledNotice] = useState<string | null>(null);

  const handleEnrol = (applicantId: string) => {
    const student = enrolApplicant(applicantId);
    if (student) {
      setEnrolledNotice(
        `Success! Promoted candidate into authoritative Student Profile: ${student.fullName} (Student ID: ${student.id}, Index No: ${student.indexNumber}). Tuition invoice created in Finance.`
      );
      setTimeout(() => setEnrolledNotice(null), 8000);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div className="portal-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-success">Module 03 • Admissions Management</span>
          <span className="badge badge-primary">2026/2027 Intake</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Admissions Management & Candidate Enrolment</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Processes candidate applications, scores qualification aggregates, and converts admitted prospects
          into authoritative <strong>Master Student Profiles</strong> (Unified Institutional Identity Principle).
        </p>
      </div>

      {enrolledNotice && (
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--emerald-bg)',
            border: '1px solid var(--emerald)',
            color: 'var(--emerald)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={20} />
            <span>{enrolledNotice}</span>
          </div>
          <button
            onClick={() => setActivePortal('registry')}
            className="btn btn-sm btn-primary"
            style={{ flexShrink: 0 }}
          >
            View in Registry Portal
          </button>
        </div>
      )}

      {/* Applications List */}
      <div className="aums-card">
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Undergraduate Application Dossiers</h3>
        <div className="aums-table-container">
          <table className="aums-table">
            <thead>
              <tr>
                <th>App Number</th>
                <th>Candidate Name</th>
                <th>Programme Choice</th>
                <th>Qualifications</th>
                <th>Fee Paid</th>
                <th>Decision Status</th>
                <th>Enrolment Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(app => (
                <tr key={app.id}>
                  <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {app.applicationNumber}
                  </td>
                  <td style={{ fontWeight: 600 }}>{app.fullName}</td>
                  <td>{app.programmeFirstChoice}</td>
                  <td>
                    {app.qualifications.exam} • Aggregate <strong>{app.qualifications.aggregateScore}</strong> ({app.qualifications.year})
                  </td>
                  <td>
                    <span className="badge badge-success">GHS 250.00 Paid</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        app.status === 'Enrolled'
                          ? 'badge-purple'
                          : app.status === 'Admitted'
                          ? 'badge-success'
                          : 'badge-warning'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    {app.status === 'Admitted' ? (
                      <button
                        onClick={() => handleEnrol(app.id)}
                        className="btn btn-sm btn-success"
                        style={{ gap: '6px' }}
                      >
                        <UserPlus size={14} />
                        <span>Enrol as Student</span>
                      </button>
                    ) : app.status === 'Enrolled' ? (
                      <span className="badge badge-neutral" style={{ gap: '4px' }}>
                        <CheckCircle2 size={12} color="var(--purple)" /> Active Student Record
                      </span>
                    ) : (
                      <span className="badge badge-neutral">Under Review</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
