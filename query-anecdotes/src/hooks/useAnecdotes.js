import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { create, getAll, update } from '../services/anecdotes';
import { useNotification } from './useNotification';

export const useAnecdotes = () => {
    const queryClient  = useQueryClient()
    const {showNotification} = useNotification();

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
            showNotification(`anecdote '${newAnecdote.content}' created`, 'success')
        },
        onError: (err) => {
            showNotification(err.message, 'error')
        }
    })

    const updateAnecdoteMutation = useMutation({
        mutationFn: update,
        onSuccess: (anecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            showNotification(`anecdote '${anecdote.content}' voted`, 'success')
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