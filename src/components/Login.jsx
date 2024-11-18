import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarLogin } from "./NavbarLogin";
import { Link } from "react-router-dom";  // Para enlaces en lugar de onClick

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Usamos null para manejar mejor el error
  const [passwordVisible, setPasswordVisible] = useState(false); // Nuevo estado para controlar la visibilidad de la contraseña

  // Redirige a la página de registro
  function registro() {
    navigate('/registro');
  }

  // Función de manejo de login
  const submit = async (event) => {
    event.preventDefault();

    const correo = event.target.elements.correo.value;
    const pass = event.target.elements.password.value;

    try {
      const response = await fetch('https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users');
      const users = await response.json();

      // Buscar el usuario con las credenciales ingresadas
      const user = users.find(user => user.email === correo && user.password === pass);

      if (user) {
        localStorage.setItem("creator", JSON.stringify(user));  // Guardamos el usuario en localStorage
        navigate('/Blog'); // Cambié la redirección a la página de Blog
      } else {
        setError('Las credenciales son incorrectas'); // Mostramos el error si no se encuentra el usuario
      }
      
    } catch (error) {
      setError('Hubo un problema al intentar iniciar sesión. Intenta de nuevo.');
      console.error(error);
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Cambiar el estado de visibilidad
  };

  return (
    <>
      <NavbarLogin />
      <main className="login">
        <form onSubmit={submit}>
          <h1>Inicia sesión</h1>
          {error && <div className="error-message">{error}</div>} {/* Mostramos el mensaje de error si existe */}
          <fieldset>
            <label>
              <span>Correo</span>
              <input name="correo" type="email" placeholder="ejemplo@gmail.com" required />
            </label>
            <label>
              <span>Contraseña</span>
              <div className="password-container">
                <input
                  name="password"
                  type={passwordVisible ? "text" : "password"} // Cambia entre 'text' y 'password' según el estado
                  placeholder="***********"
                  required
                />
                <a type="button" onClick={togglePasswordVisibility} className="toggle-password">
                  {passwordVisible ? "Ocultar" : "Mostrar"} {/* Cambia el texto del botón */}
                </a>
              </div>
            </label>
          </fieldset>
          <button type="submit">Iniciar sesión</button>
          <label>
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p> {/* Usamos Link para navegación */}
          </label>
        </form>
      </main>
    </>
  );
};
