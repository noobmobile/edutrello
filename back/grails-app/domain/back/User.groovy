package back

class User {

    String login
    String name
    String password
    //static hasMany = [teams: Team]

    static constraints = {
        login(unique: true)
        name(size: 5..30)
        password(password: true)
        //teams()
    }

    def beforeInsert = {
        password = password.encodeAsMD5()
    }


}
