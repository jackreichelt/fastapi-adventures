export default async function getVotes(sessionId, slideId) {
    // Create our URL
    const url = `${import.meta.env.VITE_API_URL}/api/v1/votes/${sessionId}/${slideId}`

    // Next use the fetch function to call the URL
    const response = await fetch(url, { method: "GET" })

    if (!response.ok) {
        const fallbackError = `Error fetching votes for session ${sessionId} slide ${slideId}`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }

    return await response.json()
}