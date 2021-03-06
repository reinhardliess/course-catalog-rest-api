/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from './config';

/**
 * Manages access to REST API
 */
export default class Api {
  /**
   * Returns sorted string array of validation errors (User)
   * @param {object[]} errors - validation errors
   * @returns {string[]} errors
   */
  mapUserErrors(errors) {
    // Sort errors to make sure their order matches the input field order of the sign-up form
    const order = ['firstName', 'lastName', 'emailAddress', 'password'];
    return [...errors]
      .sort((a, b) => order.indexOf(a.path) - order.indexOf(b.path))
      .map((error) => {
        if (
          error.type === 'unique violation' &&
          error.path === 'emailAddress'
        ) {
          error.message = 'A user with that email address already exists';
        }
        return error;
      });
  }

  /**
   * Executes api request using axios
   * @param {string} url
   * @param {string} method
   * @param {object} options
   * @returns {object} response
   */
  async exec(url, method = 'GET', options = {}) {
    axios.defaults.baseURL = config.apiBaseUrl;
    const { body, credentials = {} } = options;
    const { username, password } = credentials;
    const axiosOptions = {
      url,
      method,
    };

    if (body) {
      axiosOptions.data = body;
    }

    if (username) {
      axiosOptions.auth = { username, password };
    }
    try {
      const response = await axios(axiosOptions);
      return response;
    } catch (error) {
      // if http error, let caller handle it
      if (error.response && error.response.status) {
        return error.response;
      } else {
        console.error(error);
        this.handleError();
        return null;
      }
    }
  }

  /**
   * Retrieves authenticated user
   * @param {string} username
   * @param {string} password
   * @returns {object} response
   */
  async getUser(username, password) {
    const response = await this.exec(`/users`, 'GET', {
      credentials: { username, password },
    });
    if (response === null) {
      return null;
    }

    let ret;
    if (response.status === 200) {
      ret = {
        ok: true,
        data: response.data,
      };
    } else if (response.status === 401) {
      ret = { ok: false };
    } else {
      this.handleError(response.status);
      ret = null;
    }
    return ret;
  }

  /**
   * Creates new user
   * @param {object} user
   * @returns {object}
   */
  async createUser(user) {
    const response = await this.exec('/users', 'POST', { body: user });
    if (response === null) {
      return null;
    }
    let ret;
    if (response.status === 201) {
      ret = { ok: true };
    } else if (response.status === 400) {
      ret = {
        ok: false,
        errors: this.mapUserErrors(response.data.errors),
      };
    } else {
      this.handleError(response.status);
      ret = null;
    }
    return ret;
  }

  /**
   * Retrieves one or all courses in the database
   * @param {number?} id - course id
   * @returns {object} response
   */
  async getCourses(id = null) {
    const route = id ? `/courses/${id}` : '/courses';
    const response = await this.exec(route, 'GET');
    if (response === null) {
      return null;
    }

    let ret;
    if (response.status === 200) {
      const { courses } = response.data;
      ret = {
        ok: true,
        data: courses,
      };
    } else if (response.status === 404) {
      ret = {
        ok: true,
        data: [],
      };
    } else {
      this.handleError(response.status);
      ret = null;
    }
    return ret;
  }

  async deleteCourse(id, username, password) {
    const response = await this.exec(`/courses/${id}`, 'DELETE', {
      credentials: { username, password },
    });

    let ret;
    if (response.status === 204) {
      ret = {
        ok: true,
      };
    } else {
      this.handleError(response.status);
      ret = null;
    }
    return ret;
  }

  /**
   * Creates new course
   * @param {object} course
   * @param {string} username
   * @param {string} password
   * @returns {object} response
   */
  async createCourse(course, username, password) {
    const response = await this.exec('/courses', 'POST', {
      body: course,
      credentials: { username, password },
    });
    if (response === null) {
      return null;
    }
    let ret;
    if (response.status === 201) {
      ret = { ok: true };
    } else if (response.status === 400) {
      ret = {
        ok: false,
        errors: response.data.errors,
      };
    } else {
      this.handleError(response.status);
      ret = null;
    }
    return ret;
  }

  /**
   * Updates specific course
   * @param {object} course
   * @param {number} id
   * @param {string} username
   * @param {string} password
   * @returns {object} response
   */
  async updateCourse(course, id, username, password) {
    const response = await this.exec(`/courses/${id}`, 'PUT', {
      body: course,
      credentials: { username, password },
    });
    if (response === null) {
      return null;
    }
    let ret;
    if (response.status === 204) {
      ret = { ok: true };
    } else if (response.status === 400) {
      ret = {
        ok: false,
        errors: response.data.errors,
      };
    } else {
      this.handleError(response.status);
      ret = null;
    }
    return ret;
  }

  /**
   * Handles unexpected errors
   * @param {number} status - HTTP status code
   */
  handleError(status) {
    // TODO: handle 401/404 => forbidden/notfound ?
    const errStatus = status || 'undefined';
    console.error('Unexpected error, HTTP status: ', errStatus);
    window.location.href = '/error';
  }
}
