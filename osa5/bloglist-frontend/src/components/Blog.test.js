import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

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

  component.debug();

  const div = component.container.querySelector(".blog");
  const togglableContent = component.container.querySelector(
    ".togglableContent"
  );
  expect(div).toHaveTextContent("Testing is fun Tester");
  expect(div).not.toHaveTextContent("likes");
  expect(div).not.toHaveTextContent("www.test.com");
});

test("Clicking the button shows all blog data", async () => {
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

  component.debug();
  const div = component.container.querySelector(".togglableContent");
  expect(div).toHaveTextContent("testimaailma.fi");
  expect(div).toHaveTextContent("likes");
});
