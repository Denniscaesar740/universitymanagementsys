import React, { useState } from 'react';
import { useAums } from '../../context/AumsContext';
import { useTheme } from '../../context/ThemeContext';
import type { PortalId } from '../../types/models';
import {
  Sun,
  Moon,
  ChevronDown,
  CheckCircle2,
  LogOut,
  PhoneCall,
  Mail,
} from 'lucide-react';

const PORTAL_OPTIONS: { id: PortalId; label: string; badge: string }[] = [
  { id: 'student', label: 'Student Academic Portal', badge: 'Student View' },
  { id: 'lecturer', label: 'Lecturer / Staff Portal', badge: 'Faculty CA & Exam' },
  { id: 'academic_admin', label: 'Academic Administration & HoD Review', badge: 'Results Board' },
  { id: 'registry', label: 'Registry & Records Directorate', badge: 'Authoritative Biodata' },
  { id: 'finance', label: 'Finance & Student Accounts (Bursary)', badge: 'Tuition & Clearance' },
  { id: 'admissions', label: 'Admissions & Enrolment Desk', badge: 'New Intake' },
  { id: 'applicant', label: 'Applicant Self-Service Portal', badge: 'Prospective Students' },
  { id: 'hr', label: 'Human Resources & Staff Directorate', badge: 'Staff Records' },
  { id: 'management', label: 'Management Executive Portal (VC/Council)', badge: 'Institutional QA' },
  { id: 'sysadmin', label: 'ICT Directorate & Audit Trail', badge: 'Security Log' },
  { id: 'module_map', label: '40-Module Institutional Architecture Blueprint', badge: 'System Map' },
];

export const TopNavigation: React.FC = () => {
  const { activePortal, setActivePortal, currentPersona, personas, switchPersona } = useAums();
  const { theme, toggleTheme } = useTheme();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showPortalMenu, setShowPortalMenu] = useState(false);

  return (
    <header className="no-print" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top Republic & Accreditation Strip */}
      <div className="gov-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>REPUBLIC OF GHANA</span>
          <span>•</span>
          <span>MINISTRY OF EDUCATION / GTEC CHARTERED</span>
          <span>•</span>
          <span style={{ color: '#ffffff' }}>ACADEMIC YEAR: 2025/2026 (SEMESTER 2 ACTIVE)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <PhoneCall size={12} /> Helpline: +233 (0) 3123 20324
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Mail size={12} /> helpdesk@umat.edu.gh
          </span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle institutional theme"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#d4af37',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main University Masthead Banner */}
      <div className="uni-masthead">
        {/* Left: Official Emblem & University Title */}
        <div className="uni-crest-title">
          <div className="uni-emblem" onClick={() => setActivePortal('student')} style={{ cursor: 'pointer' }}>
            {/* SVG University Crest Inspired by UMaT / University of Ghana */}
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#003822" stroke="#d4af37" strokeWidth="4"/>
              <path d="M50 16 L76 34 L76 68 L50 84 L24 68 L24 34 Z" fill="#ffffff" stroke="#d4af37" strokeWidth="2.5"/>
              <path d="M50 25 L50 75 M32 45 L68 45" stroke="#003822" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="10" fill="#d4af37"/>
              <path d="M50 20 L53 30 L63 30 L55 36 L58 46 L50 40 L42 46 L45 36 L37 30 L47 30 Z" fill="#003822"/>
            </svg>
          </div>

          <div className="uni-name-block">
            <h1>UNIVERSITY OF MINES AND TECHNOLOGY (UMaT), TARKWA</h1>
            <div className="system-subtitle">
              ACADEMIC INFORMATION MANAGEMENT SYSTEM (AIMS / STUDENT MIS WEB)
            </div>
          </div>
        </div>

        {/* Right: Authenticated User Info & Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Quick Portal View Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowPortalMenu(!showPortalMenu)}
              className="btn-uni-gold"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <span>
                View: {PORTAL_OPTIONS.find(p => p.id === activePortal)?.label.split(' ')[0] || 'Academic'} Portal
              </span>
              <ChevronDown size={14} />
            </button>

            {showPortalMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  right: 0,
                  width: '340px',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--surface-border-strong)',
                  borderRadius: '3px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  zIndex: 200,
                  padding: '6px 0',
                }}
              >
                <div
                  style={{
                    padding: '6px 14px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--surface-border)',
                  }}
                >
                  Switch Operational Portal
                </div>
                {PORTAL_OPTIONS.map(opt => {
                  const isCurrent = activePortal === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        setActivePortal(opt.id);
                        setShowPortalMenu(false);
                      }}
                      style={{
                        padding: '8px 14px',
                        cursor: 'pointer',
                        background: isCurrent ? 'var(--uni-gold-subtle)' : 'transparent',
                        color: isCurrent ? '#003822' : 'var(--text-primary)',
                        fontWeight: isCurrent ? 700 : 500,
                        fontSize: '12.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderLeft: isCurrent ? '3px solid var(--uni-gold)' : '3px solid transparent',
                      }}
                    >
                      <div>
                        <div>{opt.label}</div>
                        <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{opt.badge}</div>
                      </div>
                      {isCurrent && <CheckCircle2 size={14} color="#003822" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Current Authenticated User Identity */}
          <div
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '4px 10px',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <img
              src={currentPersona.avatarUrl}
              alt={currentPersona.name}
              style={{
                width: '38px',
                height: '42px',
                border: '1px solid var(--uni-gold)',
                borderRadius: '2px',
                objectFit: 'cover',
              }}
            />

            <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff' }}>
                {currentPersona.name.toUpperCase()}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--uni-gold)' }}>
                {currentPersona.studentId || currentPersona.email}
              </div>
              <div style={{ fontSize: '10px', color: '#cbd5e1' }}>
                ROLE: {currentPersona.role.toUpperCase()}
              </div>
            </div>

            <ChevronDown size={14} color="var(--uni-gold)" />
          </div>

          {/* Role Simulation Dropdown */}
          {showPersonaMenu && (
            <div
              style={{
                position: 'absolute',
                top: '68px',
                right: '24px',
                width: '320px',
                background: 'var(--surface-card)',
                border: '1px solid var(--surface-border-strong)',
                borderRadius: '3px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                zIndex: 200,
                padding: '6px 0',
              }}
            >
              <div
                style={{
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  borderBottom: '1px solid var(--surface-border)',
                }}
              >
                Simulate Institutional Account
              </div>
              {personas.map(p => {
                const isSelected = currentPersona.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      switchPersona(p.id);
                      setShowPersonaMenu(false);
                    }}
                    style={{
                      padding: '8px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: isSelected ? 'var(--uni-gold-subtle)' : 'transparent',
                      borderLeft: isSelected ? '3px solid var(--uni-gold)' : '3px solid transparent',
                    }}
                  >
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      style={{ width: '28px', height: '32px', borderRadius: '2px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                        {p.role} {p.department ? `• ${p.department.split('&')[0]}` : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Logout Action */}
          <button
            onClick={() => switchPersona('USR-002')}
            className="btn-uni-secondary"
            title="Reset / Return to Student View"
            style={{ padding: '6px 10px', fontSize: '12px' }}
          >
            <LogOut size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
