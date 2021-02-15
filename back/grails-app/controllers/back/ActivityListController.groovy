package back

import grails.rest.RestfulController

class ActivityListController extends RestfulController<ActivityList> {
    static responseFormats = ['json', 'xml']

    ActivityListController() {
        super(ActivityList)
    }

    def move = {params ->
        def projectId = params.project as long
        def activityListId = params.activity as long
        def position = params.to as int
        def project = Project.get(projectId)
        def activityList = project.getTasks().find({it.id == activityListId})

        def before = project.getTasks().find({it.position == position})
        while (before){
            before.setPosition(before.getPosition() - 1)
            before = project.getTasks().find({it.position == before.position && it != before})
        }

        activityList.setPosition(position)
        project.save(flush: true)

    }

}
