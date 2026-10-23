import React from 'react';
import { useAums } from '../../context/AumsContext';
import {
  CheckCircle2,
  GraduationCap,
  Printer,
} from 'lucide-react';

export const ApplicantPortal: React.FC = () => {
  const { applicants } = useAums();
  const applicant = applicants[0];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div className="portal-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-primary">Module 03 • Public & Applicant Services</span>
          <span className="badge badge-success font-mono">Status: {applicant.status}</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Undergraduate Admissions Application Desk</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Application tracking, qualification verification, fee receipt, and cryptographic admission offer letter.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Application Status & Summary */}
        <div className="aums-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.15rem' }}>Application Dossier Summary</h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              background: 'var(--bg-subtle)',
              padding: '16px',
              borderRadius: '10px',
              fontSize: '0.85rem',
            }}
          >
            <div><strong>Application No:</strong> <span className="font-mono">{applicant.applicationNumber}</span></div>
            <div><strong>Candidate:</strong> {applicant.fullName}</div>
            <div><strong>Contact:</strong> {applicant.phone}</div>
            <div><strong>Email:</strong> {applicant.email}</div>
            <div><strong>First Choice:</strong> {applicant.programmeFirstChoice}</div>
            <div><strong>Second Choice:</strong> {applicant.programmeSecondChoice}</div>
            <div><strong>Qualification:</strong> {applicant.qualifications.exam} (Agg {applicant.qualifications.aggregateScore})</div>
            <div><strong>Application Fee:</strong> <span className="badge badge-success">GHS 250.00 Paid</span></div>
          </div>

          <div style={{ padding: '16px', background: 'var(--emerald-bg)', border: '1px solid var(--emerald)', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <CheckCircle2 size={18} color="var(--emerald)" />
              <strong style={{ fontSize: '0.9rem', color: 'var(--emerald)' }}>
                Admissions Board Decision: PROVISIONAL OFFER GRANTED
              </strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
              Congratulations! You have been offered provisional admission into the BSc Computer Engineering programme for the 2026/2027 Academic Year.
            </p>
          </div>
        </div>

        {/* Admission Letter Preview */}
        <div
          className="aums-card"
          style={{
            border: '2px solid var(--border-strong)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '16px' }}>
              <GraduationCap size={32} color="var(--primary)" style={{ margin: '0 auto 6px' }} />
              <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>ALPHA UNIVERSITY COLLEGE</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Office of the Dean of Admissions</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginTop: '6px' }}>
                PROVISIONAL LETTER OF ADMISSION
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '16px' }}>
              <p style={{ marginBottom: '8px' }}>
                Dear <strong>{applicant.fullName}</strong>,
              </p>
              <p style={{ marginBottom: '8px' }}>
                The Academic Board of Alpha University College is pleased to offer you provisional admission to pursue a
                4-year undergraduate programme leading to the award of the <strong>BSc Computer Engineering</strong> degree.
              </p>
              <p>
                Please download your official admission dossier below and complete tuition fee settlement to confirm enrolment.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
            <button onClick={() => window.print()} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
              <Printer size={14} />
              <span>Print Letter</span>
            </button>
            <button
              onClick={() => alert('Admission acceptance confirmed! Enrolment token forwarded to Registry.')}
              className="btn btn-success btn-sm"
              style={{ gap: '6px' }}
            >
              <CheckCircle2 size={14} />
              <span>Accept Offer of Admission</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
