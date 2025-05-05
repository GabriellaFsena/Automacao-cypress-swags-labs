describe('Fluxo completo com visual_user e validação de imagens no carrinho', () => {
    it('Adiciona produtos, valida imagens e faz checkout', () => {
      // Acessa o site e faz login
      cy.visit('/');
      cy.get('[data-test="username"]').type('visual_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
  
      // Lista de produtos para adicionar
      const products = [
        'add-to-cart-sauce-labs-backpack',
        'add-to-cart-sauce-labs-bike-light',
        'add-to-cart-sauce-labs-bolt-t-shirt',
        'add-to-cart-sauce-labs-fleece-jacket',
        'add-to-cart-sauce-labs-onesie',
        'add-to-cart-test.allthethings()-t-shirt-(red)'
      ];
  
      // Adiciona todos os produtos ao carrinho
      products.forEach((product) => {
        cy.get(`[data-test="${product}"]`).click();
      });
  
      // Vai para o carrinho
      cy.get('.shopping_cart_link').click();
  
      // Confirma que os itens do carrinho estão visíveis
      cy.get('.cart_item').should('be.visible');
  
      // Valida que todas as imagens dos itens carregaram corretamente
      cy.get('.inventory_item_img img').each(($img) => {
        // Verifica se a imagem foi carregada (naturalWidth > 0)
        cy.wrap($img).should(($i) => {
          expect($i[0].naturalWidth).to.be.greaterThan(0);
        });
      });
  
      // Continua para o checkout
      cy.get('[data-test="checkout"]').should('be.visible').click();
  
      // Preenche informações do checkout
      cy.get('[data-test="firstName"]').type('Visual');
      cy.get('[data-test="lastName"]').type('User');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
  
      // Finaliza o pedido
      cy.get('[data-test="finish"]').click();
  
      // Valida mensagem de sucesso
      cy.contains('Thank you for your order').should('be.visible');
    });
  });
  