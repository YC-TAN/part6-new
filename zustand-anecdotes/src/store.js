import { create } from 'zustand';
import service from './services/anecdotes'

const asObject = anecdote => ({
  content: anecdote,
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: null,
  actions: {
    vote: (id) => set(state => ({
      anecdotes: state.anecdotes.map(a => a.id === id 
        ? { ...a, votes: a.votes + 1} 
        : a
      )
    })),
    add: async (content) => {
      const newObj = asObject(content);
      const newAnecdote = await service.create(newObj)
      set((state) => ({anecdotes: [...state.anecdotes, newAnecdote]}))
    },
    setFilter: (newFilter) => set(()=> ({filter: newFilter.trim().toLowerCase()})),
    initialize: async () => {
      const anecdotes = await service.getAll()
      set(() => ({anecdotes}))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const sorted = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const filter = useAnecdoteStore(state => state.filter)
  if (filter) return sorted.filter(a => a.content.toLowerCase().includes(filter))
  return sorted
}
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
