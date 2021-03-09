package back

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured('isAuthenticated()')
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

    def tasks = { params ->
        if (!params.id) return
        def userId = params.id as long
        render Activity.createCriteria().listDistinct {
            responsibles {
                idEq(userId)
            }
        } as JSON
    }

    @Secured('permitAll')
    @Override
    def save() {
        return super.save()
    }
}
