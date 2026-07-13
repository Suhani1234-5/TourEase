# Code Smells, refatorações e padrões de projeto
# Code Smells

# 1. Magic Numbers em backend/services/weatherService
Magic Number (às vezes chamado também de "Magic Value" quando inclui strings) é um code smell que ocorre quando números literais aparecem soltos no meio do código, sem nome, sem explicação do que representam ou por que aquele valor específico foi escolhido.

Por que isso é um problema:

1. Falta de significado: ao ler if (day.temp.max > 38), você não sabe por que 38 — é o limite de "calor extremo"? É arbitrário? É baseado em alguma norma meteorológica?
2. Duplicação implícita de conhecimento: se o mesmo limiar (ex: o que conta como "chuva forte") for usado em mais de um lugar com valores diferentes ou repetidos, ninguém vê isso de forma centralizada.
3. Manutenção arriscada: se um dia decidirem que "calor extremo" deveria ser 40°C e não 38°C, é preciso caçar o número no meio da lógica, correndo o risco de alterar o número errado ou esquecer uma ocorrência.
4. Dificuldade de teste: testes unitários que validam esses limiares ficam acoplados a números mágicos espalhados, em vez de testarem contra uma constante nomeada que documenta a regra de negócio.

Onde aparece:

No método detectWeatherDisruptions:
```javascript
if (day.precipitation > 70) { ... }       // o que é "chuva forte"?
if (day.temp.max > 38) { ... }            // o que é "calor extremo"?
if (day.temp.min < 5) { ... }             // o que é "frio"?
if (day.windSpeed > 30) { ... }           // o que é "vento forte"?
```
E em suggestIndoorAlternatives:
```javascript
if (weather.precipitation > 60 || weather.condition.includes('storm')) { ... }  // limiar diferente de chuva!
if (weather.temp.max > 35) { ... }        // limiar diferente de calor!
```
# 1.1 Refatoração: Extração para constates nomeadas.
A solução clássica é criar um objeto de constantes e substituir cada número mágico por uma referência nomeada.

```javascript
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
```

Agora os métodos usam essas constantes:

```javascript
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
```

# 2. Duplicated code em backend/services/weatherService
Duplicated Code ocorre quando o mesmo trecho de lógica (ou a mesma intenção de negócio) aparece em mais de um lugar do código, em vez de existir em uma única fonte de verdade. Toda vez que essa lógica precisa mudar, é necessário lembrar de atualizar todas as cópias, e basta uma divergência mínima entre elas para criar um bug silencioso.

É exatamente o que acontece aqui: duas funções diferentes tentam responder à mesma pergunta de negócio ("este dia está com tempestade?"), mas usam implementações distintas, uma normaliza o texto para minúsculas e busca por 'thunderstorm', a outra não normaliza e busca por 'storm'. O resultado é que, dependendo de como a API externa formata a string da condição climática (ex: "Storm" com S maiúsculo), as duas funções podem chegar a conclusões diferentes para o mesmo dia.

```javascript
// Em detectWeatherDisruptions
if (day.condition.toLowerCase().includes('thunderstorm')) {
    issues.push({
        type: 'storm',
        severity: 'high',
        message: 'Thunderstorms expected - plan indoor activities'
    });
}
```
```javascript
// Em suggestIndoorAlternatives
if (weather.precipitation > 60 || weather.condition.includes('storm')) {
    // ...sugestões indoor
}
```

# 2.1 Refatoração: Extração de um método único que centraliza a regra
```javascript
// Verifica se a condição climática indica tempestade.
// Centralizar essa checagem evita que diferentes métodos do serviço
// divirjam sobre o que conta (ou não) como "tempestade".
_isStormCondition(condition) {
    return condition.toLowerCase().includes('storm');
}
```
Agora os dois métodos passam a depender da mesma fonte de verdade:
```javascript
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
``` 
```javascript
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
```
# 3. Code Smell: Dead Code / Código Enganoso em backend/service/itineraryAdjustmentService
Esse smell é um parâmetro morto: ele existe na assinatura do método, é passado pelo chamador, mas nunca é lido dentro do corpo da função. O problema não é só "código inútil ocupando espaço". É que esse parâmetro comunica uma mentira sobre o comportamento do sistema: qualquer desenvolvedor que leia a chamada do método vai assumir, razoavelmente, que os interesses do usuário influenciam como as sugestões são ranqueadas

```javascript
// Chamada do método, que sugere personalização por interesses:
const rankedSuggestions = this._scoreAndRankSuggestions(
    suggestions,
    interests
);
```
```javascript
// Implementação real: 'interests' nunca é usado
_scoreAndRankSuggestions(suggestions, interests = []) {
    return suggestions.sort((a, b) => b.score - a.score);
}
```

# Refatoração: Remoção do parâmetro morto
```javascript
_scoreAndRankSuggestions(suggestions) {
    return suggestions.sort((a, b) => b.score - a.score);
}
```
```javascript
const rankedSuggestions = this._scoreAndRankSuggestions(suggestions);
``` 

# Padrões de projeto
# 1. Singleton
Em uma análise das classes de serviço do projeto (WeatherService, EventService, DisruptionService, ItineraryAdjustmentService, entre outras), foi observado que cada uma é instanciada uma única vez, ao final do próprio arquivo, através da expressão module.exports = new NomeDoServico(). Não foram encontradas outras ocorrências de instanciação (new NomeDoServico()) em nenhum outro ponto do código analisado.
Esse padrão se apoia no mecanismo de cache de módulos do Node.js: a primeira vez que um arquivo faz require() de um desses serviços, o módulo é executado (incluindo a instanciação da classe) e o resultado fica armazenado em cache. Toda chamada subsequente de require(), em qualquer parte do sistema, retorna essa mesma instância já criada — efetivamente garantindo uma única instância compartilhada por toda a aplicação, sem a necessidade de uma implementação manual com método getInstance(), como seria mais comum em linguagens como Java.

Classe WeatherService:
```javascript
module.exports = new WeatherService();
```
Classe itineraryAdjustmentService:
```javascript
module.exports = new ItineraryAdjustmentService();
```
Classe eventService:
```javascript
module.exports = new EventService();
```
Classe  DisruptionService:
```javascript
module.exports = new DisruptionService();
```
Classe ContactMail
```javascript
module.exports = sendContactMail;
```

# 2. Facade
O método analyzeItinerary esconde, atrás de uma única chamada simples, a complexidade de orquestrar três subsistemas diferentes:
```javascript
const [events, weather, disruptions] = await Promise.all([
    eventService.fetchNearbyEvents(destination, startDate, endDate),
    weatherService.getWeatherForecast(destination, { start: startDate, end: endDate }),
    disruptionService.getCurrentDisruptions(destination, startDate, endDate),
]);
```
Quem chama analyzeItinerary(itinerary) de fora não precisa saber que existem três services distintos, com assinaturas diferentes, sendo combinados. Isso é exatamente a definição do Facade: fornecer uma interface única e simplificada para um conjunto de subsistemas mais complexos. O ItineraryAdjustmentService atua como fachada sobre eventService, weatherService e disruptionService.