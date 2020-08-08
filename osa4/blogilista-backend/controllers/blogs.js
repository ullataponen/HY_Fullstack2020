const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

// Yksittäisen tekstin haku
blogsRouter.get("/:id", (request, response, next) => {
	Blog.findById(request.params.id)
		.then((blog) => {
			if (blog) {
				response.json(blog);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});
// end

blogsRouter.post("/", (request, response, next) => {
	const blog = new Blog(request.body);

	blog
		.save()
		.then((result) => {
			response.status(201).json(result);
		})
		.catch((error) => next(error));
});

// Tekstin poisto
blogsRouter.delete("/:id", (request, response, next) => {
	Blog.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});
// end

module.exports = blogsRouter;
