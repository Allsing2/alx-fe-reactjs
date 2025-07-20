import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Services from './Components/Services';
import Contact from './Components/Contact';
import Navbar from './Components/Navbar';

function App() {
   return (
<>
  <BrowserRouter>
    <Navbar />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        padding: '60px 20px 20px', // space for Navbar
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          width: 'min(90%, 100%)',
          textAlign: 'center',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
</>

  )
}

export default App
