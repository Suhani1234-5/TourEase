# Testes
# 1. Geração de itinerário com dados válidos
Critério de aceitação: 

Dado que um usuário (autenticado ou não) acessa a funcionalidade de planejamento inteligente de viagens e informa um destino, número de dias, número de viajantes, tipo de viagem, orçamento e interesses válidos, o sistema deve gerar um itinerário completo, retornando o plano junto com os metadados corretos da viagem (destino, datas, número de dias, viajantes).

```javascript
test('Cenário 1: usuário gera um itinerário com dados válidos e recebe o plano com metadados corretos', async () => {
  const response = await request(app)
    .post('/api/smart-planner/generate-itinerary')u
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
```

O que o teste verifica

| Verificação |Por que importa |
|-------------|----------------|
| response.status === 200 | Confirma que a requisição foi processada com sucesso, sem erros de validação ou falhas internas.|
| response.body.success === true | Confirma o contrato de resposta da API (todas as rotas do controller retornam um campo success para indicar o resultado da operação).|
| response.body.generatedPlan está definido | Garante que o sistema de fato gerou um plano de viagem, e não retornou uma resposta vazia. |
| meta.destination, meta.days, meta.travelers corretos | Confirma que os metadados retornados refletem exatamente os dados enviados pelo usuário, validando a integridade da resposta.|

Rota testada: POST /api/smart-planner/generate-itinerary

Camadas testadas: 
* Camada de rotas
* Camada de controller
* Camada de serviço

# 2. Validação de campos obrigatórios ao salvar itinerário

Critério de aceitação: 
Dado que um usuário autenticado deseja salvar um itinerário gerado e envia a requisição de salvamento sem informar o campo obrigatório destination, o sistema deve rejeitar a operação com status 400, retornar uma mensagem de erro indicando o campo faltante, e não deve persistir nenhum dado no banco.

```javascript
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

  const count = await Itinerary.countDocuments({});
  expect(count).toBe(0);
});
```

O que o teste verifica

| Verificação |Por que importa |
|-------------|----------------|
| response.status === 400 | Confirma que o sistema reconhece a requisição como inválida (erro do cliente), e não como erro interno (500) ou sucesso indevido. |
| response.body.success === false | Confirma o contrato de resposta de erro, consistente com o restante da API. |
| response.body.message contém "destination" | Garante que a mensagem de erro é específica e útil, apontando exatamente qual campo está faltando — importante para a experiência do usuário/desenvolvedor que consome a API |
| Itinerary.countDocuments({}) === 0 | Verificação mais importante deste teste: garante que a validação ocorre antes de qualquer tentativa de persistência, evitando dados inconsistentes ou incompletos no banco. | 

Rota testada: POST /api/smart-planner/save

Camadas testadas:
* Camada de Middleware
* Camada de controller
* Camada de modelo

# 3. Fluxo completo — gerar, salvar e visualizar itinerário salvo
Critério de aceitação:

Dado que um usuário autenticado gera um itinerário válido, salva-o e, em seguida, consulta sua lista de itinerários salvos. O itinerário deve aparecer corretamente na listagem, confirmando que os dados persistidos correspondem ao que foi gerado e salvo.

```javascript
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
```

O que o teste verifica
|Verificação | Por que importa|
|------------|----------------|
| generateResponse.status === 200 | Confirma que a etapa de geração funcionou antes de seguir para o salvamento, se falhar aqui, o teste já para, evitando um falso negativo nas etapas seguintes. |
| saveResponse.status === 201 | Status 201 Created é o correto semanticamente para confirmar que um novo recurso (o itinerário salvo) foi criado no banco |
| listResponse.body.count === 1 | Confirma que exatamente um itinerário foi persistido — não duplicado, não perdido. | 
| itineraries[0].destination === 'Salvador' | Confirma que os dados retornados na listagem correspondem exatamente ao que foi gerado e salvo, validando a integridade de ponta a ponta.|

Rotas testadas:
POST /api/smart-planner/generate-itinerary (pública)
POST /api/smart-planner/save (protegida)
GET /api/smart-planner/saved-itineraries (protegida)

Camadas testadas:
* Geração via service
* Persistência real no banco
* Autenticação via middleware
* Consulta/leitura filtrada por usuário
