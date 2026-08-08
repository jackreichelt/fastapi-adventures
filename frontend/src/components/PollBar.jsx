import "./PollBar.css"

function PollBar(props) {
    const option = props.option
    const votes = props.votes
    const totalVotes = props.totalVotes
    const votesFraction = votes / totalVotes * 100

    return (
        <div className="pollBar">
            <div className="filledPoll" style={{ 'width': `${votesFraction}%` }}>
                <p>
                    {option.name} - {votes}
                </p>
            </div>
        </div >
    )
};

export default PollBar