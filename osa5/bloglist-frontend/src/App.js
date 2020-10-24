import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState([]);
	const [password, setPassword] = useState([]);
	const [user, setUser] = useState(null);

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

	const loginForm = () => (
		<>
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
		</>
	);

	const blogList = () => (
		<>
			<h2>blogs</h2>
			{user.name} logged in
			<button onClick={handleLogout}>Log out</button>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</>
	);

	return (
		<div>
			<Notification message={errorMessage} />
			{user === null ? loginForm() : blogList()}
		</div>
	);
};

export default App;
