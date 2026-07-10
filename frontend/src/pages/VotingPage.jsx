import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useWebSocket, { ReadyState } from 'react-use-websocket'

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
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState]


    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
        <div>
            <h2>Voting: {slide.title}</h2>
            <div>
                <p>
                    Socket status: {connectionStatus}
                </p>
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