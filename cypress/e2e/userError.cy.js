describe('Testes com o usuário error_user', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-test="username"]').type('error_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  
    it('Verifica se a navegação até o carrinho funciona mesmo com erros visuais', () => {
      // Tenta adicionar um produto
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
      // Verifica se o contador do carrinho aparece corretamente
      cy.get('.shopping_cart_badge').should('contain', '1');
  
      // Clica no carrinho
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
  
      // Verifica se o item está no carrinho
      cy.get('.cart_item').should('have.length', 1);
    });
  
    it('Tenta finalizar uma compra completa', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
  
      cy.get('[data-test="checkout"]').click();
  
      // Preenche informações
      cy.get('[data-test="firstName"]').type('Erro');
      cy.get('[data-test="lastName"]').type('User');
      cy.get('[data-test="postalCode"]').type('99999');
      cy.get('[data-test="continue"]').click();
  
      // Verifica se chegou na página de overview
      cy.url().should('include', '/checkout-step-two.html');
  
      // Finaliza a compra
      cy.get('[data-test="finish"]').click();
  
      // Valida se finalizou
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });
  
    it('Verifica se as imagens de produtos estão quebradas', () => {
      // Verifica se há imagens quebradas (com `src` inválido)
      cy.get('.inventory_item_img img').each(($img) => {
        cy.wrap($img).should('have.attr', 'src').and('not.contain', '404');
      });
    });
  });
  