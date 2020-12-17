import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

//5.13
test("renders only title and author by default", () => {
  const blog = {
    title: "Testing is fun",
    author: "Tester",
    url: "www.test.com",
    user: {
      name: "Testityyppi",
      id: "1",
    },
  };

  const component = render(<Blog blog={blog} user={blog.user} />);

  //   component.debug();

  const div = component.container.querySelector(".blog");
  const togglableContent = component.container.querySelector(
    ".togglableContent"
  );
  expect(div).toHaveTextContent("Testing is fun Tester");
  expect(div).not.toHaveTextContent("likes");
  expect(div).not.toHaveTextContent("www.test.com");
});

//5.14
test("Clicking the button shows all blog info", async () => {
  const blog = {
    title: "You can show blog info",
    author: "Tester",
    url: "testimaailma.fi",
    likes: 3000,
    user: {
      name: "Testityyppi",
      id: "1",
    },
  };

  const component = render(<Blog blog={blog} user={blog.user} />);

  const button = component.getByText("View details");
  //   console.log(prettyDOM(button));
  fireEvent.click(button);

  //   component.debug();
  const div = component.container.querySelector(".togglableContent");
  expect(div).toHaveTextContent("testimaailma.fi");
  expect(div).toHaveTextContent("likes");
});

//5.15
test("Clicking like twice calls update function two times", async () => {
  const blog = {
    title: "You can like blogs",
    author: "Tester",
    url: "likettajat.fi",
    likes: 1,
    user: {
      name: "Testityyppi",
      id: "1",
    },
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} user={blog.user} updateBlog={mockHandler} />
  );

  const button = component.getByText("View details");
  fireEvent.click(button);

  const likeButton = component.getByText("Like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
