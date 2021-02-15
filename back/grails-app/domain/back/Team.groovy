package back

class Team {

    String name
    static belongsTo = [leader: User]
    static hasMany = [members: User, projects: Project]

    static constraints = {
        name()
        members()
        projects()
        leader()
    }

    def beforeInsert = {
        if (!members) members = []
        if (!projects) projects = []
        if (!members.contains(leader)){
            members.add(leader)
        }
    }

    def beforeUpdate = beforeInsert

}
