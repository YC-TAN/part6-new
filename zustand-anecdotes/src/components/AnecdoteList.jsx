import { useAnecdotes, useAnecdoteActions } from "../stores/useAnecdote";
import { useNotificationActions } from "../stores/useNotification";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const sorted = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const { vote } = useAnecdoteActions();
  const { setNotification } = useNotificationActions();

  const handleVote = async (anecdote) => {
    try{
      await vote(anecdote.id)
      setNotification(`Voted '${anecdote.content}'`, "success");
    } catch {
      setNotification(`Failed to vote '${anecdote.content}'`, "error");
    }
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
