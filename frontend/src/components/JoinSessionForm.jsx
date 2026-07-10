import { useState } from "react"
import { useNavigate } from "react-router-dom"

import getJoinSession from "../api/get-join-session.js"

function JoinSessionForm() {
    const navigate = useNavigate()

    const [sessionId, setSessionId] = useState()
    const audienceId = window.localStorage.getItem("audienceId", null)

    const handleChange = (event) => {
        const { value } = event.target
        setSessionId(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (sessionId) {
            getJoinSession(sessionId, audienceId)
                .then((response) => {
                    console.log(response)
                    window.localStorage.setItem("sessionId", response.id)
                    window.localStorage.setItem("audienceId", response.audience_id)
                    navigate(`/vote/${response.current_slide_id}`)
                })
        }
    }

    return (
        <form>
            <div>
                <label htmlFor="sessionId">Session ID:</label>
                <input
                    type="text"
                    id="sessionId"
                    placeholder="Enter session ID"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Join Session
            </button>
        </form>
    )
}

export default JoinSessionForm