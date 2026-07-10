import postSendVote from "../api/post-send-vote"

function VotingOption(props) {
    const audienceId = window.localStorage.getItem("audienceId", null)
    const sessionId = window.localStorage.getItem("sessionId", null)
    const option = props.option
    const slideId = props.slideId

    const handleVote = (event) => {
        event.preventDefault()
        if (audienceId && sessionId) {
            postSendVote(audienceId, option.destination, slideId, sessionId)
                .then((response) => {
                    console.log(response)
                })
        }
        console.log(option.name, option.destination)
    }

    return (
        <div>
            <button type="button" onClick={handleVote}>
                {option.name}
            </button>
        </div>
    )
};

export default VotingOption