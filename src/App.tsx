import { BrowserRouter, Routes, Route } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
import Home from "./pages/Home"
import TokenExpired from "./pages/TokenExpired"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/expired" element={<TokenExpired />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
