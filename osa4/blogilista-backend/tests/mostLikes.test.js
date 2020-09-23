const mostLikes = require("../utils/list_helper").mostLikes;
const blogEntries = require("./test_entries");

describe("most blogs", () => {
	test("when list has only one blog it's the most liked", () => {
		const result = mostLikes(blogEntries.listWithOneBlog);
		expect(result).toEqual(
			JSON.stringify({
				author: "Edsger W. Dijkstra",
				likes: 5,
			})
		);
	});

	test("when list has 0 blogs it returns zero", () => {
		const result = mostLikes(blogEntries.zeroBlogs);
		expect(result).toEqual("0");
	});

	test("when list has multiple blogs it returns the author with highest number of likes", () => {
		const result = mostLikes(blogEntries.multipleBlogs);
		expect(result).toEqual(
			JSON.stringify({
				author: "Edsger W. Dijkstra",
				likes: 17,
			})
		);
	});

	test("when list has multiple authors with highest likes, it returns one of them", () => {
		const result = mostLikes(blogEntries.twoWithSameLikes);
		expect(result).toEqual(
			JSON.stringify({
				author: "Robert C. Martin",
				likes: 17,
			}) ||
				JSON.stringify({
					author: "Edsger W. Dijkstra",
					likes: 17,
				})
		);
	});
});
