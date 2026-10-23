import React from 'react';
import { useAums } from '../../context/AumsContext';
import {
  Users,
  GraduationCap,
  CreditCard,
  PieChart,
} from 'lucide-react';

export const ManagementPortal: React.FC = () => {
  const { students, invoices } = useAums();

  const totalStudents = students.length;
  const femaleStudents = students.filter(s => s.gender === 'Female').length;
  const femaleRatio = totalStudents > 0 ? (femaleStudents / totalStudents) * 100 : 0;
  const averageCgpa =
    totalStudents > 0
      ? students.reduce((acc, curr) => acc + curr.cgpa, 0) / totalStudents
      : 0;

  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPaid = invoices.reduce((acc, curr) => acc + curr.amountPaid, 0);
  const feeRecoveryPct = totalBilled > 0 ? (totalPaid / totalBilled) * 100 : 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div className="portal-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-purple">Module 36 & 37 • Reporting & Analytics</span>
          <span className="badge badge-neutral">Vice-Chancellor & University Council</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Executive Management & Strategic Institutional Analytics</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          High-level institutional key performance indicators (KPIs), enrolment demographics, fiscal health, and quality assurance metrics.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}
      >
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Enrolled Students</span>
            <Users size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{totalStudents * 420 + 380}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', marginTop: '4px' }}>
            +8.4% YoY Admissions Expansion
          </div>
        </div>

        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Female Representation Ratio</span>
            <PieChart size={18} color="var(--purple)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--purple)' }}>{femaleRatio.toFixed(1)}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Target: 40% Women in STEM Engineering
          </div>
        </div>

        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tuition Recovery Rate</span>
            <CreditCard size={18} color="var(--emerald)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emerald)' }}>{feeRecoveryPct.toFixed(1)}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            GHS {totalPaid.toLocaleString()} collected
          </div>
        </div>

        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Institutional Mean CGPA</span>
            <GraduationCap size={18} color="var(--amber)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--amber)' }}>{averageCgpa.toFixed(2)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Graduation eligibility threshold: &ge; 2.00
          </div>
        </div>
      </div>

      {/* Program Distribution & Quality Assurance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="aums-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '14px' }}>Faculty Enrolment Share</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { faculty: 'Faculty of Engineering & Technology', pct: 48, students: 890, color: 'var(--primary)' },
              { faculty: 'Faculty of Mineral Resources Technology', pct: 26, students: 480, color: 'var(--emerald)' },
              { faculty: 'School of Postgraduate Studies', pct: 14, students: 260, color: 'var(--purple)' },
              { faculty: 'Faculty of Computing & Information Systems', pct: 12, students: 220, color: 'var(--amber)' },
            ].map((fac, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '4px' }}>
                  <span>{fac.faculty}</span>
                  <span style={{ fontWeight: 700 }}>{fac.students} ({fac.pct}%)</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${fac.pct}%`, height: '100%', background: fac.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="aums-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '14px' }}>Module 36 Quality Assurance & Accreditation Timeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { prog: 'BSc Computer Engineering', body: 'GTEC / NAB', validTill: '2028-12-31', status: 'Accredited' },
              { prog: 'BSc Electrical Engineering', body: 'GTEC / NAB', validTill: '2027-09-30', status: 'Accredited' },
              { prog: 'BSc Mechanical Engineering', body: 'GTEC / NAB', validTill: '2026-11-15', status: 'Review Due' },
              { prog: 'MSc Cyber Security', body: 'GTEC / NAB', validTill: '2029-05-31', status: 'Accredited' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--bg-subtle)',
                  borderRadius: '8px',
                  fontSize: '0.825rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{item.prog}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Regulator: {item.body} • Valid until {item.validTill}</div>
                </div>
                <span className={`badge ${item.status === 'Accredited' ? 'badge-success' : 'badge-warning'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
