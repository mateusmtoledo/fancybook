// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');

exports.generateRandomUser = () => {
  const avatar = `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/480/480`;
  const gender = faker.name.gender(true);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const username = (`${firstName} ${lastName}`).split(' ').join('').toLowerCase();
  const email = `${username}@fancybook.com`;
  const password = username;
  return ({
    firstName,
    lastName,
    gender,
    avatar,
    username,
    email,
    password,
  });
};
