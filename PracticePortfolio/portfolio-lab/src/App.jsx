import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import ControlledUncontrolled from './pages/ControlledUncontrolled'
import ParentChild from './pages/ParentChild'
import ChildToParent from './pages/ChildToParent'
import NavigateWithData from './pages/NavigateWithData'
import StateVsForce from './pages/StateVsForce'

export default function App() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/controlled" element={<ControlledUncontrolled />} />
            <Route path="/parent-child" element={<ParentChild />} />
            <Route path="/child-to-parent" element={<ChildToParent />} />
            <Route path="/navigate-with-data" element={<NavigateWithData />} />
            <Route path="/state-vs-force" element={<StateVsForce />} />
          </Routes>
        </div>
      </main>
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '16px', textAlign: 'center', opacity: 0.7 }}>
        © {new Date().getFullYear()} Mitchell Morgan — React Portfolio Lab
      </footer>
    </div>
  )
}
