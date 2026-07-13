# Contribuições do Projeto TourEase

## Integrantes

| Integrante | Contribuições |
|---|---|
| Vivian Souza | PR1 - Documentação da arquitetura do sistema; PR5 - Configuração da pipeline CI/CD e ajustes de desenvolvimento; PR6 - Correção da persistência de idioma e melhoria do seletor de idiomas |
| Thiago | PR2 - Implementações e melhorias no projeto; PR3 - Implementações e melhorias no projeto; PR4 - Implementações e melhorias no projeto |


# Caminho A - Issue Resolvida

## Issue escolhida

**Issue #613 - Default language resets to Hindi on page reload instead of preserving English preference**

Link:
https://github.com/Suhani1234-5/TourEase/issues/613
---

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

# Padrões 

Singleton
Analisando as classes de serviço foi possível observar que cada
uma é instanciada uma única vez, não foram encontradas ocorrências
de instanciação em nenhuma outra parte do código, a não ser dentro de suas respectivas classes.

As instanciações ocorrem por meio da expressão module.exports = new NomeDoServico(). 

Classe WeatherService:

module.exports = new WeatherService();
Classe itineraryAdjustmentService:

module.exports = new ItineraryAdjustmentService();
Classe eventService:

module.exports = new EventService();
Classe DisruptionService:

module.exports = new DisruptionService();
Classe ContactMail

module.exports = sendContactMail;


Facade
Além do Singleton, observa-se o uso do padrão Facade também, onde haviam a utilização se interfaces simplificadas que escondiam o complexidade do código, como o método analyzeItinerary.

const [events, weather, disruptions] = await Promise.all([
    eventService.fetchNearbyEvents(destination, startDate, endDate),
    weatherService.getWeatherForecast(destination, { start: startDate, end: endDate }),
    disruptionService.getCurrentDisruptions(destination, startDate, endDate),
]);

Quem chama analyzeItinerary(itinerary) de fora não precisa saber que existem três services distintos, com assinaturas diferentes, sendo combinado.

# Code Smells

1. Magic Numbers em backend/services/weatherService
Magic Number (às vezes chamado também de "Magic Value" quando inclui strings) é um code smell que ocorre quando números literais aparecem soltos no meio do código, sem nome, sem explicação do que representam ou por que aquele valor específico foi escolhido.

No método detectWeatherDisruptions:

if (day.precipitation > 70) { ... }       // o que é "chuva forte"?
if (day.temp.max > 38) { ... }            // o que é "calor extremo"?
if (day.temp.min < 5) { ... }             // o que é "frio"?
if (day.windSpeed > 30) { ... }           // o que é "vento forte"?

E em suggestIndoorAlternatives:

if (weather.precipitation > 60 || weather.condition.includes('storm')) { ... }  // limiar diferente de chuva!
if (weather.temp.max > 35) { ... }        // limiar diferente de calor!
1.1 Refatoração: Extração para constates nomeadas.
A solução clássica é criar um objeto de constantes e substituir cada número mágico por uma referência nomeada.

// Constantes que documentam as regras de negócio de disrupção climática.
const WEATHER_THRESHOLDS = {
    HEAVY_RAIN_PRECIPITATION_PERCENT: 70,   // % de chance de chuva considerada "forte"
    EXTREME_HEAT_CELSIUS: 38,               // temp. máxima considerada "calor extremo"
    COLD_CELSIUS: 5,                        // temp. mínima considerada "frio"
    STRONG_WIND_KMH: 30,                    // velocidade do vento considerada "forte"

    // Limiares usados para sugerir alternativas indoor (intencionalmente
    // mais sensíveis que os de disrupção, pois aqui é só uma sugestão)
    INDOOR_SUGGESTION_PRECIPITATION_PERCENT: 60,
    INDOOR_SUGGESTION_HEAT_CELSIUS: 35
};
Agora os métodos usam essas constantes:

detectWeatherDisruptions(forecast) {
    const disruptions = [];

    forecast.forEach(day => {
        const issues = [];

        if (day.precipitation > WEATHER_THRESHOLDS.HEAVY_RAIN_PRECIPITATION_PERCENT) {
            issues.push({
                type: 'heavy_rain',
                severity: 'moderate',
                message: 'Heavy rain expected - consider indoor activities'
            });
        }

        if (day.temp.max > WEATHER_THRESHOLDS.EXTREME_HEAT_CELSIUS) {
            issues.push({
                type: 'extreme_heat',
                severity: 'high',
                message: 'Very hot day - stay hydrated and avoid midday sun'
            });
        }

        if (day.temp.min < WEATHER_THRESHOLDS.COLD_CELSIUS) {
            issues.push({
                type: 'cold',
                severity: 'moderate',
                message: 'Cold weather - pack warm clothes'
            });
        }

        if (day.condition.toLowerCase().includes('thunderstorm')) {
            issues.push({
                type: 'storm',
                severity: 'high',
                message: 'Thunderstorms expected - plan indoor activities'
            });
        }

        if (day.windSpeed > WEATHER_THRESHOLDS.STRONG_WIND_KMH) {
            issues.push({
                type: 'wind',
                severity: 'moderate',
                message: 'Strong winds expected'
            });
        }

        if (issues.length > 0) {
            disruptions.push({
                date: day.date,
                issues: issues,
                weatherSafe: false
            });
        }
    });

    return disruptions;
}


