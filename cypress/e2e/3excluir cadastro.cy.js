// cypress/e2e/seu_teste.cy.js

describe('Excluir usuário', () => {
  const emailUsuario = 'Fulano123@xmail.com.br';

  before(() => {
    // Visita a página de login
    cy.visit('https://front.serverest.dev/login');

    // Realiza o login
    cy.get('input[name="email"]').type('noobqa@test.com');
    cy.get('input[name="password"]').type('teste123');
    cy.get('button[type="submit"]').click();

    // Aguarda a navegação para a página inicial
    cy.url().should('include', '/home');
  });

  it('Excluir o novo usuário', () => {
    // Navega para a lista de usuários
    cy.get('[data-testid="listar-usuarios"]').click();
    cy.contains('Lista dos usuários').should('be.visible');

    // Intercepta a requisição de exclusão
    cy.intercept('DELETE', `/usuarios/*`).as('deleteUser');

    // Procura a linha que contém o e-mail específico e clica no botão de excluir
    cy.contains('td', emailUsuario)
      .parent('tr')
      .within(() => {
        cy.get('button[class="btn btn-danger"]').click();
      });

    // Aguarda a confirmação da exclusão
    cy.wait('@deleteUser').its('response.statusCode').should('eq', 200);

    // Verifica se o usuário foi removido da tabela
    cy.contains('td', emailUsuario).should('not.exist');
  });

  after(() => {
    // Faz logout
    cy.get('[data-testid="logout"]').click();
    cy.url().should('include', '/login');
  });
});
