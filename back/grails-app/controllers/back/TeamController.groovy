package back

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured('isAuthenticated()')
class TeamController extends RestfulController<Team>{
    static responseFormats = ['json', 'xml']

    TeamController() {
        super(Team)
    }
}
