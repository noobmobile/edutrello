package back

import grails.rest.RestfulController

class ChecklistitemController extends RestfulController<ChecklistItem>{
    static responseFormats = ['json', 'xml']

    ChecklistitemController() {
        super(ChecklistItem)
    }
}
