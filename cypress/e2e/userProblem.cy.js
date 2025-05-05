describe('Testes com o usuário problem_user no SauceDemo', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-test="username"]').type('problem_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  
    it('Deve tentar adicionar itens ao carrinho e verificar inconsistências', () => {
      // Tenta adicionar dois itens ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
  
      // Vai ao carrinho
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
  
      // Valida os itens no carrinho
      cy.get('.cart_item').should('have.length', 6);
  
      // Verifica se imagens dos produtos estão visíveis (podem não estar!)
      cy.get('.inventory_item_img img').each(($img) => {
        cy.wrap($img).should('be.visible');
      });
    });
  
    it.only('Deve realizar uma compra mesmo com problemas visuais', () => {
      // Vai direto ao fluxo de compra
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
  
      // Preenche informações
      cy.get('[data-test="firstName"]').type('Problema');
      cy.get('[data-test="lastName"]').type('usuario');
      cy.get('[data-test="postalCode"]').type('00000');
      cy.get('[data-test="continue"]').click();
  
      // Tenta finalizar a compra
      cy.get('[data-test="finish"]').click();
  
      // Verifica se mesmo com falhas visuais, o fluxo foi concluído
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });
  });
  