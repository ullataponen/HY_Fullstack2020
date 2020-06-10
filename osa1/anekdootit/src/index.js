import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
	<>
		<button onClick={props.onClick}>{props.text}</button>
	</>
);

const HighestVoted = props => {
	if (props.max === 0) {
		return "No votes";
	} else {
		return (
			<p>
				{anecdotes[props.arr.indexOf(props.max)]} <br />
				Has {props.max} votes
			</p>
		);
	}
};

const App = props => {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

	let arr = Object.values(votes);
	let max = Math.max(...arr);

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<p>{props.anecdotes[selected]}</p>
			<p>Has {votes[selected]} votes</p>
			<Button
				onClick={() => setVotes({ ...votes, [selected]: votes[selected] + 1 })}
				text="Vote"
			/>
			<Button
				onClick={() =>
					setSelected(Math.floor(Math.random() * props.anecdotes.length))
				}
				text="Next Anecdote"
			/>
			<h2>Anecdote with highest votes</h2>
			<HighestVoted max={max} arr={arr} />
		</div>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
