import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import PropTypes from "prop-types";

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
    } catch (error) {
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

  const updateBlog = (updatedBlog) => {
    try {
      blogService.update(updatedBlog, updatedBlog.id).then((returnedBlog) => {
        setMessage(
          `Successfully updated blog ${returnedBlog.title} by ${returnedBlog.author}`
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    } catch (exception) {
      setMessage("Error. Could not update blog.");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = (blog) => {
    if (window.confirm(`Are you sure to delete blog ${blog.name}?`)) {
      try {
        blogService.remove(blog.id).then(() => {
          blogService.getAll().then((returnedBlogs) => {
            setBlogs(returnedBlogs);
            setMessage(`Blog '${blog.title}' was successfully deleted.`);
          });
        });
      } catch (error) {
        setMessage(`Error. Blog '${blog.title}' could not be deleted.`);
      }
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
    <div class="blogs">
      <h2>Blogs</h2>

      {blogs
        .sort((curr, prev) => prev.likes - curr.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
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

App.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object,
  handleLogin: PropTypes.func,
  handleLogout: PropTypes.func,
  addBlog: PropTypes.func,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  blogList: PropTypes.func,
};
export default App;
