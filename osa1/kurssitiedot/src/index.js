import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
	return (
		<>
			<h1> {props.name} </h1>
		</>
	);
};

const Part = props => {
	return (
		<>
			<p>
				{props.parts.name} {props.parts.exercises}
			</p>
		</>
	);
};

const Content = props => {
	return (
		<>
			<Part parts={props.course[0]} />
			<Part parts={props.course[1]} />
			<Part parts={props.course[2]} />
		</>
	);
};

const Total = props => {
	let sum =
		props.exercises[0].exercises +
		props.exercises[1].exercises +
		props.exercises[2].exercises;
	return (
		<>
			<p> Number of exercises {sum}</p>
		</>
	);
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10
			},
			{
				name: "Using props to pass data",
				exercises: 7
			},
			{
				name: "State of a component",
				exercises: 14
			}
		]
	};

	return (
		<div>
			<Header name={course.name} />
			<Content course={course.parts} />
			<Total exercises={course.parts} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
