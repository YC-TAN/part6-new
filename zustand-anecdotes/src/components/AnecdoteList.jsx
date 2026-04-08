import { useAnecdotes, useAnecdoteActions } from "../stores/useAnecdote";
import { useNotificationActions } from "../stores/useNotification";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdoteActions();
  const { setNotification } = useNotificationActions();

  const handleVote = async (anecdote) => {
    try {
      await vote(anecdote.id);
      setNotification(`Voted '${anecdote.content}'`, "success");
    } catch {
      setNotification(`Failed to vote '${anecdote.content}'`, "error");
    }
  };
  const handleDelete = async (anecdote) => {
    try {
      await remove(anecdote.id);
      setNotification(`Removed '${anecdote.content}'`, "success");
    } catch {
      setNotification(`Failed to remove '${anecdote.content}'`, "error");
    }
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
