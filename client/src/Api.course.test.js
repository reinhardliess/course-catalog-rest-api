/* eslint-disable */
import Api from './Api';

describe('courses set', () => {

  test(`expect to retrieve all courses from the database`, async () => {
    const api = new Api();
    const response = await api.getCourses();
    expect(response).toHaveProperty('ok', true);
    expect(response.data).toHaveLength(3);
  });

  test(`expect to retrieve all courses from the database`, async () => {
    const api = new Api();
    const response = await api.getCourses(3);
    expect(response).toHaveProperty('ok', true);
    expect(response.data).toHaveLength(1);
  });

  test(`delete a single course`, async () => {
    const api = new Api();
    const response = await api.deleteCourse(1, 'joe@smith.com', 'joepassword');
    expect(response).toHaveProperty('ok', true);
  });


});