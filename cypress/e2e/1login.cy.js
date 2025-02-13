// cypress/e2e/seu_teste.cy.js

const { gerarEmailAleatorio, gerarSenhaAleatoria } = require('../support/utils');

describe('Teste de Login', () => {
  it('Deve fazer login com sucesso', () => {
    // Visita a página de login
    cy.visit('https://front.serverest.dev/login');

    // Insere o email
    cy.get('input[name="email"]').type('noobqa@test.com');

    // Insere a senha
    cy.get('input[name="password"]').type('teste123');

    // Clica no botão de login
    cy.wait(2000); // Aguarda por 2 segundos
    cy.get('button[type="submit"]').click();

    // Verifica se o login foi bem-sucedido
    cy.url().should('include', '/home');
    cy.contains('Bem Vindo').should('be.visible');
    cy.wait(2000); // Aguarda por 2 segundos
    cy.get('[data-testid="logout"]').click();
  });

  it('Deve fazer login com erro', () => {
    cy.visit('https://front.serverest.dev/login');

    // Gera um e-mail aleatório
    const emailAleatorio = gerarEmailAleatorio();

    // Insere o e-mail aleatório
    cy.get('input[name="email"]').type(emailAleatorio);

    // Insere a senha
    cy.get('input[name="password"]').type('teste123');

    // Aguarda por 2 segundos
    cy.wait(2000);

    // Clica no botão de login
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro é exibida
    cy.contains('Email e/ou senha inválidos').should('be.visible');
  });

  it('Deve entrar senha com erro', () => {
    cy.visit('https://front.serverest.dev/login');

    // Gera um e-mail aleatório
    const senhaAleatoria = gerarSenhaAleatoria();

    // Insere o email
    cy.get('input[name="email"]').type('noobqa@test.com');

    // Insere uma senha incorreta
    cy.get('input[name="password"]').type(senhaAleatoria);

    // Clica no botão de login
    cy.wait(2000); // Aguarda por 2 segundos
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro é exibida
    cy.contains('Email e/ou senha inválidos').should('be.visible');
  });
});