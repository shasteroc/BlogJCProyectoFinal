import { useEffect, useState } from "react";
import { NavbarLogin } from "./NavbarLogin";

export const NuevoBlog = () => {
  const urlApi = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1";
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [creator, setCreator] = useState(null); // Inicializar como null
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Para verificar si el usuario está logueado
  const [publicationMessage, setPublicationMessage] = useState(""); // Mensaje de éxito después de publicar

  // Función para formatear la fecha de publicación
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  };

  useEffect(() => {
    const creator = JSON.parse(localStorage.getItem("creator"));
    if (creator && creator.id) {
      setCreator(creator);
      setIsLoggedIn(true); // Usuario está logueado
      fetch(`${urlApi}/blogs`)
        .then((response) => response.json())
        .then((data) => setBlogs(data.filter((blog) => blog.userId === creator.id)));
    } else {
      setIsLoggedIn(false); // Usuario no logueado
    }
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "location") {
      setLocation(value);
    } else if (name === "review") {
      setReview(value);
    } else if (name === "rating") {
      setRating(value);
    } else if (name === "imageUrl") {
      setImageUrl(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el usuario está logueado
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para publicar un blog.");
      return;
    }

    // Verificar que todos los campos estén llenos
    if (!name || !location || !review || !rating || !imageUrl) {
      alert("Todos los campos son requeridos");
      return;
    }

    // Crear la fecha de publicación
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const data = {
      name,
      location,
      review,
      rating,
      imageUrl,
      userId: creator.id, // Asegúrate de usar `userId` para asociar el blog al usuario logueado
      createdAt: formattedDate, // Fecha de publicación
    };

    try {
      const response = await fetch(`${urlApi}/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newBlog = await response.json(); // La respuesta debería contener el blog creado
        setBlogs([...blogs, newBlog]); // Agregar el nuevo blog al estado
        setPublicationMessage(`Blog publicado con éxito el ${formattedDate}`);
        // Limpiar los campos después de publicar
        setName("");
        setLocation("");
        setReview("");
        setRating("");
        setImageUrl("");
      } else {
        throw new Error("Error al crear el blog");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al publicar el blog");
    }
  };

  return (
    <>
      <NavbarLogin />
      <main id="home">
        <div className="newBlog">
          {/* Si no está logueado, mostrar un mensaje y deshabilitar el formulario */}
          {!isLoggedIn && <p>Debes iniciar sesión para poder publicar un blog.</p>}

          {/* Formulario de publicación */}
          {isLoggedIn && (
            <form onSubmit={onSubmit} className="formP">
              <h3 className="newB">Nuevo Blog</h3>
              <input
                type="text"
                placeholder="Lugar"
                name="name"
                onChange={onChange}
                className="input"
                value={name}
              />
              <input
                type="text"
                placeholder="País"
                name="location"
                onChange={onChange}
                className="input"
                value={location}
              />
              <textarea
                placeholder="Reseña"
                name="review"
                onChange={onChange}
                className="textarea"
                value={review}
              />
              <input
                type="number"
                placeholder="Calificación del 1 al 10"
                min="1"
                max="10"
                name="rating"
                onChange={onChange}
                className="input"
                value={rating}
              />
              <input
                type="url"
                placeholder="URL de la imagen"
                name="imageUrl"
                onChange={onChange}
                className="input"
                value={imageUrl}
              />
              <button type="submit" className="publicar">
                Publicar
              </button>
            </form>
          )}

          {/* Mostrar mensaje de éxito cuando se publique */}
          {publicationMessage && <p>{publicationMessage}</p>}
        </div>
      </main>
    </>
  );
};
