let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

// Lista de usuários definida no próprio código--------------------COLOCAR SEUS EMAIL E NOMES 
const usuarios = [
  {
    nome: 'Joao pedro',
    user: 'joaopedroferreira1155@gmail.com',
    senha: 'joaopedro123'
  },
  {
    nome: 'Usuário 2',
    user: 'user2',
    senha: 'senha2'
  },
  {
    nome: 'Usuário 3',
    user: 'user3',
    senha: 'senha3'
  }
];

function entrar() {
  let usuario = document.querySelector('#usuario');
  let userLabel = document.querySelector('#userLabel');
  
  let senha = document.querySelector('#senha');
  let senhaLabel = document.querySelector('#senhaLabel');
  
  let msgError = document.querySelector('#msgError');
  
  let userValid = {
    nome: null,
    user: null,
    senha: null
  };
  
  usuarios.forEach((item) => {
    if (usuario.value == item.user && senha.value == item.senha) {
      userValid = {
        nome: item.nome,
        user: item.user,
        senha: item.senha
      };
    }
  });
  
  if (usuario.value == userValid.user && senha.value == userValid.senha) {
    window.location.href = '/assets/html/pagAdmin.html'; // Direcionando para outra página
    
    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;
    
    sessionStorage.setItem('token', token); // Usando sessionStorage para armazenar o token temporariamente
    sessionStorage.setItem('userLogado', JSON.stringify(userValid)); // Usando sessionStorage para armazenar o usuário logado
  } else {
    userLabel.setAttribute('style', 'color: red');
    usuario.setAttribute('style', 'border-color: red');
    senhaLabel.setAttribute('style', 'color: red');
    senha.setAttribute('style', 'border-color: red');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = 'Usuário ou senha incorretos';
    usuario.focus();
  }
}
