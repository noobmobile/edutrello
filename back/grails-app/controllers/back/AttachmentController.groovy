package back

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured('isAuthenticated()')
class AttachmentController extends RestfulController<Attachment> {
    static responseFormats = ['json', 'xml']

    AttachmentController() {
        super(Attachment)
    }
}
