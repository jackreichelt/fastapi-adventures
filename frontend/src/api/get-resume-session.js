export default async function getResumeSession(sessionId) {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/presentation-session/${sessionId}`

    const response = await fetch(url, {
        method: "GET"
    })

    if (!response.ok) {
        const fallbackError = "Error resuming session"

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }

    return await response.json()
}