package back

class User {

    String username
    String name
    String password
    String color

    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired
    //static hasMany = [teams: Team]

    static constraints = {
        username(unique: true)
        name(size: 5..30)
        password(password: true)
        color(nullable: true)
        //teams()
    }

    Set<Role> getAuthorities() {
        (UserRole.findAllByUser(this) as List<UserRole>)*.role as Set<Role>
    }

    def beforeInsert = {
        password = password.encodeAsSHA256()
        if (!color){
            color = Utils.getRandomColor()
        }
    }



}
