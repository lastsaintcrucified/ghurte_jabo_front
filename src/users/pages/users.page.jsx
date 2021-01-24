import React from "react";
import UserList from "../component/userList/userList.component.jsx";
import "./users.styles.css";

const User = () =>{
    const User = [
        {
            id:"u1",
            name:"Mark Rufflao",
            image:"https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
            places:3
        },
        {
            id:'u2',
            name:"Mark Rufflao",
            image:"https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
            places:3
        },
        {
            id:"u3",
            name:"Mark Rufflao",
            image:"https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
            places:3
        },
        {
            id:"u4",
            name:"Mark Rufflao",
            image:"https://images.unsplash.com/photo-1502447533750-9860c1269ae3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
            places:3
        }
        
    ]
    return (
        <div>
            <UserList items={User}/>
        </div>
    )
}

export default User;