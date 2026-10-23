import React from 'react';
import { ChevronRight, Command } from 'lucide-react';
import { useAums } from '../../context/AumsContext';
import { useLayout } from '../../context/LayoutContext';
import { PORTAL_CATALOG, PORTAL_TITLES } from '../../data/portals';

export const WorkspaceHeader: React.FC<{ currentSubView: string }> = ({ currentSubView }) => {
  const { activePortal } = useAums();
  const { setCommandOpen } = useLayout();
  const portal = PORTAL_CATALOG.find((p) => p.id === activePortal);
  const titles = PORTAL_TITLES[activePortal];
  const viewLabel = currentSubView.replace(/_/g, ' ');

  return (
    <div className="workspace-header no-print">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <span>AIMS</span>
        <ChevronRight size={12} className="breadcrumb-separator" />
        <span>{portal?.short}</span>
        <ChevronRight size={12} className="breadcrumb-separator" />
        <span className="breadcrumb-current">{viewLabel}</span>
        <span className="workspace-kicker">{titles.kicker}</span>
      </nav>
      <button className="search-trigger" onClick={() => setCommandOpen(true)}>
        <Command size={14} />
        <span>Jump to a portal, student, or account</span>
        <kbd>Ctrl K</kbd>
      </button>
    </div>
  );
};
