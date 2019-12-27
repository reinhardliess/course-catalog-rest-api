/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from './config';
import { mapErrors } from './utils';

export default class Api {
  /**
   * Executes api request using axios
   * @param {string} url
   * @param {string} method
   * @param {object} options
   * @returns {object} response
   */
  async exec(url, method = 'GET', { body, credentials = {} }) {
    axios.defaults.baseURL = config.apiBaseUrl;
    const { username, password } = credentials;
    const options = {
      url,
      method,
    };

    if (body) {
      options.data = body;
    }

    if (username) {
      options.auth = { username, password };
    }
    try {
      const response = await axios(options);
      return response;
    } catch (error) {
      if (error.response.status) {
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
        authenticated: true,
        data: response.data,
      };
    } else if (response.status === 401) {
      ret = { authenticated: false };
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
      ret = { created: true };
    } else if (response.status === 400) {
      ret = {
        created: false,
        errors: mapErrors(response.data.errors),
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
    const errStatus = status || 500;
    console.error('Unexpected error, HTTP status: %d', errStatus);
    // window.location.href = '/error';
  }
}
