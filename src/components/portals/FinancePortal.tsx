import React, { useState } from 'react';
import { useAums } from '../../context/AumsContext';
import {
  CheckCircle2,
  Search,
  Smartphone,
  Calculator,
  CreditCard,
  ShieldCheck,
  BarChart3,
  Award,
} from 'lucide-react';

interface FinancePortalProps {
  currentSubView?: string;
}

type FinanceSubSection = 'invoices' | 'transactions' | 'clearance' | 'reports' | 'scholarships';

export const FinancePortal: React.FC<FinancePortalProps> = ({ currentSubView = 'invoices' }) => {
  const { invoices, transactions } = useAums();
  const [activeSection, setActiveSection] = useState<FinanceSubSection>(
    (currentSubView as FinanceSubSection) || 'invoices'
  );

  React.useEffect(() => {
    const validSections: FinanceSubSection[] = ['invoices', 'transactions', 'clearance', 'reports', 'scholarships'];
    if (currentSubView && validSections.includes(currentSubView as FinanceSubSection)) {
      setActiveSection(currentSubView as FinanceSubSection);
    }
  }, [currentSubView]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [clearanceNotice, setClearanceNotice] = useState<string | null>(null);

  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.amountPaid, 0);
  const totalArrears = invoices.reduce((acc, curr) => acc + curr.balance, 0);
  const recoveryRate = totalBilled > 0 ? (totalCollected / totalBilled) * 100 : 0;

  const filteredInvoices = invoices.filter(
    inv =>
      inv.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueClearance = (studentName: string) => {
    setClearanceNotice(`Issued Verified Clearance Token: CLR-2026-${Math.floor(1000 + Math.random() * 9000)} for ${studentName}.`);
    setTimeout(() => setClearanceNotice(null), 5000);
  };

  const TABS: { id: FinanceSubSection; label: string; icon: React.ElementType }[] = [
    { id: 'invoices', label: '1. Student Invoices (Mod 17)', icon: Calculator },
    { id: 'transactions', label: '2. Payment Transactions (Mod 18)', icon: CreditCard },
    { id: 'clearance', label: '3. Clearance Tokens', icon: ShieldCheck },
    { id: 'reports', label: '4. Revenue Reports', icon: BarChart3 },
    { id: 'scholarships', label: '5. Financial Aid & SLTF (Mod 19)', icon: Award },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner */}
      <div
        className="aums-card"
        style={{
          background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-card))',
          padding: '24px',
          borderLeft: '5px solid var(--amber)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-warning">Module 17, 18 & 19 • Student Finance & Bursary</span>
          <span className="badge badge-neutral">Finance Directorate</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Student Accounts, Tuition Billing & Reconciliation</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Automated fee schedules, mobile money and card transaction reconciliations, financial clearance tokens, and scholarship bursaries.
        </p>

        {/* Quick Fiscal Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Tuition Billed</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              GHS {totalBilled.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Collected Revenue</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--emerald)' }}>
              GHS {totalCollected.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Outstanding Fee Arrears</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--rose)' }}>
              GHS {totalArrears.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Collection Efficiency</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>
              {recoveryRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Bar */}
      <div className="no-print" style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--amber)', paddingBottom: '0px', overflowX: 'auto' }}>
        {TABS.map(t => {
          const isSelected = activeSection === t.id;
          const IconComponent = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSection(t.id)}
              style={{
                padding: '8px 16px',
                background: isSelected ? 'var(--amber)' : 'var(--surface-card)',
                color: isSelected ? '#ffffff' : 'var(--text-primary)',
                border: '1px solid var(--surface-border)',
                borderBottom: 'none',
                fontWeight: isSelected ? 700 : 600,
                fontSize: '12.5px',
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

      {clearanceNotice && (
        <div style={{ padding: '10px 16px', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', borderRadius: '4px', fontSize: '12.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {clearanceNotice}
        </div>
      )}

      {/* SUBVIEW 1: INVOICES */}
      {activeSection === 'invoices' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Active Student Invoices & Ledger Balances</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Registration clearance requires 100% semester tuition settlement or approved financial bond.
              </p>
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="input-control"
                placeholder="Search student or invoice..."
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
                  <th>Invoice ID</th>
                  <th>Student Name</th>
                  <th>Semester Description</th>
                  <th style={{ textAlign: 'right' }}>Total Billed</th>
                  <th style={{ textAlign: 'right' }}>Amount Paid</th>
                  <th style={{ textAlign: 'right' }}>Balance</th>
                  <th>Settlement Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map(inv => (
                  <tr key={inv.id}>
                    <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      {inv.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inv.studentName}</div>
                      <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {inv.studentId}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{inv.description}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>
                      GHS {inv.totalAmount.toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--emerald)' }}>
                      GHS {inv.amountPaid.toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: inv.balance > 0 ? 'var(--rose)' : 'var(--emerald)' }}>
                      GHS {inv.balance.toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : inv.status === 'Partial' ? 'badge-warning' : 'badge-danger'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      {inv.balance === 0 ? (
                        <button onClick={() => handleIssueClearance(inv.studentName)} className="btn btn-sm btn-outline">
                          Issue Token
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Requires Payment</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: TRANSACTIONS */}
      {activeSection === 'transactions' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Reconciled Payment Transactions (Module 18)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Real-time API gateway ledger for MTN Mobile Money, Telecel Cash, and Ghana Interbank cards.
              </p>
            </div>
            <span className="badge badge-success">Gateway Status: Online</span>
          </div>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Transaction Ref</th>
                  <th>Student Name</th>
                  <th>Payment Channel</th>
                  <th>Amount</th>
                  <th>Date & Timestamp</th>
                  <th>Verification Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    <td className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      {tx.reference}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{tx.studentName}</div>
                      <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{tx.studentId}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Smartphone size={14} color="var(--amber)" />
                        <span>{tx.channel}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--emerald)' }}>
                      GHS {tx.amount.toFixed(2)}
                    </td>
                    <td className="font-mono" style={{ fontSize: '0.8rem' }}>{tx.date}</td>
                    <td>
                      <span className="badge badge-success" style={{ gap: '4px' }}>
                        <CheckCircle2 size={12} /> {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: CLEARANCE TOKENS */}
      {activeSection === 'clearance' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Examination & Course Registration Clearance Tokens</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Cryptographic clearance verification tokens issued to 100% fee-compliant students for exam dockets.
              </p>
            </div>
            <span className="badge badge-primary">Active Token Engine</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ border: '2px solid var(--uni-green)', borderRadius: '6px', padding: '16px', background: 'var(--surface-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Token Hash: <strong>CLR-2026-9921</strong></div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--uni-green)', marginTop: '4px' }}>Kofi Mensah Boateng</div>
              <div style={{ fontSize: '12.5px', marginTop: '2px' }}>022410041 • BSc Computer Engineering Level 200</div>
              <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, marginTop: '8px' }}>✓ 100% Tuition Cleared (GHS 4,850.00)</div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>Valid for End of Semester Exam Docket</div>
            </div>

            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '16px', background: 'var(--surface-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Token Hash: <strong>CLR-2026-8814</strong></div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>Ama Serwaa Darko</div>
              <div style={{ fontSize: '12.5px', marginTop: '2px' }}>022410012 • BSc Electrical Engineering Level 200</div>
              <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, marginTop: '8px' }}>✓ 100% Tuition Cleared (GHS 4,850.00)</div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>Valid for End of Semester Exam Docket</div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 4: FISCAL REPORTS */}
      {activeSection === 'reports' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Institutional Revenue & Fee Arrears Aging Report</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Departmental fee recovery rates, arrears delinquency tracking, and projected end-of-year cash flow.
              </p>
            </div>
            <span className="badge badge-warning">Q1 2026 Audit Ready</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ padding: '14px', background: 'var(--surface-subtle)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current Arrears (0 - 30 Days)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#b45309' }}>GHS 34,200.00</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Standard reminder dispatched</div>
            </div>
            <div style={{ padding: '14px', background: 'var(--surface-subtle)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Delinquent (31 - 60 Days)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#dc2626' }}>GHS 12,850.00</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Registration hold activated</div>
            </div>
            <div style={{ padding: '14px', background: 'var(--surface-subtle)', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Critical (&gt; 60 Days)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#7f1d1d' }}>GHS 4,500.00</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Barred from exam docket</div>
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 5: FINANCIAL AID & SCHOLARSHIPS (MODULE 19) */}
      {activeSection === 'scholarships' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Financial Aid, Scholarships & SLTF Integration (Module 19)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Government of Ghana Students Loan Trust Fund (SLTF), GNPC Foundation, MTNF, and university hardship bursaries.
              </p>
            </div>
            <span className="badge badge-success">48 Beneficiaries Enrolled</span>
          </div>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Beneficiary Name</th>
                  <th>Student ID</th>
                  <th>Scholarship Scheme</th>
                  <th>Award Amount</th>
                  <th>SLTF Disbursement Status</th>
                  <th>Clearance Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Samuel Kwesi Mensah</td>
                  <td className="font-mono">STU-2024-0044</td>
                  <td>GNPC Foundation STEM Scholarship</td>
                  <td style={{ fontWeight: 700, color: 'var(--emerald)' }}>GHS 4,850.00 (100%)</td>
                  <td><span className="badge badge-success">Disbursed to Tuition</span></td>
                  <td><span className="badge badge-success">✓ Auto-Cleared</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Abigail Osei Bonsu</td>
                  <td className="font-mono">STU-2024-0112</td>
                  <td>Students Loan Trust Fund (SLTF Ghana)</td>
                  <td style={{ fontWeight: 700, color: 'var(--emerald)' }}>GHS 3,000.00 (Partial)</td>
                  <td><span className="badge badge-primary">Direct Bank Credit</span></td>
                  <td><span className="badge badge-warning">Partial Token</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Emmanuel Adomako</td>
                  <td className="font-mono">STU-2024-0231</td>
                  <td>MTN Ghana Bright Scholarship</td>
                  <td style={{ fontWeight: 700, color: 'var(--emerald)' }}>GHS 4,850.00 (100%)</td>
                  <td><span className="badge badge-success">Disbursed to Tuition</span></td>
                  <td><span className="badge badge-success">✓ Auto-Cleared</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
