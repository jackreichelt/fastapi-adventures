import "./theme.css"

import "./TitleContent.css"


function TitleContent(slide) {
    return (
        <div id="titleDiv">
            <h1 className="title">{slide.title}</h1>
        </div>
    )
}

export default TitleContent