// require("dotenv").config();
// const express = require("express");
// const app = express();
const app = require("./app");
const http = require("http");

// const cors = require("cors");

const config = require("./utils/config");
const logger = require("./utils/logger");

// const mongoose = require("mongoose");

// app.use(cors());
// app.use(express.json());

// app.get("/api/blogs", (request, response) => {
// 	Blog.find({}).then((blogs) => {
// 		response.json(blogs);
// 	});
// });

// // Yksittäinen teksti by Ulla
// app.get("/api/blogs/:id", (request, response, next) => {
// 	Blog.findById(request.params.id)
// 		.then((blog) => {
// 			if (blog) {
// 				response.json(blog);
// 			} else {
// 				response.status(404).end();
// 			}
// 		})
// 		.catch((error) => next(error));
// });
// // end

// app.post("/api/blogs", (request, response, next) => {
// 	const blog = new Blog(request.body);

// 	blog
// 		.save()
// 		.then((result) => {
// 			response.status(201).json(result);
// 		})
// 		.catch((error) => next(error));
// });

// // Tekstin poisto
// app.delete("/api/blogs/:id", (request, response, next) => {
// 	Blog.findByIdAndRemove(request.params.id)
// 		.then((result) => {
// 			response.status(204).end();
// 		})
// 		.catch((error) => next(error));
// });
// // end

// //Unknown endpoint
// const unknownEndpoint = (request, response) => {
// 	response.status(404).send({ error: "unknown endpoint" });
// };

// app.use(unknownEndpoint);
// //end

// const errorHandler = (error, request, response, next) => {
// 	console.error(error.message);

// 	if (error.name === "CastError") {
// 		return response.status(400).send({ error: "malformatted id" });
// 	} else if (error.name === "ValidationError") {
// 		return response.status(400).json({ error: error.message });
// 	}

// 	next(error);
// };

// app.use(errorHandler);

// const PORT = config.PORT;
// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });
const server = http.createServer(app);

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});
