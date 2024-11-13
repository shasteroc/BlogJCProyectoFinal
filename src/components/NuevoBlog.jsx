import { useEffect, useState } from "react";
import { DeleteIcon } from "./deleteIcon";
import { EditIcon } from "./editIcon";

export const NuevoBlog = () => {
  const urlApi = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1";
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [creator, setCreator] = useState({});
  const [blog, setBlog] = useState([]);
  const [toEditBlog, setToEditBlog] = useState(null);

  useEffect(() => {
    const creator = JSON.parse(localStorage.getItem("creator"));
    setCreator(creator);
    fetch(`${urlApi}/blogs`)
      .then((response) => response.json())
      .then((data) => setBlog(data.filter((blog) => blog.creator === blog.id)));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "location") {
      setLocation(value);
    }else if (name == "review"){
      setReview(value)
    }else if (name == "rating"){
      setRating(value)
    }else if (name == "imageUrl"){
      setImageUrl(value)
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      location,
      review,
      rating,
      imageUrl,
      creator: blog.id,
    };

    const blogCreated = await fetch(`${urlApi}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setBlog([...blog, await blogCreated.json()]);
  };

  const deleteBlog = (id) => {
    fetch(`${urlApi}/blogs/${id}`, {
      method: "DELETE",
    });
    setBlog(blog.filter((blog) => blog.id !== id));
  };

  const editBlog = (id) => {
    const blog = blog.find((blog) => blog.id === id);
    setToEditBlog(blog);
  };

  const sendToEditBlog = async () => {
    const blogEdited = await fetch(`${urlApi}/blogs/${toEditBlog.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toEditBlog),
    });
    const blogEditedJson = await blogEdited.json();
    setBlog(blog.map((blog) => (blog.id === blogEditedJson.id ? blogEditedJson : blog)));
    setToEditBlog(null);
  };
  const blogs = (`${urlApi}/blogs`);

  return (
      <main id="home">
        <div className="contenedor-responsive" >
          <form onSubmit={onSubmit} className="newBlog">
            <h3 className="newB">Nuevo Blog</h3>
            <input
              type="text"
              placeholder="Lugar"
              name="name"
              onChange={onChange}
              className="input"
            ></input>
            <input
              type="text"
              placeholder="Pais"
              name="location"
              onChange={onChange}
              className="input"
            ></input>
            <textarea
              placeholder="Reseña"
              name="review"
              onChange={onChange}
              className="textarea"
            ></textarea>
            <input
              type="number"
              placeholder="Calificacion del 1 al 10"
              min="1"
              max="10"
              name="rating"
              onChange={onChange}
              className="input"
            ></input>
            <input
              type="url"
              placeholder="URL de la imagen"
              name="imageURl"
              onChange={onChange}
              className="input"
            ></input>
            <button type="submit" className="publicar">Publicar</button>
          </form>
          <div className="divB">
            {blog.map((blog) =>
              toEditBlog && toEditBlog.id === blog.id ? (
                <div className="blogs" key={blog.id}>
                  <input type="text" value={toEditBlog.name} onChange={(e) => setToEditBlog({ ...toEditBlog, name: e.target.value })} />
                  <input type="text" value={toEditBlog.location} onChange={(e) => setToEditBlog({ ...toEditBlog, location: e.target.value })} />
                  <textarea type="text" value={toEditBlog.review} onChange={(e) => setToEditBlog({ ...toEditBlog, content: e.target.value })} />
                  <input type="number" value={toEditBlog.rating} onChange={(e) => setToEditBlog({ ...toEditBlog, rating: e.target.value })} />
                  <input type="url" value={toEditBlog.imageUrl} onChange={(e) => setToEditBlog({ ...toEditBlog, imageUrl: e.target.value })} />
                  <button onClick={() => sendToEditBlog()}>Guardar</button>
                </div>
              ) : (
                <div className="blogs" key={blog.id}>
                  <div className="actions">
                    <div className="action" onClick={() => deleteBlog(blog.id)}>
                      <DeleteIcon />
                    </div>
                    <div className="action" onClick={() => editBlog(blog.id)}>
                      <EditIcon />
                    </div>
                  </div>
                  <h4>{blog.name}</h4>
                  <h5>{blog.location}</h5>
                  <p>{blog.review}</p>
                  <p>{blog.rating}</p>
                  <p>{blog.imageUrl}</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
  );
};