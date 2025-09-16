/// <reference types="cypress" />

describe('Agenda de Contatos - Testes E2E', () => {
  const baseUrl = 'https://ebac-agenda-contatos-tan.vercel.app/'

  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('Deve incluir um novo contato', () => {
    cy.contains('Adicionar').click()
    cy.get('input[name="name"]').type('João da Silva')
    cy.get('input[name="email"]').type('joao@email.com')
    cy.get('input[name="phone"]').type('11999999999')
    cy.contains('Salvar').click()

    cy.contains('João da Silva').should('exist')
    cy.contains('joao@email.com').should('exist')
  })

  it('Deve alterar um contato existente', () => {
    cy.contains('João da Silva')
      .parent()
      .find('button[title="Editar"]')
      .click()

    cy.get('input[name="name"]').clear().type('João Silva')
    cy.contains('Salvar').click()

    cy.contains('João Silva').should('exist')
    cy.contains('João da Silva').should('not.exist')
  })

  it('Deve remover um contato', () => {
    cy.contains('João Silva')
      .parent()
      .find('button[title="Excluir"]')
      .click()

    cy.contains('João Silva').should('not.exist')
  })
})
