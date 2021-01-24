import React, {useState} from "react";
import Avatar from "../../../shared/uiElements/avatar.component.jsx";
import CustomButton from "../../../shared/uiElements/customButton.component.jsx";
import Modal from "../../../shared/uiElements/modal.component.jsx";
import Map from "../../../shared/uiElements/map.component.jsx";

import "./placeItem.styles.css";

const PlaceItem = (props) =>{

    const [showMap,setSHowMap] = useState(false);

    const openMapModal = () =>{setSHowMap(true);console.log("sfd")}
    const closeMapModal = () =>setSHowMap(false)

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                close={closeMapModal}
                headerClass="header"
                contentClass="content"
                footerClass="footer"
                header={props.address}
                footer={<CustomButton className="ft_btn" onClick={closeMapModal}>Close</CustomButton>}
            >
                <div className="map_container">
                    <Map center={props.co_ordinates}/>
                </div>
            </Modal>
            <div className="place_item">
                <Avatar className="place_image" image={props.image} name={props.title}/>
                <div className="place_item_info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place_item_button">
                    <CustomButton onClick={openMapModal}>View On Map</CustomButton>
                    <CustomButton className="edit">Edit</CustomButton>
                    <CustomButton className="delete">Delete</CustomButton>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PlaceItem;