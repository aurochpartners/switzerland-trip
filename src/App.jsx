import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ReferenceMode from './pages/ReferenceMode'
import Planner from './pages/Planner'
import QuickReference from './components/QuickReference'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/reference" element={<ReferenceMode />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/quick" element={<QuickReference />} />
    </Routes>
  )
}

export default App
