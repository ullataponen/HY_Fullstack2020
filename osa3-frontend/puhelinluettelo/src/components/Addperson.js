import React, { useState } from "react";
import personService from "./../services/persons";

export default function Addperson({
	persons,
	savePerson,
	setPersons,
	setMessage
}) {
	const [newEntry, setNewEntry] = useState({ name: "", number: "" });

	const addPerson = event => {
		event.preventDefault();
		const personToUpdate = persons.find(p => p.name === newEntry.name);
		console.log(personToUpdate);
		if (persons.find(p => p.name === newEntry.name)) {
			const id = personToUpdate.id;
			if (
				window.confirm(
					`${newEntry.name} is already added to phonebook, replace the old number with new one?`
				)
			) {
				personService
					.update(id, newEntry)
					.then(returnedPerson => {
						setMessage(
							`Person '${personToUpdate.name}' was successfully updated.`
						);
						setPersons(
							persons.map(person =>
								person.id !== id ? person : returnedPerson
							)
						);
					})
					.catch(error => {
						setMessage(
							`Error. Person '${personToUpdate.name}' was already removed from server`
						);
					});
				setTimeout(() => {
					setMessage("");
				}, 5000);
				setPersons(persons.filter(p => p.id !== id));
			}
		} else {
			personService.create(newEntry).then(returnedPerson => {
				savePerson(returnedPerson);
				setMessage(`Person '${newEntry.name}' was successfully added.`);
				setTimeout(() => {
					setMessage("");
				}, 5000);
			});
		}
		setNewEntry({ name: "", number: "" });
	};

	const handleInputChange = event => {
		setNewEntry({ ...newEntry, [event.target.name]: event.target.value });
	};

	return (
		<div>
			<h2>Add new entry</h2>
			<form onSubmit={event => addPerson(event)}>
				<div>
					name:{" "}
					<input
						name="name"
						value={newEntry.name}
						onChange={event => handleInputChange(event)}
					/>
				</div>
				<div>
					number:{" "}
					<input
						name="number"
						value={newEntry.number}
						onChange={event => handleInputChange(event)}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	);
}
