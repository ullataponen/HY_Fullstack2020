const _ = require("lodash");

const dummy = (blogs) => {
	return Array.isArray(blogs) ? 1 : 0;
};

const totalLikes = (blogs) => {
	let likeArray = [];
	if (blogs.length !== 0) {
		likeArray = blogs.map((blog) => blog.likes);
	}
	return likeArray.reduce((sum, val) => sum + val, 0);
	// if (blogs.length !== 0) {
	// 	return blogs.reduce((sum, val) => {
	// 		console.log(sum.likes, val.likes);
	// 		sum.likes + val.likes;
	// 	}, 0);
	// } else {
	// 	return 0;
	// }
};

const favoriteBlog = (blogs) => {
	const favorite = blogs.reduce(
		(prev, curr) => (prev.likes > curr.likes ? prev : curr),
		0
	);
	delete favorite._id, delete favorite.url, delete favorite.__v;
	return JSON.stringify(favorite);
};

const mostBlogs = (blogs) => {
	blogs = _.groupBy(blogs, "author");
	// console.log(blogs);
	let number = _.countBy(blogs, "length");
	console.log(number);
	// reduce sen tekee!!!
	// let blog = blogs["Edsger W. Dijkstra"];
	// console.log(blog);
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
};
