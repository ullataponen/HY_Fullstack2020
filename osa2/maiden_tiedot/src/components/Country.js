import React, { useEffect } from "react";

const Country = ({ country }) => {
	const [temp, setTemp] = React.useState(0.0);
	const [wind, setWind] = React.useState(0.0);
	const [icon, setIcon] = React.useState("");

	const fetchWeather = () => {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=f9d28d8e794f263b1cb81a4ebf3984f7`
		)
			.then(response => response.json())
			.then(responseData => {
				setTemp(responseData.main.temp);
				setWind(responseData.wind);
				setIcon(responseData.weather[0].icon);
			});
	};

	useEffect(fetchWeather, []);

	return (
		<div>
			<h1>{country.name}</h1>
			<p>Capital {country.capital}</p>
			<p>Population {country.population}</p>
			<h2>Languages</h2>
			<ul>
				{country.languages.map(language => (
					<li key={language.iso639_1}>{language.name}</li>
				))}
			</ul>
			<img
				src={country.flag}
				alt="Country's flag"
				style={{ maxWidth: 200, marginTop: 20 }}
			/>
			<h2>Weather in {country.capital}</h2>
			<p>Temperature: {temp} Celsius</p>
			<img
				src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
				alt="Weather icon"
			/>
			<p>Wind: {wind.speed} km/h </p>
		</div>
	);
};

export default Country;
