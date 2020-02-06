import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import withContext from '../Context';

/**
 * Action Bar Button Component
 * @param {object} props
 */
const ActionsBar = ({ id, handleDelete, isAuthorized }) => {
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

/**
 * Displays course description
 * @param {object} props
 */
const CourseDescription = ({ data }) => {
  const { title, description, User } = data;
  const { firstName, lastName } = User;
  return (
    <div className="grid-66">
      <div className="course--header">
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{title}</h3>
        <p>{`By ${firstName} ${lastName}`}</p>
      </div>
      <div className="course--description">
        <ReactMarkdown source={description} />
      </div>
    </div>
  );
};

/**
 * Displays materials needed for course
 * @param {object} props
 */
const CourseMaterials = ({ data }) => {
  const { estimatedTime, materialsNeeded } = data;
  return (
    <div className="grid-25 grid-right">
      <div className="course--stats">
        <ul className="course--stats--list">
          <li className="course--stats--list--item">
            <h4>Estimated Time</h4>
            <h3>{estimatedTime}</h3>
          </li>
          <li className="course--stats--list--item">
            <h4>Materials Needed</h4>
            <ReactMarkdown source={materialsNeeded} />
          </li>
        </ul>
      </div>
    </div>
  );
};

/**
 * Course Detail Container Component
 */
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
    return (
      <div>
        {course ? (
          <>
            <ActionsBar
              id={course.id}
              isAuthorized={this.handleAuthorized}
              handleDelete={this.handleDeleteCourse}
            />
            <div className="bounds course--detail">
              <CourseDescription data={course} />
              <CourseMaterials data={course} />
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default withContext(CourseDetail);
