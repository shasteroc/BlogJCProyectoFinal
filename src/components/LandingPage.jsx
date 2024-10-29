import { Login } from "./Login"

export const LandingPage = () => {
  return (
    <body>
        <header>
          <nav className="nav">
            <ul>
                <a href="./"><img src="public\Logo.png" alt="Logo.png" className="logo" /></a>
                <li><a href="#nosotros">Sobre nosotros</a></li>
                <li><a href="">Contacto</a></li>
                <li><a href="">Destinos</a></li>
            </ul>
          </nav>
        </header>
        <main className="landing">
            
            <div className="contenedor1">           
              <h1> <br /> Bienvenido a <em>Travel</em> <br />el Blog de tus Destinos Turisticos</h1>
              <p className="p">En este blog podras calificar el destino turistico en el que estuviste <br /> <button><a href="./Login">Iniciar sesion</a></button></p>
              
              <img src="src\assets\travel.png" alt="" className="image"/>
            </div>
        </main>
    </body>
  )
}