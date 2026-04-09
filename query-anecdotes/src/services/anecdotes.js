const base_url = '/api/anecdotes'

const getAll = async () => {
    const res = await fetch(base_url);

    if (!res.ok) {
        throw new Error('Failed to get resource.')
    }

    return await res.json()
}


export {
    getAll,
}