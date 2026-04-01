import { Cable } from "lucide-react";

interface SidebarProps {
  sections: { id: string; label: string }[];
  activeId: string;
}

export function Sidebar({ sections, activeId }: SidebarProps) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <nav style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, width: '220px',
      background: 'rgba(0,0,0,0.97)',
      borderRight: '1px solid #00ff4133',
      zIndex: 40,
      display: 'none',
      flexDirection: 'column',
      backdropFilter: 'blur(8px)',
    }} className="lg:flex">
      <div style={{ padding: '20px 16px', borderBottom: '1px solid #00ff4133', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Cable style={{ width: 20, height: 20, color: '#00ff41' }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '16px', color: '#00ff41', textShadow: '0 0 10px #00ff41' }}>
          SR 2.0
        </span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            style={{
              textAlign: 'left',
              padding: '10px 12px',
              background: activeId === sec.id ? 'rgba(0,255,65,0.08)' : 'transparent',
              border: activeId === sec.id ? '1px solid #00ff4166' : '1px solid transparent',
              borderRadius: '4px',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '12px',
              color: activeId === sec.id ? '#00ff41' : '#00ff4177',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeId === sec.id ? '0 0 10px rgba(0,255,65,0.2)' : 'none',
            }}
          >
            {activeId === sec.id && <span style={{ marginRight: '6px', animation: 'blink 1s step-end infinite' }}>{'>'}</span>}
            {sec.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid #00ff4122', fontSize: '11px', color: '#00ff4155', fontFamily: "'Share Tech Mono', monospace" }}>
        v2.0.1 — LIVE
      </div>
    </nav>
  );
}
