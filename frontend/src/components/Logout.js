import React from "react";
import { Redirect } from "react-router-dom";

function Logout({logout}) {
    logout()
    return <Redirect to="/homeanon" />;
}

export default Logout;
