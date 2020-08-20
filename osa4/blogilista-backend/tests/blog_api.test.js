const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const { json } = require("express");

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);

	// let blogObject = new Blog(helper.initialBlogs[0]);
	// await blogObject.save();

	// blogObject = new Blog(helper.initialBlogs[1]);
	// await blogObject.save();
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
	const response = await api.get("/api/blogs");

	const title = response.body.map((r) => r.title);

	expect(title).toContain("Canonical string reduction");
});

test("a valid blog can be added", async () => {
	const newBlog = {
		title: "Saving that last penny",
		author: "Roope Ankka",
		url: "www.rankka.com",
		likes: 123,
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

	const title = blogsAtEnd.map((b) => b.title);
	expect(title).toContain("Saving that last penny");
});

test("blog without title, author and url is not added", async () => {
	const newBlog = {
		likes: 666,
	};
	await api.post("/api/blogs").send(newBlog).expect(400);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog can be viewed", async () => {
	const blogsAtStart = await helper.blogsInDb();

	const blogToView = blogsAtStart[0];

	const resultBlog = await api
		.get(`/api/blogs/${blogToView.id}`)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

	expect(resultBlog.body).toEqual(processedBlogToView);
});

test("a blog can be deleted", async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToDelete = blogsAtStart[0];

	await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

	const title = blogsAtEnd.map((b) => b.title);
	expect(title).not.toContain(blogToDelete.title);
});

afterAll(() => {
	mongoose.connection.close();
});
