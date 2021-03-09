package back

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured('isAuthenticated()')
class ChecklistitemController extends RestfulController<ChecklistItem>{
    static responseFormats = ['json', 'xml']

    ChecklistitemController() {
        super(ChecklistItem)
    }
}
