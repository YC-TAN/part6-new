import {describe, it, expect, beforeEach, vi} from 'vitest';
import { renderHook, act, render, screen } from '@testing-library/react';
import AnecdoteList from '../components/AnecdoteList'

vi.mock('../services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        remove: vi.fn(),
    }
}))

import service from '../services/anecdotes'
import useAnecdoteStore, {useAnecdotes, useAnecdoteActions} from './useAnecdote';

beforeEach(() => {
    useAnecdoteStore.setState({
        anecdotes: [],
        filter: null
    })
    vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {

    const anecdotes = [
        {id: 1, content: 'test1', votes: 0},
        {id: 2, content: 'test2', votes: 10},
    ]

    it('initialize and load anecdotes from service', async () => {
        service.getAll.mockResolvedValue(anecdotes)

        const {result} = renderHook(() => useAnecdoteActions())

        await act(async() => {
            await result.current.initialize()
        })

        const {result: anecdoteResult} = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toHaveLength(2)
    })

    it('should sort by votes', async() => {
        useAnecdoteStore.setState({anecdotes: anecdotes})
        
        const {result: anecdoteResult} = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current[0].votes).toBe(anecdotes[1].votes)
    })

    it('should filter anecdotes', async () => {
        useAnecdoteStore.setState({
            anecdotes: anecdotes,
            filter: anecdotes[1].content
        })

        const {result: anecdoteResult} = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toHaveLength(1)
    })

    it('should render only anecdote that matches filter', async () => {
        useAnecdoteStore.setState({
            anecdotes: anecdotes,
            filter: anecdotes[1].content
        })

        render(<AnecdoteList />)
        
        expect(screen.getByText(/test2/i));
        expect(screen.queryByText(/test1/i)).toBeNull();
    })

    it('should update votes', async () => {
        const anecdote = {id: 3, content: "test vote", votes: 0}
        useAnecdoteStore.setState({
            anecdotes: [anecdote],
        })

        service.update.mockResolvedValue({...anecdote, votes: 1})

        const { result } = renderHook(() => useAnecdoteActions())
        await act(async () => {
            await result.current.vote(anecdote.id)
        })

        const {result: anecdoteResult} = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current[0].votes).toBe(1)
    })
})