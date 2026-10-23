import React, { useEffect, useRef, useState } from 'react';
import { useAums } from '../../context/AumsContext';
import { useTheme } from '../../context/ThemeContext';
import { useLayout } from '../../context/LayoutContext';
import { PORTAL_CATALOG } from '../../data/portals';
import {
  Bell,
  Check,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  PanelLeft,
  Sun,
} from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const { activePortal, setActivePortal, currentPersona, personas, switchPersona, notificationCount, canSwitchWorkspaces, logout } = useAums();
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar, setNoticesOpen, setCommandOpen } = useLayout();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showPortalMenu, setShowPortalMenu] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setShowPersonaMenu(false);
        setShowPortalMenu(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const currentPortal = PORTAL_CATALOG.find((p) => p.id === activePortal);

  return (
    <header className="app-header no-print" ref={headerRef}>
      <a href="#main-workspace" className="skip-link">
        Skip to workspace
      </a>

      <div className="app-header-bar">
        <div className="brand-lockup">
          <button className="icon-btn mobile-only" onClick={toggleSidebar} aria-label="Toggle navigation">
            <Menu size={18} />
          </button>
          <button className="icon-btn desktop-only" onClick={toggleSidebar} aria-label="Collapse sidebar">
            <PanelLeft size={18} />
          </button>
          <button className="crest-btn" onClick={() => setActivePortal('student')} aria-label="Go to student portal">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#0B3D2E" stroke="#D4AF37" strokeWidth="4" />
              <path d="M50 16 L76 34 L76 68 L50 84 L24 68 L24 34 Z" fill="#ffffff" stroke="#D4AF37" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="10" fill="#D4AF37" />
            </svg>
          </button>
          <div className="brand-copy">
            <strong>UMaT AIMS</strong>
            <span>Academic Information Management</span>
          </div>
        </div>

        <div className="header-status">
          <span className="status-pill">GTEC chartered</span>
          <span className="status-pill gold">2025/2026 · Sem 2</span>
        </div>

        <div className="header-actions">
          <button className="ghost-chip" onClick={() => setCommandOpen(true)}>
            Search
            <kbd>⌘K</kbd>
          </button>

          {canSwitchWorkspaces && (
            <div className="menu-anchor">
              <button className="ghost-chip" onClick={() => setShowPortalMenu((v) => !v)}>
                {currentPortal?.short || 'Portal'}
                <ChevronDown size={14} />
              </button>
              {showPortalMenu && (
                <div className="float-menu float-menu-wide">
                  <div className="float-menu-label">Directorate workspace</div>
                  {PORTAL_CATALOG.map((opt) => {
                    const isCurrent = activePortal === opt.id;
                    return (
                      <button
                        key={opt.id}
                        className={`float-item ${isCurrent ? 'current' : ''}`}
                        onClick={() => {
                          setActivePortal(opt.id);
                          setShowPortalMenu(false);
                        }}
                      >
                        <span>
                          <strong>{opt.label}</strong>
                          <small>{opt.badge}</small>
                        </span>
                        {isCurrent && <Check size={14} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="icon-btn notice-btn" onClick={() => setNoticesOpen(true)} aria-label="Open notices">
            <Bell size={16} />
            {notificationCount > 0 && <span className="notice-count">{notificationCount}</span>}
          </button>

          <div className="menu-anchor">
            <button className="identity-chip" onClick={() => canSwitchWorkspaces && setShowPersonaMenu((v) => !v)}>
              <img src={currentPersona.avatarUrl} alt="" />
              <span>
                <strong>{currentPersona.name}</strong>
                <small>{currentPersona.role}</small>
              </span>
              {canSwitchWorkspaces && <ChevronDown size={14} />}
            </button>
            {canSwitchWorkspaces && showPersonaMenu && (
              <div className="float-menu">
                <div className="float-menu-label">Open another campus account</div>
                {personas.map((p) => (
                  <button
                    key={p.id}
                    className={`float-item ${currentPersona.id === p.id ? 'current' : ''}`}
                    onClick={() => {
                      switchPersona(p.id);
                      setShowPersonaMenu(false);
                    }}
                  >
                    <img src={p.avatarUrl} alt="" />
                    <span>
                      <strong>{p.name}</strong>
                      <small>{p.role}</small>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="ghost-chip" onClick={logout} title="Sign out">
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};
