package back

class Activity {

    String title
    String description
    Date dateCreated
    Date deadline
    int position
    static hasMany = [responsibles: User]
    static belongsTo = [creator: User, activityList: ActivityList]

    static constraints = {
        title()
        description(nullable: true)
        deadline(nullable: true)
        creator()
        responsibles(nullable: true)
        activityList()
    }

    def beforeInsert = {
        if (!position){
            position = (activityList.activities.max({it.position})?.position ?: 0) + 1
        }
        if (!responsibles){
            responsibles = []
        }
    }

}
