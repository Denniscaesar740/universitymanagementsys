import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useAums } from '../../context/AumsContext';
import { useLayout } from '../../context/LayoutContext';
import { PORTAL_CATALOG } from '../../data/portals';
import type { PortalId } from '../../types/models';

export const CommandPalette: React.FC = () => {
  const { commandOpen, setCommandOpen } = useLayout();
  const { setActivePortal, students, notices, switchPersona, personas } = useAums();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const portals = PORTAL_CATALOG.filter(
      (p) =>
        !q ||
        p.label.toLowerCase().includes(q) ||
        p.hint.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q)
    ).map((p) => ({
      id: `portal-${p.id}`,
      kind: 'Portal',
      title: p.label,
      subtitle: p.hint,
      run: () => setActivePortal(p.id as PortalId),
    }));

    const people = students
      .filter(
        (s) =>
          !q ||
          s.fullName.toLowerCase().includes(q) ||
          s.indexNumber.toLowerCase().includes(q) ||
          s.programmeName.toLowerCase().includes(q)
      )
      .slice(0, 6)
      .map((s) => ({
        id: `stu-${s.id}`,
        kind: 'Student',
        title: s.fullName,
        subtitle: `${s.indexNumber} · ${s.programmeName}`,
        run: () => setActivePortal('registry'),
      }));

    const accounts = personas
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q))
      .slice(0, 5)
      .map((p) => ({
        id: `user-${p.id}`,
        kind: 'Account',
        title: p.name,
        subtitle: `${p.role}${p.department ? ` · ${p.department}` : ''}`,
        run: () => {
          switchPersona(p.id);
          setActivePortal(p.portal);
        },
      }));

    const circulars = notices
      .filter((n) => !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
      .slice(0, 4)
      .map((n) => ({
        id: `notice-${n.id}`,
        kind: 'Notice',
        title: n.title,
        subtitle: n.category,
        run: () => setActivePortal('student'),
      }));

    return [...portals, ...people, ...accounts, ...circulars];
  }, [query, students, notices, personas, setActivePortal, switchPersona]);

  useEffect(() => {
    if (commandOpen) {
      setQuery('');
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [commandOpen]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  if (!commandOpen) return null;

  const run = (i: number) => {
    const item = results[i];
    if (!item) return;
    item.run();
    setCommandOpen(false);
  };

  return (
    <div
      className="cmdk-overlay"
      onClick={() => setCommandOpen(false)}
      role="presentation"
    >
      <div
        className="cmdk-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="cmdk-search">
          <Search size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search portals, students, accounts, circulars…"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIndex((i) => Math.min(results.length - 1, i + 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setIndex((i) => Math.max(0, i - 1));
              }
              if (e.key === 'Enter') {
                e.preventDefault();
                run(index);
              }
            }}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="cmdk-hint">
          <Sparkles size={14} />
          Jump anywhere in the university system
        </div>
        <div className="cmdk-list">
          {results.length === 0 && <div className="cmdk-empty">No matches for “{query}”</div>}
          {results.map((item, i) => (
            <button
              key={item.id}
              className={`cmdk-item ${i === index ? 'active' : ''}`}
              onMouseEnter={() => setIndex(i)}
              onClick={() => run(i)}
            >
              <span className="cmdk-kind">{item.kind}</span>
              <span className="cmdk-copy">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
              <ArrowRight size={14} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
