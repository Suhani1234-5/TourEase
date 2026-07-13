# Contribuições do Projeto TourEase

## Integrantes

| Integrante | Contribuições |
|---|---|
| Vivian Souza | PR1 - Documentação da arquitetura do sistema; 
PR5 - Configuração da pipeline CI/CD e ajustes de desenvolvimento; 
PR6 - Correção da persistência de idioma e melhoria do seletor de idiomas |
| Thiago | PR2 - Implementações e melhorias no projeto; 
PR3 - Implementações e melhorias no projeto; 
PR4 - Implementações e melhorias no projeto |

---

# Caminho A - Issue Resolvida

## Issue escolhida

**Issue #613 - Default language resets to Hindi on page reload instead of preserving English preference**

Link:
https://github.com/Suhani1234-5/TourEase/issues/613
---

## Descrição do problema

## Descrição do problema

A aplicação apresentava um problema no gerenciamento do idioma selecionado pelo usuário.

Ao atualizar a página ou acessar novamente o sistema, o idioma era alterado automaticamente para Hindi, mesmo quando o usuário havia selecionado English anteriormente.

Esse comportamento causava uma experiência inconsistente, obrigando o usuário a alterar manualmente o idioma em todas as visitas.

---

# Solução Implementada

A correção foi realizada no componente: frontend/src/components/LanguageSelector.jsx

Foram implementadas as seguintes melhorias:

- Definição do idioma padrão como English (`en`);
- Persistência da preferência utilizando `localStorage`;
- Recuperação da escolha do usuário durante a inicialização da aplicação;
- Ajuste do cookie `googtrans` utilizado pelo Google Translate;
- Correção do carregamento inicial para impedir alteração automática para Hindi;
- Expansão do seletor de idiomas.

Idiomas disponíveis após a alteração:

- English;
- Português;
- Español;
- Français;
- Deutsch;
- Italiano.

Com a alteração, novos usuários iniciam utilizando inglês e usuários recorrentes mantêm sua preferência salva.

---

# Caminho B - Refatorações Realizadas

## 1. Remoção de Magic Numbers no WeatherService

## Problema identificado

O serviço de clima possuía valores numéricos diretamente inseridos na lógica de negócio.

Exemplo:

