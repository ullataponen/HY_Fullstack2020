import React, { useState } from "react";
import Country from "./Country";

const Countrylist = ({ countries, setCountries, keyword }) => {
	const [cnrt, setCnrt] = useState();
	let filterValue = countries.filter(country =>
		country.name.toUpperCase().includes(keyword.toUpperCase())
	);

	const showCountryData = filterValue => {
		setCnrt(<Country key={filterValue.name} country={filterValue} />);
	};

	if (keyword === "") {
		return null;
	} else {
		if (filterValue.length > 10) {
			return <p>Too many matches, specify another filter</p>;
		} else if (filterValue.length === 1) {
			return filterValue.map(country => (
				<Country key={country.name} country={country} />
			));
		} else {
			const filteredCountries = filterValue.map(country => (
				<li key={country.name}>
					{country.name}{" "}
					<button onClick={() => showCountryData(country)}>show details</button>
				</li>
			));
			return (
				<>
					{filteredCountries}
					{cnrt}
				</>
			);
		}
	}
};

export default Countrylist;
