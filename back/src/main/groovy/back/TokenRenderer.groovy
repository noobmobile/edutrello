package back

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.rest.oauth.OauthUser
import grails.plugin.springsecurity.rest.token.AccessToken
import grails.plugin.springsecurity.rest.token.rendering.DefaultAccessTokenJsonRenderer
import groovy.json.JsonBuilder
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.pac4j.core.profile.CommonProfile
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.util.Assert

@Transactional
class TokenRenderer  extends DefaultAccessTokenJsonRenderer{

    String usernamePropertyName = "username"
    String tokenPropertyName = "access_token"
    String authoritiesPropertyName = "roles"

    Boolean useBearerToken = true

    @Override
    String generateJson(AccessToken accessToken) {
        Assert.isInstanceOf(UserDetails, accessToken.principal, "A UserDetails implementation is required")
        UserDetails userDetails = accessToken.principal as UserDetails

        def result = [
                (usernamePropertyName) : userDetails.username,
                (authoritiesPropertyName) : accessToken.authorities.collect { GrantedAuthority role -> role.authority }
        ]

        if (useBearerToken) {
            result.token_type = 'Bearer'
            result.access_token = accessToken.accessToken

            if (accessToken.expiration) {
                result.expires_in = accessToken.expiration
            }

            if (accessToken.refreshToken) result.refresh_token = accessToken.refreshToken

        } else {
            result["$tokenPropertyName"] = accessToken.accessToken
        }

        if (userDetails instanceof OauthUser) {
            CommonProfile profile = (userDetails as OauthUser).userProfile
            result.with {
                email = profile.email
                displayName = profile.displayName
            }
        }


        User user = User.findByUsername(accessToken.principal.username)
        result["id"] = user.id
        result["name"] = user.name

        def jsonResult = result as JSON

        return jsonResult.toString()
    }
}
