// const http = require("http");
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/blog");
// const mongoose = require("mongoose");

// const blogSchema = mongoose.Schema({
// 	title: String,
// 	author: String,
// 	url: String,
// 	likes: Number,
// });

// blogSchema.set("toJSON", {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString();
// 		delete returnedObject._id;
// 		delete returnedObject.__v;
// 	},
// });

// const Blog = mongoose.model("Blog", blogSchema);

//const mongoUrl = "mongodb://localhost/bloglist";
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

// Yksittäinen teksti by Ulla
app.get("/api/blogs/:id", (request, response, next) => {
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

app.post("/api/blogs", (request, response, next) => {
	const blog = new Blog(request.body);

	blog
		.save()
		.then((result) => {
			response.status(201).json(result);
		})
		.catch((error) => next(error));
});

// Tekstin poisto
app.delete("/api/blogs/:id", (request, response, next) => {
	Blog.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});
// end

//Unknown endpoint
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
//end

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
