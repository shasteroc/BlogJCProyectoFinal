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
  const [creator, setCreator] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [toEditBlogs, setToEditBlogs] = useState(null);

  useEffect(() => {
    const creator = JSON.parse(localStorage.getItem("creator"));
    setCreator(creator);
    fetch(`${urlApi}/blogs`)
      .then((response) => response.json())
      .then((data) => setBlogs(data.filter((blogs) => blogs.creatorId === creator.id)));
  }, []);

  const onChange = (e) => {
    const { name,location,review,rating,imageUrl, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (location === "location") {
      setLocation(value);
    }else if (review == "review"){
      setReview(value)
    }else if (rating == "rating"){
      setRating(value)
    }
    else if (imageUrl == "imageUrl"){
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
      creatorId: creator.id,
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
    <body>
      <main>
    
        <div className="contenedor-responsive">
          <form onSubmit={onSubmit} className="newBlog">
            <h3 className="newB">Nuevo Blog</h3>
            <small className="num">Tienes {blogs.length} Blogs Publicados</small>
            <input
              type="text"
              placeholder="name"
              name="name"
              onChange={onChange}
              className="input"
            ></input>
            <input
              type="text"
              placeholder="location"
              name="location"
              onChange={onChange}
              className="input"
            ></input>
            <textarea
              placeholder="review"
              name="review"
              onChange={onChange}
              className="textarea"
            ></textarea>
            <input
              type="number"
              placeholder="rating"
              name="rating"
              onChange={onChange}
              className="input"
            ></input>
            <input
              type="url"
              placeholder="imageURl"
              name="imageURl"
              onChange={onChange}
              className="input"
            ></input>
            <button type="submit" className="publicar">Publicar</button>
          </form>

          <div className="divB">
            {blogs.map((blogs) =>
              toEditBlogs && toEditBlogs.id === blogs.id ? (
                <div className="blogs" key={blogs.id}>
                  <input type="text" value={toEditBlogs.name} onChange={(e) => setToEditBlogs({ ...toEditBlogs, name: e.target.value })} />
                  <input type="text" value={toEditBlogs.location} onChange={(e) => setToEditBlogs({ ...toEditBlogs, location: e.target.value })} />
                  <textarea type="text" value={toEditBlogs.review} onChange={(e) => setToEditBlogs({ ...toEditBlogs, content: e.target.value })} />
                  <input type="number" value={toEditBlogs.rating} onChange={(e) => setToEditBlogs({ ...toEditBlogs, rating: e.target.value })} />
                  <input type="url" value={toEditBlogs.imageUrl} onChange={(e) => setToEditBlogs({ ...toEditBlogs, imageUrl: e.target.value })} />
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
                  <h4>{blogs.name}</h4>
                  <h5>{blogs.location}</h5>
                  <p>{blogs.review}</p>
                  <p>{blogs.rating}</p>
                  <p>{blogs.imageUrl}</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </body>
  );
};