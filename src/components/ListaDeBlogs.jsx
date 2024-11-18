import { useEffect, useState } from "react";
import { NavbarLogin } from "./NavbarLogin"; // Importamos NavbarLogin
import { NuevoBlog } from "./NuevoBlog";

export const Blog = () => {
  const urlApi = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1";
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch(`${urlApi}/users`);
    const data = await response.json();
    setUsers(data);
  };

  const getBlogs = async () => {
    const response = await fetch(`${urlApi}/blogs`);
    const data = await response.json();

    // Asociamos el usuario a cada blog usando userId
    const updatedBlogs = data.map((blog) => {
      const user = users.find((user) => user.id === blog.userId); // Asegúrate de que el `userId` se esté utilizando aquí
      return { ...blog, user }; // Añadimos el objeto usuario a cada blog
    });

    setBlogs(updatedBlogs);
  };

  useEffect(() => {
    getUsers();
  }, []); // Se obtiene la lista de usuarios una vez que se monta el componente

  useEffect(() => {
    if (users.length > 0) {
      getBlogs(); // Solo cargamos los blogs después de obtener los usuarios
    }
  }, [users]); // Cuando los usuarios cambian, cargamos los blogs

  // Obtener el usuario logueado desde localStorage
  const loggedUser = JSON.parse(localStorage.getItem("creator"));
  console.log(loggedUser);

  return (
    <>
      <NavbarLogin /> 
      <main id="home">
        {blogs.map((blog) => (
          <div className="blog" key={blog.id}>
            <h4>{blog.name}</h4>
            <p>Pais: {blog.location}</p>
            <p>{blog.review}</p>
            <p>Calificación: {blog.rating}</p>
            {blog.imageUrl && (
              <img src={blog.imageUrl} alt={blog.name} className="imgblog" />
            )}
            <small>Publicado por: {blog.user ? blog.user.name : "Desconocido"}</small>
            <br />
            <small>Fecha: {new Date(blog.createdAt).toLocaleDateString()}</small>
          </div>
        ))}

        {/* Mostrar el nombre del usuario logueado en el blog */}
        {loggedUser && (
          <div className="logged-user-info">
            <p>Usuario logueado: {loggedUser.name}</p>
          </div>
        )}
      </main>
    </>
  );
};
