import "./PollOptions.css"

import PollBar from "./PollBar"

function PollOptions(props) {
    const options = props.options
    const votesTally = props.votesTally
    const totalVotes = Object.values(props.votesTally).reduce((prev, current) => prev + current, 0)

    return (
        <div id="pollOptions">
            {options.map((option, key) => {
                return <PollBar key={key} option={option} votes={votesTally[option.destination] || 0} totalVotes={totalVotes} />
            })}
        </div>
    )
};

export default PollOptions