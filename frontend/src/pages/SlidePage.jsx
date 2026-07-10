import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useWebSocket, { ReadyState } from 'react-use-websocket'
import "./theme.css"

import ConnectionIndicator from "../components/ConnectionIndicator"
import PollOptions from "../components/PollOptions"
import useGetSlide from "../hooks/use-get-slide"
import useGetVotes from "../hooks/use-get-votes"

function SlidePage() {
    const { id } = useParams()
    const sessionId = window.localStorage.getItem("sessionId", null)

    const { slide, slideLoading, slideError, pollOptions } = useGetSlide(id)
    const { votes, votesLoading, votesError, updateVotes } = useGetVotes(sessionId, id)

    const socketUrl = `${import.meta.env.VITE_API_URL}/ws/v1/presenter`
    const { lastMessage, readyState } = useWebSocket(socketUrl)
    // TODO: If socket closes, re-connect
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (lastMessage !== null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMessages((prevMessages) => prevMessages.concat(lastMessage.data))
            updateVotes(lastMessage.data)
        }
    }, [lastMessage]) // TODO: Work out how to do this properly.

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'connecting',
        [ReadyState.OPEN]: 'open',
        [ReadyState.CLOSING]: 'closing',
        [ReadyState.CLOSED]: 'closed',
        [ReadyState.UNINSTANTIATED]: 'uninstantiated',
    }[readyState]

    if (slideError || votesError) {
        return (<p>{slideError.message || votesError.message}</p>)
    }

    if (slideLoading || votesLoading || !slide || !votes) {
        return (<p>loading...</p>)
    }

    return (
        <div>
            <ConnectionIndicator status={connectionStatus} />
            <h1>{slide.title}{sessionId && ` - ${sessionId}`}</h1>
            <ul>
                {slide.contents.map((bulletPoint, key) => {
                    return (
                        <li key={key}>
                            {bulletPoint}
                        </li>
                    )
                })}
            </ul>
            <div>
                <ul>
                    {messages && messages.map((message, key) => {
                        return (
                            <li key={key}>
                                {message}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <PollOptions options={pollOptions} votesTally={votes} />
        </div>
    )
}

export default SlidePage