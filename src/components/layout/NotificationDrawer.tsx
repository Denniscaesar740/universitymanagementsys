import React from 'react';
import { Bell, X } from 'lucide-react';
import { useAums } from '../../context/AumsContext';
import { useLayout } from '../../context/LayoutContext';

export const NotificationDrawer: React.FC = () => {
  const { noticesOpen, setNoticesOpen } = useLayout();
  const { notices } = useAums();

  if (!noticesOpen) return null;

  return (
    <div className="drawer-overlay" onClick={() => setNoticesOpen(false)} role="presentation">
      <aside className="notice-drawer" onClick={(e) => e.stopPropagation()} aria-label="Campus notices">
        <div className="notice-drawer-head">
          <div>
            <div className="eyebrow">Campus circulars</div>
            <h3>Notices & alerts</h3>
          </div>
          <button className="icon-btn" onClick={() => setNoticesOpen(false)} aria-label="Close notices">
            <X size={16} />
          </button>
        </div>
        <div className="notice-drawer-body">
          {notices.map((n) => (
            <article key={n.id} className="notice-card">
              <div className={`notice-dot notice-dot-${n.category.toLowerCase() === 'urgent' ? 'urgent' : n.category.toLowerCase() === 'financial' ? 'financial' : n.category.toLowerCase() === 'academic' ? 'academic' : 'general'}`} />
              <div>
                <div className="notice-card-meta">
                  <span>{n.category}</span>
                  <span>{n.date}</span>
                </div>
                <h4>{n.title}</h4>
                <p>{n.content}</p>
              </div>
            </article>
          ))}
          {notices.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Bell size={22} />
              </div>
              No circulars in the queue.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
