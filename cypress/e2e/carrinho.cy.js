describe('Fluxo completo de compra no SauceDemo', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  
    it('Deve realizar uma compra com sucesso', () => {
      // Adiciona produtos ao carrinho
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
  
      // Vai para o carrinho
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
  
      // Valida os itens no carrinho
      cy.get('.cart_item').should('have.length', 4);
  
      // Inicia checkout
      cy.get('[data-test="checkout"]').click();
  
      // Preenche informações do comprador
      cy.get('[data-test="firstName"]').type('Gabriella');
      cy.get('[data-test="lastName"]').type('Freitas');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
  
      // Verifica os itens na página de resumo
      cy.get('.cart_item').should('have.length', 4);
      cy.get('[data-test="finish"]').click();
  
      // Valida a finalização da compra
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });
  });
  