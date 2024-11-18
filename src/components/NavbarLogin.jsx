import React, { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate

export const NavbarLogin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("creator"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);
  
  // Función para manejar el clic en el logo
  const handleHomeClick = () => {
    navigate("/"); // Redirige a la página de inicio ('/')
  };

  const handleLogout = () => {
    // Limpiar el usuario de localStorage y actualizar el estado
    localStorage.removeItem("creator");
    setUser(null);
    // Redirigir a la página de inicio
    navigate("/");
  };

  return (
    <header>
      <nav className="nav">
        <ul className="ulL">
          {/* Usamos navigate('/') en el evento onClick */}
          <li><a onClick={handleHomeClick}><img src="img/Logo.png" alt="Logo" className="logo" /></a></li>
          <li><Link to="/Blog"><h3>Blog</h3></Link></li>
          <li><Link to="/NuevoBlog"><h3>Nuevo Blog</h3></Link></li>
          <li><Link to="/Perfil"><h3>Perfil</h3></Link></li>
          {user ? (
            <>
              <li className="userInfo">
                <span><h3>Hola, {user.name}</h3></span>
              </li>
              <li className="userInfo">
                <a onClick={handleLogout} className="botonL">Cerrar sesión</a>
              </li>
            </>
          ) : (
            <li className="userInfo">
              <Link to="/login">Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
