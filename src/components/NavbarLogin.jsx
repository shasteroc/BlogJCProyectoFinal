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
              <li ><a href="#home"><img src="img\Logo.png" alt="Logo" className="logo" /></a></li>
              <li className="welcome li">Bienvenido a Travel</li>
              <button className="buttonnav" onClick={() => cerrar()}>Cerrar sesion</button>
          </ul>
        </nav>
      </header>
  )
};