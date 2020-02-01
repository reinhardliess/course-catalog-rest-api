/* eslint-disable react/jsx-indent */
/* eslint-disable import/prefer-default-export */
import React from 'react';

/**
 * Edit Title Component
 * @param {object} props
 */
const CourseEditTitle = ({ username, value, handleChange }) => {
  return (
    <div className="course--header">
      <h4 className="course--label">Course</h4>
      <div>
        <input
          id="title"
          name="title"
          type="text"
          className="input-title course--title--input"
          placeholder="Course title..."
          value={value}
          onChange={handleChange}
        />
      </div>
      <p>{`By ${username}`}</p>
    </div>
  );
};

const CourseEditDescription = ({ value, handleChange }) => {
  return (
    <div className="course--description">
      <div>
        <textarea
          id="description"
          name="description"
          placeholder="Course description..."
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const CourseEstimatedTime = ({ value, handleChange }) => {
  return (
    <li className="course--stats--list--item">
      <h4>Estimated Time</h4>
      <div>
        <input
          id="estimatedTime"
          name="estimatedTime"
          type="text"
          className="course--time--input"
          placeholder="Hours"
          value={value}
          onChange={handleChange}
        />
      </div>
    </li>
  );
};

const CourseMaterials = ({ value, handleChange }) => {
  return (
    <li className="course--stats--list--item">
      <h4>Materials Needed</h4>
      <div>
        <textarea
          id="materialsNeeded"
          name="materialsNeeded"
          placeholder="List materials..."
          value={value}
          onChange={handleChange}
        />
      </div>
    </li>
  );
};

export {
  CourseEditTitle,
  CourseEditDescription,
  CourseEstimatedTime,
  CourseMaterials,
};
