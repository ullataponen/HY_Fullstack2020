const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message);
	});

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		minlength: 3,
		required: true,
	},
	author: {
		type: String,
		minlength: 2,
		required: true,
	},
	url: {
		type: String,
		minlength: 5,
		required: true,
	},
	likes: Number,
});

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Blog", blogSchema);
