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

module.exports = {
	dummy,
	totalLikes,
};
