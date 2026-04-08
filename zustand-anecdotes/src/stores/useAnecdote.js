import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import service from '../services/anecdotes'

const asObject = anecdote => ({
  content: anecdote,
  votes: 0
})

const useAnecdoteStore = create(devtools((set, get) => ({
  anecdotes: [],
  filter: null,
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id);
      const updated = await service.update(
        id, 
        {...anecdote, votes: anecdote.votes + 1}
      )
      set(state => ({anecdotes: state.anecdotes.map(a => a.id === id ? updated :a)}))    
    },
    add: async (content) => {
      const newObj = asObject(content);
      const newAnecdote = await service.create(newObj)
      set((state) => ({anecdotes: [...state.anecdotes, newAnecdote]}))
    },
    setFilter: (newFilter) => set(()=> ({filter: newFilter.trim().toLowerCase()})),
    initialize: async () => {
      const anecdotes = await service.getAll()
      set(() => ({anecdotes}))
    },
    remove: async (id) => {
      await service.remove(id)
      set(state => ({anecdotes: state.anecdotes.filter(a => a.id !== id)}))
    }
  },
})))

export default useAnecdoteStore;

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const sorted = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const filter = useAnecdoteStore(state => state.filter)
  if (filter) return sorted.filter(a => a.content.toLowerCase().includes(filter))
  return sorted
}
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
