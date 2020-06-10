import React from "react";

const Header = ({ name }) => {
	return (
		<>
			<h2> {name} </h2>
		</>
	);
};

const Part = ({ parts }) => (
	<p>
		{parts.name} {parts.exercises}
	</p>
);

const Content = ({ courseparts }) => {
	const parts = () =>
		courseparts.map(part => <Part key={part.id} parts={part} />);
	return <>{parts()}</>;
};

const Total = ({ courseparts }) => {
	let total = courseparts.reduce((sum, part) => sum + part.exercises, 0);

	return (
		<>
			<p>
				<strong>Total number of exercises {total}</strong>
			</p>
		</>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content courseparts={course.parts} />
			<Total courseparts={course.parts} />
		</div>
	);
};

export default Course;
