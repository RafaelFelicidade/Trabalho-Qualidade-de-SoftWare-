const PRODUTOS = [
  { id: 1, nome: 'Embalagem Verde 1kg em Grão',  preco: 99.90 },
  { id: 2, nome: 'Embalagem Verde 1kg em Pó',    preco: 99.90 },
  { id: 3, nome: 'Embalagem 250g em Pó',         preco: 32.90 },
  { id: 4, nome: 'Embalagem 250g em Grão',       preco: 32.90 },
  { id: 5, nome: '1kg Pacote Transparente',      preco: 74.90 },
  { id: 6, nome: '1kg de Escolha',               preco: 55.00 },
];

function getProdutos() {
  return [...PRODUTOS];
}

function calcularTotal(carrinho) {
  if (!Array.isArray(carrinho)) throw new Error('Carrinho inválido.');
  return carrinho.reduce((total, item) => {
    const produto = PRODUTOS.find((p) => p.id === item.produtoId);
    if (!produto) throw new Error(`Produto ID ${item.produtoId} não encontrado.`);
    if (item.quantidade < 1) throw new Error('Quantidade deve ser maior que zero.');
    return total + produto.preco * item.quantidade;
  }, 0);
}

function calcularQuantidadeTotal(carrinho) {
  if (!Array.isArray(carrinho)) throw new Error('Carrinho inválido.');
  return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

function validarCliente(cliente) {
  if (!cliente || !cliente.nome || cliente.nome.trim() === '') {
    throw new Error('Nome do cliente é obrigatório.');
  }
  if (cliente.nome.trim().length < 3) {
    throw new Error('Nome deve ter pelo menos 3 caracteres.');
  }
  if (!cliente.telefone || cliente.telefone.trim() === '') {
    throw new Error('Telefone é obrigatório.');
  }
  const telLimpo = cliente.telefone.replace(/\D/g, '');
  if (telLimpo.length < 10 || telLimpo.length > 11) {
    throw new Error('Telefone inválido. Use DDD + número.');
  }
  return true;
}

function formatarMensagemWhatsApp(cliente, carrinho) {
  if (!carrinho || carrinho.length === 0) {
    throw new Error('Carrinho está vazio.');
  }
  validarCliente(cliente);

  const total = calcularTotal(carrinho);
  const itens = carrinho.map((item) => {
    const produto = PRODUTOS.find((p) => p.id === item.produtoId);
    return `• ${item.quantidade}x ${produto.nome} - R$ ${(produto.preco * item.quantidade).toFixed(2).replace('.', ',')}`;
  });

  const mensagem =
    `*Novo Pedido - Café* ☕\n\n` +
    `*Cliente:* ${cliente.nome.trim()}\n` +
    `*Telefone:* ${cliente.telefone.trim()}\n\n` +
    `*Itens do Pedido:*\n${itens.join('\n')}\n\n` +
    `*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

  return mensagem;
}

function gerarLinkWhatsApp(mensagem) {
  const numero = '5532998237029';
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

if (typeof module !== 'undefined') {
  module.exports = {
    getProdutos,
    calcularTotal,
    calcularQuantidadeTotal,
    validarCliente,
    formatarMensagemWhatsApp,
    gerarLinkWhatsApp,
    PRODUTOS,
  };
}
