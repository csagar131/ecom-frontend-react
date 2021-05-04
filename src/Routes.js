import React from "react";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashboard"
import Home from "./core/Home";
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn"

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/signin" component={SignIn}/>
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
            </Switch>
        </Router>
    )
}

export default Routes;