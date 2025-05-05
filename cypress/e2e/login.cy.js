describe('Testes de Login - Sauce Demo', () => {
 
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login com sucesso - usuário padrão', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  it('Login com erro - usuário bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Sorry, this user has been locked out.');
  });

  it('Login com erro - senha incorreta', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('senha_errada');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('Campos obrigatórios não preenchidos', () => {
    cy.get('[data-test="login-button"]').click();
    
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username is required');
  });
});
