import React from "react"

import "./customButton.styles.css";

const CustomButton = (props) =>{
    return (
        <button className = {`custom_button ${props.className}`}>{props.children}</button>
    )
}

export default CustomButton;