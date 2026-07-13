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


PR1	- 
PR2	- 
PR3	-
PR4	-
PR5	-
PR6	- 

Conclusão

As contribuições realizadas no projeto TourEase envolveram evolução arquitetural, implementação de melhorias de qualidade, correção de problemas de experiência do usuário, criação de testes automatizados e configuração de integração contínua.
As alterações contribuíram para um sistema mais organizado, escalável, testável e preparado para futuras evoluções.
