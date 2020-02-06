/* eslint-disable */
import Api from './Api';

// tests for user api access
describe('user set', () => {

  test(`when using correct credentials expect user to be authenticated`, async () => {
    const api = new Api();
    const response = await api.getUser('joe@smith.com', 'joepassword');
    expect(response).toHaveProperty('ok', true);
  });

  test(`when using incorrect credentials expect user not to be authenticated`, async () => {
    const api = new Api();
    const response = await api.getUser('joe@smith.com', 'badpassword');
    expect(response).toHaveProperty('ok', false);
  });

  test(`when using complete data expect user to be created`, async () => {
    const api = new Api();
    const user = {
      "firstName": "Lara",
      "lastName": "Croft",
      "emailAddress": "lara@croftmanor.co.uk",
      "password": "jaffacakes214"
    }
    const response = await api.createUser(user);
    expect(response).toHaveProperty('ok', true);
  });

  test(`when using incomplete data expect user not to be created`, async () => {
    const api = new Api();
    const user = {
      "firstName": "Peter",
    }
    const response = await api.createUser(user);
    console.log({response});
    expect(response).toHaveProperty('ok', false);
    expect(response.errors).toHaveLength(3);
  });

  test(`when using an invalid email expect user not to be created`, async () => {
    const api = new Api();
    const user = {
      "firstName": "Peter",
      "lastName": "Pan",
      "emailAddress": "peter@pan",
      "password": "peterpassword"
    }
    const response = await api.createUser(user);
    console.log({response});
    expect(response).toHaveProperty('ok', false);
    expect(response.errors).toHaveLength(1);
  });
});
