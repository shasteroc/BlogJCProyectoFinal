import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  function home() {
    navigate('/');
  }
    return (
      <header>
      <nav className="nav">
        <ul>
            <li ><a onClick={() => home()}><img src="img\Logo.png" alt="Logo" className="logo" /></a></li>
            <li className="welcome li"><h3>Bienvenido a Travel</h3></li>
        </ul>
      </nav>
    </header>
    )
};