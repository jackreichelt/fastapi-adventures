import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useWebSocket, { ReadyState } from 'react-use-websocket'
import "./theme.css"

import ConnectionIndicator from "../components/ConnectionIndicator"
import VotingOptions from "../components/VotingOptions"
import useSlide from "../hooks/use-get-slide"

function VotingPage() {
    const { id } = useParams()
    const { slide, isLoading, error, pollOptions } = useSlide(id)

    const socketUrl = `${import.meta.env.VITE_API_URL}/ws/v1/audience`
    const { lastMessage, readyState } = useWebSocket(socketUrl)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (lastMessage !== null) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMessages((prevMessages) => prevMessages.concat(lastMessage.data))
        }
    }, [lastMessage])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'connecting',
        [ReadyState.OPEN]: 'open',
        [ReadyState.CLOSING]: 'closing',
        [ReadyState.CLOSED]: 'closed',
        [ReadyState.UNINSTANTIATED]: 'uninstantiated',
    }[readyState]


    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
        <div>
            <ConnectionIndicator status={connectionStatus} />
            <h1>Voting: {slide.title}</h1>
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
            <VotingOptions options={pollOptions} slideId={id} />
        </div>
    )
}

export default VotingPage