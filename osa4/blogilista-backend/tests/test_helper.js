const Blog = require("../models/blog");
const User = require("../models/user");

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

const nonExistingId = async () => {
	const blog = new Blog({
		title: "test",
		author: "tester",
		url: "www.test.com",
	});
	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = {
	initialNotes,
	nonExistingId,
	notesInDb,
	usersInDb,
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb,
};
