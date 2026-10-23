import React, { useState, useMemo } from 'react';
import { useAums } from '../../context/AumsContext';
import { PILLARS_DATA, MODULES_DATA } from '../../data/modulesData';
import type { AumsModule, PortalId } from '../../types/models';
import {
  Layers,
  Search,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Database,
  ExternalLink,
  X,
} from 'lucide-react';

export const ModuleMapPortal: React.FC = () => {
  const { openModule } = useAums();
  const [selectedPillar, setSelectedPillar] = useState<string>('ALL');
  const [selectedPhase, setSelectedPhase] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<AumsModule | null>(null);

  // Filter modules
  const filteredModules = useMemo(() => {
    return MODULES_DATA.filter(mod => {
      const matchesPillar = selectedPillar === 'ALL' || mod.pillarId === selectedPillar;
      const matchesPhase = selectedPhase === 'ALL' || mod.phase === selectedPhase;
      const matchesSearch =
        searchQuery === '' ||
        mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.roles.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mod.submodules.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesPillar && matchesPhase && matchesSearch;
    });
  }, [selectedPillar, selectedPhase, searchQuery]);

  // Map module to portal
  const getTargetPortal = (moduleId: number): PortalId => {
    if (moduleId === 3) return 'admissions';
    if ([4, 9, 15, 22].includes(moduleId)) return 'student';
    if ([8, 10, 21].includes(moduleId)) return 'lecturer';
    if ([1, 5, 6, 7, 11, 12, 13, 14, 16].includes(moduleId)) return 'academic_admin';
    if ([17, 18, 19].includes(moduleId)) return 'finance';
    if ([36, 37].includes(moduleId)) return 'management';
    if ([2, 38, 39, 40].includes(moduleId)) return 'sysadmin';
    return 'registry';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Official Institutional Architecture Header */}
      <div className="portal-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="uni-badge badge-official">
            <Layers size={13} /> DIRECTORATE OF ICT & ACADEMIC SYSTEMS
          </span>
          <span className="uni-badge badge-cleared">
            <CheckCircle2 size={13} /> 40 Core Modules Architecture
          </span>
          <span className="uni-badge badge-pending">
            <Database size={13} /> Single Authoritative Student Identity
          </span>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 6px' }}>
          University Enterprise Management System (UMS) 40-Module Architecture Blueprint
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', lineHeight: 1.5, maxWidth: '1100px' }}>
          Standardized enterprise specification covering all 40 interconnected modules across the 9 institutional pillars.
          Built strictly upon the <strong>Single Authoritative Student Identity Lifecycle</strong>—where candidate records from Admissions
          transition seamlessly to Registry Biodata, Course Registration, Faculty Grading, Multi-tier Senate Approvals, and Graduation Certification.
        </p>

        {/* Quick Institutional Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '12px',
            marginTop: '16px',
          }}
        >
          <div className="kpi-card kpi-card-green">
            <div className="kpi-label">Modules</div>
            <div className="kpi-value">40</div>
          </div>
          <div className="kpi-card kpi-card-green">
            <div className="kpi-label">Pillars</div>
            <div className="kpi-value">9</div>
          </div>
          <div className="kpi-card kpi-card-gold">
            <div className="kpi-label">Phase 1 core</div>
            <div className="kpi-value">14</div>
          </div>
          <div className="kpi-card kpi-card-sky">
            <div className="kpi-label">Portals</div>
            <div className="kpi-value">10</div>
          </div>
        </div>
      </div>

      {/* Unified Identity Lifecycle Banner */}
      <div className="aums-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <GitBranch size={16} color="var(--primary)" />
              <strong style={{ fontSize: '0.95rem' }}>Unified Student Lifecycle & Data Flow</strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Data seamlessly transitions between modules without duplication:
            </p>
          </div>
        </div>

        {/* Visual Flow Steps */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          {[
            { label: '03. Admissions', detail: 'Applicant Profile' },
            { label: '04. Biodata', detail: 'STU-XXXX Master Record' },
            { label: '17. Finance', detail: 'Tuition & Clearance' },
            { label: '09. Course Reg', detail: 'Curriculum & Pre-reqs' },
            { label: '10. Lecturer', detail: 'Continuous Assessment' },
            { label: '13. Approval', detail: 'HoD -> Dean -> Registry' },
            { label: '15. Records', detail: 'Transcript & QR Slip' },
            { label: '16. Graduation', detail: 'Honours & Degree Audit' },
            { label: '35. Alumni', detail: 'Graduate Network' },
          ].map((step, idx, arr) => (
            <React.Fragment key={idx}>
              <div
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 14px',
                  minWidth: '150px',
                  textAlign: 'center',
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {step.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {step.detail}
                </div>
              </div>
              {idx < arr.length - 1 && (
                <ArrowRight size={16} color="var(--border-strong)" style={{ flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="aums-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '20px 24px',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
            <Search
              size={18}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="input-control"
              placeholder="Search 40 modules, keywords, roles (e.g., 'Registrar', 'Results', 'Finance')..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '42px' }}
            />
          </div>

          {/* Phase Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Phase:</span>
            {[
              { id: 'ALL', label: 'All Phases' },
              { id: 1, label: 'Phase 1 Core' },
              { id: 2, label: 'Phase 2' },
              { id: 3, label: 'Phase 3' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPhase(p.id as any)}
                className={`btn btn-sm ${selectedPhase === p.id ? 'btn-primary' : 'btn-secondary'}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pillars Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button
            onClick={() => setSelectedPillar('ALL')}
            className={`btn btn-sm ${selectedPillar === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '9999px', flexShrink: 0 }}
          >
            All Pillars (9)
          </button>
          {PILLARS_DATA.map(pil => {
            const isSelected = selectedPillar === pil.id;
            return (
              <button
                key={pil.id}
                onClick={() => setSelectedPillar(pil.id)}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '9999px', flexShrink: 0 }}
              >
                {pil.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modules Count Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredModules.length}</strong> of <strong>40</strong> Modules
        </div>
      </div>

      {/* Modules 40-Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredModules.map(mod => {
          const targetPortal = getTargetPortal(mod.id);
          return (
            <div
              key={mod.id}
              className="aums-card aums-card-interactive"
              onClick={() => setSelectedModule(mod)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: 'var(--primary-glow)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {mod.id.toString().padStart(2, '0')}
                    </span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {mod.pillarName}
                    </span>
                  </div>
                  <span
                    className={`badge ${
                      mod.status === 'Production Core'
                        ? 'badge-success'
                        : mod.status === 'Implemented'
                        ? 'badge-primary'
                        : 'badge-purple'
                    }`}
                  >
                    Phase {mod.phase}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', lineHeight: 1.4 }}>
                  {mod.name}
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                  {mod.shortDesc}
                </p>

                {/* Submodules Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {mod.submodules.slice(0, 3).map((sub, sidx) => (
                    <span
                      key={sidx}
                      style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'var(--bg-subtle)',
                        color: 'var(--text-dim)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                  {mod.submodules.length > 3 && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'var(--bg-subtle)',
                        color: 'var(--primary)',
                      }}
                    >
                      +{mod.submodules.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Users & Live Action */}
              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  👤 {mod.roles.slice(0, 2).join(', ')}
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    openModule(mod.id, targetPortal);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ gap: '6px' }}
                >
                  <span>Launch Portal</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Detail Modal */}
      {selectedModule && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSelectedModule(null)}
        >
          <div
            className="aums-card"
            style={{
              width: '100%',
              maxWidth: '720px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-lg)',
              padding: '32px',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="badge badge-primary font-mono">Module #{selectedModule.id.toString().padStart(2, '0')}</span>
                  <span className="badge badge-neutral">{selectedModule.pillarName}</span>
                  <span className="badge badge-success">Phase {selectedModule.phase}</span>
                </div>
                <h2 style={{ fontSize: '1.4rem' }}>{selectedModule.name}</h2>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Module Scope & Mandate
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                {selectedModule.description}
              </p>
            </div>

            {/* Submodules List */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Key Submodules & Features
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                {selectedModule.submodules.map((sub, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: 'var(--bg-subtle)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <CheckCircle2 size={15} color="var(--emerald)" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs & Outputs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  padding: '16px',
                  background: 'var(--bg-subtle)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px' }}>
                  📥 Key Data Inputs
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  {selectedModule.keyInputs.map((inp, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      {inp}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: '16px',
                  background: 'var(--bg-subtle)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--emerald)', marginBottom: '8px' }}>
                  📤 Key Outputs & Events
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  {selectedModule.keyOutputs.map((out, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      {out}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* User Roles */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '8px' }}>
                Authorized User Roles
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedModule.roles.map((r, idx) => (
                  <span key={idx} className="badge badge-purple">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setSelectedModule(null)} className="btn btn-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedModule(null);
                  openModule(selectedModule.id);
                }}
                className="btn btn-primary"
                style={{ gap: '8px' }}
              >
                <span>Launch Corresponding Portal</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
