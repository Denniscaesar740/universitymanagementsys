import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AumsProvider, useAums } from './context/AumsContext';
import { TopNavigation } from './components/layout/TopNavigation';
import { UniversitySidebar } from './components/layout/UniversitySidebar';
import { StudentPortal } from './components/portals/StudentPortal';
import { LecturerPortal } from './components/portals/LecturerPortal';
import { AcademicAdminPortal } from './components/portals/AcademicAdminPortal';
import { AdmissionsPortal } from './components/portals/AdmissionsPortal';
import { RegistryPortal } from './components/portals/RegistryPortal';
import { FinancePortal } from './components/portals/FinancePortal';
import { ManagementPortal } from './components/portals/ManagementPortal';
import { SysAdminPortal } from './components/portals/SysAdminPortal';
import { HRPortal } from './components/portals/HRPortal';
import { ApplicantPortal } from './components/portals/ApplicantPortal';
import { ModuleMapPortal } from './components/portals/ModuleMapPortal';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('UMaT AIMS Portal caught an error:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#002617',
            color: '#ffffff',
            padding: '24px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              background: '#ffffff',
              color: '#0f172a',
              padding: '28px',
              borderRadius: '4px',
              border: '2px solid #c59b27',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <h2
              style={{
                color: '#003822',
                fontSize: '16px',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Academic Portal Session Recovery
            </h2>
            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>
              A session state synchronization error was intercepted. Click below to clear stored caches and reload
              the official student dashboard.
            </p>
            <div
              style={{
                background: '#f8fafc',
                padding: '10px 14px',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#b91c1c',
                marginBottom: '16px',
                overflowX: 'auto',
              }}
            >
              {this.state.error?.message || 'Rendering synchronization exception'}
            </div>
            <button
              onClick={this.handleReset}
              style={{
                background: '#003822',
                color: '#ffffff',
                border: '1px solid #c59b27',
                padding: '8px 18px',
                fontSize: '12.5px',
                fontWeight: 700,
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              Reset Session & Reload Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const PortalRouter: React.FC = () => {
  const { activePortal, setActivePortal } = useAums();
  const [currentSubView, setCurrentSubView] = useState<string>('dashboard');

  React.useEffect(() => {
    const defaults: Record<string, string> = {
      student: 'dashboard',
      lecturer: 'marksheet',
      academic_admin: 'approvals',
      admissions: 'applications',
      applicant: 'status',
      registry: 'biodata',
      finance: 'invoices',
      management: 'dashboard',
      sysadmin: 'audit',
      hr: 'staff',
      module_map: 'blueprint',
    };
    if (defaults[activePortal]) {
      setCurrentSubView(defaults[activePortal]);
    }
  }, [activePortal]);

  const renderPortal = () => {
    switch (activePortal) {
      case 'student':
        return <StudentPortal currentSubView={currentSubView} />;
      case 'lecturer':
        return <LecturerPortal currentSubView={currentSubView} />;
      case 'academic_admin':
        return <AcademicAdminPortal currentSubView={currentSubView} />;
      case 'admissions':
        return <AdmissionsPortal />;
      case 'registry':
        return <RegistryPortal currentSubView={currentSubView} />;
      case 'finance':
        return <FinancePortal currentSubView={currentSubView} />;
      case 'management':
        return <ManagementPortal />;
      case 'sysadmin':
        return <SysAdminPortal />;
      case 'hr':
        return <HRPortal currentSubView={currentSubView} />;
      case 'applicant':
        return <ApplicantPortal />;
      case 'module_map':
        return <ModuleMapPortal />;
      default:
        return <StudentPortal currentSubView={currentSubView} />;
    }
  };

  return (
    <div className="portal-layout">
      {/* Authentic UMaT / UG Masthead */}
      <TopNavigation />

      {/* Main University Frame: Sidebar + Content */}
      <div className="portal-main-frame">
        <UniversitySidebar currentSubView={currentSubView} setCurrentSubView={setCurrentSubView} />
        <main className="portal-content">{renderPortal()}</main>
      </div>

      {/* Official University Footer */}
      <footer
        className="no-print"
        style={{
          borderTop: '3px solid var(--uni-gold)',
          backgroundColor: '#002617',
          color: '#ffffff',
          padding: '16px 24px',
          marginTop: 'auto',
          fontSize: '11.5px',
        }}
      >
        <div
          style={{
            maxWidth: '1650px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontWeight: 800, color: 'var(--uni-gold)', fontSize: '12.5px' }}>
              UNIVERSITY OF MINES AND TECHNOLOGY (UMaT), TARKWA
            </div>
            <div style={{ color: '#cbd5e1' }}>
              P.O. Box 237, Tarkwa, Western Region, Ghana • ICT Directorate & Academic Affairs System
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#cbd5e1' }}>
            <span>© 2026 UMaT / Alpha University. All Rights Reserved.</span>
            <span>•</span>
            <span style={{ color: '#d4af37', fontWeight: 700 }}>Version 2.4.0 (Enterprise Academic Build)</span>
            <span>•</span>
            <button
              onClick={() => setActivePortal('module_map')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--uni-gold)',
                cursor: 'pointer',
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              40-Module Blueprint
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AumsProvider>
          <PortalRouter />
        </AumsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
