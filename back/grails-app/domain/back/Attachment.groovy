package back

class Attachment {

    String data
    String dataType
    String fileName
    static belongsTo = [activity: Activity]

    static constraints = {
        data(nullable: false)
        dataType(nullable: true)
        fileName(nullable: false)
    }

    static mapping = {
        data sqlType: "longtext"
    }

}
