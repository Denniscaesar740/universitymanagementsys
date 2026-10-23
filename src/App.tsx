import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AumsProvider, useAums } from './context/AumsContext';
import { LayoutProvider } from './context/LayoutContext';
import { TopNavigation } from './components/layout/TopNavigation';
import { UniversitySidebar } from './components/layout/UniversitySidebar';
import { WorkspaceHeader } from './components/layout/WorkspaceHeader';
import { CommandPalette } from './components/layout/CommandPalette';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { AppFooter } from './components/layout/AppFooter';
import { LoginPage } from './components/auth/LoginPage';
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
        <div className="recovery-screen">
          <div className="recovery-card">
            <p className="eyebrow">Session recovery</p>
            <h2>The academic portal needs a refresh</h2>
            <p>A workspace state error was intercepted. Reset cached session data and reload the dashboard.</p>
            <pre>{this.state.error?.message || 'Rendering synchronization exception'}</pre>
            <button onClick={this.handleReset} className="btn btn-primary">
              Reset session
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const PortalRouter: React.FC = () => {
  const { activePortal, workspaceView, setWorkspaceView } = useAums();

  const renderPortal = () => {
    switch (activePortal) {
      case 'student':
        return <StudentPortal currentSubView={workspaceView} />;
      case 'lecturer':
        return <LecturerPortal currentSubView={workspaceView} />;
      case 'academic_admin':
        return <AcademicAdminPortal currentSubView={workspaceView} />;
      case 'admissions':
        return <AdmissionsPortal />;
      case 'registry':
        return <RegistryPortal currentSubView={workspaceView} />;
      case 'finance':
        return <FinancePortal currentSubView={workspaceView} />;
      case 'management':
        return <ManagementPortal />;
      case 'sysadmin':
        return <SysAdminPortal currentSubView={workspaceView} />;
      case 'hr':
        return <HRPortal currentSubView={workspaceView} />;
      case 'applicant':
        return <ApplicantPortal />;
      case 'module_map':
        return <ModuleMapPortal />;
      default:
        return <StudentPortal currentSubView={workspaceView} />;
    }
  };

  return (
    <div className="portal-layout">
      <TopNavigation />
      <div className="portal-main-frame">
        <UniversitySidebar currentSubView={workspaceView} setCurrentSubView={setWorkspaceView} />
        <main id="main-workspace" className="portal-content">
          <WorkspaceHeader currentSubView={workspaceView} />
          {renderPortal()}
        </main>
      </div>
      <AppFooter />
      <CommandPalette />
      <NotificationDrawer />
    </div>
  );
};

const SessionGate: React.FC = () => {
  const { isAuthenticated } = useAums();
  if (!isAuthenticated) return <LoginPage />;
  return (
    <LayoutProvider>
      <PortalRouter />
    </LayoutProvider>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AumsProvider>
          <SessionGate />
        </AumsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
