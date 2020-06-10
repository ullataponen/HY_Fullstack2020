import React from "react";
import Person from "./Person";
import personService from "./../services/persons";

const Personlist = ({ persons, keyword, setPersons, setMessage }) => {
	const deletePerson = id => {
		const person = persons.find(p => p.id === id);
		if (window.confirm(`Are you sure to delete ${person.name}?`)) {
			personService
				.del(id)
				.then(response => {
					personService.getAll().then(returnedPersons => {
						setPersons(returnedPersons);
						setMessage(`Person '${person.name}' was successfully deleted.`);
					});
				})
				.catch(error => {
					setMessage(
						`Error. Person '${person.name}' was already removed from server`
					);
				});
		}
		setTimeout(() => {
			setMessage("");
		}, 5000);
	};

	if (keyword === "") {
		return persons.map(person => (
			<Person person={person} key={person.id} deletePerson={deletePerson} />
		));
	} else {
		let filterValue = persons.filter(person =>
			person.name.toUpperCase().includes(keyword.toUpperCase())
		);
		return filterValue.map(person => (
			<Person person={person} key={person.id} deletePerson={deletePerson} />
		));
	}
};

export default Personlist;
