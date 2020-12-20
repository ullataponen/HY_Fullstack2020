describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Mikki Hiiri",
      username: "mikki",
      password: "hiiri",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.get("#username");
    cy.get("#password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("mikki");
      cy.get("#password").type("hiiri");
      cy.get("#login-button").click();

      cy.contains("Mikki Hiiri logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("mikki");
      cy.get("#password").type("ankka");
      cy.get("#login-button").click();

      cy.get("div.error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(178, 34, 34)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Mikki Hiiri logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mikki", password: "hiiri" });
    });

    it("A blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("Cypress blog post");
      cy.get("#author").type("Dr. Full-stack");
      cy.get("#url").type("fullstackopen.com");
      cy.contains("Submit").click();
      cy.contains("Cypress blog post");
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "First blog",
          author: "Dr. Full-stack",
          url: "fullstackopen.com",
        });
        cy.createBlog({
          title: "Second blog",
          author: "Dr. Full-stack",
          url: "fullstackopen.com",
        });
        cy.createBlog({
          title: "Third blog",
          author: "Dr. Full-stack",
          url: "fullstackopen.com",
        });
      });
      it("one blog can be liked", function () {
        cy.contains("Second blog").parent().contains("View details").click();

        cy.contains("Second blog")
          .siblings(".togglableContent")
          .find("#likes")
          .as("likeView")
          .find("#like-button")
          .click();
        cy.get("@likeView").should("contain", "1 likes");
      });
    });
  });
});
