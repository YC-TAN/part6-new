const base_url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await fetch(base_url);

    if (!res.ok) {
        throw new Error('Failed to get resource.')
    }

    return await res.json()
}

const create = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newAnecdote)
    }

    const res = await fetch(base_url, options)

    if (!res.ok) {
        if (res.status === 400) {
            const err = await res.json()
            throw new Error(err.error)
        }
        throw new Error('Failed to create resource.')
    }

    

    return await res.json()

}

const update = async (updatedAnecdote) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedAnecdote)
    }

    const res = await fetch(`${base_url}/${updatedAnecdote.id}`, options)
    if (!res.ok) {
        throw new Error('Failed to create resource.')
    }

    return await res.json()
}

export {
    getAll,
    create,
    update
}