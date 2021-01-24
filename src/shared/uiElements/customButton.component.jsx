import React from "react"

import "./customButton.styles.css";

const CustomButton = (props) =>{
    return (
        <button onClick={props.onClick} className = {`custom_button ${props.className}`}>{props.children}</button>
    )
}

export default CustomButton;