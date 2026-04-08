/**
 * loja.test.js — Testes unitários da loja de café
 */

const {
  getProdutos,
  calcularTotal,
  calcularQuantidadeTotal,
  validarCliente,
  formatarMensagemWhatsApp,
  gerarLinkWhatsApp,
} = require('../src/loja');

describe('getProdutos', () => {
  test('deve retornar 6 produtos', () => {
    expect(getProdutos()).toHaveLength(6);
  });

  test('todos os produtos devem ter id, nome e preco', () => {
    getProdutos().forEach((p) => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('nome');
      expect(p).toHaveProperty('preco');
    });
  });

  test('todos os preços devem ser maiores que zero', () => {
    getProdutos().forEach((p) => {
      expect(p.preco).toBeGreaterThan(0);
    });
  });
});

describe('calcularTotal', () => {
  test('deve calcular o total de um item', () => {
    const carrinho = [{ produtoId: 1, quantidade: 1 }];
    expect(calcularTotal(carrinho)).toBeCloseTo(99.90);
  });

  test('deve calcular o total de múltiplos itens', () => {
    const carrinho = [
      { produtoId: 1, quantidade: 2 },
      { produtoId: 3, quantidade: 1 },
    ];
    expect(calcularTotal(carrinho)).toBeCloseTo(232.70);
  });

  test('deve retornar 0 para carrinho vazio', () => {
    expect(calcularTotal([])).toBe(0);
  });

  test('deve calcular corretamente o produto de R$ 55,00', () => {
    const carrinho = [{ produtoId: 6, quantidade: 3 }];
    expect(calcularTotal(carrinho)).toBeCloseTo(165.00);
  });

  test('deve lançar erro para produto inexistente', () => {
    const carrinho = [{ produtoId: 99, quantidade: 1 }];
    expect(() => calcularTotal(carrinho)).toThrow('Produto ID 99 não encontrado.');
  });

  test('deve lançar erro se quantidade for menor que 1', () => {
    const carrinho = [{ produtoId: 1, quantidade: 0 }];
    expect(() => calcularTotal(carrinho)).toThrow('Quantidade deve ser maior que zero.');
  });

  test('deve lançar erro se carrinho não for array', () => {
    expect(() => calcularTotal(null)).toThrow('Carrinho inválido.');
  });
});

describe('calcularQuantidadeTotal', () => {
  test('deve retornar a quantidade total de itens', () => {
    const carrinho = [
      { produtoId: 1, quantidade: 2 },
      { produtoId: 2, quantidade: 3 },
    ];
    expect(calcularQuantidadeTotal(carrinho)).toBe(5);
  });

  test('deve retornar 0 para carrinho vazio', () => {
    expect(calcularQuantidadeTotal([])).toBe(0);
  });

  test('deve lançar erro se carrinho não for array', () => {
    expect(() => calcularQuantidadeTotal('invalido')).toThrow('Carrinho inválido.');
  });
});

describe('validarCliente', () => {
  test('deve validar cliente com dados corretos', () => {
    expect(validarCliente({ nome: 'João Silva', telefone: '32999990000' })).toBe(true);
  });

  test('deve lançar erro se nome estiver vazio', () => {
    expect(() => validarCliente({ nome: '', telefone: '32999990000' }))
      .toThrow('Nome do cliente é obrigatório.');
  });

  test('deve lançar erro se nome tiver menos de 3 caracteres', () => {
    expect(() => validarCliente({ nome: 'Jo', telefone: '32999990000' }))
      .toThrow('Nome deve ter pelo menos 3 caracteres.');
  });

  test('deve lançar erro se telefone estiver vazio', () => {
    expect(() => validarCliente({ nome: 'João', telefone: '' }))
      .toThrow('Telefone é obrigatório.');
  });

  test('deve lançar erro se telefone tiver menos de 10 dígitos', () => {
    expect(() => validarCliente({ nome: 'João', telefone: '3299' }))
      .toThrow('Telefone inválido. Use DDD + número.');
  });

  test('deve aceitar telefone com formatação', () => {
    expect(validarCliente({ nome: 'Maria', telefone: '(32) 99999-0000' })).toBe(true);
  });

  test('deve lançar erro se cliente for nulo', () => {
    expect(() => validarCliente(null)).toThrow('Nome do cliente é obrigatório.');
  });
});

describe('formatarMensagemWhatsApp', () => {
  const clienteValido = { nome: 'João Silva', telefone: '32999990000' };
  const carrinhoValido = [{ produtoId: 1, quantidade: 1 }];

  test('deve conter o nome do cliente na mensagem', () => {
    const msg = formatarMensagemWhatsApp(clienteValido, carrinhoValido);
    expect(msg).toContain('João Silva');
  });

  test('deve conter o nome do produto na mensagem', () => {
    const msg = formatarMensagemWhatsApp(clienteValido, carrinhoValido);
    expect(msg).toContain('Embalagem Verde 1kg em Grão');
  });

  test('deve conter o total na mensagem', () => {
    const msg = formatarMensagemWhatsApp(clienteValido, carrinhoValido);
    expect(msg).toContain('99,90');
  });

  test('deve lançar erro se carrinho estiver vazio', () => {
    expect(() => formatarMensagemWhatsApp(clienteValido, []))
      .toThrow('Carrinho está vazio.');
  });

  test('deve lançar erro se cliente for inválido', () => {
    expect(() => formatarMensagemWhatsApp({ nome: '', telefone: '' }, carrinhoValido))
      .toThrow('Nome do cliente é obrigatório.');
  });
});

describe('gerarLinkWhatsApp', () => {
  test('deve gerar um link válido do WhatsApp', () => {
    const link = gerarLinkWhatsApp('Olá, quero fazer um pedido');
    expect(link).toContain('wa.me/5532992192572');
  });

  test('deve conter a mensagem codificada no link', () => {
    const link = gerarLinkWhatsApp('Pedido teste');
    expect(link).toContain('Pedido%20teste');
  });
});
