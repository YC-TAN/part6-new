const base_url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(base_url);

    if (!response.ok) {
        throw new Error("Failed to fetch anecdotes")
    }

    const data = await response.json()
    return data
}

export default {
    getAll,
}