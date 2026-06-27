const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') });

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Roda uma vez antes de todos os testes deste arquivo
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Limpa todas as coleções entre cada teste, pra eles não interferirem um no outro
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Roda uma vez depois de todos os testes, fechando tudo
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});