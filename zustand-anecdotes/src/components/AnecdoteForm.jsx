import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    add(newAnecdote);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
