import React, { useState, useEffect } from "react";
// import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseAction";
import { Route } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const ManageCoursePage = (props) => {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
     const slug = props.match.params.slug; //from the path '/courses/:slug'
    if (courses.length === 0) {
      courseActions.loadCourses();
     } 
    else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    else {
      validSlug();
    }

    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    const updatedCourse = {
      ...course,
      [target.name]: target.value,
    };
    setCourse(updatedCourse);
  }
  const validSlug = () => {
    const _slug = props.match.params.slug;
    if (_slug) {
      setCourse(courseStore.getCourseBySlug(_slug));
    }
    else {
      return <Route component={NotFoundPage} />;
    }
  }
  const formIsValid = () => {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "AuthorId is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    //Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved");
    });
  };
  return (
    <>
      <h2>Manage Course</h2>
      {/* <Prompt when={true} message="Are You Sure You want to Leave" /> */}
      {/* // to read slug placeholder from the url passed from the App.js Route for Course */}
      {props.match.params.slug}
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
