const users = [
  'standard_user',
  'problem_user',
  'error_user',
  'visual_user'
];

describe('Fluxo de compra por usuário - testes separados por etapa', () => {
  users.forEach((user) => {
    describe(`Testando com o usuário: ${user}`, () => {
      beforeEach(() => {
        cy.login(user);
      });

      it('Adiciona todos os produtos ao carrinho', () => {
        cy.addAllProductsToCart();
        cy.get('.shopping_cart_link').click();
      });

      it('Valida se as imagens no carrinho carregaram corretamente', () => {
        cy.addAllProductsToCart();
        cy.get('.shopping_cart_link').click();
        cy.validateCartImages();
      });

      it('Realiza o checkout se possível', () => {
        cy.addAllProductsToCart();
        cy.get('.shopping_cart_link').click();
        cy.checkout();
      });
    });
  });
});
