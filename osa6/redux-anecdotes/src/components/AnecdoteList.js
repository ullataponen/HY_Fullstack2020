import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  return (
    <>
      {anecdotes
        .sort((curr, prev) => prev.votes - curr.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(giveVote(anecdote.id))}
          />
        ))}
    </>
  );
};

export default Anecdotes;
