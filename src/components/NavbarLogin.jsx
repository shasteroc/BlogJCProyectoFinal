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

  const handleLogout = () => {
    // Limpiar el usuario de localStorage y actualizar el estado
    localStorage.removeItem("creator");
    setUser(null);
    // Redirigir a la página de login
    navigate("/");
  };

  return (
    <header>
      <nav className="nav">
        <ul className="ulL">
          <li ><a onClick={() => home()}><img src="img\Logo.png" alt="Logo" className="logo" /></a></li>
          <li><Link to="/Blog"><h3>Blog</h3></Link></li>
          <li><Link to="/NuevoBlog"><h3>Nuevo Blog</h3></Link></li>
          <li><Link to="/Perfil"><h3>Perfil</h3></Link></li>
          {user ? (
            <>
              <li className="userInfo">
                <span><h3>Hola, {user.name}</h3></span>
              </li>
              <li className="userInfo">
                <button onClick={handleLogout} className="botonL">Cerrar sesión</button>
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
