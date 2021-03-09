import * as React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Projects";
import Login from "./pages/Login";
import {isLogged} from './services/auth';
class Routes extends React.Component {

    render(){
        return (
            <Switch>
                <PrivateRoute path="/" exact component={Home}/>
                <PrivateRoute path="/project/:id"  component={Project}/>
                <Route path="/login"  component={Login}/>
            </Switch>
        )
    }

}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            return isLogged() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
            );
        }
        }
    />
);

export default Routes