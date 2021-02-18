package back

class User {

    String login
    String name
    String password
    String color
    //static hasMany = [teams: Team]

    static constraints = {
        login(unique: true)
        name(size: 5..30)
        password(password: true)
        color(nullable: true)
        //teams()
    }

    def beforeInsert = {
        password = password.encodeAsMD5()
        if (!color){
            color = Utils.getRandomColor()
        }
    }



}
