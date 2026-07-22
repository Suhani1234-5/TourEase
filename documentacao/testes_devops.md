# Testes
# 1. Login com credenciais válidas
Critério de aceitação: 

Dado que um usuário que já possui uma conta cadastrada no sistema, acessa a página de login, preenche o email e senha corretos e clica em "Sign In", o sistema deve autenticá-lo e redirecioná-lo para outra página, saindo da rota /login.

```javascript
it('Cenário 1: usuário faz login com credenciais válidas e é redirecionado', () => {
  cy.visit('/login')
  cy.get('input[placeholder="you@example.com"]').type('teste@tourease.com')
  cy.get('input[type="password"]').type('Teste@123')
  cy.contains('button', 'Sign In').click()
  cy.url().should('not.include', '/login')
})
```

O que o teste verifica

| Verificação |Por que importa |
|-------------|----------------|
| cy.visit('/login') | Garante que o teste começa sempre na página correta, independente do estado anterior do navegador.|
| cy.get('input[placeholder="you@example.com"]').type(...) | Simula o preenchimento do campo de email exatamente como um usuário real faria.|
| cy.get('input[type="password"]').type(...) | Simula o preenchimento da senha. |
| cy.contains('button', 'Sign In').click() | CLocaliza e clica no botão de login pelo texto visível — da mesma forma que um usuário o identificaria na tela.|
| cy.url().should('not.include', '/login') |Confirma que o redirecionamento ocorreu — se o usuário ainda estiver em /login, significa que a autenticação falhou.|

Camadas testadas: 
* Frontend: página de login (/login), formulário de autenticação, lógica de redirecionamento pós-login.
* Backend: rota POST /api/auth/login, validação de credenciais, geração de token JWT.
* Banco de dados: consulta ao MongoDB para encontrar o usuário e verificar a senha via comparePassword.

# 2. Login com credenciais inválidas exibe mensagem de erro

Critério de aceitação: 
Dado que um usuário que tenta acessar o sistema, preenche credenciais incorretas (email ou senha errados) e clica em "Sign In", o sistema deve manter o usuário na página de login e exibir a mensagem "Invalid credentials", sem conceder acesso.

```javascript
it('Cenário 2: usuário tenta login com credenciais inválidas e vê mensagem de erro', () => {
  cy.visit('/login')
  cy.get('input[placeholder="you@example.com"]').type('errado@email.com')
  cy.get('input[type="password"]').type('SenhaErrada@123')
  cy.contains('button', 'Sign In').click()
  cy.url().should('include', '/login')
  cy.contains('Invalid credentials').should('be.visible')
})
```

O que o teste verifica

| Verificação |Por que importa |
|-------------|----------------|
| cy.url().should('include', '/login') | CConfirma que o sistema não redirecionou o usuário — ou seja, o acesso foi negado corretamente. |
| cy.contains('Invalid credentials').should('be.visible') | Confirma que uma mensagem de erro clara e visível foi exibida ao usuário, sem revelar detalhes internos (ex: "usuário não encontrado" vs "senha errada" — ambos retornam a mesma mensagem, o que é uma boa prática de segurança). |

Camadas testadas:
* Frontend: exibição condicional da mensagem de erro retornada pelo backend.
* Backend: rota POST /api/auth/login, retorno de status 401 com mensagem "Invalid credentials" quando as credenciais não batem.
* Banco de dados: consulta ao MongoDB para verificar se o usuário existe e se a senha é válida.

# 3. Geração de itinerário por usuário autenticado
Critério de aceitação:

Dado que um usuário que está autenticado no sistema, acessa o Smart Trip Planner, preenche os dados da viagem (destino, orçamento, interesse) e clica em "Generate AI Itinerary", o sistema deve processar os dados e exibir um itinerário gerado com pelo menos o "Day 1" do plano visível na tela.
```javascript
it('Cenário 3: usuário autenticado preenche o formulário e gera um itinerário', () => {
  cy.visit('/login')
  cy.get('input[placeholder="you@example.com"]').type('teste@tourease.com')
  cy.get('input[type="password"]').type('Teste@123')
  cy.contains('button', 'Sign In').click()
  cy.url().should('not.include', '/login')

  cy.visit('/smart-trip-planner')
  cy.get('input[placeholder="e.g. Goa, Paris, Manali"]').type('Rio de Janeiro')
  cy.get('input[placeholder="e.g. 50000"]').type('5000')
  cy.contains('Culture').click()
  cy.contains('button', 'Generate AI Itinerary').click()
  cy.contains('Day 1', { timeout: 15000 }).should('be.visible')
})
```

O que o teste verifica
|Verificação | Por que importa|
|------------|----------------|
|Login antes de acessar o planner | Garante que o teste simula um usuário autenticado, que é o estado necessário para usar o Smart Trip Planner. |
| cy.get('input[placeholder="e.g. Goa, Paris, Manali"]').type('Rio de Janeiro') | imula o preenchimento do destino. |
| lcy.get('input[placeholder="e.g. 50000"]').type('5000') | Simula o preenchimento do orçamento. | 
| cy.contains('Culture').click() | Seleciona um interesse — campo obrigatório para habilitar a geração do itinerário.|
| cy.contains('button', 'Generate AI Itinerary').click() | Dispara a geração do plano.|
| cy.contains('Day 1', { timeout: 15000 }).should('be.visible')| Confirma que o itinerário foi gerado e renderizado na tela. O timeout: 15000 dá até 15 segundos para o sistema processar e exibir o resultado — necessário pois a geração envolve chamadas ao backend e ao serviço de clima.|

Camadas testadas:
* Frontend: formulário do Smart Trip Planner, lógica de submissão, renderização do resultado.
* Backend: rota POST /api/smart-planner/generate-itinerary, serviço generateSmartItinerary, fallback generateRuleBasedPlan (já que não há chave de IA configurada no ambiente de teste)
* AServiço externo: chamada ao weatherService para buscar a previsão do tempo do destino (GET /api/weather/forecast).

Observação sobre o caminho de geração:

Como o ambiente de teste não possui OPENROUTER_API_KEY configurada, o sistema utiliza automaticamente o generateRuleBasedPlan, o caminho determinístico de geração de itinerário. Isso garante que o teste seja repetível e não dependa de serviços externos de IA, sem comprometer a validade do cenário testado, que é verificar se o fluxo completo de geração funciona do ponto de vista do usuário.
