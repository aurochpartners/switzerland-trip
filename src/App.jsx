import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import QuickReference from './components/QuickReference'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quick" element={<QuickReference />} />
    </Routes>
  )
}

export default App
