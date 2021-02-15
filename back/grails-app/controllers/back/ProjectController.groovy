package back

import grails.rest.RestfulController

class ProjectController extends RestfulController<Project> {
    static responseFormats = ['json', 'xml']

    ProjectController() {
        super(Project)
    }
}
