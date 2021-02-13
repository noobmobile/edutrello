import * as React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Projects";

class Routes extends React.Component {

    render(){
        return (
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/project/:id"  component={Project}/>
            </Switch>
        )
    }

}

export default Routes