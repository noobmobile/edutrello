package back

class ChecklistItem {

    String title
    boolean done
    static belongsTo = [activity: Activity]

    static constraints = {
        title()
        done()
        activity()
    }
}
