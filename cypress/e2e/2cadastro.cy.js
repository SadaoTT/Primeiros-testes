// cypress/e2e/seu_teste.cy.js

// Comando para login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://front.serverest.dev/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/home');
});

// Comando para logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout"]').click();
  cy.url().should('include', '/login');
});

describe('Gerenciamento de Usuários', () => {
  const adminEmail = 'noobqa@test.com';
  const adminPassword = 'teste123';
  const newUser = {
    nome: 'FulanoDeTal',
    email: 'Fulano123@xmail.com.br',
    password: '321teste',
  };

  it('Deve cadastrar um novo usuário', () => {
    // Login como administrador
    cy.login(adminEmail, adminPassword);

    // Página de cadastro de usuários
    cy.get('[data-testid="cadastrar-usuarios"]').click();
    cy.contains('Cadastro de usuários').should('be.visible');

    // Preencher o cadastro
    cy.get('input[name="nome"]').type(newUser.nome);
    cy.get('input[name="email"]').type(newUser.email);
    cy.get('input[name="password"]').type(newUser.password);

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verificar se o cadastro foi bem-sucedido
    cy.url().should('include', '/admin/listarusuarios');
    cy.contains('Lista dos usuários').should('be.visible');

    // Logout
    cy.logout();
  });

  it('Login com o novo usuário', () => {
    // Realizar login com o novo usuário
    cy.login(newUser.email, newUser.password);

    // Verificar se o login foi bem-sucedido
    cy.contains('Serverest Store').should('be.visible');

    // Logout
    cy.logout();
  });
});