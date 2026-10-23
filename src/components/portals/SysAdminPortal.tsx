import React, { useState } from 'react';
import { useAums } from '../../context/AumsContext';
import {
  Search,
  Users,
  Settings,
  Database,
  Download,
  Server,
  Activity,
} from 'lucide-react';

export const SysAdminPortal: React.FC = () => {
  const { auditLogs, personas } = useAums();
  const [activeTab, setActiveTab] = useState<'audit' | 'rbac' | 'settings'>('audit');
  const [auditSearch, setAuditSearch] = useState<string>('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchesModule = selectedModuleFilter === 'ALL' || log.module.includes(selectedModuleFilter);
    const matchesSearch =
      auditSearch === '' ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.userName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.entityId.toLowerCase().includes(auditSearch.toLowerCase());

    return matchesModule && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div
        className="aums-card"
        style={{
          background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-card))',
          padding: '28px',
          borderLeft: '5px solid var(--rose)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-danger">Module 02, 38, 39 & 40 • System Administration</span>
              <span className="badge badge-neutral font-mono">Kernel v2.4.0</span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Institutional Cyberinfrastructure, Audit & Access Governance</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Cryptographic immutable audit trails, granular role-based access control (RBAC), and technical system parameters.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('audit')}
              className={`btn btn-sm ${activeTab === 'audit' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ gap: '6px' }}
            >
              <Activity size={14} />
              <span>Module 38 Live Audit Trail</span>
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className={`btn btn-sm ${activeTab === 'rbac' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ gap: '6px' }}
            >
              <Users size={14} />
              <span>Module 02 User Roles & RBAC</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`btn btn-sm ${activeTab === 'settings' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ gap: '6px' }}
            >
              <Settings size={14} />
              <span>System Settings & Backups</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Module 38 Real-Time Audit Trail */}
      {activeTab === 'audit' && (
        <div className="aums-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Institutional Compliance & Security Audit Logs (Module 38)</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Every sensitive state alteration (grades, fee allocations, biodata updates, admissions) is permanently recorded.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                className="input-control"
                style={{ width: '190px' }}
                value={selectedModuleFilter}
                onChange={e => setSelectedModuleFilter(e.target.value)}
              >
                <option value="ALL">All Modules (40)</option>
                <option value="01.">01. Core Setup</option>
                <option value="02.">02. Auth & RBAC</option>
                <option value="03.">03. Admissions</option>
                <option value="04.">04. Biodata</option>
                <option value="09.">09. Course Reg</option>
                <option value="12.">12. Grades & GPA</option>
                <option value="13.">13. Results Approval</option>
                <option value="17.">17. Finance & Fees</option>
                <option value="18.">18. Payments</option>
                <option value="31.">31. Noticeboard</option>
              </select>

              <div style={{ position: 'relative', width: '240px' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="input-control"
                  placeholder="Filter audit logs..."
                  value={auditSearch}
                  onChange={e => setAuditSearch(e.target.value)}
                  style={{ paddingLeft: '36px' }}
                />
              </div>

              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(auditLogs, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `aums_audit_log_${new Date().toISOString().substring(0, 10)}.json`;
                  a.click();
                }}
                className="btn btn-secondary btn-sm"
                style={{ gap: '6px' }}
              >
                <Download size={14} />
                <span>Export Audit JSON</span>
              </button>
            </div>
          </div>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Timestamp</th>
                  <th>User & Role</th>
                  <th>Module</th>
                  <th>Action</th>
                  <th>Entity Target</th>
                  <th>IP Address</th>
                  <th>Operation Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td className="font-mono" style={{ fontWeight: 700, color: 'var(--rose)' }}>
                      {log.id}
                    </td>
                    <td className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {log.timestamp}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{log.userName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{log.userRole}</div>
                    </td>
                    <td>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                        {log.module}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-primary font-mono" style={{ fontSize: '0.72rem' }}>
                        {log.action}
                      </span>
                    </td>
                    <td className="font-mono" style={{ fontSize: '0.75rem' }}>
                      {log.entityType} ({log.entityId})
                    </td>
                    <td className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {log.ipAddress}
                    </td>
                    <td style={{ fontSize: '0.8rem', maxWidth: '300px' }}>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Module 02 User Roles & Granular Permissions */}
      {activeTab === 'rbac' && (
        <div className="aums-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Role-Based Access Control (RBAC) Matrix</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Users are bound to least-privilege permission grants (e.g., results.enter, results.approve, student.edit, admission.review).
          </p>

          <div className="aums-table-container">
            <table className="aums-table">
              <thead>
                <tr>
                  <th>User Persona</th>
                  <th>Institutional Role</th>
                  <th>Department / Unit</th>
                  <th>Primary Portal</th>
                  <th>Granular Permissions Assigned</th>
                </tr>
              </thead>
              <tbody>
                {personas.map(p => {
                  let perms = ['profile.view'];
                  if (p.role === 'Student') perms = ['course.register', 'results.view', 'fees.pay', 'profile.edit'];
                  if (p.role === 'Lecturer') perms = ['results.enter', 'attendance.mark', 'class.view'];
                  if (p.role === 'Head of Department (HoD)') perms = ['results.review', 'results.endorse', 'courses.allocate'];
                  if (p.role === 'Dean of Faculty') perms = ['results.approve_dean', 'programme.curriculum_edit'];
                  if (p.role === 'Registrar') perms = ['results.publish', 'transcript.issue', 'graduation.certify'];
                  if (p.role === 'Finance Officer / Bursar') perms = ['fees.invoice', 'payment.reconcile', 'clearance.override'];
                  if (p.role === 'System Administrator') perms = ['* (Full Superuser Privileges)'];

                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={p.avatarUrl} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 600 }}>{p.name}</div>
                            <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-purple">{p.role}</span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.department || 'Institutional Registry'}</td>
                      <td>
                        <span className="badge badge-neutral font-mono">{p.portal}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {perms.map((perm, idx) => (
                            <span key={idx} className="badge badge-primary font-mono" style={{ fontSize: '0.68rem' }}>
                              {perm}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: System Settings & Backups */}
      {activeTab === 'settings' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="aums-card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '14px' }}>Global Feature Activation Toggles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'Semester Course Registration Portal', desc: 'Allows students to add/drop courses', enabled: true },
                { name: 'Online Mobile Money Payment Gateway', desc: 'Accepts real-time MTN/Telecel tuition webhooks', enabled: true },
                { name: 'Multi-Factor Authentication (MFA)', desc: 'Requires OTP for all results approvals', enabled: true },
                { name: 'Official Transcript QR Verifier', desc: 'Exposes public verification URL verify.alpha.edu.gh', enabled: true },
                { name: 'Maintenance Mode Lockout', desc: 'Suspends student portals for scheduled database maintenance', enabled: false },
              ].map((f, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{f.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                  </div>
                  <span className={`badge ${f.enabled ? 'badge-success' : 'badge-neutral'}`}>
                    {f.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="aums-card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '14px' }}>Automated Database Backups (Module 40)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '14px', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Database size={16} color="var(--emerald)" />
                  <strong style={{ fontSize: '0.9rem' }}>PostgreSQL Daily Snapshot</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Last Automated Backup: Today at 04:00 AM UTC • Size: 2.8 GB
                </div>
              </div>

              <div style={{ padding: '14px', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Server size={16} color="var(--primary)" />
                  <strong style={{ fontSize: '0.9rem' }}>Disaster Recovery Geo-Replication</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Replication Node: Secondary Datacenter (Accra) • Latency: 4ms
                </div>
              </div>

              <button
                onClick={() => alert('Manual institutional snapshot triggered successfully. Logged to Module 38 Audit Trail.')}
                className="btn btn-primary"
                style={{ marginTop: '8px', gap: '8px' }}
              >
                <Database size={16} />
                <span>Trigger Manual Snapshot Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
