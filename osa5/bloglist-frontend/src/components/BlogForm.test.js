import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

// 5.16
test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm addBlog={createBlog} />);

  const titleInput = component.container.querySelector("#title");
  const authorInput = component.container.querySelector("#author");
  const urlInput = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(titleInput, {
    target: { value: "Testing of forms should be automatized" },
  });
  fireEvent.change(authorInput, {
    target: { value: "The Testboss" },
  });
  fireEvent.change(urlInput, {
    target: { value: "www.automatealltestsnow.com" },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "Testing of forms should be automatized"
  );
  expect(createBlog.mock.calls[0][0].author).toBe("The Testboss");
  expect(createBlog.mock.calls[0][0].url).toBe("www.automatealltestsnow.com");
});
