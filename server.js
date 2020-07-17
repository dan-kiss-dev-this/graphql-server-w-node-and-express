var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql')

// graphql schema
var schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  }
  type Mutation {
    updateCourseTopic(id: Int!, topic: String!): Course
  }
  type Course {
    id: Int
    title: String
    description: String
    topic: String
    url: String
  }
`);

// dummy data
var coursesData = [
  {
    id: 1,
    title: "title 1",
    author: "author 1",
    description: 'Description 1',
    topic: 'a1',
    url: 'www.1.com'
  },
  {
    id: 2,
    title: "title 2",
    author: "author 2",
    description: 'Description 2',
    topic: 'b2',
    url: 'www.2.com'
  },
  {
    id: 3,
    title: "title 3",
    author: "author 3",
    description: 'Description 3',
    topic: 'c3',
    url: 'www.3.com'
  }
]

var getCourse = function (args) {
  var id = args.id;
  return coursesData.filter(course => {
    return course.id == id;
  })[0];
}

var getCourses = function (args) {
  console.log(56)
  if (args.topic) {
    console.log(58)
    var topic = args.topic;
    return coursesData.filter(course => course.topic == topic)
  } else coursesData
}

var updateCourseTopic = function ({ id, topic }) {
  coursesData.map(course => {
    if (course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter(course => course.id === id)[0];
}

// root resolver
var root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic
}

// create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root, //resolver
  graphiql: true //tool on browser to give ui
}));

app.listen(4000, () => {
  // below is function to execute when server is running
  console.log('Express Graphql server now running on localhost:4000/graphql')
});

//---------------now in http://localhost:4000/graphql?query
// getSingeCourse is name of your query
// $courseID is a dynamic value we just created
// query getSingeCourse($courseID: Int!) {
//   course(id: $courseID) {
//     title
//     description
//     topic
//     url
//   }
// }
// go to the area called query variables on http://localhost:4000/graphql?query and type
// {"courseID": 1}


// ------------ change course topic
// mutation updateCourseTopic($id: Int!, $topic: String!){
//   updateCourseTopic(id: $id, topic: $topic){
//     ...courseFields
//   }
// }
// fragment courseFields on Course {
//   title
//   description 
//   topic 
//   url 
// }
// query variable 
// {
//   "id": 1,
//   "topic":  "JavaScript"
// }

