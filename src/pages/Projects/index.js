import * as React from "react";
import {Container, StyledCard} from "./style";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {getProjectRequest} from "../../store/modules/projects/action";
import CardDnd from "./components/CardDnd";
import CustomDragLayer from "./components/CustomDragLayer";
import CreateListButton from "./components/CreateListButton";
class Project extends React.Component {

    componentDidMount(){
        const id = this.props.match.params.id
        const {dispatch} = this.props
        dispatch(getProjectRequest(id))
    }

    buildCards(project) {
        const activities = [...project.activities]
            .sort((a, b) => a.order - b.order)
        return activities
            .map((activity, index) => {
                    return (
                        <CardDnd
                            last={index === activities.length - 1}
                            key={activity.name}
                            activity={activity}/>
                    );
                }
            )
    }

    buildLoadingCards() {
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
                    <CustomDragLayer/>
                    {this.props.project
                        ? this.buildCards(this.props.project)
                        : this.buildLoadingCards()
                    }
                    {this.props.project
                        ? <CreateListButton/>
                        : null
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