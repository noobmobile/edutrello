import * as React from "react";
import {Container, StyledCard} from "./style";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {getProjectRequest} from "../../store/modules/projects/action";
import ListDnd from "./components/ListDnd";
import {useEffect} from "react";
import CardDnd from "./components/CardDnd";
import ListItemDnd from "./components/ListItemDnd";

class Project extends React.Component {

    componentDidMount(){
        const id = this.props.match.params.id
        const {dispatch} = this.props
        dispatch(getProjectRequest(id))
        console.log('mount it!');
    }

    buildCards(project) {
        const activities = [...project.activities]
            .sort((a, b) => a.order - b.order)
        return activities
            .map(a => {
                    return (
                        <CardDnd
                            last={activities.indexOf(a) === activities.length - 1}
                            key={a.name}
                            activity={a}/>
                    );
                }
            )
    }

    buildEmptyCards() {
        return [1, 2, 3, 4]
            .map(a => {
                    return (
                        <StyledCard
                            style={{height: '150px'}}
                            loading key={a}
                            bordered={false}/>
                    );
                }
            )
    }

    render() {
        return (
            <Container>
                <DndProvider backend={HTML5Backend}>
                    {this.props.project
                        ? this.buildCards(this.props.project)
                        : this.buildEmptyCards()
                    }
                </DndProvider>
            </Container>
        )
    }
}

const mapToProps = state => ({
    project: state.projects.project
});
export default connect(mapToProps)(withRouter(Project))