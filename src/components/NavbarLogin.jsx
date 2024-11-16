import { useNavigate } from "react-router-dom";

export const NavbarLogin = () => {
  const navigate = useNavigate();
  function cerrar() {
    navigate('/');
  }

  return (
      <header>
        <nav className="nav">
          <ul>
              <li ><a><img src="img\Logo.png" alt="Logo" className="logo" /></a></li>
              <li className="welcome li"><h3>TRAVEL</h3></li>
              <button className="buttonnav" onClick={() => cerrar()}>Cerrar sesion</button>
          </ul>
        </nav>
      </header>
  )
};