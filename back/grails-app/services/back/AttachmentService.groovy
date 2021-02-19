package back

import grails.gorm.services.Service

@Service(Attachment)
interface AttachmentService {

    Attachment get(Serializable id)

    List<Attachment> list(Map args)

    Long count()

    void delete(Serializable id)

    Attachment save(Attachment attachment)

}