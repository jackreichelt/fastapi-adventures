export default async function getSlide(slideID) {
    // Create our URL
    const url = `${import.meta.env.VITE_API_URL}/v1/slides/${slideID}`

    // Next use the fetch function to call the URL
    const response = await fetch(url, { method: "GET" })

    if (!response.ok) {
        const fallbackError = `Error fetching slide with id ${slideID}`

        const data = await response.json().catch(() => {
            throw new Error(fallbackError)
        })

        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }

    return await response.json()
}