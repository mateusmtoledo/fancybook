require('dotenv').config();
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoMemoryServer } = require('mongodb-memory-server');

if (process.env.NODE_ENV === 'test') {
  const initializeMongoServer = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    mongoose.connection.on('error', (e) => {
      if (e.message.code === 'ETIMEDOUT') {
        console.log(e);
        mongoose.connect(mongoUri);
      }
      console.log(e);
    });

    mongoose.connection.once('open', () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
    });

    return mongoServer;
  };

  const resetDb = async () => {
    await mongoose.connection.dropDatabase();
  };

  const disconnectMongoose = async (mongoServer) => {
    await mongoose.disconnect();
    await mongoServer.stop();
  };

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
} else {
  const mongoDB = process.env.MONGODB_URL;
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
