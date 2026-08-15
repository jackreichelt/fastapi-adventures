import "./VotingOptions.css"

import VotingOption from "./VotingOption"

function VotingOptions(props) {
    const options = props.options
    const slideId = props.slideId

    return (
        <div id="voting-options">
            {options.map((option, key) => {
                return <VotingOption key={key} option={option} slideId={slideId} />
            })}
        </div>
    )
};

export default VotingOptions