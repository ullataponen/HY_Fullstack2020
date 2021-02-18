import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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

const Anecdotes = (props) => {
  const handleVote = async (anecdote) => {
    anecdote = { ...anecdote, votes: anecdote.votes + 1 };
    props.giveVote(anecdote);
    props.setNotification(`You voted for anecdote "${anecdote.content}"`, 5);
  };

  return (
    <>
      {props.anecdotes
        .sort((curr, prev) => prev.votes - curr.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVote(anecdote)}
          />
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  if (state.filter) {
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter)
      ),
    };
  }
  return {
    anecdotes: state.anecdotes,
  };
};

const mapDispatchToProps = {
  giveVote,
  setNotification,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes);
export default ConnectedAnecdotes;

// const Anecdote = ({ anecdote, handleClick }) => {
//   return (
//     <>
//       <div>{anecdote.content}</div>
//       <div>
//         has {anecdote.votes}
//         <button onClick={handleClick}>vote</button>
//       </div>
//     </>
//   );
// };

// const Anecdotes = () => {
//   const dispatch = useDispatch();
//   const anecdotes = useSelector(({ anecdotes, filter }) => {
//     if (filter) {
//       return anecdotes.filter((anecdote) =>
//         anecdote.content.toLowerCase().includes(filter)
//       );
//     }
//     return anecdotes;
//   });

//   const handleVote = async (anecdote) => {
//     anecdote = { ...anecdote, votes: anecdote.votes + 1 };
//     dispatch(giveVote(anecdote));
//     dispatch(
//       setNotification(`You voted for anecdote "${anecdote.content}"`, 5)
//     );
//     // dispatch(setNotification(`You voted for anecdote "${anecdote.content}"`));
//     // setTimeout(() => dispatch(unsetNotification()), 5000);
//   };

//   return (
//     <>
//       {anecdotes
//         .sort((curr, prev) => prev.votes - curr.votes)
//         .map((anecdote) => (
//           <Anecdote
//             key={anecdote.id}
//             anecdote={anecdote}
//             handleClick={() => handleVote(anecdote)}
//           />
//         ))}
//     </>
//   );
// };

// export default Anecdotes;
