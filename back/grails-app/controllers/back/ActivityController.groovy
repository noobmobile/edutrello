package back

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured('isAuthenticated()')
class ActivityController extends RestfulController<Activity> {
    static responseFormats = ['json', 'xml']

    ActivityController() {
        super(Activity)
    }

    def move = {params ->
        def projectId = params.project as long
        def activityId = params.task as long
        def listFromId = params.from as long
        def listToId = params.to as long
        def position = params.y as int

        def project = Project.get(projectId)
        def listFrom = project.getTasks().find({it.id == listFromId})
        def listTo = project.getTasks().find({it.id == listToId})
        def activity = listFrom.getActivities().find({it.id == activityId})

        listFrom.removeFromActivities(activity)
        listTo.addToActivities(activity)
        activity.setPosition(position)

        project.save(flush: true)
        response.status = 200
    }

}
