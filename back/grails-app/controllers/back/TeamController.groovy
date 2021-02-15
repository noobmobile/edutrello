package back

import grails.rest.RestfulController

class TeamController extends RestfulController<Team>{
    static responseFormats = ['json', 'xml']

    TeamController() {
        super(Team)
    }
}
