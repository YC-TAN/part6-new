import { useAnecdoteActions } from "../stores/useAnecdote";
import { useNotificationActions } from "../stores/useNotification";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { setNotification } = useNotificationActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;

    if (!newAnecdote) return;
    try {
      await add(newAnecdote);
      setNotification(`New anecdote '${newAnecdote}' added`, "success");
      e.target.reset();
    } catch {
      setNotification(`Failed to add anecdote '${newAnecdote}'`, "error");
    }
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
