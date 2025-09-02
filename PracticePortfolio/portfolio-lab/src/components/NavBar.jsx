import { NavLink } from 'react-router-dom'

const linkClass =
  'px-3 py-2 rounded hover:bg-black/5 transition-all [&.active]:bg-black/10'

export default function NavBar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backdropFilter: 'blur(8px)',
        background: 'rgba(255,255,255,0.6)',
        borderBottom: '1px solid rgba(0,0,0,0.06)'
      }}
    >
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px', alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontWeight: 700 }}>Mitchell Morgan — Portfolio Lab</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginLeft: 'auto' }}>
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/controlled" className={linkClass}>Controlled vs Uncontrolled</NavLink>
          <NavLink to="/parent-child" className={linkClass}>Parent ↔ Child (props)</NavLink>
          <NavLink to="/child-to-parent" className={linkClass}>Child → Parent (callback)</NavLink>
          <NavLink to="/navigate-with-data" className={linkClass}>Navigate w/ Data</NavLink>
          <NavLink to="/state-vs-force" className={linkClass}>setState vs forceUpdate</NavLink>
        </div>
      </div>
    </nav>
  )
}
