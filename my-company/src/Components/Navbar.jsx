import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '10px',
      display: 'flex',
      gap: '20px'
    }}>
      <Link to="/" style={{ color: '#fff' }}>Home</Link>
      <Link to="/about" style={{ color: '#fff' }}>About</Link>
      <Link to="/services" style={{ color: '#fff' }}>Services</Link>
      <Link to="/contact" style={{ color: '#fff' }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
