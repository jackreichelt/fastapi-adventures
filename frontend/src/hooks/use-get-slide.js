import { useEffect, useState } from "react"

import getSlide from "../api/get-slide"

export default function useGetSlide(slideId) {
    const [slide, setSlide] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const [pollOptions, setPollOptions] = useState([])

    useEffect(() => {
        getSlide(slideId)
            .then(slide => {
                slide = {
                    ...slide,
                    contents: JSON.parse(slide.contents),
                    poll_options: JSON.parse(slide.poll_options)
                }
                setSlide(slide)
                setPollOptions(slide.poll_options)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            })
    }, [slideId])

    return { slide, isLoading, error, pollOptions }
}
