import React from "react";

//functional component
export default function Footer(props) {//props - a data object to share data from parent to child component
    //to access the elements passed in between component open/close,
    //we need to access via - props.children - array
    //props can hold - variable, object, event/function, component etc..
    //props.name = "something else" //not allowed as props are read only

    //return - creates a virtual dom for Footer and gets merged if change is there in props to actual dom after diffing
    //in the jsx code it must always return one top parent element and then we can have any elements in it
    //props.name - will get access to the value linked with name property when it is used in app.js
    //Javascript Like XML structure (not html, not xml - but js)
    return(
        <>
            
            <div className="footer">
                © Copyright 2023 All rights reserved. &nbsp;|&nbsp; 
                <a href="https://www.synergisticit.com/" target="_blank">SynergisticIT</a> &nbsp;|&nbsp; 
                <a href="http://www.synergisticit.com/sitemap.xml" target="_blank">Sitemap</a>
            </div>
{/* 
            {props.children&&props.children[0]}
            {props.children&&props.children[1]} */}
        </>
    )
}


//Virtual Dom
//DOM