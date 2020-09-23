const mostBlogs = require("../utils/list_helper").mostBlogs;
const blogEntries = require("./test_entries");

describe("most blogs", () => {
	test("when list has only one blog it's the most blogs", () => {
		const result = mostBlogs(blogEntries.listWithOneBlog);
		expect(result).toEqual(
			JSON.stringify({
				author: "Edsger W. Dijkstra",
				blogs: 1,
			})
		);
	});

	test("when list has 0 blogs it returns zero", () => {
		const result = mostBlogs(blogEntries.zeroBlogs);
		expect(result).toEqual("0");
	});

	test("when list has multiple blogs it returns the author with highest number of blogs", () => {
		const result = mostBlogs(blogEntries.multipleBlogs);
		expect(result).toEqual(
			JSON.stringify({
				author: "Robert C. Martin",
				blogs: 3,
			})
		);
	});

	test("when list has multiple authors with same number of blogs, it returns one of them", () => {
		const result = mostBlogs(blogEntries.twoWithSameBlogAmt);
		expect(result).toEqual(
			JSON.stringify({
				author: "Robert C. Martin",
				blogs: 3,
			}) ||
				JSON.stringify({
					author: "Edsger W. Dijkstra",
					blogs: 3,
				})
		);
	});
});
