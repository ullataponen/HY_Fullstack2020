import React from "react";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnecdote(content);
    props.setNotification(`You added a new anecdote "${content}"`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);

// const AnecdoteForm = (props) => {
//   const dispatch = useDispatch();

//   const addAnecdote = async (event) => {
//     event.preventDefault();
//     const content = event.target.anecdote.value;
//     event.target.anecdote.value = "";
//     dispatch(createAnecdote(content));
//     dispatch(setNotification(`You added a new anecdote "${content}"`, 5));
//     // dispatch(setNotification(`You added a new anecdote "${content}"`));
//     // setTimeout(() => dispatch(unsetNotification()), 5000);
//   };

//   return (
//     <>
//       <h2>create new</h2>
//       <form onSubmit={addAnecdote}>
//         <div>
//           <input name="anecdote" />
//         </div>
//         <button>create</button>
//       </form>
//     </>
//   );
// };

// export default AnecdoteForm;
