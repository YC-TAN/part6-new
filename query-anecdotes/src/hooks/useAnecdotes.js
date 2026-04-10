import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { create, getAll, update } from '../services/anecdotes';

export const useAnecdotes = () => {
    const queryClient  = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        refetchOnWindowFocus: true,
        retry: 1
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: create,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        }
    })

    const updateAnecdoteMutation = useMutation({
        mutationFn: update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        addAnecdote: (content) => newAnecdoteMutation.mutate({content, votes: 0}),
        vote: (anecdote) => updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1
        })
    }
}

// export const useAddAnecdote = () => {
//     const queryClient  = useQueryClient()

//     const newAnecdoteMutation = useMutation({
//         mutationFn: create,
//         onSuccess: (newAnecdote) => {
//             const anecdotes = queryClient.getQueryData(['anecdotes'])
//             queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
//         }
//     })

//     return (content) => newAnecdoteMutation.mutate({content, votes: 0})
// }