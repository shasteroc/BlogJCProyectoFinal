import { useEffect, useState } from "react";
import { DeleteIcon } from "./deleteIcon";
import { EditIcon } from "./editIcon";

export const NuevoBlog = () => {
  const urlApi = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [toEditBlogs, setToEditBlogs] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    fetch(`${urlApi}/blogs`)
      .then((response) => response.json())
      .then((data) => setPosts(data.filter((blogs) => blogs.userId === user.id)));
  }, []);

  const onChange = (e) => {
    const { name,review, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (review === "content") {
      setContent(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      content,
      userId: user.id,
    };
    const blogsCreated = await fetch(`${urlApi}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setBlogs([...blogs, await blogsCreated.json()]);
  };

  const deleteBlogs = (id) => {
    fetch(`${urlApi}/blogs/${id}`, {
      method: "DELETE",
    });
    setBlogs(blogs.filter((blogs) => blogs.id !== id));
  };

  const editBlogs = (id) => {
    const blogs = blogs.find((blogs) => blogs.id === id);
    setToEditBlogs(blogs);
  };

  const sendToEditBlogs = async () => {
    const blogsEdited = await fetch(`${urlApi}/blogs/${toEditBlogs.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toEditBlogs),
    });
    const blogsEditedJson = await blogsEdited.json();
    setBlogs(blogs.map((blogs) => (blogs.id === blogsEditedJson.id ? blogsEditedJson : blogs)));
    setToEditBlogs(null);
  };

  return (
    <div className="login">
      <h2>Nuevo Post</h2>
      <h3>Tienes {blogs.length} Blogs Publicados</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Titulo"
          name="title"
          onChange={onChange}
        ></input>
        <textarea
          placeholder="Contenido"
          name="content"
          onChange={onChange}
        ></textarea>
        <button type="submit">Publicar</button>
      </form>

      <div className="login">
        {blogs.map((blogs) =>
          toEditBlogs && toEditBlogs.id === blogs.id ? (
            <div className="blogs" key={blogs.id}>
              <input type="text" value={toEditBlogs.title} onChange={(e) => setToEditBlogs({ ...toEditBlogs, title: e.target.value })} />
              <input type="text" value={toEditBlogs.content} onChange={(e) => setToEditBlogs({ ...toEditBlogs, content: e.target.value })} />
              <button onClick={() => sendToEditBlogs()}>Guardar</button>
            </div>
          ) : (
            <div className="blogs" key={blogs.id}>
              <div className="actions">
                <div className="action" onClick={() => deleteBlogs(blogs.id)}>
                  <DeleteIcon />
                </div>
                <div className="action" onClick={() => editBlogs(blogs.id)}>
                  <EditIcon />
                </div>
              </div>
              <h4>{blogs.title}</h4>
              <p>{blogs.content}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};