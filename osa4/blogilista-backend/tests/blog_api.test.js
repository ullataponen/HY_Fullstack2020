const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
	{
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
	},
	{
		title: "First class tests",
		author: "Robert C. Martin",
		url:
			"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 12,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});

test.only("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
	const response = await api.get("/api/blogs");

	const title = response.body.map((r) => r.title);

	expect(title).toContain("Canonical string reduction");
});

afterAll(() => {
	mongoose.connection.close();
});
