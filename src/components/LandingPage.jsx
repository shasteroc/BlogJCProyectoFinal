import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  
  function sesion() {
    navigate('/Login'); // Redirige al Login
  }

  return (
    <>
      <Navbar />
      <main className="landing">
        <div className="contenedor1">
          <h1> <br /> Bienvenido a <em>Travel</em> <br />el Blog de tus Destinos Turisticos</h1>
          <p className="p">
            En este blog podrás calificar el destino turístico en el que estuviste <br />
            <button onClick={() => sesion()}>Iniciar sesión</button>
          </p>
          <div className="divimg">
            <img src="img/travel.png" alt="Travel" className="image" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
