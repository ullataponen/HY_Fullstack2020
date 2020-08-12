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
	return JSON.stringify(favorite);
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
