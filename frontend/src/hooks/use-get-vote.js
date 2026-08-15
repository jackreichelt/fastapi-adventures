import { useEffect, useState } from "react"

import getVote from "../api/get-vote"

export default function useGetVote(audienceId, slideId, sessionId) {
    const [vote, setVote] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        getVote(audienceId, slideId, sessionId)
            .then(fetchedVote => {
                console.log('selected vote', fetchedVote)
                setVote(setVote(fetchedVote))
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            })
    }, [audienceId, sessionId, slideId])

    return { vote, isLoading, error }
}
