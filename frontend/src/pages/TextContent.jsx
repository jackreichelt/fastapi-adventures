import "./theme.css"

import "./TextContent.css"


function TextContent({ slide }) {
    return (
        <div id="comboDiv">
            <h1 className="title">{slide.title}</h1>
            <div id="contentPane">
                <ul className="slideText">
                    {slide.contents.map((bulletPoint, key) => {
                        return (
                            <li key={key}>
                                {bulletPoint}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default TextContent