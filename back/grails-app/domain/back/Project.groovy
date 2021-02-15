package back

class Project {

    String name
    static belongsTo = [team: Team]
    static hasMany = [tasks: ActivityList]

    static constraints = {
        name()
        team()
        tasks()
    }

    def beforeInsert = {
        if (!tasks){
            tasks = []
        }
    }

}
