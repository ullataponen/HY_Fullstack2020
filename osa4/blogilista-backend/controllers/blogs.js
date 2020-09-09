const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { usersInDb } = require("../tests/test_helper");

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
	// const blog = new Blog(request.body);

	// blog
	// 	.save()
	// 	.then((result) => {
	// 		response.status(201).json(result);
	// 	})
	// 	.catch((error) => next(error));
	const body = request.body;

	//const user = await User.findById(body.userId); Node-mallissa

	//Ensimmäinen käyttäjä
	const user = await User.findOne().sort({ field: "asc", _id: -1 }).limit(1);

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
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
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
