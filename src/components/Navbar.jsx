import { Footer } from "./Footer";
export const Navbar = () => {
    return (
        <header>
          <nav className="nav">
            <ul>
                <li><a href="./"><img src="\Logo.png" alt="Logo de Travel" className="logo" /></a></li>
                <li><a href="#nosotros">Sobre nosotros</a></li>
                <li><a href="#contactanos">Contactanos</a></li>
                <li><a href="#siguenos">Siguenos</a></li>
            </ul>
          </nav>
        </header>
    )
};