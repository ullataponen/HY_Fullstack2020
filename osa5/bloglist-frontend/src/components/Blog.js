import React, { useState } from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    border: "solid",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}
      </span>
      <Togglable buttonLabel="View details" cancelLabel="Hide details">
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes
          <button>Like</button>{" "}
        </p>
        {blog.user ? <p>{blog.user.name}</p> : <></>}
      </Togglable>
    </div>
  );
};

export default Blog;
