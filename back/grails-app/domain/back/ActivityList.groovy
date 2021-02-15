package back

class ActivityList {

    String name
    int position
    static belongsTo = [project: Project]
    static hasMany = [activities: Activity]

    static constraints = {
        name()
        activities()
        project()
    }

    def beforeInsert = {
        if (!position){
            position = (project.tasks.max({it.position})?.position ?: 0) + 1
        }
        if (!activities){
            activities = []
        }
    }


}
