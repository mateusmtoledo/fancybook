// eslint-disable-next-line
const request = require('supertest');

async function getSessionId(app, { email, password }) {
  const res = await request(app).post('/login').send({
    email,
    password,
  });
  return res.headers['set-cookie'][0].split('=')[1].split(';')[0];
}

module.exports = getSessionId;
