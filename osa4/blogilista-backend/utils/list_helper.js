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
};

const favoriteBlog = (blogs) => {
	const favorite = blogs.reduce(
		(prev, curr) => (prev.likes > curr.likes ? prev : curr),
		0
	);
	delete favorite._id, delete favorite.url, delete favorite.__v;
	return JSON.stringify(favorite);
};

const getHighest = (blogs, valueToCheck) => {
	let ObjToArr = _.map(blogs, (val, auth) => ({
		author: auth,
		[valueToCheck]: val,
	}));
	const most = ObjToArr.reduce(
		(prev, curr) => (prev[valueToCheck] > curr[valueToCheck] ? prev : curr),
		0
	);
	return JSON.stringify(most);
};

const mostBlogs = (blogs) => {
	let blogPerAuth = _.countBy(blogs, "author");
	return getHighest(blogPerAuth, "blogs");
};

const mostLikes = (blogs) => {
	let totalLikes = blogs.reduce((acc, obj) => {
		acc[obj.author] = acc[obj.author] || 0;
		acc[obj.author] += obj.likes;
		return acc;
	}, {});

	console.log(totalLikes);
	return getHighest(totalLikes, "likes");
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
