const listHelper = require("../utils/list_helper");
const blogEntries = require("./test_entries");

describe("favorite blog", () => {
	test("when list has only one blog it's the favorite", () => {
		const result = listHelper.favoriteBlog(blogEntries.listWithOneBlog);
		expect(result).toEqual(
			JSON.stringify({
				// _id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				// url:
				// 	"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				// __v: 0,
			})
		);
	});

	test("when list has 0 blogs it returns zero", () => {
		const result = listHelper.favoriteBlog(blogEntries.zeroBlogs);
		expect(result).toEqual("0");
	});

	test("when list has multiple blogs it returns the one with the highest likes", () => {
		const result = listHelper.favoriteBlog(blogEntries.multipleBlogs);
		expect(result).toEqual(
			JSON.stringify({
				// _id: "5a422b3a1b54a676234d17f9",
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				// url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12,
				// __v: 0,
			})
		);
	});

	test("when list has multiple blogs with highest likes it returns one of them", () => {
		const result = listHelper.favoriteBlog(blogEntries.twoWithSameLikes);
		expect(result).toEqual(
			JSON.stringify({
				// _id: "5a422b891b54a676234d17fa",
				title: "First class tests",
				author: "Robert C. Martin",
				// url:
				// 	"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
				likes: 12,
				// __v: 0,
			}) ||
				JSON.stringify({
					// _id: "5a422b3a1b54a676234d17f9",
					title: "Canonical string reduction",
					author: "Edsger W. Dijkstra",
					// url:
					// 	"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
					likes: 12,
					// __v: 0,
				})
		);
	});
});
