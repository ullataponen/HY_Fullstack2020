import React from "react";
import Togglable from "./Togglable";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogToUpdate = blog;

  const blogStyle = {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    border: "solid",
    borderRadius: 10,
    borderWidth: 1,
  };

  const handleLikeIncrement = () => {
    blogToUpdate.likes++;
    updateBlog(blogToUpdate);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  return (
    <div style={blogStyle} className="blog">
      <span className="blogTitleAuthor">
        {blog.title} {blog.author}
      </span>
      <Togglable buttonLabel="View details" cancelLabel="Hide details">
        <p>{blog.url}</p>
        <p className="likes">
          {blog.likes === null ? 0 : blog.likes} likes
          <button className="like-button" onClick={handleLikeIncrement}>
            Like
          </button>
        </p>
        {blog.user ? <p>{blog.user.name}</p> : <></>}

        {blog.user.id === user.id ? (
          <button onClick={handleDelete} className="del-btn">
            Delete entry
          </button>
        ) : (
          <></>
        )}
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.object.isRequired,
  }),
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default Blog;
