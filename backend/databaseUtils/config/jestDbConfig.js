const { initializeMongoServer, resetDb, disconnectMongoose } = require('./mongoTestingConfig');

let mongoServer;

beforeAll(async () => {
  mongoServer = await initializeMongoServer();
});
afterEach(async () => {
  await resetDb();
});
afterAll(async () => {
  await disconnectMongoose(mongoServer);
});
