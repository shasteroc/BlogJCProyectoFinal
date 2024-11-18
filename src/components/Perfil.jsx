import { useEffect, useState } from "react";
import { DeleteIcon } from "./deleteIcon";
import { EditIcon } from "./editIcon";
import { useNavigate } from "react-router-dom";
import { NavbarLogin } from "./NavbarLogin";

export const Perfil = () => {
  const urlApi = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1";
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [toEditBlog, setToEditBlog] = useState(null); // Estado para editar un blog
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña
  const navigate = useNavigate();

  useEffect(() => {
    // Intentamos obtener el usuario desde localStorage
    const loggedUser = JSON.parse(localStorage.getItem("creator"));
    if (!loggedUser) {
      // Si no hay usuario autenticado, redirigimos al login
      navigate("/login");
    } else {
      setUser(loggedUser);
      setName(loggedUser.name);
      setEmail(loggedUser.email);
      // No mostramos la contraseña por seguridad, se puede dejar en blanco
    }
  }, [navigate]);

  // Obtener los blogs del usuario logueado
  useEffect(() => {
    if (user) {
      fetch(`${urlApi}/blogs?userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Blogs:', data); // Verifica qué se recibe de la API
          if (Array.isArray(data)) {
            setBlogs(data);
          } else {
            console.error('La respuesta no es un array', data);
            setBlogs([]); // Establecer como un array vacío si la respuesta no es válida
          }
        })
        .catch((error) => {
          console.error("Error al obtener los blogs", error);
          setBlogs([]); // Si ocurre un error, inicializamos blogs como un array vacío
        });
    }
  }, [user]);

  // Función para eliminar un blog
  const deleteBlog = (id) => {
    fetch(`${urlApi}/blogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setBlogs(blogs.filter((blog) => blog.id !== id));
        } else {
          console.error("Error al eliminar el blog");
        }
      })
      .catch((error) => console.error("Error al eliminar el blog", error));
  };

  // Función para cargar un blog para editar
  const editBlog = (id) => {
    const blogToEdit = blogs.find((blog) => blog.id === id);
    setToEditBlog(blogToEdit);
  };

  // Función para guardar los cambios del blog editado
  const saveEditedBlog = async () => {
    if (!toEditBlog) return;

    try {
      const response = await fetch(`${urlApi}/blogs/${toEditBlog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toEditBlog),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)));
        setToEditBlog(null); // Resetear el estado de edición
      } else {
        throw new Error("Error al editar el blog");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al editar el blog");
    }
  };

  // Función para manejar el cambio de datos del perfil
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Función para actualizar el perfil
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = { ...user, name, email, password };

    try {
      const response = await fetch(`${urlApi}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        localStorage.setItem("creator", JSON.stringify(updatedUserData)); // Guardar los cambios en localStorage
        setUser(updatedUserData);
        navigate("/Blog"); // Redirigir a la página del blog
      } else {
        setError("Hubo un error al actualizar tu perfil");
      }
    } catch (error) {
      setError("Hubo un problema al actualizar tu perfil. Intenta de nuevo.");
      console.error(error);
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Cambiar el estado de visibilidad
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <NavbarLogin />
      <main id="home">
        {error && <div className="error-message">{error}</div>}
        {user ? (
          <form onSubmit={handleSubmit} className="formP">
            <h1 className="newBlog">Mi perfil</h1>
            <fieldset>
              <label>
                <span>Nombre</span>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <span>Correo</span>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                <span>Contraseña</span>
                <div className="password-container">
                  <input
                    name="password"
                    type={passwordVisible ? "text" : "password"} // Alternar entre texto y contraseña
                    value={password}
                    onChange={handleChange}
                    required
                  />
                  <a type="button" onClick={togglePasswordVisibility} className="toggle-password">
                    {passwordVisible ? "Ocultar contraseña" : "Mostrar contraseña"} {/* Cambiar texto del botón */}
                  </a>
                </div>
              </label>
            </fieldset>
            <button type="submit">Guardar cambios</button>
          </form>
        ) : (
          <p>Cargando perfil...</p>
        )}
        <br />
        <div class="newB-container">
          <h2 class="newB">Mis Publicaciones</h2>
        </div>
        <div className="divP">
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blogItem) =>
              toEditBlog && toEditBlog.id === blogItem.id ? (
                <div className="blogs" key={blogItem.id}>
                  <input
                    type="text"
                    value={toEditBlog.name}
                    onChange={(e) => setToEditBlog({ ...toEditBlog, name: e.target.value })}
                  />
                  <input
                    type="text"
                    value={toEditBlog.location}
                    onChange={(e) => setToEditBlog({ ...toEditBlog, location: e.target.value })}
                  />
                  <textarea
                    value={toEditBlog.review}
                    onChange={(e) => setToEditBlog({ ...toEditBlog, review: e.target.value })}
                  />
                  <input
                    type="number"
                    value={toEditBlog.rating}
                    onChange={(e) => setToEditBlog({ ...toEditBlog, rating: e.target.value })}
                  />
                  <input
                    type="url"
                    value={toEditBlog.imageUrl}
                    onChange={(e) => setToEditBlog({ ...toEditBlog, imageUrl: e.target.value })}
                  />
                  <button onClick={saveEditedBlog}>Guardar</button>
                </div>
              ) : (
                <div className="blogs" key={blogItem.id}>
                  <div className="actions">
                    <div className="action" onClick={() => deleteBlog(blogItem.id)}>
                      <DeleteIcon />
                    </div>
                    <div className="action" onClick={() => editBlog(blogItem.id)}>
                      <EditIcon />
                    </div>
                  </div>
                  <h4>{blogItem.name}</h4>
                  <h5>Pais: {blogItem.location}</h5>
                  <p>{blogItem.review}</p>
                  <p>Calificación: {blogItem.rating}</p>
                  {blogItem.imageUrl && (
                    <img src={blogItem.imageUrl} alt={blogItem.name} className="imgblog" />
                  )}
                  <small>Publicado el: {formatDate(blogItem.createdAt)}</small> {/* Fecha de creación */}
                  <p>-------------------------------------------</p>
                  <br />
                </div>
              )
            )
          ) : (
            <p>No hay blogs disponibles.</p>
          )}
        </div>
      </main>
    </>
  );
};

