// ==========================================
// CARRINHO COMPLETO — Adiciona, mostra, calcula
// ==========================================

// Pegamos todos os elementos da página
const botoes = document.querySelectorAll('.produto-card__botao');
const contador = document.getElementById('contador-carrinho');
const iconeCarrinho = document.querySelector('.carrinho-icone');
const modal = document.getElementById('carrinhoModal');
const lista = document.getElementById('listaCarrinho');
const valorTotal = document.getElementById('valorTotal');
const botaoFechar = document.getElementById('botaoFechar');
const botaoFinalizar = document.getElementById('botaoFinalizar');

// Carrega o carrinho salvo ou começa vazio
let carrinho = JSON.parse(localStorage.getItem('meu-carrinho')) || [];

// Atualiza o número no ícone
function atualizarContador() {
  contador.textContent = carrinho.length;
}

// Salva no computador
function salvarCarrinho() {
  localStorage.setItem('meu-carrinho', JSON.stringify(carrinho));
  atualizarContador();
  atualizarLista(); // Atualiza a visualização também
}

// Mostra os produtos na caixinha
function atualizarLista() {
  // Apaga tudo antes de recriar
  lista.innerHTML = '';
  
  let total = 0;
  
  // Para cada produto no carrinho...
  carrinho.forEach((produto, indice) => {
    total += produto.preco;
    const item = document.createElement('li');
    item.innerHTML = `
      <span>${produto.nome}</span>
      <span>R$ ${produto.preco.toFixed(2)}</span>
      <button class="botao-remover" data-indice="${indice}">✕</button>
    `;
    lista.appendChild(item);
  });
  
  // Mostra o total formatado
  valorTotal.textContent = total.toFixed(2);
}

// Adiciona produto ao clicar
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const produto = {
      id: botao.dataset.id,
      nome: botao.dataset.nome,
      preco: parseFloat(botao.dataset.preco)
    };
    
    carrinho.push(produto);
    salvarCarrinho();
    alert(`${produto.nome} foi adicionado! 🛒`);
  });
});

// Abre a caixinha do carrinho
iconeCarrinho.addEventListener('click', (evento) => {
  evento.preventDefault(); // Não deixa ir para o topo da página
  modal.classList.add('aberto');
  atualizarLista();
});

// Fecha a caixinha
botaoFechar.addEventListener('click', () => {
  modal.classList.remove('aberto');
});

// Remove produto ao clicar no ✕
lista.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('botao-remover')) {
    const indice = parseInt(evento.target.dataset.indice);
    carrinho.splice(indice, 1);
    salvarCarrinho();
  }
});

// Botão de finalizar compra (exemplo)
botaoFinalizar.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  alert('Indo para finalizar compra... 📋\n(Aqui você vai conectar com o pagamento depois!)');
});

// Inicia tudo certo
atualizarContador();