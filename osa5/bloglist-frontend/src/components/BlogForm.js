import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = (props) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    props.addBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
        <br />
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
        <br />
        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  handleBlogChange: PropTypes.func,
  addBlog: PropTypes.func,
};

export default BlogForm;
