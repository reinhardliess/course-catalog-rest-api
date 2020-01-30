/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import withContext from '../Context';

/**
 * Action Bar Button Component
 * @param {object} props
 */
const ActionsBar = (props) => {
  const { id, handleDelete, isAuthorized } = props;
  return (
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
          {isAuthorized() ? (
            <>
              <span>
                <Link className="button" to={`/courses/${id}/update`}>
                  Update Course
                </Link>
                <button type="button" className="button" onClick={handleDelete}>
                  Delete Course
                </button>
              </span>
            </>
          ) : null}
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>
    </div>
  );
};

class CourseDetail extends Component {
  state = {
    course: null,
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
      this.setState({ course: response.data[0] });
    } else {
      history.push('/notfound');
    }
  }

  /**
   * Determines whether a user is authorized to delete/update a course
   * @returns {Boolean} isAuthorized
   */
  handleAuthorized = () => {
    const { context } = this.props;
    const { authenticatedUser } = context;
    const { course } = this.state;
    return (
      authenticatedUser && course && authenticatedUser.id === course.User.id
    );
  };

  /**
   * Deletes a single course
   */
  handleDeleteCourse = async () => {
    const {
      context,
      history,
      match: { params },
    } = this.props;
    const { authenticatedUser } = context;
    const { emailAddress, password } = authenticatedUser;

    const response = await context.api.deleteCourse(
      params.courseId,
      emailAddress,
      password
    );
    if (response.ok) {
      history.push('/');
    }
  };

  render() {
    const { course } = this.state;
    const courseId = course ? course.id : 0;
    return (
      <div>
        <ActionsBar
          id={courseId}
          isAuthorized={this.handleAuthorized}
          handleDelete={this.handleDeleteCourse}
        />
      </div>
    );
  }
}

export default withContext(CourseDetail);
