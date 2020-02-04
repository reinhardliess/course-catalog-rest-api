import React, { Component } from 'react';

import withContext from '../Context';
import Form from './Form';
import {
  CourseEditTitle,
  CourseEditDescription,
  CourseEstimatedTime,
  CourseMaterials,
} from './CourseComponents';

/**
 * Update course form component
 */
class CourseUpdate extends Component {
  state = {
    course: {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      User: {
        firstName: '',
        lastName: '',
      },
    },
    errors: [],
  };

  async componentDidMount() {
    const {
      context,
      history,
      match: { params },
    } = this.props;

    const response = await context.api.getCourses(params.courseId);
    if (response === null) {
      return;
    }
    if (response.data.length > 0) {
      // prevent unauthorized user from updating course
      const { authenticatedUser } = context;
      const { id } = authenticatedUser;
      const course = response.data[0];
      if (course.User.id !== id) {
        history.push('/forbidden');
      } else {
        this.setState({ course });
      }
    } else {
      history.push('/notfound');
    }
  }

  /**
   * Handler for form input text fields
   * @param {object} event - DOM event object
   */
  change = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      course: {
        ...prevState.course,
        [name]: value,
      },
    }));
  };

  /**
   * Called when form is submitted
   */
  submit = async () => {
    const { context, history } = this.props;
    const { authenticatedUser } = context;
    const { emailAddress, password } = authenticatedUser;
    const { course } = this.state;
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      User,
    } = course;
    const courseEdited = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: User.id,
    };

    const response = await context.api.updateCourse(
      courseEdited,
      id,
      emailAddress,
      password
    );
    if (response === null) {
      return;
    }
    if (response.ok) {
      history.push('/');
    } else {
      this.setState({ errors: response.errors });
    }
  };

  cancel = () => {
    const {
      history,
      match: { params },
    } = this.props;
    const { courseId } = params;
    history.push(`/courses/${courseId}`);
  };

  render() {
    const { course, errors } = this.state;
    const { title, description, estimatedTime, materialsNeeded, User } = course;
    const { firstName, lastName } = User;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <>
              <div className="grid-66">
                <CourseEditTitle
                  username={`${firstName} ${lastName}`}
                  value={title}
                  handleChange={this.change}
                />
                <CourseEditDescription
                  value={description}
                  handleChange={this.change}
                />
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <CourseEstimatedTime
                      value={estimatedTime}
                      handleChange={this.change}
                    />
                    <CourseMaterials
                      value={materialsNeeded}
                      handleChange={this.change}
                    />
                  </ul>
                </div>
              </div>
            </>
          )}
        />
      </div>
    );
  }
}

export default withContext(CourseUpdate);
