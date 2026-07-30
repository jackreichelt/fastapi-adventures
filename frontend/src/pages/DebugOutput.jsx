import "./theme.css"

function DebugOutput(display, messages) {
    return display && (
        <div>
            <p>Debug messages:</p>
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
    )

}

export default DebugOutput