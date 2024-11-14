import { useEffect, useState } from "react";
import { NuevoBlog } from "./NuevoBlog";
import { NavbarLogin } from "./NavbarLogin";

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


  return (
      <><NavbarLogin />
      <NuevoBlog />
      <main className="mainB">
      {blogs.map((blogs) => (
        <div className="blog">
          <h4>{blogs.name}</h4>
          <p>{blogs.location}</p>
          <p>{blogs.review}</p>
          <p>{blogs.rating}</p>
          <img src={blogs.imageUrl} alt="" className="imgblog" />
          <small>publicado por: {blogs.creator} {blogs.userId}</small>
        </div>
      ))}
    </main></>

  );
};