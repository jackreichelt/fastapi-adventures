export default async function getJoinSession(sessionId, audienceId) {
    let url = `${import.meta.env.VITE_API_URL}/api/v1/presentation-session/join/${sessionId}`
    if (audienceId) {
        url += `?audience_id=${audienceId}`
    }

    const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        let fallbackError = "Error joining session"
        if (audienceId) {
            fallbackError = "Error resuming session"
        }

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }

    return await response.json()
}