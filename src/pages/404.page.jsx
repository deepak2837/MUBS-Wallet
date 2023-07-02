import React, { useEffect } from "react";

const NotFoundPage = () =>{

    useEffect(()=>{
        localStorage.clear()
    })
    return(
        <div>
            page not found
        </div>
    )
}

export default NotFoundPage;