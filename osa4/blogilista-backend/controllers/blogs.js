const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	// response.json(blogs);
	response.json(blogs.map((blog) => blog.toJSON()));
});

// Yksittäisen tekstin haku
blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);

	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});
// end

blogsRouter.post("/", async (request, response) => {
	// const blog = new Blog(request.body);

	// blog
	// 	.save()
	// 	.then((result) => {
	// 		response.status(201).json(result);
	// 	})
	// 	.catch((error) => next(error));
	const body = request.body;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
	});

	const savedBlog = await blog.save();
	response.json(savedBlog.toJSON());
});

// Tekstin poisto
blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});
// end

module.exports = blogsRouter;
