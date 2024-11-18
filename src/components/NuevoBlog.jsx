import { useEffect, useState } from "react";
import { NavbarLogin } from "./NavbarLogin";

export const NuevoBlog = () => {
  const urlApi = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1";
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [creator, setCreator] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const creator = JSON.parse(localStorage.getItem("creator"));
    if (creator && creator.id) {
      setCreator(creator);
      fetch(`${urlApi}/blogs`)
        .then((response) => response.json())
        .then((data) => setBlogs(data.filter((blog) => blog.creator === creator.id)));
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
    // Verificar que todos los campos estén llenos
    if (!name || !location || !review || !rating || !imageUrl) {
      alert("Todos los campos son requeridos");
      return;
    }

    const data = {
      name,
      location,
      review,
      rating,
      imageUrl,
      userId: creator.id, // Asegúrate de usar `userId` para asociar el blog al usuario logueado
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
      } else {
        throw new Error("Error al crear el blog");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al publicar el blog");
    }
  };

  return (
    <><NavbarLogin /><main id="home">
      <div className="newBlog">
        <form onSubmit={onSubmit} className="formP">
          <h3 className="newB">Nuevo Blog</h3>
          <input
            type="text"
            placeholder="Lugar"
            name="name"
            onChange={onChange}
            className="input" />
          <input
            type="text"
            placeholder="Pais"
            name="location"
            onChange={onChange}
            className="input" />
          <textarea
            placeholder="Reseña"
            name="review"
            onChange={onChange}
            className="textarea" />
          <input
            type="number"
            placeholder="Calificación del 1 al 10"
            min="1"
            max="10"
            name="rating"
            onChange={onChange}
            className="input" />
          <input
            type="url"
            placeholder="URL de la imagen"
            name="imageUrl"
            onChange={onChange}
            className="input" />
          <button type="submit" className="publicar">
            Publicar
          </button>
        </form>
      </div>
    </main></>
  );
};
