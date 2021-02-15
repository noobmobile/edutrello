package back

import grails.converters.JSON
import grails.rest.RestfulController

class UserController extends RestfulController<User> {
    static responseFormats = ['json', 'xml']

    UserController() {
        super(User)
    }

    def teams = { params ->
        if (!params.id) return
        def userId = params.id as long
        render Team.createCriteria().listDistinct {
            or {
                leader {
                    idEq(userId)
                }
                members {
                    idEq(userId)
                }
            }
        } as JSON
    }


}
