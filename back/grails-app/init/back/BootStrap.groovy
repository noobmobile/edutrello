package back

import grails.converters.JSON
import org.grails.web.converters.exceptions.ConverterException
import org.grails.web.converters.marshaller.ObjectMarshaller

class BootStrap {

    def init = { servletContext ->
        JSON.registerObjectMarshaller(new ObjectMarshaller<JSON>() {
            @Override
            boolean supports(Object object) {
                return object instanceof User
            }

            @Override
            void marshalObject(Object object, JSON converter) throws ConverterException {
                def user = object as User

                def jsonWriter = converter.writer
                jsonWriter.object()
                jsonWriter.key("id")
                jsonWriter.value(user.id)

                jsonWriter.key("name")
                jsonWriter.value(user.name)

                jsonWriter.key("color")
                jsonWriter.value(user.color)

                //other creator fields
                jsonWriter.endObject()
            }
        })

        JSON.registerObjectMarshaller(new ObjectMarshaller<JSON>() {
            @Override
            boolean supports(Object object) {
                return object instanceof Activity
            }

            @Override
            void marshalObject(Object object, JSON converter) throws ConverterException {
                def activity = object as Activity
                def jsonWriter = converter.writer
                jsonWriter.object()
                jsonWriter.key("title").value(activity.title)
                jsonWriter.key("description").value(activity.description)
                jsonWriter.key("dateCreated").value(activity.dateCreated?.getTime())
                jsonWriter.key("deadline").value(activity.deadline?.getTime())
                jsonWriter.key("id").value(activity.id)
                jsonWriter.key("position").value(activity.position)
                jsonWriter.key("creator").object().key("id").value(activity.creator.id).endObject()
                jsonWriter.key("activityList").object().key("id").value(activity.activityList.id).key("name").value(activity.activityList.name).endObject()
                jsonWriter.key("responsibles")
                converter.convertAnother(activity.responsibles)
                jsonWriter.key("checklists")
                converter.convertAnother(activity.checklists)
                jsonWriter.endObject()
            }
        })
        JSON.registerObjectMarshaller(new ObjectMarshaller<JSON>() {
            @Override
            boolean supports(Object object) {
                return object instanceof ActivityList
            }

            @Override
            void marshalObject(Object object, JSON converter) throws ConverterException {
                def activityList = object as ActivityList
                def jsonWriter = converter.writer
                jsonWriter.object()
                jsonWriter.key("name").value(activityList.name)
                jsonWriter.key("id").value(activityList.id)
                jsonWriter.key("position").value(activityList.position)
                jsonWriter.key("project").object().key("id").value(activityList.project.id).endObject()
                jsonWriter.key("activities")
                converter.convertAnother(activityList.activities)
                jsonWriter.endObject()
            }
        })
        JSON.registerObjectMarshaller(new ObjectMarshaller<JSON>() {
            @Override
            boolean supports(Object object) {
                return object instanceof Project
            }

            @Override
            void marshalObject(Object object, JSON converter) throws ConverterException {
                def project = object as Project
                def jsonWriter = converter.writer
                jsonWriter.object()
                jsonWriter.key("name").value(project.name)
                jsonWriter.key("id").value(project.id)
                jsonWriter.key("team").object().key("id").value(project.team.id).endObject()
                jsonWriter.key("tasks")
                converter.convertAnother(project.tasks)
                jsonWriter.key("members")
                converter.convertAnother(project.team.members)
                jsonWriter.endObject()
            }
        })
        JSON.registerObjectMarshaller(new ObjectMarshaller<JSON>() {
            @Override
            boolean supports(Object object) {
                return object instanceof ChecklistItem
            }

            @Override
            void marshalObject(Object object, JSON converter) throws ConverterException {
                def checklist = object as ChecklistItem
                def jsonWriter = converter.writer
                jsonWriter.object()
                jsonWriter.key("title").value(checklist.title)
                jsonWriter.key("id").value(checklist.id)
                jsonWriter.key("done").value(checklist.done)
                jsonWriter.key("activity").object().key("id").value(checklist.activity.id).endObject()
                jsonWriter.endObject()
            }
        })
        JSON.registerObjectMarshaller(new ObjectMarshaller<JSON>() {
            @Override
            boolean supports(Object object) {
                return object instanceof Team
            }

            @Override
            void marshalObject(Object object, JSON converter) throws ConverterException {
                def team = object as Team

                def jsonWriter = converter.writer
                jsonWriter.object()
                jsonWriter.key("id").value(team.id)
                jsonWriter.key("name").value(team.name)

                jsonWriter.key("leader")
                converter.convertAnother(team.leader)

                jsonWriter.key("members")
                converter.convertAnother(team.members)

                jsonWriter.key("projects")
                converter.convertAnother(team.projects)

                jsonWriter.endObject()
            }
        })
    }
    def destroy = {
    }
}
