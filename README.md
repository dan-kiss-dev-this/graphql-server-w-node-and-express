TO try out project install modules and run $node server.js
in http://localhost:4000/graphql?query
 getSingeCourse is name of your query
 $courseID is a dynamic value we just created
 query getSingeCourse($courseID: Int!) {
   course(id: $courseID) {
     title
     description
     topic
     url
   }
 }
 go to the area called query variables on http:localhost:4000/graphql?query and type
 {"courseID": 1}


 ------------ change course topic
 mutation updateCourseTopic($id: Int!, $topic: String!){
   updateCourseTopic(id: $id, topic: $topic){
     ...courseFields
   }
 }
 fragment courseFields on Course {
   title
   description 
   topic 
   url 
 }
 query variable 
 {
   "id": 1,
   "topic":  "JavaScript"
 }