import VotingOption from "./VotingOption"

function VotingOptions(props) {
    const options = props.options
    const slideId = props.slideId

    return (
        <div>
            {options.map((option, key) => {
                return <VotingOption key={key} option={option} slideId={slideId} />
            })}
        </div>
    )
};

export default VotingOptions