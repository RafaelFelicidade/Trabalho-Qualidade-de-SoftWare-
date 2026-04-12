/**
 * app.js — Controla a interface da loja de café
 */

let carrinho = [];

const gradeProdutos = document.getElementById('gradeProdutos');
const secaoCarrinho = document.getElementById('secaoCarrinho');
const secaoFormulario = document.getElementById('secaoFormulario');
const listaCarrinho = document.getElementById('listaCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');
const btnLimparCarrinho = document.getElementById('btnLimparCarrinho');
const inputNome = document.getElementById('inputNome');
const inputTelefone = document.getElementById('inputTelefone');
const inputEndereco = document.getElementById('inputEndereco');
const msgErro = document.getElementById('msgErro');
const btnEnviar = document.getElementById('btnEnviar');

const ICONES = ['🟢', '🟤', '🫙', '🫘', '🎁', '⭐'];

function renderizarProdutos() {
  const produtos = getProdutos();
  gradeProdutos.innerHTML = '';

  produtos.forEach((produto, index) => {
    const qtdNoCarrinho = obterQuantidadeNoCarrinho(produto.id);
    const card = document.createElement('div');
    card.className = 'card-produto';
    card.innerHTML = `
      <div class="icone">${ICONES[index]}</div>
      <h3>${produto.nome}</h3>
      <div class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
      <div class="controle-quantidade">
        <button class="btn-menos" data-id="${produto.id}">−</button>
        <span id="qtd-${produto.id}">${qtdNoCarrinho}</span>
        <button class="btn-mais" data-id="${produto.id}">+</button>
      </div>
      <button class="btn-adicionar" data-id="${produto.id}">Adicionar ao carrinho</button>
    `;

    card.querySelector('.btn-mais').addEventListener('click', () => incrementar(produto.id));
    card.querySelector('.btn-menos').addEventListener('click', () => decrementar(produto.id));
    card.querySelector('.btn-adicionar').addEventListener('click', () => adicionarAoCarrinho(produto.id));

    gradeProdutos.appendChild(card);
  });
}

const quantidadesTemp = {};

function obterQuantidadeTemp(id) {
  return quantidadesTemp[id] || 1;
}

function incrementar(id) {
  quantidadesTemp[id] = (quantidadesTemp[id] || 0) + 1;
  document.getElementById(`qtd-${id}`).textContent = quantidadesTemp[id];
}

function decrementar(id) {
  quantidadesTemp[id] = Math.max(1, (quantidadesTemp[id] || 1) - 1);
  document.getElementById(`qtd-${id}`).textContent = quantidadesTemp[id];
}

function obterQuantidadeNoCarrinho(id) {
  const item = carrinho.find((i) => i.produtoId === id);
  return item ? item.quantidade : 0;
}

function adicionarAoCarrinho(produtoId) {
  const quantidade = obterQuantidadeTemp(produtoId);
  const existente = carrinho.find((i) => i.produtoId === produtoId);

  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ produtoId, quantidade });
  }

  quantidadesTemp[produtoId] = 1;
  renderizarCarrinho();
  renderizarProdutos();
}

function renderizarCarrinho() {
  if (carrinho.length === 0) {
    secaoCarrinho.style.display = 'none';
    secaoFormulario.style.display = 'none';
    return;
  }

  secaoCarrinho.style.display = 'block';
  secaoFormulario.style.display = 'block';

  const produtos = getProdutos();
  listaCarrinho.innerHTML = '';

  carrinho.forEach((item) => {
    const produto = produtos.find((p) => p.id === item.produtoId);
    const subtotal = produto.preco * item.quantidade;

    const li = document.createElement('li');
    li.className = 'item-carrinho';
    li.innerHTML = `
      <span class="nome-item">${item.quantidade}x ${produto.nome}</span>
      <span class="preco-item">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
      <button class="btn-remover-item" data-id="${item.produtoId}" aria-label="Remover">✕</button>
    `;

    li.querySelector('.btn-remover-item').addEventListener('click', () => {
      carrinho = carrinho.filter((i) => i.produtoId !== item.produtoId);
      renderizarCarrinho();
      renderizarProdutos();
    });

    listaCarrinho.appendChild(li);
  });

  const total = calcularTotal(carrinho);
  totalCarrinho.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

btnLimparCarrinho.addEventListener('click', () => {
  carrinho = [];
  renderizarCarrinho();
  renderizarProdutos();
});

btnEnviar.addEventListener('click', () => {
  msgErro.textContent = '';

  const cliente = {
    nome: inputNome.value,
    telefone: inputTelefone.value,
  };

  const endereco = inputEndereco.value.trim();

  try {
    validarCliente(cliente);

    if (carrinho.length === 0) {
      msgErro.textContent = 'Adicione pelo menos um produto ao carrinho.';
      return;
    }

    let mensagem = formatarMensagemWhatsApp(cliente, carrinho);
    if (endereco) mensagem += `\n*Endereço:* ${endereco}`;

    const link = gerarLinkWhatsApp(mensagem);
    window.open(link, '_blank');

  } catch (e) {
    msgErro.textContent = e.message;
  }
});

renderizarProdutos();

