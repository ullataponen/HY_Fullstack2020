const listHelper = require("../utils/list_helper");
const blogEntries = require("./test_entries");

describe("total likes", () => {
	test("when list has only one blog equals the likes of that", () => {
		const result = listHelper.totalLikes(blogEntries.listWithOneBlog);
		expect(result).toBe(5);
	});

	test("when list has no blogs it shows 0", () => {
		const result = listHelper.totalLikes(blogEntries.zeroBlogs);
		expect(result).toBe(0);
	});

	test("when list has multiple blogs it sums their likes", () => {
		const result = listHelper.totalLikes(blogEntries.multipleBlogs);
		expect(result).toBe(36);
	});
});
