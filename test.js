const mongoose = require("mongoose");
//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal to)
//lt (less than)
//lte (less than or equal to )
//in
//nin (not in)

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//parse data from req body to json
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Succesfully connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB... ", err));

const courseSchema = new mongoose.courseSchema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean
});
const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "React JS from scratch",
    author: "Aymen Soussi",
    tags: ["React", "Redux", "JS"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function findCourses() {
  const courses = await Course.find();
  console.log(courses);
}

//createCourse();

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        isPublished: false,
        author: "Another author"
      }
    },
    { new: true }
  );
  //new: to get the new updated document and not the old
  console.log(course);
}

async function removeCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
