import { Footer } from "./Footer";
import { NavbarLogin } from "./NavbarLogin";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  
  function sesion() {
    navigate('/Login'); // Redirige al Login
  }

  return (
    <>
      <NavbarLogin />
      <main className="landing">
        <div className="contenedor1">
          <h1> <br /> Bienvenido a <em>Travel</em> <br />el Blog de tus Destinos Turisticos</h1>
          <p className="p"> 
            <strong>
            En este blog podrás calificar el destino turístico en el que estuviste
            </strong>
          </p>
          <br />
          <p className="p"> <em> ¿Alguna vez has visitado un destino turístico y te has quedado con la duda de cómo se comparaba con otros lugares? ¿O tal vez deseas compartir tu experiencia para ayudar a otros viajeros a elegir su próximo destino? Este blog está diseñado para ofrecerte una plataforma donde puedas calificar y compartir tus experiencias sobre los destinos turísticos que has visitado.</em></p>
          <div className="divimg">
            <img src="img/travel.png" alt="Travel" className="image" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
