import React from "react";
import { getCourses } from "../api/courseApi";

class CoursesPage extends React.Component {
    state = {
      courses: [],
    };
  
    // proper lifecyle for making APi calls
  
    componentDidMount() {
      // its a promise API call so we will use .then to fetch the data
  
      getCourses().then((courses) => this.setState({ courses: courses }));
    }
  
    renderRow(course) {
      return (
        <tr key={course.id}>
          <td>{course.title}</td>
          <td>{course.authorId}</td>
          <td>{course.category}</td>
        </tr>
      );
    }
  
    render() {
      return (
        <>
          <h2>Courses</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author ID</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>{this.state.courses.map(this.renderRow)}</tbody>
          </table>
        </>
      );
    }
  }