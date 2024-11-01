import { Footer } from "./Footer"
import { Login } from "./Login"
import { Navbar } from "./Navbar"

export const LandingPage = () => {
  return (
    <body>
      <Navbar />
        
        <main className="landing">
            
            <div className="contenedor1">           
              <h1> <br /> Bienvenido a <em>Travel</em> <br />el Blog de tus Destinos Turisticos</h1>
              <p className="p">En este blog podras calificar el destino turistico en el que estuviste <br /> <button><a href="./Login">Iniciar sesion</a></button></p>
              
              <img src="src\assets\travel.png" alt="" className="image"/>
            </div>
        </main>

        <Footer/>
    </body>

    
  )
}