/// <reference types="cypress" />

describe('TourEase - Testes de Aceitação', () => {

  // Cenário 1: Login com credenciais válidas
  it('Cenário 1: usuário faz login com credenciais válidas e é redirecionado', () => {
    cy.visit('/login')
    cy.get('input[placeholder="you@example.com"]').type('teste@tourease.com')
    cy.get('input[type="password"]').type('Teste@123')
    cy.contains('button', 'Sign In').click()
    cy.url().should('not.include', '/login')
  })

  // Cenário 2: Login com credenciais inválidas exibe mensagem de erro
  it('Cenário 2: usuário tenta login com credenciais inválidas e vê mensagem de erro', () => {
    cy.visit('/login')
    cy.get('input[placeholder="you@example.com"]').type('errado@email.com')
    cy.get('input[type="password"]').type('SenhaErrada@123')
    cy.contains('button', 'Sign In').click()
    cy.url().should('include', '/login')
    cy.contains('Invalid credentials').should('be.visible')
  })

  // Cenário 3: Geração de itinerário com dados válidos
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

})