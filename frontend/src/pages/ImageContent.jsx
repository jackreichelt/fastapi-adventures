import "./theme.css"

import "./ImageContent.css"


function ImageContent({ slide }) {
    return (
        <div id="comboDiv">
            <h1 className="title">{slide.title}</h1>
            <div id="contentPane">
                <img className="slideImage" src={slide.image} alt={`Image for ${slide.title}`} />
            </div>
        </div>
    )
}

export default ImageContent