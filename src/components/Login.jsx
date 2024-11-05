import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Registro } from "./Registro"

export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    const correo = event.target.elements.correo.value
    const pass = event.target.elements.password.value

    const response = await fetch('https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users')
    const users = await response.json()

    const user = users.find(user => user.email === correo && user.password === pass)
    
    if (user) {
      navigate('/Results')
    } else {
      setError(true)
    }
  }

  return (
    <main className="login">
      <form onSubmit={submit}>
        <h1>Inicia sesión</h1>
        {error ? 'Las credenciales son incorrectas':null}
        <fieldset>
          <label>
            <br />
            <span>Correo</span>
            <input name="correo" type="email" placeholder="ejemplo@gmail.com" required/>
            </label>
          <label>
            <span>Contraseña</span>
            <input name="password" type="password" placeholder="***********" required/>
            </label>
        </fieldset>
        <button>Iniciar sesión</button>
        <label>
        <p>¿No tienes cuenta? <a href="./Registro">Registrate</a></p>
      </label>
      </form>
    </main>
  )
}
