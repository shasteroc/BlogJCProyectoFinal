import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Registro = () => {
  const urlApi = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    fetch(`${urlApi}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    navigate("/login");
  };

  const goLogin = () => {
    navigate("/BlogJCProyectoFinal/Login");
  };

  return (
    <body>
      <Navbar />
      <main className="login">
        <div className="contenedor-responsive">
        < form onSubmit={onSubmit}>
            <h1>Registro</h1>
            <fieldset>
              <br />
              <input
              type="text"
              placeholder="Nombre"
              required
              onChange={onChange}
              name="name"
            />
              <input
              type="email"
              placeholder="Correo electrónico"
              required
              onChange={onChange}
              name="email"
            />
              <input
              type="password"
              placeholder="Contraseña"
              required
              onChange={onChange}
              name="password"
            />
            </fieldset>
            <button type="submit">Registrarse</button>
            <p >¿Ya tienes cuenta? <a onClick={goLogin}>inicia sesión</a></p>
          </form>
        </div>
      </main>
    </body>
  );
};