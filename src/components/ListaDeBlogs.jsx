import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Blog = () => {
  const urlApi = "https://6622071827fcd16fa6c8818c.mockapi.io/api/v1";
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await fetch(`${urlApi}/users`);
    const data = await response.json();
    setUsers(data);
  };

  const getBlogs = async () => {
    const response = await fetch(`${urlApi}/blogs`);
    const data = await response.json();
    data.forEach((blogs) => {
      const user = users.find((user) => user.id === blogs.userId);
      blogs.user = user;
    });
    setBlogs(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getBlogs();
  }, [users]);

  const goToNewBlog = () => {
    navigate("/nuevoBlog");
  };

  return (
    <body>
      < Navbar />
      <main className="login">
        <h2>Timeline</h2>
        <button onClick={() => goToNewBlog()}>Nuevo Blog</button>
        {blogs.map((blogs) => (
          <div key={blogs.id} className="blogs">
            {blogs.user && (
              <a href={`/users/${blogs.user.id}`}>
                <img src={`${blogs.user?.avatar}/${blogs.user?.id}`} alt="avatar" />
              </a>
            )}
            <div className="blog">
              <h4>{blogs.name}</h4>
              <p>{blogs.location}</p>
              <p>{blogs.review}</p>
              <p>{blogs.rating}</p>
              <img src={blogs.imageUrl} alt="" />
              <small>publicado por: {blogs.creator}</small>
            </div>
          </div>
        ))}
      </main>
      < Footer />
    </body>
  );
};