package back

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured('isAuthenticated()')
class ProjectController extends RestfulController<Project> {
    static responseFormats = ['json', 'xml']

    ProjectController() {
        super(Project)
    }
}
