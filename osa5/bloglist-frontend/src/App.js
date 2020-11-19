import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setMessage("Successfully logged in");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.clear();
      setUser(null);
      blogService.setToken(null);
      setMessage("Successfully logged out");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch {
      setMessage("Error. Could not log out.");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const addBlog = (newBlog) => {
    try {
      blogService.create(newBlog).then((returnedBlog) => {
        noteFormRef.current.toggleVisibility();
        setBlogs(blogs.concat(returnedBlog));
        setMessage(
          `Successfully added a new blog ${newBlog.title} by ${newBlog.author}`
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    } catch (exception) {
      setMessage("Error. Could not save blog.");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <LoginForm handleLoginSubmit={handleLogin} />
    </div>
  );

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={noteFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  );

  const blogList = () => (
    <div>
      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Log out</button>
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
