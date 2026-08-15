import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useWebSocket, { ReadyState } from 'react-use-websocket'

import "./theme.css"

import "./VotingPage.css"

import ConnectionIndicator from "../components/ConnectionIndicator"
import VotingOptions from "../components/VotingOptions"
import useSlide from "../hooks/use-get-slide"
import useGetVote from "../hooks/use-get-vote"

function VotingPage() {
    const audienceId = window.localStorage.getItem("audienceId", null)
    const sessionId = window.localStorage.getItem("sessionId", null)
    const { slideId } = useParams()
    const { slide, isLoading: isSlideLoading, error: slideError, pollOptions } = useSlide(slideId)
    const { vote, isLoading: isVoteLoading, error: voteError } = useGetVote(audienceId, slideId, sessionId)

    const socketUrl = `${import.meta.env.VITE_API_URL}/api/ws/v1/audience`
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


    if (isSlideLoading || isVoteLoading) {
        return (<p>loading...</p>)
    }

    if (slideError) {
        return (<p>{slideError.message}</p>)
    }
    if (voteError) {
        return (<p>{voteError.message}</p>)
    }

    return (
        <div className="voting-page">
            <ConnectionIndicator status={connectionStatus} />
            <h1 id="voting-title">Voting:</h1>
            <h2 id="slide-title">{slide.title}</h2>
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
            <VotingOptions options={pollOptions} slideId={slideId} />
        </div>
    )
}

export default VotingPage