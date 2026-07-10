import { useEffect, useState } from "react"

import getSlideDecks from "../api/get-slide-decks"

export default function useGetSlideDecks() {
    const [decks, setDecks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        getSlideDecks()
            .then(newDecks => {
                setDecks(newDecks)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            })
    }, [])

    return { decks, isLoading, error }
}
