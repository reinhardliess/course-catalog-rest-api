/* eslint-disable */
import Api from './Api';

describe('courses set', () => {

  test(`expect to retrieve all courses from the database`, async () => {
    const api = new Api();
    const response = await api.getCourses();
    expect(response).toHaveProperty('ok', true);
    expect(response.data).toHaveLength(3);
  });

  test(`expect to retrieve a single course from the database`, async () => {
    const api = new Api();
    const response = await api.getCourses(3);
    expect(response).toHaveProperty('ok', true);
    expect(response.data).toHaveLength(1);
  });

  test(`expect to successfully delete a single course`, async () => {
    const api = new Api();
    const response = await api.deleteCourse(1, 'joe@smith.com', 'joepassword');
    expect(response).toHaveProperty('ok', true);
  });

  test('expect to create a new course', async () => {
    const api = new Api();
    const course = {
      "title": "Quantifying Primary Alarm",
      "description": "Sed enim omnis qui modi consequuntur. Sed inventore et impedit ea voluptas quasi eum assumenda sit. Modi neque odit provident reprehenderit et. Nam et occaecati aut vitae.",
      "estimatedTime": "4 hours",
      "materialsNeeded": "Used Metal",
      "userId": "1"
    };
    const response = await api.createCourse(course, 'joe@smith.com', 'joepassword');
    expect(response).toHaveProperty('ok', true);
  });

  test('expect to successfully update a course', async () => {
    const api = new Api();
    const course = {
      "title": "Quantifying Primary Alarm",
      "description": "Sed enim omnis qui modi consequuntur. Sed inventore et impedit ea voluptas quasi eum assumenda sit. Modi neque odit provident reprehenderit et. Nam et occaecati aut vitae.",
      "estimatedTime": "5 hours",
      "materialsNeeded": "Used Metal",
      "userId": "1"
    };
    const response = await api.updateCourse(course, 4, 'joe@smith.com', 'joepassword');
    expect(response).toHaveProperty('ok', true);
  });


});