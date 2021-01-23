import React from "react";
import Avatar from "../../../shared/uiElements/avatar.component.jsx";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";

import "./placeItem.styles.css";

const PlaceItem = (props) =>{
    return (
        <div className="place_item">
            <Avatar className="place_image" image={props.image} name={props.title}/>
            <div className="place_item_info">
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.description}</p>
            </div>
            <div className="place_item_button">
                <CustomButton>View On Map</CustomButton>
                <CustomButton className="edit">Edit</CustomButton>
                <CustomButton className="delete">Delete</CustomButton>
            </div>
            
        </div>
    )
}

export default PlaceItem;