import React from 'react';
import { useAums } from '../../context/AumsContext';

export const AppFooter: React.FC = () => {
  const { setActivePortal } = useAums();

  return (
    <footer className="app-footer no-print">
      <div className="app-footer-inner">
        <div>
          <strong>University of Mines and Technology, Tarkwa</strong>
          <p>P.O. Box 237, Tarkwa · ICT Directorate & Academic Affairs</p>
        </div>
        <div className="app-footer-meta">
          <span>© 2026 UMaT · AIMS Enterprise</span>
          <span className="dot" />
          <span>v3.0</span>
          <span className="dot" />
          <button type="button" onClick={() => setActivePortal('module_map')}>
            Module blueprint
          </button>
        </div>
      </div>
    </footer>
  );
};
