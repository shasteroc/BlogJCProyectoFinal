import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  function home() {
    navigate('/BlogJCProyectoFinal');
  }
    return (
        <header>
          <nav className="nav">
            <ul>
                <li><a onClick={() => home()}><img src="public\Logo.png" alt="Logo de Travel" className="logo" /></a></li>
                <li className="li"><a href="#travel">Travel</a></li>
                <li className="li"><a href="#contactanos">Contactanos</a></li>
                <li className="li"><a href="#siguenos">Siguenos</a></li>
            </ul>
          </nav>
        </header>
    )
};