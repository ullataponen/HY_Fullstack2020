import React, { useState, useEffect } from "react";
import Countrylist from "./components/Countrylist";
import "./App.css";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [keyword, setKeyword] = useState("");

	const fetchCountries = () => {
		fetch("https://restcountries.eu/rest/v2/all")
			.then(response => response.json())
			.then(data => setCountries(data));
	};

	useEffect(fetchCountries, []);

	const inputChanged = event => {
		setKeyword(event.target.value);
	};

	return (
		<div>
			<label htmlFor="filter">Search for a country: </label>
			<input name="filter" value={keyword} onChange={inputChanged} />
			<ul>
				<Countrylist
					countries={countries}
					setCountries={setCountries}
					keyword={keyword}
				/>
			</ul>
		</div>
	);
};

export default App;
