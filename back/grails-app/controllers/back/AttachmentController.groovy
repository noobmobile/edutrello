package back

import grails.rest.RestfulController


class AttachmentController extends RestfulController<Attachment> {
    static responseFormats = ['json', 'xml']

    AttachmentController() {
        super(Attachment)
    }
}
