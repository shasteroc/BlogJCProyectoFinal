import { Login } from "./Login"

export const LandingPage = () => {
  return (
    <body>
        <nav>
            <ul>
                <img src="public\Logo.png" alt="Logo.png" className="logo" />
                <li><a href="#nosotros">Sobre nosotros</a></li>
                <li><a href="">Contacto</a></li>
                <li><a href="./Login">Iniciar sesion</a></li>
            </ul>
        </nav>
        <main className="landing">
            
            <img src="src\assets\Logo.png" alt="" />  
            <h1 id="nosotros">Bienvenido a <em>Travel</em> <br />el Blog de tus Destinos Turisticos</h1>
            <p className="p">Aqui podras calificar el destino turistico en el que estuviste</p>
            </main>
    </body>
  )
}