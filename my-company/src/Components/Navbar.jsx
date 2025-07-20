import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
        position: 'absolute',
        top: '20px',
        right: '30px',
        backgroundColor: 'blue',
        padding: '20px',
        display: 'flex',
        gap: '20px',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomLeftRadius: '10px',
    }}>
      <Link to="./" style={{ color: '#fff' }}>Home</Link>
      <Link to="./about" style={{ color: '#fff' }}>About</Link>
      <Link to="./services" style={{ color: '#fff' }}>Services</Link>
      <Link to="./contact" style={{ color: '#fff' }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
