# 🧪 Automação Cypress - Swag Labs

Este projeto contém a automação de testes end-to-end do site [Swag Labs](https://www.saucedemo.com/) utilizando o framework [Cypress](https://www.cypress.io/).

## 📌 Objetivo

Automatizar o fluxo de compra no site Swag Labs, validando diferentes tipos de usuários e cenários, incluindo testes com validação de imagens no carrinho.

## 🧰 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/)
- JavaScript
- Node.js

## 🧑‍💻 Funcionalidades testadas

- Login com diferentes usuários (`standard_user`, `problem_user`, `error_user`, `visual_user`)
- Adição de todos os produtos ao carrinho
- Validação visual das imagens dos produtos no carrinho
- Checkout com preenchimento de formulário
- Finalização do pedido

## ✅ Comandos personalizados

Foram criados comandos customizados no `cypress/support/commands.js` para reaproveitar os fluxos:

```js
Cypress.Commands.add('login', (username) => { ... });
Cypress.Commands.add('addAllProductsToCart', () => { ... });
Cypress.Commands.add('validateCartImages', () => { ... });
Cypress.Commands.add('checkout', () => { ... });
