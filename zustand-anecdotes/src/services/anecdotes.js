const base_url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(base_url);

    if (!response.ok) {
        throw new Error("Failed to fetch anecdotes")
    }

    const data = await response.json()
    return data
}

const create = async (obj) => {
    const options = {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(obj)
    }

    const response = await fetch(base_url, options)
    
    if (!response.ok) {
        throw new Error("Failed to create anecdote")
    }
    return await response.json()
}

const update = async (id, anecdote) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(anecdote)
    }

    const response = await fetch(
        `${base_url}/${id}`, 
        options
    )

    if (!response.ok) {
        throw new Error("Failed to update anecdote")
    }
    
    return await response.json()
}

export default {
    getAll,
    create,
    update
}