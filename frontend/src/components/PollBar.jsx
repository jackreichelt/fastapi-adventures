
function PollBar(props) {
    const option = props.option
    const votes = props.votes

    return (
        <div>
            {option.name} - {votes}
        </div>
    )
};

export default PollBar