import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  unsetNotification,
} from "../reducers/notificationReducer";

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
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter)
      );
    }
    return anecdotes;
  });

  const handleVote = (id, anecdote) => {
    dispatch(giveVote(id));
    dispatch(setNotification(`You voted for anecdote "${anecdote}"`));
    setTimeout(() => dispatch(unsetNotification()), 5000);
  };

  return (
    <>
      {anecdotes
        .sort((curr, prev) => prev.votes - curr.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVote(anecdote.id, anecdote.content)}
          />
        ))}
    </>
  );
};

export default Anecdotes;
