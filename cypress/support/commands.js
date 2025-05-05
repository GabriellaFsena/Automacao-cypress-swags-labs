// Login
Cypress.Commands.add('login', (username, password = 'secret_sauce') => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  });
  
  // Adicionar produtos ao carrinho
  Cypress.Commands.add('addAllProductsToCart', () => {
    const products = [
      'add-to-cart-sauce-labs-backpack',
      'add-to-cart-sauce-labs-bike-light',
      'add-to-cart-sauce-labs-bolt-t-shirt',
      'add-to-cart-sauce-labs-fleece-jacket',
      'add-to-cart-sauce-labs-onesie',
      'add-to-cart-test.allthethings()-t-shirt-(red)'
    ];
  
    products.forEach((product) => {
      cy.get(`[data-test="${product}"]`).click();
    });
  });
  
  // Validar imagens do carrinho
  Cypress.Commands.add('validateCartImages', () => {
    cy.get('.cart_item').should('be.visible');
    cy.get('.inventory_item_img img').each(($img) => {
      cy.wrap($img).should(($i) => {
        expect($i[0].naturalWidth).to.be.greaterThan(0);
      });
    });
  });
  
  // Realizar checkout
  Cypress.Commands.add('checkout', () => {
    cy.get('[data-test="checkout"]').should('be.visible').click();
  
    cy.get('[data-test="firstName"]').type('Visual');
    cy.get('[data-test="lastName"]').type('User');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
  
    // Tenta finalizar pedido, se botão estiver presente
    cy.get('body').then(($body) => {
      if ($body.find('[data-test="finish"]').length > 0) {
        cy.get('[data-test="finish"]').click();
        cy.contains('Thank you for your order').should('be.visible');
      } else {
        cy.log('Finalização não disponível para este usuário.');
      }
    });
  });
  