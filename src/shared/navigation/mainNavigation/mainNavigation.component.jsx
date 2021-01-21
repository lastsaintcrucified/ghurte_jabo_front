import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "../mainHeader/mainHeader.component.jsx";

import "./mainNavigation.styles.css";

const MainNavigation = props =>{
    return (
        <MainHeader>
            <button className="main_nav_menu_button">
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main_nav_title">
                <Link to="/">Ghurte Jabo</Link>
            </h1>
            <nav>
                ...
            </nav>
        </MainHeader>
    )
}

export default MainNavigation;