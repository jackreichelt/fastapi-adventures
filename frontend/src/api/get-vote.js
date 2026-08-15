export default async function getVote(audienceId, slideId, sessionId) {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/votes/fetch`

    const data = {
        audience_id: audienceId,
        slide_id: slideId,
        session_id: sessionId,
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const fallbackError = "Error voting"

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }

    return await response.json()
}