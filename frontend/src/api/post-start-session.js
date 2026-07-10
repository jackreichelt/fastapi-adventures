export default async function postStartSession(first_slide_id) {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/presentation-session`

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_slide_id }),
    })

    if (!response.ok) {
        const fallbackError = "Error starting session"

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }

    return await response.json()
}