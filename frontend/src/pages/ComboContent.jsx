import "./theme.css"

import "./ComboContent.css"


function ComboContent({ slide }) {
    return (
        <div id="comboDiv">
            <h1 className="title">{slide.title}</h1>
            <div id="splitContentPane">
                <ul className="slideText">
                    {slide.contents.map((bulletPoint, key) => {
                        return (
                            <li key={key}>
                                {bulletPoint}
                            </li>
                        )
                    })}
                </ul>
                <img className="slideImage" src={slide.image} alt={`Image for ${slide.title}`} />
            </div>
        </div>
    )
}

export default ComboContent