```javascript
if (day.temp.max > 38)

O valor 38 não possuía significado explícito, dificultando entendimento e manutenção.

Refatoração realizada

Foram criadas constantes nomeadas:

const WEATHER_THRESHOLDS = {
    HEAVY_RAIN_PRECIPITATION_PERCENT: 70,
    EXTREME_HEAT_CELSIUS: 38,
    COLD_CELSIUS: 5,
    STRONG_WIND_KMH: 30
};

Agora as regras de negócio ficam centralizadas e documentadas.

Benefícios
Código mais legível;
Melhor compreensão das regras;
Alterações futuras mais simples;
Menor risco de inconsistências.
2. Remoção de Código Duplicado no WeatherService
Problema identificado

A verificação de tempestades estava duplicada em diferentes métodos.

Exemplo:

condition.includes('storm')

e:

condition.toLowerCase().includes('thunderstorm')

Essa diferença poderia gerar comportamentos inconsistentes.

Refatoração realizada

Foi criado um método único:

_isStormCondition(condition) {
    return condition.toLowerCase().includes('storm');
}

Todos os métodos passaram a utilizar a mesma regra.

Benefícios
Eliminação de duplicação;
Maior consistência;
Facilidade de manutenção.
3. Remoção de Parâmetro Não Utilizado
Problema identificado

O método:

_scoreAndRankSuggestions(suggestions, interests)

recebia o parâmetro interests, porém esse valor nunca era utilizado.

Isso indicava uma funcionalidade inexistente e aumentava a complexidade do código.

Refatoração realizada

O parâmetro foi removido:

_scoreAndRankSuggestions(suggestions)
Benefícios
Código mais simples;
Menor acoplamento;
Melhor representação da responsabilidade do método.
Padrões de Projeto Identificados
Singleton

Os serviços do backend utilizam uma única instância compartilhada através do mecanismo de cache de módulos do Node.js.

Exemplo:

module.exports = new WeatherService();

Serviços identificados:

WeatherService;
EventService;
DisruptionService;
ItineraryAdjustmentService.

Benefícios:

Reutilização de instâncias;
Organização dos serviços;
Redução de criação desnecessária de objetos.
Facade

O serviço:

ItineraryAdjustmentService

atua como uma fachada para diferentes subsistemas.

O método analyzeItinerary centraliza chamadas para:

EventService;
WeatherService;
DisruptionService.

Exemplo:

Promise.all([
 eventService.fetchNearbyEvents(),
 weatherService.getWeatherForecast(),
 disruptionService.getCurrentDisruptions()
])

A aplicação acessa uma interface simplificada sem precisar conhecer detalhes internos de cada serviço.

Benefícios:

Redução do acoplamento;
Melhor organização;
Facilidade de evolução.
Testes Automatizados

Foram implementados testes automatizados utilizando Cypress para validar fluxos críticos da aplicação.

Os testes verificam a integração entre:

Interface React;
API Node.js/Express;
Banco MongoDB;
Serviços externos.
Cenário 1 - Login com credenciais válidas
Critério de aceitação

Um usuário cadastrado informa email e senha corretos e deve ser autenticado e redirecionado para outra página.

it('Cenário 1: usuário faz login com credenciais válidas e é redirecionado', () => {
  cy.visit('/login')

  cy.get('input[placeholder="you@example.com"]')
    .type('teste@tourease.com')

  cy.get('input[type="password"]')
    .type('Teste@123')

  cy.contains('button', 'Sign In')
    .click()

  cy.url()
    .should('not.include', '/login')
})

Valida:

Página de login;
Preenchimento dos campos;
Autenticação;
Redirecionamento.

Camadas testadas:

Frontend;
Backend (POST /api/auth/login);
MongoDB.
Cenário 2 - Login com credenciais inválidas
Critério de aceitação

Usuários com dados incorretos devem permanecer na página de login e visualizar mensagem de erro.

it('Cenário 2: usuário tenta login com credenciais inválidas e vê mensagem de erro', () => {
  cy.visit('/login')

  cy.get('input[placeholder="you@example.com"]')
    .type('errado@email.com')

  cy.get('input[type="password"]')
    .type('SenhaErrada@123')

  cy.contains('button', 'Sign In')
    .click()

  cy.url()
    .should('include', '/login')

  cy.contains('Invalid credentials')
    .should('be.visible')
})

Valida:

Bloqueio de acesso;
Tratamento de erro;
Mensagem apresentada ao usuário.
Cenário 3 - Geração de itinerário
Critério de aceitação

Usuário autenticado informa dados da viagem e deve receber um itinerário gerado.

it('Cenário 3: usuário autenticado gera um itinerário', () => {

  cy.visit('/smart-trip-planner')

  cy.get('input[placeholder="e.g. Goa, Paris, Manali"]')
    .type('Rio de Janeiro')

  cy.get('input[placeholder="e.g. 50000"]')
    .type('5000')

  cy.contains('Culture')
    .click()

  cy.contains('button', 'Generate AI Itinerary')
    .click()

  cy.contains('Day 1', { timeout: 15000 })
    .should('be.visible')
})

Valida:

Formulário de viagem;
Comunicação com backend;
Geração do roteiro;
Renderização do resultado.
Pipeline CI/CD

Foi configurada uma pipeline utilizando GitHub Actions.

A pipeline realiza validações automáticas:

Frontend
Instalação das dependências;
Configuração do Node.js;
Build utilizando Vite.
Backend
Instalação das dependências;
Execução dos testes automatizados utilizando Jest.
Benefícios da Pipeline
Detecção antecipada de erros;
Maior confiabilidade nas alterações;
Padronização das validações;
Integração contínua durante o desenvolvimento.
Pull Requests Criados

PR1	- 
PR2	- 
PR3	-
PR4	-
PR5	-
PR6	- 

Conclusão

As contribuições realizadas no projeto TourEase envolveram evolução arquitetural, implementação de melhorias de qualidade, correção de problemas de experiência do usuário, criação de testes automatizados e configuração de integração contínua.
As alterações contribuíram para um sistema mais organizado, escalável, testável e preparado para futuras evoluções.
