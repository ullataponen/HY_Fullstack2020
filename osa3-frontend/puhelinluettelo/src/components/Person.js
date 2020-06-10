import React from "react";

const Person = props => {
	const delPerson = id => {
		props.deletePerson(id);
	};

	return (
		<li>
			{props.person.name} {props.person.number}{" "}
			<button onClick={() => delPerson(props.person.id)}>delete</button>
		</li>
	);
};

export default Person;
