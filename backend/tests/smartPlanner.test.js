require('./setup');

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Itinerary = require('../models/Itinerary');

// Helper: gera um token válido, simulando um usuário já autenticado
function makeAuthToken(userId = 'user123') {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

describe('Smart Trip Planner - Testes de Aceitação', () => {

  // Cenário 1: usuário gera um itinerário válido (fluxo público, sem login)
  test('Cenário 1: usuário gera um itinerário com dados válidos e recebe o plano com metadados corretos', async () => {
    const response = await request(app)
      .post('/api/smart-planner/generate-itinerary')
      .send({
        destination: 'Rio de Janeiro',
        days: 3,
        travelers: 2,
        travelType: 'leisure',
        budget: 5000,
        interests: ['praia', 'gastronomia'],
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.generatedPlan).toBeDefined();
    expect(response.body.meta.destination).toBe('Rio de Janeiro');
    expect(response.body.meta.days).toBe(3);
    expect(response.body.meta.travelers).toBe(2);
  });

  // Cenário 2: usuário tenta salvar um itinerário sem os campos obrigatórios
  test('Cenário 2: usuário autenticado tenta salvar itinerário sem "destination" e recebe erro 400, sem persistir nada', async () => {
    const token = makeAuthToken();

    const response = await request(app)
      .post('/api/smart-planner/save')
      .set('Authorization', `Bearer ${token}`)
      .send({
        // destination ausente de propósito
        generatedPlan: { dailyItinerary: [] },
        days: 2,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/destination/i);

    // Garante que nada foi salvo no banco
    const count = await Itinerary.countDocuments({});
    expect(count).toBe(0);
  });

  // Cenário 3: fluxo completo — gerar, salvar, e depois listar itinerários salvos
  test('Cenário 3: usuário gera, salva e em seguida visualiza o itinerário na lista de salvos', async () => {
    const token = makeAuthToken('user456');

    // Passo 1: gera o itinerário (rota pública)
    const generateResponse = await request(app)
      .post('/api/smart-planner/generate-itinerary')
      .send({
        destination: 'Salvador',
        days: 2,
        travelers: 1,
        travelType: 'solo',
        budget: 2000,
        interests: ['cultura'],
      });

    expect(generateResponse.status).toBe(200);
    const { generatedPlan } = generateResponse.body;

    // Passo 2: salva o itinerário gerado (rota protegida)
    const saveResponse = await request(app)
      .post('/api/smart-planner/save')
      .set('Authorization', `Bearer ${token}`)
      .send({
        destination: 'Salvador',
        days: 2,
        travelers: 1,
        travelType: 'solo',
        budget: 2000,
        interests: ['cultura'],
        generatedPlan,
      });

    expect(saveResponse.status).toBe(201);
    expect(saveResponse.body.success).toBe(true);

    // Passo 3: lista os itinerários salvos e confirma que o item aparece
    const listResponse = await request(app)
      .get('/api/smart-planner/saved-itineraries')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.success).toBe(true);
    expect(listResponse.body.count).toBe(1);
    expect(listResponse.body.itineraries[0].destination).toBe('Salvador');
  });

});