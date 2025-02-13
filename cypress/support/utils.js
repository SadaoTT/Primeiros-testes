// cypress/support/utils.js

function gerarEmailAleatorio() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let nomeUsuario = '';
    const comprimentoNome = Math.floor(Math.random() * 10) + 5; // Comprimento entre 5 e 14 caracteres
  
    for (let i = 0; i < comprimentoNome; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      nomeUsuario += caracteres.charAt(indiceAleatorio);
    }
  
    const dominios = ['exemplo.com', 'teste.com', 'email.com'];
    const dominioAleatorio = dominios[Math.floor(Math.random() * dominios.length)];
  
    return `${nomeUsuario}@${dominioAleatorio}`;
  }
  
  function gerarSenhaAleatoria(comprimento = 8) {
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let senha = '';
    for (let i = 0; i < comprimento; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indiceAleatorio);
    }
    return senha;
  }
  
  // Exporta ambas as funções em um único objeto
  module.exports = {
    gerarEmailAleatorio,
    gerarSenhaAleatoria
  };
  