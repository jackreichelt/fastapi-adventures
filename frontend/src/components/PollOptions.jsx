import PollBar from "./PollBar"

function PollOptions(props) {
    const options = props.options
    const votesTally = props.votesTally

    return (
        <div>
            {options.map((option, key) => {
                return <PollBar key={key} option={option} votes={votesTally[option.destination] || 0} />
            })}
        </div>
    )
};

export default PollOptions