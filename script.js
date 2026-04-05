let transacoes = [];

function adicionar() {
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const tipo = document.getElementById('tipo').value;

  if (!descricao || isNaN(valor)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  transacoes.push({ descricao, valor, tipo });

  // Limpar campos
  document.getElementById('descricao').value = "";
  document.getElementById('valor').value = "";

  atualizar();
}

function calcularSaldo() {
  let saldo = 0;

  transacoes.forEach(t => {
    if (t.tipo === 'receita') {
      saldo += t.valor;
    } else {
      saldo -= t.valor;
    }
  });

  return saldo;
}

function atualizar() {
  const lista = document.getElementById('lista');
  lista.innerHTML = "";

  transacoes.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.descricao} - R$ ${t.valor.toFixed(2)} (${t.tipo})`;
    lista.appendChild(li);
  });

  document.getElementById('saldo').textContent = calcularSaldo().toFixed(2);
}
