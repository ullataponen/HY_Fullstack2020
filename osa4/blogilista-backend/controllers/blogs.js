const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { usersInDb } = require("../tests/test_helper");

/*
const getTokenFrom = (request) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7);
	}
	return null;
};
*/
// kaikkien blogien haku
blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	// response.json(blogs);
	response.json(blogs.map((blog) => blog.toJSON()));
});

// yksittäisen tekstin haku
blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);

	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

// luominen
blogsRouter.post("/", async (request, response) => {
	const body = request.body;

	const token = request.token;
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);

	//Uusin käyttäjä
	//const user = await User.findOne().sort({ field: "asc", _id: -1 }).limit(1);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	response.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
	// 4.21
	const token = request.token;
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}

	const blog = await Blog.findById(request.params.id);
	console.log(blog.user.toString());
	console.log(decodedToken.id);
	if (blog.user.toString() === decodedToken.id) {
		await Blog.findByIdAndRemove(blog.id);
		response.status(204).end();
	} else {
		return response.status(401).json({ error: "not authorized to delete" });
	}
});

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const blog = {
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});
	response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
