import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState([]);
	const [password, setPassword] = useState([]);
	const [user, setUser] = useState(null);
	// const [newBlog, setNewBlog] = useState({
	// 	title: "",
	// 	author: "",
	// 	url: "",
	// });

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem("loggedInUser");
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedInUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setErrorMessage("Wrong username or password");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.clear();
		setUser(null);
		blogService.setToken(null);
	};

	// const handleBlogChange = (event) => {
	// 	console.log(event.target.value);
	// 	setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
	// };

	const addBlog = (newBlog) => {
		// event.preventDefault();

		blogService.create(newBlog).then((returnedBlog) => {
			setBlogs(blogs.concat(returnedBlog));
			// setNewBlog({ title: "", author: "", url: "" });
		});
	};

	const loginForm = () => (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);

	const blogList = () => (
		<div>
			<h2>Blogs</h2>

			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);

	// const blogForm = () => (
	// 	<div>
	// 		<h2>Create new</h2>
	// 		<form onSubmit={addBlog}>
	// 			<label htmlFor="title">Title</label>
	// 			<input name="title" value={newBlog.title} onChange={handleBlogChange} />
	// 			<br />
	// 			<label htmlFor="author">Author</label>
	// 			<input
	// 				name="author"
	// 				value={newBlog.author}
	// 				onChange={handleBlogChange}
	// 			/>
	// 			<br />
	// 			<label htmlFor="url">URL</label>
	// 			<input name="url" value={newBlog.url} onChange={handleBlogChange} />
	// 			<br />
	// 			<button type="submit">Submit</button>
	// 		</form>
	// 	</div>
	// );

	return (
		<div>
			<Notification message={errorMessage} />
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>{user.name} logged in</p>
					<button onClick={handleLogout}>Log out</button>
					<BlogForm addBlog={addBlog} />
					{blogList()}
				</div>
			)}
		</div>
	);
};

export default App;
