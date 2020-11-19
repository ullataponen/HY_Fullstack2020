import React, { useState } from "react";

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
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input name="title" value={newBlog.title} onChange={handleBlogChange} />
        <br />
        <label htmlFor="author">Author</label>
        <input
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
        <br />
        <label htmlFor="url">URL</label>
        <input name="url" value={newBlog.url} onChange={handleBlogChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
