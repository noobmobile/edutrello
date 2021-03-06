import * as React from "react";
import {Container, StyledLoading} from "./style";
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
        const activities = [...project.tasks]
            .sort((a, b) => a.position - b.position)
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
        return [1, 2, 3, 4, 5, 6]
            .map(a => {
                    return (
                        <StyledLoading
                            loading={true}
                            key={a}
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