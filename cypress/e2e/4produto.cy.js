// cypress/e2e/seu_teste.cy.js

describe('Cadastro e Exclusão de Produto', () => {
    const adminEmail = 'noobqa@test.com';
    const adminPassword = 'teste123';
    const newProduct = {
      nome: 'Kraken 120',
      preço: '359',
      descricao: '120mm liquid cooler with RGB',
      quantidade: '169'
    };
  
    it('Cadastrar e excluir produto', () => {
      // Login como administrador
      cy.login(adminEmail, adminPassword);
  
      // Página de cadastro de produtos
      cy.get('[data-testid="cadastrar-produtos"]').click();
      cy.contains('Cadastro de Produtos').should('be.visible');
  
      // Preencher o cadastro
      cy.get('input[name="nome"]').type(newProduct.nome);
      cy.get('input[name="price"]').type(newProduct.preço);
      cy.get('textarea[name="description"]').type(newProduct.descricao);
      cy.get('input[name="quantity"]').type(newProduct.quantidade);
  
      // Submeter o formulário
      cy.get('button[type="submit"]').click();
  
      // Verificar se o cadastro foi bem-sucedido
      cy.contains('Lista dos Produtos').should('be.visible');
      cy.wait(2000); // Aguarda por 2 segundos
  
      // Voltar para a home
      cy.get('[data-testid="home"]').click();
      
      // Navega para a lista de produtos
      cy.get('[data-testid="listar-produtos"]').click();
      cy.contains('Lista dos Produtos').should('be.visible');
        
      // Procura a linha que contém o nome do produto e clica no botão de excluir
      cy.contains('td', newProduct.nome)
        .parent('tr')
        .within(() => {
          cy.get('button[class="btn btn-danger"]').click();
        });
  
      // Verifica se o produto foi removido da tabela
      cy.contains('td', newProduct.nome).should('not.exist');
  
      // Faz logout
      cy.get('[data-testid="logout"]').click();
      cy.url().should('include', '/login');
    });
  });
  