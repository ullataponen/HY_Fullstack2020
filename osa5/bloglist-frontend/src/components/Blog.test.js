import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders only title and author by default", () => {
  const blog = {
    title: "Testing is fun",
    author: "Tester",
    user: {
      name: "Testityyppi",
      id: "1",
    },
  };

  const user = {
    name: "Testityyppi",
    id: "1",
  };

  const component = render(<Blog blog={blog} user={user} />);

  component.debug();

  const div = component.container.querySelector(".blog");
  const togglableContent = component.container.querySelector(
    ".togglableContent"
  );
  expect(div).toHaveTextContent("Testing is fun Tester");
  expect(togglableContent).toHaveStyle("display: none");
});
