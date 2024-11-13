import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  function sesion() {
    navigate('/BlogJCProyectoFinal/Login');
  }
  return (
    
      <><Navbar />
      <main className="landing">

      <div className="contenedor1" id="travel">
        <h1> <br /> Bienvenido a <em>Travel</em> <br />el Blog de tus Destinos Turisticos</h1>
        <p className="p">En este blog podras calificar el destino turistico en el que estuviste <br /> <button onClick={() => sesion()}>Iniciar sesion</button></p>

        <img src="" alt="Travel" className="image" />
      </div>
    </main>
    <Footer /></>
    

    
  )
}