import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Registro = () => {
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
      navigate('/results')
    } else {
      setError(true)
    }
  }

  return (
    <main className="login">
      <form onSubmit={submit}>
        <h1>Registro de usuario</h1>
        {error ? 'Las credenciales son incorrectas':null}
        <fieldset>
            <label>
            <span>Nombre</span>
            <input name="name" type="text" placeholder="John" required/>
            </label>
            <label>
            <span>Correo</span>
            <input name="email" type="email" placeholder="johndoe@email.com" required/>
            </label>
            <label>
            <span>Contraseña</span>
            <input name="password" type="password" placeholder="***********" required/>
            </label>
        </fieldset>
        <button>Registrarse</button>
      </form>
    </main>
  )
}