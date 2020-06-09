import React, { useState, useEffect } from "react";
import Personlist from "./components/Personlist";
import Addperson from "./components/Addperson";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [keyword, setKeyword] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		personService.getAll().then(initialPersons => {
			setPersons(initialPersons);
		});
	}, []);

	const inputChanged = event => {
		setKeyword(event.target.value);
	};

	const savePerson = newEntry => {
		setPersons(persons.concat(newEntry));
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={message} />
			Filter contacts with: <input value={keyword} onChange={inputChanged} />
			<Addperson
				persons={persons}
				savePerson={savePerson}
				setPersons={setPersons}
				setMessage={setMessage}
			/>
			<h2>Numbers</h2>
			<Personlist
				persons={persons}
				keyword={keyword}
				setPersons={setPersons}
				setMessage={setMessage}
			/>
		</div>
	);
};

export default App;