2. Duplicated code em backend/services/weatherService

Duplicated Code ocorre quando o mesmo trecho de lógica aparece em mais de um lugar do código, em vez de existir em uma única fonte de verdade. Toda vez que essa lógica precisa mudar, é necessário lembrar de atualizar todas as cópias, e basta uma divergência mínima entre elas para criar um bug silencioso.


// Em detectWeatherDisruptions
if (day.condition.toLowerCase().includes('thunderstorm')) {
    issues.push({
        type: 'storm',
        severity: 'high',
        message: 'Thunderstorms expected - plan indoor activities'
    });
}
// Em suggestIndoorAlternatives
if (weather.precipitation > 60 || weather.condition.includes('storm')) {
    // ...sugestões indoor
}

2.1 Refatoração: Extração de um método único que centraliza a regra
// Verifica se a condição climática indica tempestade.
// Centralizar essa checagem evita que diferentes métodos do serviço
// divirjam sobre o que conta (ou não) como "tempestade".
_isStormCondition(condition) {
    return condition.toLowerCase().includes('storm');
}
Agora os dois métodos passam a depender da mesma fonte de verdade:

detectWeatherDisruptions(forecast) {
    const disruptions = [];

    forecast.forEach(day => {
        const issues = [];

        // ... outras checagens (chuva, calor, frio, vento) ...

        if (this._isStormCondition(day.condition)) {
            issues.push({
                type: 'storm',
                severity: 'high',
                message: 'Thunderstorms expected - plan indoor activities'
            });
        }

        if (issues.length > 0) {
            disruptions.push({
                date: day.date,
                issues: issues,
                weatherSafe: false
            });
        }
    });

    return disruptions;
}
suggestIndoorAlternatives(weather, originalActivity) {
    const alternatives = [];

    if (weather.precipitation > WEATHER_THRESHOLDS.INDOOR_SUGGESTION_PRECIPITATION_PERCENT
        || this._isStormCondition(weather.condition)) {
        alternatives.push(
            { type: 'museum', suggestion: 'Visit local museums or art galleries instead', reason: 'Avoid heavy rain' },
            { type: 'indoor_market', suggestion: 'Explore covered markets or shopping centers', reason: 'Stay dry while experiencing local culture' },
            { type: 'cafe', suggestion: 'Enjoy local cafes and try regional cuisine', reason: 'Perfect rainy day activity' }
        );
    }

    // ... checagem de calor extremo ...

    return alternatives;
}

3. Code Smell: Dead Code / Código Enganoso em backend/service/itineraryAdjustmentService
Esse smell é um parâmetro morto: ele existe na assinatura do método, é passado pelo chamador, mas nunca é lido dentro do corpo da função. O problema não é só "código inútil ocupando espaço".

// Chamada do método, que sugere personalização por interesses:
const rankedSuggestions = this._scoreAndRankSuggestions(
    suggestions,
    interests
);
// Implementação real: 'interests' nunca é usado
_scoreAndRankSuggestions(suggestions, interests = []) {
    return suggestions.sort((a, b) => b.score - a.score);
}
Refatoração: Remoção do parâmetro morto
_scoreAndRankSuggestions(suggestions) {
    return suggestions.sort((a, b) => b.score - a.score);
}
const rankedSuggestions = this._scoreAndRankSuggestions(suggestions);


- PR1	- https://github.com/Suhani1234-5/TourEase/pull/618
- PR2	- https://github.com/Suhani1234-5/TourEase/pull/577
- PR3	- https://github.com/Suhani1234-5/TourEase/pull/623
- PR4	- https://github.com/Suhani1234-5/TourEase/pull/624
- PR5	- https://github.com/Suhani1234-5/TourEase/pull/617
- PR6	- https://github.com/Suhani1234-5/TourEase/pull/625

# Conclusão

As contribuições realizadas no projeto TourEase envolveram evolução arquitetural, implementação de melhorias de qualidade, correção de problemas de experiência do usuário, criação de testes automatizados e configuração de integração contínua. As alterações contribuíram para um sistema mais organizado, escalável, testável e preparado para futuras evoluções.
