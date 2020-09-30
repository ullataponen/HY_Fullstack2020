const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");
const { json } = require("express");

describe("when initial blogs exist", () => {
	beforeEach(async () => {
		await Blog.deleteMany({});

		const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
		const promiseArray = blogObjects.map((blog) => blog.save());
		await Promise.all(promiseArray);
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

	describe("view a specific note", () => {
		test("succeeds with a valid id", async () => {
			const blogsAtStart = await helper.blogsInDb();

			const blogToView = blogsAtStart[0];

			const resultBlog = await api
				.get(`/api/blogs/${blogToView.id}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

			expect(resultBlog.body).toEqual(processedBlogToView);
		});

		test("fails with status code 404 if blog does not exist", async () => {
			const validNonexistingId = await helper.nonExistingId();

			console.log(validNonexistingId);

			await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
		});

		test("fails with status code 400 if id is invalid", async () => {
			const invalidId = "5f2da18138c1063878e8f76";

			await api.get(`/api/blogs/${invalidId}`).expect(400);
		});

		test("succeeds if blog has a property called id", async () => {
			const blogsAtStart = await helper.blogsInDb();
			const id = blogsAtStart.map((b) => b.id);
			id.forEach((i) => {
				expect(i).toBeDefined();
			});
		});
	});

	describe("addition of a new blog", () => {
		test("succeeds with valid data", async () => {
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

		test("fails with status code 400 if data is invalid", async () => {
			const newBlog = {
				likes: 666,
			};
			await api.post("/api/blogs").send(newBlog).expect(400);

			const blogsAtEnd = await helper.blogsInDb();
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
		});

		test("succeeds without number of likes (will be 0)", async () => {
			const newBlog = {
				title: "On being poor and raising children",
				author: "Aku Ankka",
				url: "www.ankkalinnablog.com/aankka",
			};
			await api
				.post("/api/blogs")
				.send(newBlog)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const blogsAtEnd = await helper.blogsInDb();
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

			const latestEntry = blogsAtEnd[blogsAtEnd.length - 1];
			expect(latestEntry.likes).toEqual(0);
		});
	});

	describe("deletion of a blog", () => {
		test("succeeds with status code 204 if id is valid", async () => {
			const blogsAtStart = await helper.blogsInDb();
			const blogToDelete = blogsAtStart[0];

			await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

			const blogsAtEnd = await helper.blogsInDb();
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

			const title = blogsAtEnd.map((b) => b.title);
			expect(title).not.toContain(blogToDelete.title);
		});

		test("fails with status code 400 if id is invalid", async () => {
			const invalidId = "5f2da18138c1063878e8f76";

			await api.delete(`/api/blogs/${invalidId}`).expect(400);
		});
	});

	describe("modification of a blog", () => {
		test("succeeds with valid data", async () => {
			const blogsAtStart = await helper.blogsInDb();
			const blogToModify = blogsAtStart[blogsAtStart.length - 1];
			console.log(blogToModify);

			await api
				.put(`/api/blogs/${blogToModify.id}`)
				.send({ likes: 300 })
				.expect(200);
		});

		test("fails with status code 400 if likes is other than number", async () => {
			const blogsAtStart = await helper.blogsInDb();
			const blogToModify = blogsAtStart[blogsAtStart.length - 1];

			await api
				.put(`/api/blogs/${blogToModify.id}`)
				.send({ likes: "many" })
				.expect(400);
		});
	});
});

describe("when there is initially one user at db", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("sekret", 10);
		const user = new User({ username: "root", passwordHash });

		await user.save();
	});

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test("creation fails with proper statuscode and message if username already taken", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "root",
			name: "Superuser",
			password: "salainen",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain("`username` to be unique");

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	// 4.16 tests
	test("creation fails with proper statuscode and message if username is too short", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "rt",
			name: "Realtime",
			password: "password",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain(
			"User validation failed: username: Path `username` (`" +
				newUser.username +
				"`) is shorter than the minimum allowed length (3)."
		);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test("creation fails with proper statuscode and message if password is too short", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "asterix",
			name: "Asterix",
			password: "pw",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain("password missing or too short");

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
