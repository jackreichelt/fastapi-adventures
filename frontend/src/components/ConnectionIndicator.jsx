import "./ConnectionIndicator.css"

function ConnectionIndicator(props) {
    const status = props.status || "uninstantiated"

    return (
        <svg id="connection-indicator" class={status} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="currentColor" />
        </svg>
    )
};

export default ConnectionIndicator