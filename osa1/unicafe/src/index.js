import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
	<>
		<button onClick={props.onClick}>{props.text}</button>
	</>
);

const Statistic = props => (
	<>
		<table>
			<tbody>
				<tr>
					<td style={{ width: "100px" }}>{props.text}</td>
					<td>{props.value}</td>
				</tr>
			</tbody>
		</table>
	</>
);

const Statistics = props => {
	let sum = props.good + props.neutral + props.bad;
	let avg = (props.good - props.bad) / sum;
	let positive = (props.good / sum) * 100 + "%";

	if (sum === 0) {
		return (
			<div>
				<p>No feedback given</p>
			</div>
		);
	}

	return (
		<div>
			<Statistic text="Good" value={props.good} />
			<Statistic text="Neutral" value={props.neutral} />
			<Statistic text="Bad" value={props.bad} />
			<Statistic text="All" value={sum} />
			<Statistic text="Average" value={avg} />
			<Statistic text="Positive" value={positive} />
		</div>
	);
};

const App = () => {
	// tallenna napit omaan tilaansa
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h2>Give feedback</h2>
			<Button onClick={() => setGood(good + 1)} text="Good" />
			<Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
			<Button onClick={() => setBad(bad + 1)} text="Bad" />
			<h2>Statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
