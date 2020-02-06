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
 * Create course form component
 */
class CourseCreate extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  };

  /**
   * Handler for form input text fields
   * @param {object} event - DOM event object
   */
  change = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /**
   * Called when form is submitted
   */
  submit = async () => {
    const { context, history } = this.props;
    const { authenticatedUser } = context;
    const { emailAddress, password, id: userId } = authenticatedUser;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    const response = await context.api.createCourse(
      course,
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
    // eslint-disable-next-line react/destructuring-assignment
    this.props.history.push('/');
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;
    const { context } = this.props;
    const { authenticatedUser } = context;
    const { firstName, lastName } = authenticatedUser;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
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

export default withContext(CourseCreate);
